import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "../../application/commands/bookmark-command-parser";
import {
  type UsageBookmarksInput,
  listFrequentBookmarks,
  listRecentBookmarks,
} from "../../application/bookmarks/bookmark-usage-use-case";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import { createBookmarkCliResultItemsFromEntries } from "./bookmark-cli-view-model";

/** Recent command status suffix。 */
const recentStatusSuffix = "recent";

/** Frequent command status suffix。 */
const frequentStatusSuffix = "frequent";

/**
 * 件数status textを作成。
 * @param {number} itemCount item件数。
 * @param {string} suffix status suffix。
 * @returns {string} 件数status text。
 */
const createCountStatusText = (itemCount: number, suffix: string): string =>
  `${String(itemCount)} ${suffix}`;

/**
 * Usage use case入力を作成。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @param {number | undefined} limit 表示件数。
 * @returns {UsageBookmarksInput} Usage use case入力。
 */
const createUsageBookmarksInput = (
  dependencies: BookmarkCliCommandDependencies,
  limit?: number,
): UsageBookmarksInput => {
  const input = {
    repository: dependencies.repository,
    usageByBookmarkId: dependencies.extensionState.usageByBookmarkId,
  } satisfies UsageBookmarksInput;

  if (typeof limit !== "number") {
    return input;
  }

  return { ...input, limit };
};

/**
 * Usage command結果をcommand stateへ変換。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @param {Awaited<ReturnType<typeof listRecentBookmarks>>} result usage command結果。
 * @param {string} suffix status suffix。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
const createUsageCommandState = (
  dependencies: BookmarkCliCommandDependencies,
  result: Awaited<ReturnType<typeof listRecentBookmarks>>,
  suffix: string,
): BookmarkCliCommandState => {
  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: result.value.entries,
    resultItems: createBookmarkCliResultItemsFromEntries(result.value.entries),
    statusText: createCountStatusText(result.value.entries.length, suffix),
  });
};

/**
 * Recent commandを実行。
 * @param {RecentBookmarksCommand} command Recent command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeRecentBookmarksCommand = async (
  command: RecentBookmarksCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> =>
  createUsageCommandState(
    dependencies,
    await listRecentBookmarks(createUsageBookmarksInput(dependencies, command.limit)),
    recentStatusSuffix,
  );

/**
 * Freq commandを実行。
 * @param {FrequentBookmarksCommand} command Freq command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeFrequentBookmarksCommand = async (
  command: FrequentBookmarksCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> =>
  createUsageCommandState(
    dependencies,
    await listFrequentBookmarks(createUsageBookmarksInput(dependencies, command.limit)),
    frequentStatusSuffix,
  );
