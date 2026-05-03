import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  FindBookmarkCommand,
  GoBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import { findBookmarks, goBookmark } from "../../application/bookmarks/bookmark-use-cases";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import { createBookmarkCliResultItems } from "./bookmark-cli-view-model";
import { recordBookmarkOpened } from "../../domain/storage/bookmark-usage";

/**
 * 候補件数statusのsuffixです。
 */
const candidateStatusSuffix = "candidates";

/**
 * Bookmarkを開いたstatus prefixです。
 */
const openedStatusPrefix = "Opened";

/**
 * 現在日時ISO文字列を返します。
 * @returns {string} 現在日時ISO文字列です。
 */
const defaultNow = (): string => new Date().toISOString();

/**
 * 件数status textを作ります。
 * @param {number} itemCount item件数です。
 * @param {string} suffix status suffixです。
 * @returns {string} 件数status textです。
 */
const createCountStatusText = (itemCount: number, suffix: string): string =>
  `${String(itemCount)} ${suffix}`;

/**
 * 候補件数のstatus textを作ります。
 * @param {number} candidateCount 候補件数です。
 * @returns {string} 候補件数のstatus textです。
 */
const createCandidateStatusText = (candidateCount: number): string =>
  createCountStatusText(candidateCount, candidateStatusSuffix);

/**
 * Bookmarkを開いたstatus textを作ります。
 * @param {string} title 開いたBookmark titleです。
 * @returns {string} Bookmarkを開いたstatus textです。
 */
const createOpenedStatusText = (title: string): string => `${openedStatusPrefix} ${title}`;

/**
 * Command依存から現在日時を取得します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {string} 現在日時ISO文字列です。
 */
const getExecutedAt = (dependencies: BookmarkCliCommandDependencies): string => {
  if (typeof dependencies.now === "function") {
    return dependencies.now();
  }

  return defaultNow();
};

/**
 * Bookmark open利用統計を拡張状態へ反映します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {BookmarkEntry} entry 開いたBookmark entryです。
 * @returns {BookmarkCliCommandDependencies["extensionState"]} 更新後の拡張状態です。
 */
const recordOpenedBookmarkState = (
  dependencies: BookmarkCliCommandDependencies,
  entry: BookmarkEntry,
): BookmarkCliCommandDependencies["extensionState"] => ({
  ...dependencies.extensionState,
  usageByBookmarkId: recordBookmarkOpened({
    bookmarkId: entry.id,
    openedAt: getExecutedAt(dependencies),
    usageByBookmarkId: dependencies.extensionState.usageByBookmarkId,
  }),
});

/**
 * Bookmark検索結果から直前結果entry一覧を作ります。
 * @param {readonly BookmarkSearchResult[]} results Bookmark検索結果一覧です。
 * @returns {readonly BookmarkEntry[]} 直前結果entry一覧です。
 */
const createLastResultEntriesFromSearchResults = (
  results: readonly BookmarkSearchResult[],
): readonly BookmarkEntry[] => results.map((result) => result.entry);

/**
 * Find commandを実行します。
 * @param {FindBookmarkCommand} command Find commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeFindCommand = async (
  command: FindBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await findBookmarks({
    query: command.query,
    repository: dependencies.repository,
    virtualTagsByBookmarkId: dependencies.extensionState.virtualTagsByBookmarkId,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: createLastResultEntriesFromSearchResults(result.value.results),
    resultItems: createBookmarkCliResultItems(result.value.results, { debug: command.debug }),
    statusText: createCandidateStatusText(result.value.results.length),
  });
};

/**
 * Go commandを実行します。
 * @param {GoBookmarkCommand} command Go commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeGoCommand = async (
  command: GoBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await goBookmark({
    opener: dependencies.opener,
    query: command.query,
    repository: dependencies.repository,
    virtualTagsByBookmarkId: dependencies.extensionState.virtualTagsByBookmarkId,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: recordOpenedBookmarkState(dependencies, result.value.entry),
    lastResultEntries: [result.value.entry],
    resultItems: createBookmarkCliResultItems([result.value], { debug: command.debug }),
    statusText: createOpenedStatusText(result.value.entry.title),
  });
};
