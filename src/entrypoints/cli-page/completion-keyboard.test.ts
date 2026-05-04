/* oxlint-disable max-lines -- Keyboard操作fixtureを1ファイルで共有して重複を避けるため。 */

import {
  type CompletionCursorIndex,
  completionCursorCleared,
} from "../../domain/cli/completion-cursor";
import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";
import { describe, expect, it } from "vitest";
import {
  executeConfirmCompletionKeyboardAction,
  executeSelectNextCompletionKeyboardAction,
  executeSelectPreviousCompletionKeyboardAction,
} from "./completion-keyboard";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { CommandInputKeyEvent } from "../../presentation/cli/components/bookmark-cli-screen";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Root directory。 */
const rootDirectory = "/";

/** 選択中result index fixture。 */
const selectedResultIndex = 0;

/** 選択中suggestion index fixture。 */
const selectedSuggestionIndex = 0;

/** 2番目のsuggestion index fixture。 */
const secondSuggestionIndex = 1;

/** 補完前入力値。 */
const initialInputValue = "";

/** 入力中command fixture。 */
const activeInputValue = "go ";

/** 補完後folder入力値。 */
const completedFolderInputValue = "/Work";

/** Selection index fixture。 */
const selectionIndex = 0;

/** Selection range更新の受け皿。 */
const ignoredSelectionRanges: (readonly [number, number])[] = [];

/** PreventDefault呼び出しの受け皿。 */
const ignoredPreventDefaultCalls: number[] = [];

/** 無視するsetState actionの受け皿。 */
const ignoredStateActions: unknown[] = [];

/** 実行入力値の受け皿。 */
const executedInputValues: string[] = [];

/** Command実行失敗記録の受け皿。 */
const commandExecutionErrorCalls: number[] = [];

/** Folder result item fixture。 */
const folderResultItem = {
  folderPath: completedFolderInputValue,
  kind: "folder",
  title: "Work",
} as const;

/** Command suggestion fixture。 */
const suggestionItems = [
  {
    commandName: "find",
    completion: "find ",
    description: "Bookmarkを検索",
  },
  {
    commandName: "go",
    completion: "go ",
    description: "Bookmarkを開く",
  },
] satisfies readonly BookmarkCliSuggestionItem[];

/** Result cursor setState action。 */
type ResultCursorSetStateAction =
  | ResultCursorIndex
  | ((currentIndex: ResultCursorIndex) => ResultCursorIndex);

/** Completion cursor setState action。 */
type CompletionCursorSetStateAction =
  | CompletionCursorIndex
  | ((currentIndex: CompletionCursorIndex) => CompletionCursorIndex);

/** Input value setState action。 */
type InputValueSetStateAction = string | ((currentValue: string) => string);

/**
 * Selection range更新を記録。
 * @param {number} selectionStart selection開始index。
 * @param {number} selectionEnd selection終了index。
 * @returns {void} 返り値なし。
 */
const recordSelectionRange = (selectionStart: number, selectionEnd: number): void => {
  ignoredSelectionRanges.push([selectionStart, selectionEnd]);
};

/**
 * PreventDefault呼び出しを記録。
 * @returns {void} 返り値なし。
 */
const recordPreventDefault = (): void => {
  ignoredPreventDefaultCalls.push(selectionIndex);
};

/**
 * Command state fixtureを作成。
 * @returns {BookmarkCliCommandState} Command state fixture。
 */
const createCommandState = (): BookmarkCliCommandState => ({
  currentDirectory: rootDirectory,
  extensionState: createInitialExtensionState(),
  lastResultEntries: [],
  resultItems: [folderResultItem],
  statusText: "Ready",
});

/**
 * 入力欄key event fixtureを作成。
 * @returns {CommandInputKeyEvent} 入力欄key event fixture。
 */
const createCommandInputKeyEvent = (): CommandInputKeyEvent => ({
  ctrlKey: false,
  currentTarget: {
    selectionEnd: selectionIndex,
    selectionStart: selectionIndex,
    setSelectionRange: recordSelectionRange,
    value: initialInputValue,
  },
  key: "Tab",
  preventDefault: recordPreventDefault,
  shiftKey: false,
});

/**
 * Result cursor updaterかを判定。
 * @param {ResultCursorSetStateAction} action setState action。
 * @returns {boolean} updaterならtrue。
 */
const isResultCursorUpdater = (
  action: ResultCursorSetStateAction,
): action is (currentIndex: ResultCursorIndex) => ResultCursorIndex => typeof action === "function";

