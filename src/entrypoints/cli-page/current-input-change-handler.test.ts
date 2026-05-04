import {
  createCurrentInputChangeHandler,
  createSelectedResultClearHandler,
  createSelectedSuggestionClearHandler,
} from "./current-input-change-handler";
import { describe, expect, it } from "vitest";

/** 入力値fixtureです。 */
const inputValue = "mkdir /project";

/** Result cursor解除event fixtureです。 */
const resultCursorClearEvent = "result:cleared";

/** Suggestion cursor解除event fixtureです。 */
const suggestionCursorClearEvent = "suggestion:cleared";

/** 入力変更eventの記録です。 */
interface CurrentInputChangeRecorder {
  /** 入力変更event一覧です。 */
  readonly events: readonly string[];
  /** 入力値変更handlerです。 */
  readonly handleInputChange: (value: string) => void;
}

/**
 * 入力変更eventを記録するfixtureを作ります。
 * @returns {CurrentInputChangeRecorder} 入力変更eventの記録です。
 */
const createCurrentInputChangeRecorder = (): CurrentInputChangeRecorder => {
  const events: string[] = [];

  /**
   * 入力値更新eventを記録します。
   * @param {string} value 入力値です。
   * @returns {void} 返り値なし。
   */
  const recordInputValue = (value: string): void => {
    events.push(value);
  };

  /**
   * Result cursor解除eventを記録します。
   * @returns {void} 返り値なし。
   */
  const recordResultCursorClear = (): void => {
    events.push(resultCursorClearEvent);
  };

  /**
   * Suggestion cursor解除eventを記録します。
   * @returns {void} 返り値なし。
   */
  const recordSuggestionCursorClear = (): void => {
    events.push(suggestionCursorClearEvent);
  };

  const handleInputChange = createCurrentInputChangeHandler({
    clearSelectedResultIndex: createSelectedResultClearHandler(recordResultCursorClear),
    clearSelectedSuggestionIndex: createSelectedSuggestionClearHandler(recordSuggestionCursorClear),
    setInputValue: recordInputValue,
  });

  return {
    events,
    handleInputChange,
  };
};

/**
 * 手入力時に入力値を更新し、選択中cursorを解除することを検証します。
 * @returns {void} 返り値なし。
 */
const testUpdatesInputValueAndClearsSelectedCursors = (): void => {
  const recorder = createCurrentInputChangeRecorder();

  recorder.handleInputChange(inputValue);

  expect(recorder.events).toStrictEqual([
    inputValue,
    resultCursorClearEvent,
    suggestionCursorClearEvent,
  ]);
};

/** Current input change handlerのテストスイートです。 */
describe("createCurrentInputChangeHandler", (): void => {
  it(
    "updates input value and clears selected cursors",
    testUpdatesInputValueAndClearsSelectedCursors,
  );
});
