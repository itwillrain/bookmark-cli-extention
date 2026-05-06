import type { BookmarkDirectorySuggestion } from "./bookmark-directory-suggestion";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";

/** Go command名。 */
const goBookmarkCommandName = "go";

/** Rm command名。 */
const removeBookmarkCommandName = "rm";

/** Go bookmark suggestion入力。 */
export interface CreateGoBookmarkPathSuggestionsInput {
  /** Bookmark entry一覧。 */
  readonly bookmarks: readonly BookmarkEntry[];
  /** Command名。 */
  readonly commandName: string;
  /** 補完結果の前に付けるcommand部分。 */
  readonly commandPrefix: string;
  /** 親folder path。 */
  readonly parentPath: CurrentDirectory;
  /** 補完入力として保持するbase。 */
  readonly pathCompletionBase: string;
  /** Bookmark title prefix。 */
  readonly titlePrefix: string;
}

/**
 * Entryが指定folder直下のbookmarkかを判定。
 * @param {CurrentDirectory} parentPath 親folder path。
 * @param {BookmarkEntry} entry 判定対象entry。
 * @returns {boolean} 直下bookmarkならtrue。
 */
const isChildBookmarkEntry = (parentPath: CurrentDirectory, entry: BookmarkEntry): boolean =>
  entry.kind === "bookmark" && entry.folderPath === parentPath;

/**
 * Bookmark path suggestion対象command名かを判定。
 * @param {string} commandName command名。
 * @returns {boolean} Bookmark path suggestion対象ならtrue。
 */
const isBookmarkPathSuggestionCommandName = (commandName: string): boolean =>
  commandName === goBookmarkCommandName || commandName === removeBookmarkCommandName;

/**
 * Bookmark titleがprefixに一致するかを判定。
 * @param {string} title bookmark title。
 * @param {string} titlePrefix 入力中prefix。
 * @returns {boolean} 一致するならtrue。
 */
const bookmarkTitleMatchesPrefix = (title: string, titlePrefix: string): boolean =>
  title.toLowerCase().startsWith(titlePrefix.toLowerCase());

/**
 * Bookmark suggestionを作成。
 * @param {CreateGoBookmarkPathSuggestionsInput} input Go bookmark suggestion入力。
 * @param {BookmarkEntry} entry Bookmark entry。
 * @returns {BookmarkDirectorySuggestion} Bookmark suggestion。
 */
const createGoBookmarkSuggestion = (
  input: CreateGoBookmarkPathSuggestionsInput,
  entry: BookmarkEntry,
): BookmarkDirectorySuggestion => {
  const pathCompletion = `${input.pathCompletionBase}${entry.title}`;

  return {
    commandName: pathCompletion,
    completion: `${input.commandPrefix}${pathCompletion}`,
    description: entry.url ?? entry.folderPath,
  };
};

/**
 * Bookmark path suggestion対象command向けBookmark path suggestionを作成。
 * @param {CreateGoBookmarkPathSuggestionsInput} input Go bookmark suggestion入力。
 * @returns {readonly BookmarkDirectorySuggestion[]} Bookmark suggestion一覧。
 * @example
 * ```ts
 * const result = createGoBookmarkPathSuggestions({
 *   bookmarks,
 *   commandName: "go",
 *   commandPrefix: "go ./",
 *   parentPath: "/Work",
 *   pathCompletionBase: "./",
 *   titlePrefix: "Str",
 * });
 * ```
 */
export const createGoBookmarkPathSuggestions = (
  input: CreateGoBookmarkPathSuggestionsInput,
): readonly BookmarkDirectorySuggestion[] => {
  if (!isBookmarkPathSuggestionCommandName(input.commandName)) {
    return [];
  }

  return input.bookmarks
    .filter((entry) => isChildBookmarkEntry(input.parentPath, entry))
    .filter((entry) => bookmarkTitleMatchesPrefix(entry.title, input.titlePrefix))
    .map((entry) => createGoBookmarkSuggestion(input, entry));
};
