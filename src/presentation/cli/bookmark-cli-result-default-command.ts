import type { BookmarkCliResultItem } from "./components/bookmark-cli-result-list-types";

/** Result numberの表示offsetです。 */
const resultNumberOffset = 1;

/** Cd command名です。 */
const changeDirectoryCommandName = "cd";

/** Go command名です。 */
const goBookmarkCommandName = "go";

/** Command token separatorです。 */
const commandTokenSeparator = " ";

/** 既定command未定義の戻り値です。 */
const defaultCommandMissing = false;

/** Result default command作成入力です。 */
export interface CreateBookmarkCliResultDefaultCommandInput {
  /** 対象result itemです。 */
  readonly item: BookmarkCliResultItem;
  /** 対象result itemの0-based indexです。 */
  readonly resultIndex: number;
}

/** Result default command作成結果です。 */
export type BookmarkCliResultDefaultCommand = string | typeof defaultCommandMissing;

/**
 * 0-based result indexをCLIの1-based result numberへ変換します。
 * @param {number} resultIndex 0-based result indexです。
 * @returns {string} CLI result numberです。
 */
const createResultNumberInput = (resultIndex: number): string =>
  String(resultIndex + resultNumberOffset);

/**
 * Command名とresult numberから実行入力を作ります。
 * @param {string} commandName command名です。
 * @param {number} resultIndex 0-based result indexです。
 * @returns {string} CLI command入力です。
 */
const createResultNumberCommand = (commandName: string, resultIndex: number): string =>
  `${commandName}${commandTokenSeparator}${createResultNumberInput(resultIndex)}`;

/**
 * Result itemの既定実行commandを作ります。
 * @param {CreateBookmarkCliResultDefaultCommandInput} input Result default command作成入力です。
 * @returns {BookmarkCliResultDefaultCommand} 既定command。存在しない場合はfalseです。
 */
export const createBookmarkCliResultDefaultCommand = (
  input: CreateBookmarkCliResultDefaultCommandInput,
): BookmarkCliResultDefaultCommand => {
  if (input.item.kind === "folder") {
    return createResultNumberCommand(changeDirectoryCommandName, input.resultIndex);
  }

  if (input.item.kind === "bookmark" || input.item.kind === "history") {
    return createResultNumberCommand(goBookmarkCommandName, input.resultIndex);
  }

  return defaultCommandMissing;
};
