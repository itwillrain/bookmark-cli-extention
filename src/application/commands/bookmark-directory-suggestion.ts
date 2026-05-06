/* oxlint-disable max-lines -- Directory補完のpath解析とsuggestion生成を同じmoduleに保つため。 */

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

/** Rm command名。 */
const removeBookmarkCommandName = "rm";

/** Rm force option名。 */
const removeForceOptionName = "-f";

/** Rm long force option名。 */
const removeLongForceOptionName = "--force";

/** Rm recursive option名。 */
const removeRecursiveOptionName = "-r";

/** Rm upper recursive option名。 */
const removeUpperRecursiveOptionName = "-R";

/** Rm long recursive option名。 */
const removeLongRecursiveOptionName = "--recursive";

/** Rm combined option prefix。 */
const removeCombinedOptionPrefix = "-";

/** Rm force option文字。 */
const removeForceOptionCharacter = "f";

/** Rm recursive option文字。 */
const removeRecursiveOptionCharacter = "r";

/** Rm upper recursive option文字。 */
const removeUpperRecursiveOptionCharacter = "R";

/** Folderだけを補完するtarget種別。 */
const folderSuggestionTargetKind = "folder";

/** Bookmarkだけを補完するtarget種別。 */
const bookmarkSuggestionTargetKind = "bookmark";

/** FolderとBookmarkの両方を補完するtarget種別。 */
const entrySuggestionTargetKind = "entry";

/** Command token separator。 */
const commandTokenSeparator = " ";

/** Command引数入力に到達しているかを判定する正規表現。 */
const commandArgumentInputPattern = /\S+\s/u;

/** Folder path separator。 */
const folderPathSeparator = "/";

/** Root直下pathのseparator index。 */
const rootPathSeparatorIndex = 0;

/** 空文字。 */
const emptyString = "";

/** 見つからないindex。 */
const notFoundIndex = -1;

/** 先頭index。 */
const firstIndex = 0;

/** 次indexへのoffset。 */
const nextIndexOffset = 1;

/** 補完対象directory command名一覧。 */
const directoryCompletionCommandNames = new Set<string>([
  changeDirectoryCommandName,
  goBookmarkCommandName,
  listDirectoryCommandName,
  longListDirectoryCommandName,
  removeBookmarkCommandName,
  showDirectoryTreeCommandName,
]);

/** Directory path suggestion対象種別。 */
type DirectoryPathSuggestionTargetKind =
  | typeof folderSuggestionTargetKind
  | typeof bookmarkSuggestionTargetKind
  | typeof entrySuggestionTargetKind;

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
  /** 補完するentry種別。 */
  readonly targetKind: DirectoryPathSuggestionTargetKind;
}