/**
 * Completion cursor updaterかを判定。
 * @param {CompletionCursorSetStateAction} action setState action。
 * @returns {boolean} updaterならtrue。
 */
const isCompletionCursorUpdater = (
  action: CompletionCursorSetStateAction,
): action is (currentIndex: CompletionCursorIndex) => CompletionCursorIndex =>
  typeof action === "function";

/**
 * Input value updaterかを判定。
 * @param {InputValueSetStateAction} action setState action。
 * @returns {boolean} updaterならtrue。
 */
const isInputValueUpdater = (
  action: InputValueSetStateAction,
): action is (currentValue: string) => string => typeof action === "function";

/**
 * Result cursor用のReact setState互換setterを作成。
 * @param {() => ResultCursorIndex} getValue 現在値を取得する関数。
 * @param {(value: ResultCursorIndex) => void} setValue 値を保存する関数。
 * @returns {(action: ResultCursorSetStateAction) => void} setter。
 */
const createResultCursorSetter =
  (
    getValue: () => ResultCursorIndex,
    setValue: (value: ResultCursorIndex) => void,
  ): ((action: ResultCursorSetStateAction) => void) =>
  (action): void => {
    if (isResultCursorUpdater(action)) {
      setValue(action(getValue()));

      return;
    }

    setValue(action);
  };

/**
 * Completion cursor用のReact setState互換setterを作成。
 * @param {() => CompletionCursorIndex} getValue 現在値を取得する関数。
 * @param {(value: CompletionCursorIndex) => void} setValue 値を保存する関数。
 * @returns {(action: CompletionCursorSetStateAction) => void} setter。
 */
const createCompletionCursorSetter =
  (
    getValue: () => CompletionCursorIndex,
    setValue: (value: CompletionCursorIndex) => void,
  ): ((action: CompletionCursorSetStateAction) => void) =>
  (action): void => {
    if (isCompletionCursorUpdater(action)) {
      setValue(action(getValue()));

      return;
    }

    setValue(action);
  };

/**
 * Input value用のReact setState互換setterを作成。
 * @param {() => string} getValue 現在値を取得する関数。
 * @param {(value: string) => void} setValue 値を保存する関数。
 * @returns {(action: InputValueSetStateAction) => void} setter。
 */
const createInputValueSetter =
  (getValue: () => string, setValue: (value: string) => void) =>
  (action: InputValueSetStateAction): void => {
    if (isInputValueUpdater(action)) {
      setValue(action(getValue()));

      return;
    }

    setValue(action);
  };

/**
 * 値を保存しないsetState互換setter。
 * @param {unknown} value setState action。
 * @returns {void} 返り値なし。
 */
const ignoreStateAction = (value: unknown): void => {
  ignoredStateActions.push(value);
};

/**
 * Command入力値実行を記録。
 * @param {string} inputValue 実行入力値。
 * @returns {Promise<void>} 記録完了を表すPromise。
 */
const recordExecutedInputValue = async (inputValue: string): Promise<void> => {
  executedInputValues.push(inputValue);
  await Promise.resolve();
};

/**
 * Command実行失敗を記録。
 * @returns {void} 返り値なし。
 */
const recordCommandExecutionError = (): void => {
  commandExecutionErrorCalls.push(selectionIndex);
};

/**
 * Tabでsuggestion候補を選択し、result候補選択を解除することを検証。
 * @returns {void} 返り値なし。
 */
const testSelectsCommandSuggestionBeforeResultItem = (): void => {
  let resultIndex: ResultCursorIndex = selectedResultIndex;
  let suggestionIndex: CompletionCursorIndex = completionCursorCleared;

  const handled = executeSelectNextCompletionKeyboardAction({
    commandState: createCommandState(),
    event: createCommandInputKeyEvent(),
    executeInputValue: recordExecutedInputValue,
    handleCommandExecutionError: recordCommandExecutionError,
    inputValue: initialInputValue,
    selectedResultIndex: resultIndex,
    selectedSuggestionIndex: suggestionIndex,
    setInputValue: ignoreStateAction,
    setSelectedResultIndex: createResultCursorSetter(
      () => resultIndex,
      (value) => {
        resultIndex = value;
      },
    ),
    setSelectedSuggestionIndex: createCompletionCursorSetter(
      () => suggestionIndex,
      (value) => {
        suggestionIndex = value;
      },
    ),
    suggestionItems,
  });

  expect(handled).toBe(true);
  expect(resultIndex).toBe(resultCursorCleared);
  expect(suggestionIndex).toBe(selectedSuggestionIndex);
};

