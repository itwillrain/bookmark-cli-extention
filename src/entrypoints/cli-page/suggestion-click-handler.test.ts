import {
  createBookmarkCliSuggestionClickHandler,
  resolveSuggestionCompletionValue,
} from "./suggestion-click-handler";
import { describe, expect, it } from "vitest";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import { completionCursorCleared } from "../../domain/cli/completion-cursor";
import { resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** Rm command向けsuggestion fixture。 */
const removeSuggestionItem = {
  commandName: "./Stripe Dashboard",
  completion: "rm ./Stripe Dashboard",
  description: "https://dashboard.stripe.com/",
} satisfies BookmarkCliSuggestionItem;

/** 入力へ反映されるべきrm command。 */
const expectedRemoveCompletion = "rm ./Stripe Dashboard";

/** Setter呼び出し値を保持するtest helper。 */
interface CapturedSetter<Value> {
  /** Setter helper。 */
  readonly setValue: (value: Value) => void;
  /** 保存済みsetter呼び出し値。 */
  readonly values: readonly Value[];
}

/**
 * Setter呼び出し値を保存できるtest helperを作成。
 * @returns {CapturedSetter<Value>} Captured setter helper。
 */
const createCapturedSetter = <Value>(): CapturedSetter<Value> => {
  const values: Value[] = [];

  /**
   * Setter呼び出し値を保存する。
   * @param {Value} value 呼び出し値。
   * @returns {void} 返り値なし。
   */
  const setValue = (value: Value): void => {
    values.push(value);
  };

  return {
    setValue,
    values,
  };
};

/**
 * Suggestion click handlerのテストスイート。
 */
describe("createBookmarkCliSuggestionClickHandler", (): void => {
  /**
   * 表示名ではなくcompletionを入力へ反映することを検証。
   */
  it("uses the full completion instead of the displayed command name", (): void => {
    const inputCapture = createCapturedSetter<string>();
    const resultCursorCapture = createCapturedSetter<unknown>();
    const suggestionCursorCapture = createCapturedSetter<unknown>();
    const handleSuggestionClick = createBookmarkCliSuggestionClickHandler({
      setInputValue: inputCapture.setValue,
      setSelectedResultIndex: resultCursorCapture.setValue,
      setSelectedSuggestionIndex: suggestionCursorCapture.setValue,
    });

    handleSuggestionClick(removeSuggestionItem);

    expect(inputCapture.values).toEqual([expectedRemoveCompletion]);
    expect(resultCursorCapture.values).toEqual([resultCursorCleared]);
    expect(suggestionCursorCapture.values).toEqual([completionCursorCleared]);
  });
});

/**
 * ResolveSuggestionCompletionValueのテストスイート。
 */
describe("resolveSuggestionCompletionValue", (): void => {
  /**
   * `rm` path suggestionでもcommand prefixを保持することを検証。
   */
  it("keeps the command prefix for path suggestions", (): void => {
    expect(resolveSuggestionCompletionValue(removeSuggestionItem)).toBe(expectedRemoveCompletion);
  });
});