/** 入力tokenと入力文字列上の位置。 */
interface InputToken {
  /** Token文字列。 */
  readonly text: string;
  /** Token開始index。 */
  readonly startIndex: number;
  /** Token終了index。 */
  readonly endIndex: number;
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

/** Folder suggestion作成入力。 */
interface CreateFolderSuggestionsInput {
  /** Completion context。 */
  readonly context: DirectoryPathCompletionContext;
  /** Folder entry一覧。 */
  readonly folders: readonly BookmarkEntry[];
  /** 親folder path。 */
  readonly parentPath: CurrentDirectory;
  /** Path completion parts。 */
  readonly parts: PathCompletionParts;
}

/** Bookmark suggestion作成入力。 */
interface CreateBookmarkSuggestionsInput {
  /** Bookmark entry一覧。 */
  readonly bookmarks: readonly BookmarkEntry[];
  /** Completion context。 */
  readonly context: DirectoryPathCompletionContext;
  /** 親folder path。 */
  readonly parentPath: CurrentDirectory;
  /** Path completion parts。 */
  readonly parts: PathCompletionParts;
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
 * Rm option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} Rm optionならtrue。
 */
const isRemoveOptionToken = (token: string): boolean =>
  token === removeForceOptionName ||
  token === removeLongForceOptionName ||
  token === removeRecursiveOptionName ||
  token === removeUpperRecursiveOptionName ||
  token === removeLongRecursiveOptionName ||
  (token.startsWith(removeCombinedOptionPrefix) &&
    token
      .slice(removeCombinedOptionPrefix.length)
      .split(emptyString)
      .every(
        (optionCharacter) =>
          optionCharacter === removeForceOptionCharacter ||
          optionCharacter === removeRecursiveOptionCharacter ||
          optionCharacter === removeUpperRecursiveOptionCharacter,
      ));

/**
 * Rm combined option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} combined optionならtrue。
 */
const isCombinedRemoveOptionToken = (token: string): boolean =>
  token.startsWith(removeCombinedOptionPrefix) && isRemoveOptionToken(token);

/**
 * Rm recursive option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} recursive optionならtrue。
 */
const isRemoveRecursiveOptionToken = (token: string): boolean =>
  token === removeRecursiveOptionName ||
  token === removeUpperRecursiveOptionName ||
  token === removeLongRecursiveOptionName ||
  (isCombinedRemoveOptionToken(token) &&
    (token.includes(removeRecursiveOptionCharacter) ||
      token.includes(removeUpperRecursiveOptionCharacter)));

/**
 * Command名の開始indexを取得。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @returns {number} command名の開始index。
 */
const findCommandNameStartIndex = (inputValue: string, commandName: string): number =>
  inputValue.indexOf(commandName);

/**
 * Command引数の開始indexを取得。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @returns {number} command引数の開始index。
 */
const findCommandArgumentStartIndex = (inputValue: string, commandName: string): number => {
  const commandNameStartIndex = findCommandNameStartIndex(inputValue, commandName);

  if (commandNameStartIndex === notFoundIndex) {
    return inputValue.length;
  }

  return commandNameStartIndex + commandName.length;
};

/**
 * Command token separator文字かを判定。
 * @param {string} character 判定対象文字。
 * @returns {boolean} separatorならtrue。
 */
const isCommandTokenSeparatorCharacter = (character: string): boolean =>
  character === commandTokenSeparator;

/**
 * Command token separatorを読み飛ばす。
 * @param {string} inputValue CLI入力値。
 * @param {number} startIndex 読み飛ばし開始index。
 * @returns {number} token開始index。
 */
const skipCommandTokenSeparators = (inputValue: string, startIndex: number): number => {
  let currentIndex = startIndex;

  while (isCommandTokenSeparatorCharacter(inputValue[currentIndex] ?? emptyString)) {
    currentIndex += nextIndexOffset;
  }

  return currentIndex;
};

/**
 * Token終端indexを取得。
 * @param {string} inputValue CLI入力値。
 * @param {number} startIndex token開始index。
 * @returns {number} token終端index。
 */
const findTokenEndIndex = (inputValue: string, startIndex: number): number => {
  let currentIndex = startIndex;

  while (
    currentIndex < inputValue.length &&
    !isCommandTokenSeparatorCharacter(inputValue[currentIndex] ?? emptyString)
  ) {
    currentIndex += nextIndexOffset;
  }

  return currentIndex;
};

/**
 * 次の入力tokenを読む。
 * @param {string} inputValue CLI入力値。
 * @param {number} startIndex 読み取り開始index。
 * @returns {InputToken | false} 次の入力token。
 */
const readNextInputToken = (inputValue: string, startIndex: number): InputToken | false => {
  const tokenStartIndex = skipCommandTokenSeparators(inputValue, startIndex);

  if (tokenStartIndex >= inputValue.length) {
    return false;
  }

  const tokenEndIndex = findTokenEndIndex(inputValue, tokenStartIndex);

  return {
    endIndex: tokenEndIndex,
    startIndex: tokenStartIndex,
    text: inputValue.slice(tokenStartIndex, tokenEndIndex),
  };
};

/**
 * Rm commandのpath開始indexを取得。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @returns {number | false} path開始index。
 */
const findRemovePathStartIndex = (inputValue: string, commandName: string): number | false => {
  let currentIndex = findCommandArgumentStartIndex(inputValue, commandName);

  while (currentIndex < inputValue.length) {
    const token = readNextInputToken(inputValue, currentIndex);

    if (token === false) {
      return false;
    }

    if (!isRemoveOptionToken(token.text)) {
      return token.startIndex;
    }

    currentIndex = token.endIndex;
  }

  return false;
};

/**
 * 空でないtokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} 空でなければtrue。
 */
const isNonEmptyToken = (token: string): boolean => token !== emptyString;

/**
 * Rm option入力部分の終了indexを解決。
 * @param {string} inputValue CLI入力値。
 * @param {number | false} pathStartIndex path開始index。
 * @returns {number} option入力部分の終了index。
 */
const resolveRemoveOptionEndIndex = (
  inputValue: string,
  pathStartIndex: number | false,
): number => {
  if (pathStartIndex === false) {
    return inputValue.length;
  }

  return pathStartIndex;
};

/**
 * Rm option入力部分を取り出す。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @param {number | false} pathStartIndex path開始index。
 * @returns {string} option入力部分。
 */
const getRemoveOptionInput = (
  inputValue: string,
  commandName: string,
  pathStartIndex: number | false,
): string => {
  const argumentStartIndex = findCommandArgumentStartIndex(inputValue, commandName);
  const optionEndIndex = resolveRemoveOptionEndIndex(inputValue, pathStartIndex);

  return inputValue.slice(argumentStartIndex, optionEndIndex);
};

/**
 * Rm option入力をtokenへ分解。
 * @param {string} optionInput option入力部分。
 * @returns {readonly string[]} option token一覧。
 */
const splitRemoveOptionTokens = (optionInput: string): readonly string[] =>
  optionInput.split(commandTokenSeparator).filter((token) => isNonEmptyToken(token));

/**
 * Rm optionにrecursive指定があるかを判定。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @param {number | false} pathStartIndex path開始index。
 * @returns {boolean} recursive指定があればtrue。
 */
const hasRemoveRecursiveOption = (
  inputValue: string,
  commandName: string,
  pathStartIndex: number | false,
): boolean =>
  splitRemoveOptionTokens(getRemoveOptionInput(inputValue, commandName, pathStartIndex)).some(
    (token) => isRemoveRecursiveOptionToken(token),
  );

/**
 * Rm commandの補完target種別を解決。
 * @param {string} inputValue CLI入力値。
 * @param {string} commandName command名。
 * @param {number | false} pathStartIndex path開始index。
 * @returns {DirectoryPathSuggestionTargetKind} 補完target種別。
 */
const resolveRemoveSuggestionTargetKind = (
  inputValue: string,
  commandName: string,
  pathStartIndex: number | false,
): DirectoryPathSuggestionTargetKind => {
  if (hasRemoveRecursiveOption(inputValue, commandName, pathStartIndex)) {
    return folderSuggestionTargetKind;
  }

  return bookmarkSuggestionTargetKind;
};

/**
 * 入力末尾が空白かを判定。
 * @param {string} inputValue CLI入力値。
 * @returns {boolean} 空白で終わるならtrue。
 */
const endsWithCommandTokenSeparator = (inputValue: string): boolean =>
  inputValue.endsWith(commandTokenSeparator);

/**
 * Path未入力時のcommand prefixを作成。
 * @param {string} inputValue CLI入力値。
 * @returns {string} path未入力時のcommand prefix。
 */
const createEmptyPathCommandPrefix = (inputValue: string): string => {
  if (endsWithCommandTokenSeparator(inputValue)) {
    return inputValue;
  }

  return `${inputValue}${commandTokenSeparator}`;
};

/**
 * Rm command向けdirectory path completion contextを作成。
 * @param {string} commandName command名。
 * @param {string} inputValue CLI入力値。
 * @returns {DirectoryPathCompletionContext} context。
 */
const createRemoveDirectoryPathCompletionContext = (
  commandName: string,
  inputValue: string,
): DirectoryPathCompletionContext => {
  const pathStartIndex = findRemovePathStartIndex(inputValue, commandName);
  const targetKind = resolveRemoveSuggestionTargetKind(inputValue, commandName, pathStartIndex);

  if (pathStartIndex === false) {
    return {
      commandName,
      commandPrefix: createEmptyPathCommandPrefix(inputValue),
      pathInput: emptyString,
      targetKind,
    };
  }

  return {
    commandName,
    commandPrefix: inputValue.slice(firstIndex, pathStartIndex),
    pathInput: inputValue.slice(pathStartIndex),
    targetKind,
  };
};

/**
 * Command名から基本の補完target種別を解決。
 * @param {string} commandName command名。
 * @returns {DirectoryPathSuggestionTargetKind} 補完target種別。
 */
const resolveDefaultSuggestionTargetKind = (
  commandName: string,
): DirectoryPathSuggestionTargetKind => {
  if (commandName === goBookmarkCommandName) {
    return entrySuggestionTargetKind;
  }

  return folderSuggestionTargetKind;
};

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
    targetKind: resolveDefaultSuggestionTargetKind(commandName),
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

