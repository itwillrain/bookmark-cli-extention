/**
 * Command line入力の編集状態。
 */
export interface CommandLineEditState {
  /** 選択範囲の終端index。 */
  readonly selectionEnd: number;
  /** 選択範囲の開始index。 */
  readonly selectionStart: number;
  /** 入力値。 */
  readonly value: string;
}

/** 先頭index。 */
const firstCharacterIndex = 0;

/** 空文字。 */
const emptyString = "";

/** 行末から連続する空白に一致する正規表現。 */
const trailingWhitespacePattern = /\s+$/u;

/** 行末の単語に一致する正規表現。 */
const previousWordTokenPattern = /\S+$/u;

/**
 * Cursor位置を選択範囲なしで表現。
 * @param {string} value 入力値。
 * @param {number} cursorIndex cursor index。
 * @returns {CommandLineEditState} Cursorだけを持つ編集状態。
 */
const createCursorState = (value: string, cursorIndex: number): CommandLineEditState => ({
  selectionEnd: cursorIndex,
  selectionStart: cursorIndex,
  value,
});

/**
 * Cursorを行頭へ移動。
 * @param {CommandLineEditState} state 現在の編集状態。
 * @returns {CommandLineEditState} 行頭へ移動した編集状態。
 * @example
 * ```ts
 * const result = moveCommandLineCursorToStart({ value: "go Stripe", selectionStart: 9, selectionEnd: 9 });
 * // { value: "go Stripe", selectionStart: 0, selectionEnd: 0 }
 * ```
 */
export const moveCommandLineCursorToStart = (state: CommandLineEditState): CommandLineEditState =>
  createCursorState(state.value, firstCharacterIndex);

/**
 * Cursorを行末へ移動。
 * @param {CommandLineEditState} state 現在の編集状態。
 * @returns {CommandLineEditState} 行末へ移動した編集状態。
 * @example
 * ```ts
 * const result = moveCommandLineCursorToEnd({ value: "go Stripe", selectionStart: 0, selectionEnd: 0 });
 * // { value: "go Stripe", selectionStart: 9, selectionEnd: 9 }
 * ```
 */
export const moveCommandLineCursorToEnd = (state: CommandLineEditState): CommandLineEditState =>
  createCursorState(state.value, state.value.length);

/**
 * Cursor以前の入力を削除。
 * @param {CommandLineEditState} state 現在の編集状態。
 * @returns {CommandLineEditState} Cursor以前を削除した編集状態。
 * @example
 * ```ts
 * const result = killCommandLineBeforeCursor({ value: "go Stripe", selectionStart: 3, selectionEnd: 3 });
 * // { value: "Stripe", selectionStart: 0, selectionEnd: 0 }
 * ```
 */
export const killCommandLineBeforeCursor = (state: CommandLineEditState): CommandLineEditState =>
  createCursorState(state.value.slice(state.selectionEnd), firstCharacterIndex);

/**
 * Cursor以後の入力を削除。
 * @param {CommandLineEditState} state 現在の編集状態。
 * @returns {CommandLineEditState} Cursor以後を削除した編集状態。
 * @example
 * ```ts
 * const result = killCommandLineAfterCursor({ value: "go Stripe", selectionStart: 2, selectionEnd: 2 });
 * // { value: "go", selectionStart: 2, selectionEnd: 2 }
 * ```
 */
export const killCommandLineAfterCursor = (state: CommandLineEditState): CommandLineEditState =>
  createCursorState(
    state.value.slice(firstCharacterIndex, state.selectionStart),
    state.selectionStart,
  );

/**
 * Cursor前方の単語を削除。
 * @param {CommandLineEditState} state 現在の編集状態。
 * @returns {CommandLineEditState} 前方単語を削除した編集状態。
 * @example
 * ```ts
 * const result = deleteCommandLinePreviousWord({ value: "go Stripe", selectionStart: 9, selectionEnd: 9 });
 * // { value: "go ", selectionStart: 3, selectionEnd: 3 }
 * ```
 */
export const deleteCommandLinePreviousWord = (
  state: CommandLineEditState,
): CommandLineEditState => {
  const prefix = state.value.slice(firstCharacterIndex, state.selectionStart);
  const suffix = state.value.slice(state.selectionEnd);
  const nextPrefix = prefix
    .replace(trailingWhitespacePattern, emptyString)
    .replace(previousWordTokenPattern, emptyString);

  return createCursorState(`${nextPrefix}${suffix}`, nextPrefix.length);
};
