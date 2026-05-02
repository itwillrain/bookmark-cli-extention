import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
  BookmarkCliCommandStateInput,
} from "./bookmark-cli-command-state";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";

/**
 * 空のresult item一覧です。
 */
export const emptyResultItems = [] as const satisfies readonly BookmarkCliResultItem[];

/**
 * 画面状態を作ります。
 * @param {BookmarkCliCommandStateInput} input 画面状態作成入力です。
 * @returns {BookmarkCliCommandState} 画面状態です。
 */
export const createCommandState = (
  input: BookmarkCliCommandStateInput,
): BookmarkCliCommandState => ({
  currentDirectory: input.currentDirectory,
  lastResultEntries: input.lastResultEntries,
  resultItems: input.resultItems,
  statusText: input.statusText,
});

/**
 * Result itemなしの状態を作ります。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {string} statusText Status lineに表示するtextです。
 * @returns {BookmarkCliCommandState} Result itemなしの状態です。
 */
export const createEmptyResultState = (
  dependencies: BookmarkCliCommandDependencies,
  statusText: string,
): BookmarkCliCommandState =>
  createCommandState({
    currentDirectory: dependencies.currentDirectory,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: emptyResultItems,
    statusText,
  });
