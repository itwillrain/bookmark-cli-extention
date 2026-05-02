import {
  type BookmarkOpenerPort,
  type BookmarkRepositoryPort,
  findBookmarks,
  goBookmark,
} from "../../application/bookmarks/bookmark-use-cases";
import {
  type FindBookmarkCommand,
  type GoBookmarkCommand,
  type UnknownBookmarkCommand,
  parseBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import { createBookmarkCliResultItems } from "./bookmark-cli-view-model";

/**
 * Bookmark CLI command実行に必要な依存です。
 */
export interface BookmarkCliCommandDependencies {
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
  /**
   * Bookmark URLを開くportです。
   */
  readonly opener: BookmarkOpenerPort;
}

/**
 * Bookmark CLI画面に反映する状態です。
 */
export interface BookmarkCliCommandState {
  /**
   * Result listに表示するitem一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}

/**
 * 空のresult item一覧です。
 */
const emptyResultItems = [] as const satisfies readonly BookmarkCliResultItem[];

/**
 * 初期状態のstatus textです。
 */
const readyStatusText = "Ready";

/**
 * 候補件数statusのsuffixです。
 */
const candidateStatusSuffix = "candidates";

/**
 * 未対応commandのstatus prefixです。
 */
const unknownCommandStatusPrefix = "Unknown command";

/**
 * Bookmarkを開いたstatus prefixです。
 */
const openedStatusPrefix = "Opened";

/**
 * Result itemなしの状態を作ります。
 * @param {string} statusText Status lineに表示するtextです。
 * @returns {BookmarkCliCommandState} Result itemなしの状態です。
 */
const createEmptyResultState = (statusText: string): BookmarkCliCommandState => ({
  resultItems: emptyResultItems,
  statusText,
});

/**
 * 候補件数のstatus textを作ります。
 * @param {number} candidateCount 候補件数です。
 * @returns {string} 候補件数のstatus textです。
 */
const createCandidateStatusText = (candidateCount: number): string =>
  `${String(candidateCount)} ${candidateStatusSuffix}`;

/**
 * 未対応commandのstatus textを作ります。
 * @param {UnknownBookmarkCommand} command 未対応commandです。
 * @returns {string} 未対応commandのstatus textです。
 */
const createUnknownCommandStatusText = (command: UnknownBookmarkCommand): string =>
  `${unknownCommandStatusPrefix}: ${command.commandName}`;

/**
 * Bookmarkを開いたstatus textを作ります。
 * @param {string} title 開いたBookmark titleです。
 * @returns {string} Bookmarkを開いたstatus textです。
 */
const createOpenedStatusText = (title: string): string => `${openedStatusPrefix} ${title}`;

/**
 * Find commandを実行します。
 * @param {FindBookmarkCommand} command Find commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeFindCommand = async (
  command: FindBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await findBookmarks({
    query: command.query,
    repository: dependencies.repository,
  });

  if (!result.ok) {
    return createEmptyResultState(result.message);
  }

  return {
    resultItems: createBookmarkCliResultItems(result.value.results),
    statusText: createCandidateStatusText(result.value.results.length),
  };
};

/**
 * Go commandを実行します。
 * @param {GoBookmarkCommand} command Go commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeGoCommand = async (
  command: GoBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await goBookmark({
    opener: dependencies.opener,
    query: command.query,
    repository: dependencies.repository,
  });

  if (!result.ok) {
    return createEmptyResultState(result.message);
  }

  return {
    resultItems: createBookmarkCliResultItems([result.value]),
    statusText: createOpenedStatusText(result.value.entry.title),
  };
};

/**
 * CLI入力を解析してBookmark commandを実行します。
 * @param {string} input CLI入力です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeBookmarkCliCommand = async (
  input: string,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const command = parseBookmarkCommand(input);

  if (command.kind === "empty") {
    return createEmptyResultState(readyStatusText);
  }

  if (command.kind === "unknown") {
    return createEmptyResultState(createUnknownCommandStatusText(command));
  }

  if (command.kind === "find") {
    const state = await executeFindCommand(command, dependencies);

    return state;
  }

  const state = await executeGoCommand(command, dependencies);

  return state;
};
