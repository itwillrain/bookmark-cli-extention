/** Command aliasです。 */
export interface CommandAlias {
  /** 展開後commandです。 */
  readonly command: string;
  /** Alias名です。 */
  readonly name: string;
}

/** 空文字です。 */
const emptyString = "";

/** Command token separatorです。 */
const commandTokenSeparator = " ";

/** Whitespaceに一致する正規表現です。 */
const whitespacePattern = /\s+/u;

/** Alias名として使えない文字に一致する正規表現です。 */
const aliasNameForbiddenPattern = /[\s|]/u;

/** 入力command分解結果です。 */
interface SplitCommandInput {
  /** 入力引数部分です。 */
  readonly argumentInput: string;
  /** 入力command名です。 */
  readonly commandName: string;
}

/**
 * Command aliasの空白を正規化します。
 * @param {CommandAlias} alias 正規化対象aliasです。
 * @returns {CommandAlias} 正規化済みaliasです。
 */
const trimCommandAlias = (alias: CommandAlias): CommandAlias => ({
  command: alias.command.trim(),
  name: alias.name.trim(),
});

/**
 * Command aliasが有効か判定します。
 * @param {CommandAlias} alias 判定対象aliasです。
 * @returns {boolean} 有効ならtrueです。
 */
const isValidCommandAlias = (alias: CommandAlias): boolean =>
  alias.name !== emptyString &&
  alias.command !== emptyString &&
  !aliasNameForbiddenPattern.test(alias.name);

/**
 * Alias一覧へaliasを後勝ちで追加します。
 * @param {readonly CommandAlias[]} aliases 追加前alias一覧です。
 * @param {CommandAlias} alias 追加するaliasです。
 * @returns {readonly CommandAlias[]} 追加後alias一覧です。
 */
export const upsertCommandAlias = (
  aliases: readonly CommandAlias[],
  alias: CommandAlias,
): readonly CommandAlias[] => [
  ...aliases.filter((currentAlias) => currentAlias.name !== alias.name),
  alias,
];

/**
 * Alias一覧から指定名のaliasを削除します。
 * @param {readonly CommandAlias[]} aliases 削除前alias一覧です。
 * @param {string} aliasName 削除対象alias名です。
 * @returns {readonly CommandAlias[]} 削除後alias一覧です。
 */
export const removeCommandAlias = (
  aliases: readonly CommandAlias[],
  aliasName: string,
): readonly CommandAlias[] => aliases.filter((alias) => alias.name !== aliasName.trim());

/**
 * Command alias一覧を保存可能な形へ正規化します。
 * @param {readonly CommandAlias[]} aliases 正規化対象alias一覧です。
 * @returns {readonly CommandAlias[]} 正規化済みalias一覧です。
 */
export const normalizeCommandAliases = (
  aliases: readonly CommandAlias[],
): readonly CommandAlias[] => {
  let normalizedAliases: readonly CommandAlias[] = [];

  for (const alias of aliases) {
    const trimmedAlias = trimCommandAlias(alias);

    if (isValidCommandAlias(trimmedAlias)) {
      normalizedAliases = upsertCommandAlias(normalizedAliases, trimmedAlias);
    }
  }

  return normalizedAliases;
};

/**
 * CLI入力をcommand名と引数へ分解します。
 * @param {string} input CLI入力です。
 * @returns {SplitCommandInput} 分解済み入力です。
 */
const splitCommandInput = (input: string): SplitCommandInput => {
  const [commandName = emptyString, ...argumentParts] = input.trim().split(whitespacePattern);

  return {
    argumentInput: argumentParts.join(commandTokenSeparator),
    commandName,
  };
};

/**
 * 入力command名に対応するaliasを探します。
 * @param {readonly CommandAlias[]} aliases alias一覧です。
 * @param {string} commandName 入力command名です。
 * @returns {CommandAlias | undefined} 見つかったaliasです。
 */
const findCommandAlias = (
  aliases: readonly CommandAlias[],
  commandName: string,
): CommandAlias | undefined => aliases.find((alias) => alias.name === commandName);

/**
 * 展開後commandへ入力引数を接続します。
 * @param {CommandAlias} alias 展開対象aliasです。
 * @param {string} argumentInput 入力引数です。
 * @returns {string} 展開後CLI入力です。
 */
const appendAliasArgumentInput = (alias: CommandAlias, argumentInput: string): string => {
  if (argumentInput === emptyString) {
    return alias.command;
  }

  return `${alias.command}${commandTokenSeparator}${argumentInput}`;
};

/**
 * CLI入力の先頭command tokenをalias展開します。
 * @param {string} input CLI入力です。
 * @param {readonly CommandAlias[]} aliases alias一覧です。
 * @returns {string} alias展開後入力です。該当aliasがなければ元入力です。
 */
export const expandCommandAlias = (input: string, aliases: readonly CommandAlias[]): string => {
  const splitInput = splitCommandInput(input);
  const alias = findCommandAlias(normalizeCommandAliases(aliases), splitInput.commandName);

  if (!alias) {
    return input;
  }

  return appendAliasArgumentInput(alias, splitInput.argumentInput);
};
