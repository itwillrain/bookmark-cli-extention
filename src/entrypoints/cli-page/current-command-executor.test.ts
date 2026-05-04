import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";
import { describe, expect, it } from "vitest";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-command-state";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { SetStateAction } from "react";
import { createCurrentCommandExecutor } from "./current-command-executor";
import { createInitialExtensionState } from "../../domain/storage/extension-state";
import { currentDirectoryRoot } from "../../domain/bookmarks/current-directory";

/** Clear command入力。 */
const clearInputValue = "clear";

/** Clear command alias入力。 */
const clearAliasInputValue = "c";

/** Find command入力。 */
const findInputValue = "find stripe";

/** Entry id fixture。 */
const entryId = "entry-1";

/** Ready status text。 */
const readyStatusText = "Ready";

/** 空入力値。 */
const emptyInputValue = "";

/** 呼び出しなしの件数。 */
const noCallCount = 0;

/** 1回の呼び出し件数。 */
const singleCallCount = 1;

/** 起動元tab ID fixture。 */
const launchContextTabId = 1;

/** CLI起動元タブcontext fixture。 */
const launchContext = {
  tabId: launchContextTabId,
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies LaunchContext;

/** 初期command state fixture。 */
const commandState = {
  currentDirectory: currentDirectoryRoot,
  extensionState: createInitialExtensionState(),
  lastResultEntries: [],
  resultItems: [],
  statusText: readyStatusText,
} satisfies BookmarkCliCommandState;

/** Clear alias設定済みcommand state fixture。 */
const clearAliasedCommandState = {
  ...commandState,
  extensionState: {
    ...commandState.extensionState,
    settings: {
      ...commandState.extensionState.settings,
      commandAliases: [{ command: "clear", name: "c" }],
    },
  },
} satisfies BookmarkCliCommandState;

/** 実行結果command state fixture。 */
const nextCommandState = {
  ...commandState,
  statusText: "1 candidate",
} satisfies BookmarkCliCommandState;

/**
 * State setter呼び出しを記録するfixture。
 */
interface CurrentCommandExecutorRecording {
  /** Transcript追加呼び出し。 */
  readonly appendedInputs: readonly string[];
  /** Transcript clear呼び出し回数。 */
  readonly clearCount: number;
  /** Input value setter呼び出し。 */
  readonly inputValues: readonly string[];
  /** Result cursor setter呼び出し。 */
  readonly resultCursorValues: readonly ResultCursorIndex[];
  /** Command state setter呼び出し。 */
  readonly states: readonly BookmarkCliCommandState[];
}

/**
 * Current command executorの記録fixture。
 */
class CurrentCommandExecutorRecorder {
  /** Transcript追加呼び出し。 */
  public readonly appendedInputs: string[] = [];

  /** Transcript clear呼び出し回数。 */
  public clearCount = noCallCount;

  /** Input value setter呼び出し。 */
  public readonly inputValues: string[] = [];

  /** Result cursor setter呼び出し。 */
  public readonly resultCursorValues: ResultCursorIndex[] = [];

  /** Command state setter呼び出し。 */
  public readonly states: BookmarkCliCommandState[] = [];

  /**
   * 実行済みcommandを記録。
   * @param {string} submittedInputValue 実行入力。
   * @returns {void} 返り値なし。
   */
  public appendExecutedCommand = (submittedInputValue: string): void => {
    this.appendedInputs.push(submittedInputValue);
  };

  /**
   * Transcript clearを記録。
   * @returns {void} 返り値なし。
   */
  public clearExecutedCommands = (): void => {
    this.clearCount += singleCallCount;
  };

  /**
   * Command state更新を記録。
   * @param {SetStateAction<BookmarkCliCommandState>} value Command state setter value。
   * @returns {void} 返り値なし。
   */
  public setCommandState = (value: SetStateAction<BookmarkCliCommandState>): void => {
    if (typeof value !== "function") {
      this.states.push(value);
    }
  };

  /**
   * Input value更新を記録。
   * @param {SetStateAction<string>} value Input value setter value。
   * @returns {void} 返り値なし。
   */
  public setInputValue = (value: SetStateAction<string>): void => {
    if (typeof value === "string") {
      this.inputValues.push(value);
    }
  };

  /**
   * Result cursor更新を記録。
   * @param {SetStateAction<ResultCursorIndex>} value Result cursor setter value。
   * @returns {void} 返り値なし。
   */
  public setSelectedResultIndex = (value: SetStateAction<ResultCursorIndex>): void => {
    if (typeof value !== "function") {
      this.resultCursorValues.push(value);
    }
  };

  /**
   * 読み取り専用snapshotへ変換。
   * @returns {CurrentCommandExecutorRecording} 記録snapshot。
   */
  public toSnapshot = (): CurrentCommandExecutorRecording => ({
    appendedInputs: this.appendedInputs,
    clearCount: this.clearCount,
    inputValues: this.inputValues,
    resultCursorValues: this.resultCursorValues,
    states: this.states,
  });
}

/**
 * Entry idを返す。
 * @returns {string} Entry id。
 */
const createEntryId = (): string => entryId;

/**
 * Command実行結果を返す。
 * @returns {Promise<BookmarkCliCommandState>} 実行結果state。
 */
const executeAndPersistCommand = async (): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  return nextCommandState;
};

