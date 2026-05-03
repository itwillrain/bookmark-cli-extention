import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";

/** Go command名です。 */
const goCommandName = "go";

/** Command token separatorです。 */
const commandTokenSeparator = " ";

/** Folder path separatorです。 */
const folderPathSeparator = "/";

/** 空文字です。 */
const emptyString = "";

/** 見つからないindexです。 */
const notFoundIndex = -1;

/** 先頭indexです。 */
const firstIndex = 0;

/** 次indexへのoffsetです。 */
const nextIndexOffset = 1;

/**
 * Go command入力中かを判定します。
 * @param {string} inputValue 現在のCLI入力値です。
 * @returns {boolean} Go command入力中ならtrueです。
 */
const isGoCommandInput = (inputValue: string): boolean => {
  const trimmedInputValue = inputValue.trimStart();

  return (
    trimmedInputValue === goCommandName ||
    trimmedInputValue.startsWith(`${goCommandName}${commandTokenSeparator}`)
  );
};

/**
 * Go command補完時に残す入力prefixを作ります。
 * @param {string} inputValue 現在のCLI入力値です。
 * @returns {string} Bookmark titleの前に残す入力prefixです。
 */
const createGoBookmarkCompletionPrefix = (inputValue: string): string => {
  const trimmedInputValue = inputValue.trimStart();
  const lastSeparatorIndex = trimmedInputValue.lastIndexOf(commandTokenSeparator);

  if (lastSeparatorIndex === notFoundIndex) {
    return `${goCommandName}${commandTokenSeparator}`;
  }

  const commandPrefix = trimmedInputValue.slice(firstIndex, lastSeparatorIndex + nextIndexOffset);
  const queryInput = trimmedInputValue.slice(lastSeparatorIndex + nextIndexOffset);
  const lastPathSeparatorIndex = queryInput.lastIndexOf(folderPathSeparator);

  if (lastPathSeparatorIndex === notFoundIndex) {
    return commandPrefix;
  }

  return `${commandPrefix}${queryInput.slice(firstIndex, lastPathSeparatorIndex + nextIndexOffset)}`;
};

/**
 * Bookmark result itemからTab補完入力を作成します。
 * @param {BookmarkCliResultItem} item 補完対象result itemです。
 * @param {string} inputValue 現在のCLI入力値です。
 * @returns {string} 補完入力です。
 */
const createBookmarkResultCompletionInput = (
  item: BookmarkCliResultItem,
  inputValue: string,
): string => {
  if (!isGoCommandInput(inputValue)) {
    return item.title;
  }

  return `${createGoBookmarkCompletionPrefix(inputValue)}${item.title}`;
};

/**
 * Result itemからTab補完入力を作成します。
 * @param {BookmarkCliResultItem} item 補完対象result itemです。
 * @param {string} inputValue 現在のCLI入力値です。
 * @returns {string} 補完入力です。
 */
export const createBookmarkCliCompletionInput = (
  item: BookmarkCliResultItem,
  inputValue = emptyString,
): string => {
  if (item.kind === "folder") {
    return item.folderPath;
  }

  return createBookmarkResultCompletionInput(item, inputValue);
};