  if (commandName === removeBookmarkCommandName) {
    return createRemoveDirectoryPathCompletionContext(commandName, inputValue);
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
 * @example
 * ```ts
 * const result = canSuggestBookmarkDirectoryPaths(inputValue);
 * ```
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

  if (separatorIndex === rootPathSeparatorIndex) {
    return {
      parentPathInput: folderPathSeparator,
      pathCompletionBase: folderPathSeparator,
      titlePrefix: pathInput.slice(separatorIndex + nextIndexOffset),
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
 * Folder suggestionを返すtarget種別かを判定。
 * @param {DirectoryPathCompletionContext} context completion context。
 * @returns {boolean} Folder suggestion対象ならtrue。
 */
const shouldSuggestFolders = (context: DirectoryPathCompletionContext): boolean =>
  context.targetKind === folderSuggestionTargetKind ||
  context.targetKind === entrySuggestionTargetKind;

/**
 * Bookmark suggestionを返すtarget種別かを判定。
 * @param {DirectoryPathCompletionContext} context completion context。
 * @returns {boolean} Bookmark suggestion対象ならtrue。
 */
const shouldSuggestBookmarks = (context: DirectoryPathCompletionContext): boolean =>
  context.targetKind === bookmarkSuggestionTargetKind ||
  context.targetKind === entrySuggestionTargetKind;

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
 * Folder suggestion一覧を作成。
 * @param {CreateFolderSuggestionsInput} input Folder suggestion作成入力。
 * @returns {readonly BookmarkDirectorySuggestion[]} Folder suggestion一覧。
 */
const createFolderSuggestions = (
  input: CreateFolderSuggestionsInput,
): readonly BookmarkDirectorySuggestion[] => {
  if (!shouldSuggestFolders(input.context)) {
    return [];
  }

  return input.folders
    .filter((entry) => isChildFolderEntry(input.parentPath, entry))
    .filter((entry) => entryTitleMatchesPrefix(entry.title, input.parts.titlePrefix))
    .map((entry) => createDirectorySuggestion(input.context, input.parts, entry));
};

/**
 * Bookmark suggestion一覧を作成。
 * @param {CreateBookmarkSuggestionsInput} input Bookmark suggestion作成入力。
 * @returns {readonly BookmarkDirectorySuggestion[]} Bookmark suggestion一覧。
 */
const createBookmarkSuggestions = (
  input: CreateBookmarkSuggestionsInput,
): readonly BookmarkDirectorySuggestion[] => {
  if (!shouldSuggestBookmarks(input.context)) {
    return [];
  }

  return createGoBookmarkPathSuggestions({
    bookmarks: input.bookmarks,
    commandName: input.context.commandName,
    commandPrefix: input.context.commandPrefix,
    parentPath: input.parentPath,
    pathCompletionBase: input.parts.pathCompletionBase,
    titlePrefix: input.parts.titlePrefix,
  });
};

/**
 * Bookmark Treeからdirectory path suggestionを返す。
 * @param {SuggestBookmarkDirectoryPathsInput} input Directory path suggestion入力。
 * @returns {readonly BookmarkDirectorySuggestion[]} Directory path suggestion一覧。
 * @example
 * ```ts
 * const result = suggestBookmarkDirectoryPaths({ bookmarkTree, currentDirectory: "/Work", inputValue: "cd ./Ad" });
 * ```
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
  const folderSuggestions = createFolderSuggestions({
    context,
    folders: input.bookmarkTree.folders,
    parentPath,
    parts,
  });
  const bookmarkSuggestions = createBookmarkSuggestions({
    bookmarks: input.bookmarkTree.bookmarks,
    context,
    parentPath,
    parts,
  });

  return [...folderSuggestions, ...bookmarkSuggestions];
};
