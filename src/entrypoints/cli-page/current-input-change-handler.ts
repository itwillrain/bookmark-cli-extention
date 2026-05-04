import { completionCursorCleared } from "../../domain/cli/completion-cursor";
import { resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** 入力値setterです。 */
type InputValueSetter = (value: string) => void;

/** Cursor解除handlerです。 */
type CursorClearHandler = () => void;

/** Current input change handler作成入力です。 */
export interface CreateCurrentInputChangeHandlerInput {
  /** 選択中result cursorを解除するhandlerです。 */
  readonly clearSelectedResultIndex: CursorClearHandler;
  /** 選択中suggestion cursorを解除するhandlerです。 */
  readonly clearSelectedSuggestionIndex: CursorClearHandler;
  /** 入力値setterです。 */
  readonly setInputValue: InputValueSetter;
}

/** Current input change handlerです。 */
export type CurrentInputChangeHandler = (value: string) => void;

/**
 * Current input change handlerを作成します。
 * @param {CreateCurrentInputChangeHandlerInput} input Current input change handler作成入力です。
 * @returns {CurrentInputChangeHandler} Current input change handlerです。
 * @example
 * ```ts
 * const handleInputChange = createCurrentInputChangeHandler({
 *   clearSelectedResultIndex,
 *   clearSelectedSuggestionIndex,
 *   setInputValue,
 * });
 *
 * handleInputChange("mkdir /project");
 * ```
 */
export const createCurrentInputChangeHandler =
  (input: CreateCurrentInputChangeHandlerInput): CurrentInputChangeHandler =>
  (value: string): void => {
    input.setInputValue(value);
    input.clearSelectedResultIndex();
    input.clearSelectedSuggestionIndex();
  };

/**
 * Result cursor解除handlerを作成します。
 * @param {(value: typeof resultCursorCleared) => void} setSelectedResultIndex Result cursor setterです。
 * @returns {CursorClearHandler} Result cursor解除handlerです。
 */
export const createSelectedResultClearHandler =
  (setSelectedResultIndex: (value: typeof resultCursorCleared) => void): CursorClearHandler =>
  (): void => {
    setSelectedResultIndex(resultCursorCleared);
  };

/**
 * Suggestion cursor解除handlerを作成します。
 * @param {(value: typeof completionCursorCleared) => void} setSelectedSuggestionIndex Suggestion cursor setterです。
 * @returns {CursorClearHandler} Suggestion cursor解除handlerです。
 */
export const createSelectedSuggestionClearHandler =
  (
    setSelectedSuggestionIndex: (value: typeof completionCursorCleared) => void,
  ): CursorClearHandler =>
  (): void => {
    setSelectedSuggestionIndex(completionCursorCleared);
  };
