import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import {
  type CurrentDirectory,
  getParentFolderPath,
  resolveFolderPath,
} from "../../domain/bookmarks/current-directory";
import { createGoBookmarkPathSuggestions } from "./bookmark-go-path-suggestion";

/** Bookmark CLI directory suggestion。 */
export interface BookmarkDirectorySuggestion {
  /** 表示名。 */
  readonly commandName: string;
  /** 補完後の入力値。 */
  readonly completion: string;
  /** 補足説明。 */
  readonly description: string;
}

/** Cd command名。 */
const changeDirectoryCommandName = "cd";

/** Go command名。 */
const goBookmarkCommandName = "go";

/** Ls command名。 */
const listDirectoryCommandName = "ls";

/** Ll command alias名。 */
const longListDirectoryCommandName = "ll";

/** Tree command名。 */
const showDirectoryTreeCommandName = "tree";

/** Command token separator。 */
const commandTokenSeparator = " ";

/** Command引数入力に到達しているかを判定する正規表現。 */
const commandArgumentInputPattern = /\S+\s/u;

/** Folder path separator。 */
const folderPathSeparator = "/";

/** 空文字。 */
const emptyString = "";

/** 見つからないindex。 */
const notFoundIndex = -1;

/** 先頭index。 */
const firstIndex = 0;

/** 次indexへのoffset。 */
const nextIndexOffset = 1;

/** Directory suggestion最大件数。 */
const maxDirectorySuggestionCount = 8;

/** 補完対象directory command名一覧。 */
const directoryCompletionCommandNames = new Set<string>([
  changeDirectoryCommandName,
  goBookmarkCommandName,
  listDirectoryCommandName,
  longListDirectoryCommandName,
  showDirectoryTreeCommandName,
]);

/** Directory path suggestion入力。 */
export interface SuggestBookmarkDirectoryPathsInput {
  /** Bookmark Tree。 */
  readonly bookmarkTree: BookmarkTree;
  /** 現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** CLI入力値。 */
  readonly inputValue: string;
}

/** Directory path completion context。 */
interface DirectoryPathCompletionContext {
  /** Command名。 */
  readonly commandName: string;
  /** 補完結果の前に付けるcommand部分。 */
  readonly commandPrefix: string;
  /** 補完対象path入力。 */
  readonly pathInput: string;
}

/** Path補完対象の分解結果。 */
interface PathCompletionParts {
  /** 補完候補の親path入力。 */
  readonly parentPathInput: string;
  /** 補完入力として保持するbase。 */
  readonly pathCompletionBase: string;
  /** Folder title prefix。 */
  readonly titlePrefix: string;
}

/**
 * 入力を空白区切りtokenへ分解。
 * @param {string} inputValue CLI入力値。
 * @returns {readonly string[]} token一覧。
 */
const splitInputTokens = (inputValue: string): readonly string[] =>
  inputValue.trimStart().split(commandTokenSeparator);

/**
 * Command引数入力が始まっているかを判定。
 * @param {string} inputValue CLI入力値。
 * @returns {boolean} 引数入力が始まっていればtrue。
 */
const hasCommandArgumentInput = (inputValue: string): boolean =>
  commandArgumentInputPattern.test(inputValue.trimStart());

/**
 * Directory completion対象commandかを判定。
 * @param {string} commandName command名。
 * @returns {boolean} 対象ならtrue。
 */
const isDirectoryCompletionCommandName = (commandName: string): boolean =>
  directoryCompletionCommandNames.has(commandName);

/**
 * Token一覧からcommand名を取り出す。
 * @param {readonly string[]} tokens 入力token一覧。
 * @returns {string} command名。
 */
const getCommandName = (tokens: readonly string[]): string => tokens[firstIndex] ?? emptyString;

/**
 * Token一覧からpath入力を取り出す。
 * @param {readonly string[]} tokens 入力token一覧。
 * @returns {string} path入力。
 */
const getPathInput = (tokens: readonly string[]): string =>
  tokens[tokens.length - nextIndexOffset] ?? emptyString;

/**
 * Path入力からdirectory path completion contextを作成。
 * @param {string} commandName command名。
 * @param {string} inputValue CLI入力値。
 * @param {string} pathInput path入力。
 * @returns {DirectoryPathCompletionContext | false} contextまたはfalse。
 */
const createDirectoryPathCompletionContextFromPathInput = (
  commandName: string,
  inputValue: string,
  pathInput: string,
): DirectoryPathCompletionContext | false => {
  const pathStartIndex = inputValue.lastIndexOf(pathInput);

  if (pathStartIndex === notFoundIndex) {
    return false;
  }

  return {
    commandName,
    commandPrefix: inputValue.slice(firstIndex, pathStartIndex),
    pathInput,
  };
};