/**
 * Shift+Tabでsuggestion候補を逆方向に選択し、result候補選択を解除することを検証。
 * @returns {void} 返り値なし。
 */
const testSelectsPreviousCommandSuggestionBeforeResultItem = (): void => {
  let resultIndex: ResultCursorIndex = selectedResultIndex;
  let suggestionIndex: CompletionCursorIndex = completionCursorCleared;

  const handled = executeSelectPreviousCompletionKeyboardAction({
    commandState: createCommandState(),
    event: createCommandInputKeyEvent(),
    executeInputValue: recordExecutedInputValue,
    handleCommandExecutionError: recordCommandExecutionError,
    inputValue: initialInputValue,
    selectedResultIndex: resultIndex,
    selectedSuggestionIndex: suggestionIndex,
    setInputValue: ignoreStateAction,
    setSelectedResultIndex: createResultCursorSetter(
      () => resultIndex,
      (value) => {
        resultIndex = value;
      },
    ),
    setSelectedSuggestionIndex: createCompletionCursorSetter(
      () => suggestionIndex,
      (value) => {
        suggestionIndex = value;
      },
    ),
    suggestionItems,
  });

  expect(handled).toBe(true);
  expect(resultIndex).toBe(resultCursorCleared);
  expect(suggestionIndex).toBe(secondSuggestionIndex);
};

/**
 * Enterで入力中のresult候補を入力へ確定し、result候補選択を解除することを検証。
 * @returns {void} 返り値なし。
 */
const testClearsSelectedResultAfterConfirmingResultCompletion = (): void => {
  let inputValue = activeInputValue;
  let resultIndex: ResultCursorIndex = selectedResultIndex;

  const handled = executeConfirmCompletionKeyboardAction({
    commandState: createCommandState(),
    event: createCommandInputKeyEvent(),
    executeInputValue: recordExecutedInputValue,
    handleCommandExecutionError: recordCommandExecutionError,
    inputValue: activeInputValue,
    selectedResultIndex: resultIndex,
    selectedSuggestionIndex: completionCursorCleared,
    setInputValue: createInputValueSetter(
      () => inputValue,
      (value) => {
        inputValue = value;
      },
    ),
    setSelectedResultIndex: createResultCursorSetter(
      () => resultIndex,
      (value) => {
        resultIndex = value;
      },
    ),
    setSelectedSuggestionIndex: ignoreStateAction,
    suggestionItems: [],
  });

  expect(handled).toBe(true);
  expect(inputValue).toBe(completedFolderInputValue);
  expect(resultIndex).toBe(resultCursorCleared);
};

/**
 * Enterで空promptの選択中resultを既定commandとして実行することを検証。
 * @returns {void} 返り値なし。
 */
const testExecutesSelectedResultDefaultCommand = (): void => {
  executedInputValues.length = 0;
  let inputValue = initialInputValue;
  let resultIndex: ResultCursorIndex = selectedResultIndex;

  const handled = executeConfirmCompletionKeyboardAction({
    commandState: createCommandState(),
    event: createCommandInputKeyEvent(),
    executeInputValue: recordExecutedInputValue,
    handleCommandExecutionError: recordCommandExecutionError,
    inputValue: initialInputValue,
    selectedResultIndex: resultIndex,
    selectedSuggestionIndex: completionCursorCleared,
    setInputValue: createInputValueSetter(
      () => inputValue,
      (value) => {
        inputValue = value;
      },
    ),
    setSelectedResultIndex: createResultCursorSetter(
      () => resultIndex,
      (value) => {
        resultIndex = value;
      },
    ),
    setSelectedSuggestionIndex: ignoreStateAction,
    suggestionItems: [],
  });

  expect(handled).toBe(true);
  expect(inputValue).toBe(initialInputValue);
  expect(executedInputValues).toStrictEqual(["cd 1"]);
  expect(resultIndex).toBe(resultCursorCleared);
};

/**
 * Completion keyboard actionのテストスイート。
 */
describe("completion keyboard actions", (): void => {
  it("selects command suggestion before result item", testSelectsCommandSuggestionBeforeResultItem);
  it(
    "selects previous command suggestion before result item",
    testSelectsPreviousCommandSuggestionBeforeResultItem,
  );
  it(
    "clears selected result after confirming result completion",
    testClearsSelectedResultAfterConfirmingResultCompletion,
  );
  it("executes selected result default command", testExecutesSelectedResultDefaultCommand);
});
