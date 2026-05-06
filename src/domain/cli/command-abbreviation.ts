import { type CommandAlias, expandCommandAlias, normalizeCommandAliases } from "./command-alias";

/** 空文字です。 */
const emptyString = "";

/** 先頭command tokenと後続空白以降を取り出す正規表現です。 */
const commandBoundaryPattern = /^(\s*)(\S+)(\s[\s\S]*)$/u;

/** 正規表現matchのleading whitespace indexです。 */
const leadingWhitespaceMatchIndex = 1;

/** 正規表現matchのcommand name indexです。 */
const commandNameMatchIndex = 2;

/** 正規表現matchのrest input indexです。 */
const restInputMatchIndex = 3;

/**
 * 入力中commandの単語境界情報です。
 */
interface CommandBoundaryInput {
  /** 先頭command tokenの前にある空白です。 */
  readonly leadingWhitespace: string;
  /** 先頭command tokenです。 */
  readonly commandName: string;
  /** 先頭command token後の空白と残り入力です。 */
  readonly restInput: string;
}

/**
 * 入力値から先頭command token確定済み境界を取得した結果です。
 */
type ParsedCommandBoundaryInput =
  | {
      /** 境界情報が存在するかです。 */
      readonly ok: false;
    }
  | {
      /** 境界情報が存在するかです。 */
      readonly ok: true;
      /** 境界情報です。 */
      readonly value: CommandBoundaryInput;
    };

/**
 * 入力値から先頭command token確定済みの境界情報を取り出します。
 * @param {string} inputValue CLI入力値です。
 * @returns {ParsedCommandBoundaryInput} 境界情報の取得結果です。
 */
const parseCommandBoundaryInput = (inputValue: string): ParsedCommandBoundaryInput => {
  const match = commandBoundaryPattern.exec(inputValue);

  if (!match) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      commandName: match[commandNameMatchIndex] ?? emptyString,
      leadingWhitespace: match[leadingWhitespaceMatchIndex] ?? emptyString,
      restInput: match[restInputMatchIndex] ?? emptyString,
    },
  };
};

/**
 * Command abbreviation名に対応する設定を探します。
 * @param {readonly CommandAlias[]} commandAbbreviations command abbreviation一覧です。
 * @param {string} commandName 入力されたcommand名です。
 * @returns {CommandAlias | undefined} 対応するabbreviationです。
 */
const findCommandAbbreviation = (
  commandAbbreviations: readonly CommandAlias[],
  commandName: string,
): CommandAlias | undefined =>
  normalizeCommandAliases(commandAbbreviations).find(
    (abbreviation) => abbreviation.name === commandName,
  );

/**
 * 入力中commandを単語境界でcommand abbreviation展開します。
 * @param {string} inputValue CLI入力値です。
 * @param {readonly CommandAlias[]} commandAbbreviations command abbreviation一覧です。
 * @returns {string} 展開後の入力値です。
 * @example
 * ```ts
 * const result = expandCommandAbbreviationOnBoundary("g ", [{ name: "g", command: "go" }]);
 * // "go "
 * ```
 */
export const expandCommandAbbreviationOnBoundary = (
  inputValue: string,
  commandAbbreviations: readonly CommandAlias[],
): string => {
  const boundaryInput = parseCommandBoundaryInput(inputValue);

  if (!boundaryInput.ok) {
    return inputValue;
  }

  const abbreviation = findCommandAbbreviation(
    commandAbbreviations,
    boundaryInput.value.commandName,
  );

  if (!abbreviation) {
    return inputValue;
  }

  return `${boundaryInput.value.leadingWhitespace}${abbreviation.command}${boundaryInput.value.restInput}`;
};

/**
 * 確定入力をcommand abbreviation展開します。
 * @param {string} inputValue CLI入力値です。
 * @param {readonly CommandAlias[]} commandAbbreviations command abbreviation一覧です。
 * @returns {string} 展開後の入力値です。
 * @example
 * ```ts
 * const result = expandSubmittedCommandAbbreviation("g stripe", [{ name: "g", command: "go" }]);
 * // "go stripe"
 * ```
 */
export const expandSubmittedCommandAbbreviation = (
  inputValue: string,
  commandAbbreviations: readonly CommandAlias[],
): string => expandCommandAlias(inputValue, commandAbbreviations);
