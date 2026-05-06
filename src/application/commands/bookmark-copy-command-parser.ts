import type { CopyBookmarkCommand, CopyBookmarkValueKind } from "./bookmark-command-types";

/** Copy command kindです。 */
const copyCommandKind = "copy";

/** URL copy optionです。 */
const urlCopyOption = "--url";

/** Path copy optionです。 */
const pathCopyOption = "--path";

/** Title copy optionです。 */
const titleCopyOption = "--title";

/** 空文字です。 */
const emptyString = "";

/** Command token separatorです。 */
const commandTokenSeparator = " ";

/** Copy commandの初期value kindです。 */
const defaultCopyValueKind = "default" satisfies CopyBookmarkValueKind;

/**
 * Copy command parse stateです。
 */
interface CopyCommandParseState {
  /** 対象入力token一覧です。 */
  readonly targetTokens: readonly string[];
  /** Copyする値種別です。 */
  readonly valueKind: CopyBookmarkValueKind;
}

/** Copy command parse stateの初期値です。 */
const initialCopyCommandParseState = {
  targetTokens: [],
  valueKind: defaultCopyValueKind,
} as const satisfies CopyCommandParseState;

/**
 * Copy option tokenをvalue kindへ変換します。
 * @param {string} token 判定対象tokenです。
 * @returns {CopyBookmarkValueKind | false} 対応するvalue kindです。
 */
const parseCopyValueKindOption = (token: string): CopyBookmarkValueKind | false => {
  if (token === urlCopyOption) {
    return "url";
  }

  if (token === pathCopyOption) {
    return "path";
  }

  if (token === titleCopyOption) {
    return "title";
  }

  return false;
};

/**
 * Copy command parse stateへtokenを反映します。
 * @param {CopyCommandParseState} state 反映前stateです。
 * @param {string} token 反映するtokenです。
 * @returns {CopyCommandParseState} 反映後stateです。
 */
const applyCopyCommandToken = (
  state: CopyCommandParseState,
  token: string,
): CopyCommandParseState => {
  const valueKind = parseCopyValueKindOption(token);

  if (valueKind !== false) {
    return {
      ...state,
      valueKind,
    };
  }

  return {
    ...state,
    targetTokens: [...state.targetTokens, token],
  };
};

/**
 * Copy command parse stateを作ります。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {CopyCommandParseState} parse stateです。
 */
const createCopyCommandParseState = (queryParts: readonly string[]): CopyCommandParseState => {
  let state: CopyCommandParseState = initialCopyCommandParseState;

  for (const token of queryParts) {
    state = applyCopyCommandToken(state, token);
  }

  return state;
};

/**
 * Target token一覧を入力文字列へ戻します。
 * @param {readonly string[]} targetTokens target token一覧です。
 * @returns {string} target入力です。
 */
const joinTargetTokens = (targetTokens: readonly string[]): string =>
  targetTokens.join(commandTokenSeparator);

/**
 * Copy commandを解析します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {CopyBookmarkCommand} Copy commandです。
 * @example
 * ```ts
 * const result = parseCopyBookmarkCommand(["--path", "1"]);
 * // { kind: "copy", targetInput: "1", valueKind: "path" }
 * ```
 */
export const parseCopyBookmarkCommand = (queryParts: readonly string[]): CopyBookmarkCommand => {
  const state = createCopyCommandParseState(queryParts);

  return {
    kind: copyCommandKind,
    targetInput: joinTargetTokens(state.targetTokens) || emptyString,
    valueKind: state.valueKind,
  };
};