/**
 * Current command executorの記録fixtureを作成。
 * @param {string} inputValue CLI入力値。
 * @param {BookmarkCliCommandState} currentCommandState 実行前command state。
 * @returns {Readonly<CurrentCommandExecutorRecording>} 記録fixture。
 */
const createRecording = async (
  inputValue: string,
  currentCommandState: BookmarkCliCommandState = commandState,
): Promise<Readonly<CurrentCommandExecutorRecording>> => {
  const recorder = new CurrentCommandExecutorRecorder();
  const executor = createCurrentCommandExecutor({
    appendExecutedCommand: recorder.appendExecutedCommand,
    clearExecutedCommands: recorder.clearExecutedCommands,
    commandState: currentCommandState,
    createEntryId,
    executeAndPersistCommand,
    inputValue,
    launchContext,
    setCommandState: recorder.setCommandState,
    setInputValue: recorder.setInputValue,
    setSelectedResultIndex: recorder.setSelectedResultIndex,
  });

  await executor();

  return recorder.toSnapshot();
};

/**
 * Current command executorのテストスイート。
 */
describe("createCurrentCommandExecutor", (): void => {
  /**
   * 通常commandはtranscriptへ追加することを検証。
   */
  it("appends executed command to transcript", async (): Promise<void> => {
    const recording = await createRecording(findInputValue);

    expect(recording.appendedInputs).toStrictEqual([findInputValue]);
    expect(recording.clearCount).toBe(noCallCount);
    expect(recording.states).toStrictEqual([nextCommandState]);
    expect(recording.inputValues).toStrictEqual([emptyInputValue]);
    expect(recording.resultCursorValues).toStrictEqual([resultCursorCleared]);
  });

  /**
   * Clear commandはtranscript追加ではなくtranscript削除を行うことを検証。
   */
  it("clears transcript for clear command", async (): Promise<void> => {
    const recording = await createRecording(clearInputValue);

    expect(recording.appendedInputs).toStrictEqual([]);
    expect(recording.clearCount).toBe(singleCallCount);
    expect(recording.states).toStrictEqual([nextCommandState]);
    expect(recording.inputValues).toStrictEqual([emptyInputValue]);
    expect(recording.resultCursorValues).toStrictEqual([resultCursorCleared]);
  });

  /**
   * Clear alias commandもtranscript削除を行うことを検証。
   */
  it("clears transcript for clear command alias", async (): Promise<void> => {
    const recording = await createRecording(clearAliasInputValue, clearAliasedCommandState);

    expect(recording.appendedInputs).toStrictEqual([]);
    expect(recording.clearCount).toBe(singleCallCount);
    expect(recording.states).toStrictEqual([nextCommandState]);
    expect(recording.inputValues).toStrictEqual([emptyInputValue]);
    expect(recording.resultCursorValues).toStrictEqual([resultCursorCleared]);
  });
});