/**
 * Directory path completion contextを作成。
 * @param {string} inputValue CLI入力値。
 * @returns {DirectoryPathCompletionContext | false} contextまたはfalse。
 */
const createDirectoryPathCompletionContext = (
  inputValue: string,
): DirectoryPathCompletionContext | false => {
  if (!hasCommandArgumentInput(inputValue)) {
    return false;
  }

  const tokens = splitInputTokens(inputValue);
  const commandName = getCommandName(tokens);

  if (!isDirectoryCompletionCommandName(commandName)) {
    return false;
  }

  return createDirectoryPathCompletionContextFromPathInput(
    commandName,
    inputValue,
    getPathInput(tokens),
  );
};

/**
 * Directory path suggestion対象入力かを判定。
 * @param {string} inputValue CLI入力値。
 * @returns {boolean} Directory path suggestion対象ならtrue。
 */
export const canSuggestBookmarkDirectoryPaths = (inputValue: string): boolean =>
  createDirectoryPathCompletionContext(inputValue) !== false;

/**
 * Path補完対象を親path入力とtitle prefixへ分解。
 * @param {string} pathInput 補完対象path入力。
 * @returns {PathCompletionParts} Path補完対象の分解結果。
 */
const createPathCompletionParts = (pathInput: string): PathCompletionParts => {
  const separatorIndex = pathInput.lastIndexOf(folderPathSeparator);

  if (separatorIndex === notFoundIndex) {
    return {
      parentPathInput: emptyString,
      pathCompletionBase: emptyString,
      titlePrefix: pathInput,
    };
  }

  return {
    parentPathInput: pathInput.slice(firstIndex, separatorIndex),
    pathCompletionBase: pathInput.slice(firstIndex, separatorIndex + nextIndexOffset),
    titlePrefix: pathInput.slice(separatorIndex + nextIndexOffset),
  };
};

/**
 * Entryが指定folder直下のfolderかを判定。
 * @param {CurrentDirectory} parentPath 親folder path。
 * @param {BookmarkEntry} entry 判定対象entry。
 * @returns {boolean} 直下folderならtrue。
 */
const isChildFolderEntry = (parentPath: CurrentDirectory, entry: BookmarkEntry): boolean =>
  entry.kind === "folder" && getParentFolderPath(entry.folderPath) === parentPath;

/**
 * Entry titleがprefixに一致するかを判定。
 * @param {string} title entry title。
 * @param {string} titlePrefix 入力中prefix。
 * @returns {boolean} 一致するならtrue。
 */
const entryTitleMatchesPrefix = (title: string, titlePrefix: string): boolean =>
  title.toLowerCase().startsWith(titlePrefix.toLowerCase());

/**
 * Directory suggestionを作成。
 * @param {DirectoryPathCompletionContext} context completion context。
 * @param {PathCompletionParts} parts path completion parts。
 * @param {BookmarkEntry} entry bookmarkまたはfolder entry。
 * @returns {BookmarkDirectorySuggestion} Directory suggestion。
 */
const createDirectorySuggestion = (
  context: DirectoryPathCompletionContext,
  parts: PathCompletionParts,
  entry: BookmarkEntry,
): BookmarkDirectorySuggestion => {
  const pathCompletion = `${parts.pathCompletionBase}${entry.title}`;

  return {
    commandName: pathCompletion,
    completion: `${context.commandPrefix}${pathCompletion}`,
    description: entry.url ?? entry.folderPath,
  };
};

/**
 * Bookmark Treeからdirectory path suggestionを返す。
 * @param {SuggestBookmarkDirectoryPathsInput} input Directory path suggestion入力。
 * @returns {readonly BookmarkDirectorySuggestion[]} Directory path suggestion一覧。
 */
export const suggestBookmarkDirectoryPaths = (
  input: SuggestBookmarkDirectoryPathsInput,
): readonly BookmarkDirectorySuggestion[] => {
  const context = createDirectoryPathCompletionContext(input.inputValue);

  if (context === false) {
    return [];
  }

  const parts = createPathCompletionParts(context.pathInput);
  const parentPath = resolveFolderPath(input.currentDirectory, parts.parentPathInput);
  const folderSuggestions = input.bookmarkTree.folders
    .filter((entry) => isChildFolderEntry(parentPath, entry))
    .filter((entry) => entryTitleMatchesPrefix(entry.title, parts.titlePrefix))
    .map((entry) => createDirectorySuggestion(context, parts, entry));
  const bookmarkSuggestions = createGoBookmarkPathSuggestions({
    bookmarks: input.bookmarkTree.bookmarks,
    commandName: context.commandName,
    commandPrefix: context.commandPrefix,
    parentPath,
    pathCompletionBase: parts.pathCompletionBase,
    titlePrefix: parts.titlePrefix,
  });

  return [...folderSuggestions, ...bookmarkSuggestions].slice(
    firstIndex,
    maxDirectorySuggestionCount,
  );
};
