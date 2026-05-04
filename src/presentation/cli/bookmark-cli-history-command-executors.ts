import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type ListBrowserHistoryInput,
  listBrowserHistory,
} from "../../application/bookmarks/browser-history-use-case";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { BrowserHistoryCommand } from "../../application/commands/bookmark-command-parser";
import { createBookmarkCliResultItemsFromEntries } from "./bookmark-cli-view-model";

/** History command status suffix。 */
const historyStatusSuffix = "history";

/**
 * 件数status textを作成。
 * @param {number} itemCount item件数。
 * @param {string} suffix status suffix。
 * @returns {string} 件数status text。
 */
const createCountStatusText = (itemCount: number, suffix: string): string =>
  `${String(itemCount)} ${suffix}`;

/**
 * History use case入力を作成。
 * @param {BrowserHistoryCommand} command History command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {ListBrowserHistoryInput} History use case入力。
 */
const createListBrowserHistoryInput = (
  command: BrowserHistoryCommand,
  dependencies: BookmarkCliCommandDependencies,
): ListBrowserHistoryInput => {
  const input = {
    query: command.query,
  } satisfies ListBrowserHistoryInput;
  let inputWithLimit: ListBrowserHistoryInput = input;

  if (typeof command.limit === "number") {
    inputWithLimit = {
      ...input,
      limit: command.limit,
    };
  }

  if (!dependencies.historyRepository) {
    return inputWithLimit;
  }

  return {
    ...inputWithLimit,
    historyRepository: dependencies.historyRepository,
  };
};

/**
 * History commandを実行。
 * @param {BrowserHistoryCommand} command History command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeBrowserHistoryCommand = async (
  command: BrowserHistoryCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await listBrowserHistory(createListBrowserHistoryInput(command, dependencies));

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: result.value.entries,
    resultItems: createBookmarkCliResultItemsFromEntries(result.value.entries),
    statusText: createCountStatusText(result.value.entries.length, historyStatusSuffix),
  });
};
