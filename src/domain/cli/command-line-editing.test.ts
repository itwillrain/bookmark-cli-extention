import {
  type CommandLineEditState,
  deleteCommandLinePreviousWord,
  killCommandLineAfterCursor,
  killCommandLineBeforeCursor,
  moveCommandLineCursorToEnd,
  moveCommandLineCursorToStart,
} from "./command-line-editing";
import { describe, expect, it } from "vitest";

/** 基本入力値。 */
const inputValue = "find stripe dashboard";

/** Cursorが最初の空白後にあるindex。 */
const afterFirstTokenCursorIndex = 5;

/** Cursorが2つめの空白後にあるindex。 */
const afterSecondTokenCursorIndex = 12;

/**
 * 編集状態を作成。
 * @param {number} selectionStart 選択範囲の開始index。
 * @param {number} selectionEnd 選択範囲の終端index。
 * @returns {CommandLineEditState} 編集状態。
 */
const createEditState = (selectionStart: number, selectionEnd: number): CommandLineEditState => ({
  selectionEnd,
  selectionStart,
  value: inputValue,
});

/**
 * Command line cursor移動のテストスイート。
 */
describe("command line cursor movement", (): void => {
  /**
   * 行頭へ移動できることを検証。
   */
  it("moves cursor to line start", (): void => {
    expect(
      moveCommandLineCursorToStart(
        createEditState(afterFirstTokenCursorIndex, afterFirstTokenCursorIndex),
      ),
    ).toStrictEqual({
      selectionEnd: 0,
      selectionStart: 0,
      value: inputValue,
    });
  });

  /**
   * 行末へ移動できることを検証。
   */
  it("moves cursor to line end", (): void => {
    expect(
      moveCommandLineCursorToEnd(
        createEditState(afterFirstTokenCursorIndex, afterFirstTokenCursorIndex),
      ),
    ).toStrictEqual({
      selectionEnd: inputValue.length,
      selectionStart: inputValue.length,
      value: inputValue,
    });
  });
});

/**
 * Command line kill操作のテストスイート。
 */
describe("command line kill", (): void => {
  /**
   * Cursor以前を削除できることを検証。
   */
  it("kills text before cursor", (): void => {
    expect(
      killCommandLineBeforeCursor(
        createEditState(afterSecondTokenCursorIndex, afterSecondTokenCursorIndex),
      ),
    ).toStrictEqual({
      selectionEnd: 0,
      selectionStart: 0,
      value: "dashboard",
    });
  });

  /**
   * Cursor以後を削除できることを検証。
   */
  it("kills text after cursor", (): void => {
    expect(
      killCommandLineAfterCursor(
        createEditState(afterSecondTokenCursorIndex, afterSecondTokenCursorIndex),
      ),
    ).toStrictEqual({
      selectionEnd: afterSecondTokenCursorIndex,
      selectionStart: afterSecondTokenCursorIndex,
      value: "find stripe ",
    });
  });

  /**
   * Cursor前方の単語を削除できることを検証。
   */
  it("deletes previous word", (): void => {
    expect(
      deleteCommandLinePreviousWord(createEditState(inputValue.length, inputValue.length)),
    ).toStrictEqual({
      selectionEnd: 12,
      selectionStart: 12,
      value: "find stripe ",
    });
  });
});
