import type { ListDirectoryCommand, ListDirectoryOptions } from "./bookmark-command-types";

/** Ls command種別です。 */
const listDirectoryCommandKind = "ls";

/** Ll alias command名です。 */
const longListDirectoryCommandName = "ll";

/** Command tokenの区切り文字です。 */
const commandTokenSeparator = " ";

/** Short option prefixです。 */
const shortOptionPrefix = "-";

/** Short option prefixの文字数です。 */
const shortOptionPrefixLength = 1;

/** All表示flagです。 */
const allOptionFlag = "a";

/** Long表示flagです。 */
const longOptionFlag = "l";

/** 初期path partsです。 */
const emptyPathParts = [] as const satisfies readonly string[];

/** Ls optionの初期値です。 */
const defaultListDirectoryOptions = {
  all: false,
  long: false,
} as const satisfies ListDirectoryOptions;

/**
 * List command parse stateです。
 */
interface ListDirectoryParseState {
  /** 表示optionです。 */
  readonly options: ListDirectoryOptions;
  /** Pathとして扱うtoken一覧です。 */
  readonly pathParts: readonly string[];
}

/**
 * Command名に対応する初期optionを作ります。
 * @param {string} commandName 入力されたcommand名です。
 * @returns {ListDirectoryOptions} 初期optionです。
 */
const createInitialListDirectoryOptions = (commandName: string): ListDirectoryOptions => ({
  ...defaultListDirectoryOptions,
  long: commandName === longListDirectoryCommandName,
});

/**
 * 初期parse stateを作ります。
 * @param {string} commandName 入力されたcommand名です。
 * @returns {ListDirectoryParseState} 初期parse stateです。
 */
const createInitialListDirectoryParseState = (commandName: string): ListDirectoryParseState => ({
  options: createInitialListDirectoryOptions(commandName),
  pathParts: emptyPathParts,
});

/**
 * Short option flagが対応済みかを判定します。
 * @param {string} flag 判定するflagです。
 * @returns {boolean} 対応済みならtrueです。
 */
const isSupportedListDirectoryOptionFlag = (flag: string): boolean =>
  flag === allOptionFlag || flag === longOptionFlag;

/**
 * Tokenがlsのshort optionかを判定します。
 * @param {string} token 判定するtokenです。
 * @returns {boolean} short optionならtrueです。
 */
const isListDirectoryOptionToken = (token: string): boolean => {
  if (!token.startsWith(shortOptionPrefix) || token.length <= shortOptionPrefixLength) {
    return false;
  }

  for (const flag of token.slice(shortOptionPrefixLength)) {
    if (!isSupportedListDirectoryOptionFlag(flag)) {
      return false;
    }
  }

  return true;
};

/**
 * Short option flagをoptionへ反映します。
 * @param {ListDirectoryOptions} options 反映前optionです。
 * @param {string} flag 反映するflagです。
 * @returns {ListDirectoryOptions} 反映後optionです。
 */
const applyListDirectoryOptionFlag = (
  options: ListDirectoryOptions,
  flag: string,
): ListDirectoryOptions => {
  if (flag === allOptionFlag) {
    return { ...options, all: true };
  }

  if (flag === longOptionFlag) {
    return { ...options, long: true };
  }

  return options;
};

/**
 * Short option tokenをoptionへ反映します。
 * @param {ListDirectoryOptions} options 反映前optionです。
 * @param {string} optionToken option tokenです。
 * @returns {ListDirectoryOptions} 反映後optionです。
 */
const applyListDirectoryOptionToken = (
  options: ListDirectoryOptions,
  optionToken: string,
): ListDirectoryOptions => {
  let currentOptions = options;

  for (const flag of optionToken.slice(shortOptionPrefixLength)) {
    currentOptions = applyListDirectoryOptionFlag(currentOptions, flag);
  }

  return currentOptions;
};

/**
 * Path tokenをparse stateへ追加します。
 * @param {ListDirectoryParseState} state 追加前stateです。
 * @param {string} pathToken 追加するpath tokenです。
 * @returns {ListDirectoryParseState} 追加後stateです。
 */
const appendPathToken = (
  state: ListDirectoryParseState,
  pathToken: string,
): ListDirectoryParseState => ({
  ...state,
  pathParts: [...state.pathParts, pathToken],
});

/**
 * Query tokenをparse stateへ反映します。
 * @param {ListDirectoryParseState} state 反映前stateです。
 * @param {string} token 反映するtokenです。
 * @returns {ListDirectoryParseState} 反映後stateです。
 */
const applyListDirectoryQueryToken = (
  state: ListDirectoryParseState,
  token: string,
): ListDirectoryParseState => {
  if (!isListDirectoryOptionToken(token)) {
    return appendPathToken(state, token);
  }

  return {
    ...state,
    options: applyListDirectoryOptionToken(state.options, token),
  };
};

/**
 * Path partsをpath入力へ変換します。
 * @param {readonly string[]} pathParts path token一覧です。
 * @returns {string} path入力です。
 */
const joinPathParts = (pathParts: readonly string[]): string =>
  pathParts.join(commandTokenSeparator);

/**
 * Ls commandを作ります。
 * @param {string} commandName 入力されたcommand名です。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {ListDirectoryCommand} Ls commandです。
 * @example
 * ```ts
 * const result = parseListDirectoryCommand("ll", ["-a", "./Work"]);
 * // { kind: "ls", options: { all: true, long: true }, pathInput: "./Work" }
 * ```
 */
export const parseListDirectoryCommand = (
  commandName: string,
  queryParts: readonly string[],
): ListDirectoryCommand => {
  let parseState = createInitialListDirectoryParseState(commandName);

  for (const token of queryParts) {
    parseState = applyListDirectoryQueryToken(parseState, token);
  }

  return {
    kind: listDirectoryCommandKind,
    options: parseState.options,
    pathInput: joinPathParts(parseState.pathParts),
  };
};
