import type { Dispatch, SetStateAction } from "react";
import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-command-state";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import { expandCommandAlias } from "../../domain/cli/command-alias";
import { parseBookmarkCommand } from "../../application/commands/bookmark-command-parser";

/** Command state setter。 */
type CommandStateSetter = Dispatch<SetStateAction<BookmarkCliCommandState>>;

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Command実行と永続化を行う関数。 */
type ExecuteAndPersistCommand = (
  inputValue: string,
  commandState: BookmarkCliCommandState,
  launchContext: LaunchContext | undefined,
) => Promise<BookmarkCliCommandState>;

/** 実行済みcommandをtranscriptへ追加する関数。 */
type ExecutedCommandAppender = (
  inputValue: string,
  commandState: BookmarkCliCommandState,
  entryId: string,
) => void;

/** Entry id生成関数。 */
type EntryIdFactory = () => string;

/** 実行済みcommandを削除する関数。 */
type ExecutedCommandClearer = () => void;

/**
 * Current command executor作成入力。
 */
export interface CreateCurrentCommandExecutorInput {
  /** 実行済みcommandをtranscriptへ追加する関数。 */
  readonly appendExecutedCommand: ExecutedCommandAppender;
  /** 実行済みcommand transcriptを削除する関数。 */
  readonly clearExecutedCommands: ExecutedCommandClearer;
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** Command実行と永続化を行う関数。 */
  readonly executeAndPersistCommand: ExecuteAndPersistCommand;
  /** Entry id生成関数。 */
  readonly createEntryId: EntryIdFactory;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** CLI起動元タブcontext。 */
  readonly launchContext: LaunchContext | undefined;
  /** Command state setter。 */
  readonly setCommandState: CommandStateSetter;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
  /** Result cursor setter。 */
  readonly setSelectedResultIndex: ResultCursorSetter;
}

/**
 * 任意のcommand入力値を実行するexecutor作成入力。
 */
export type CreateCommandInputExecutorInput = Omit<CreateCurrentCommandExecutorInput, "inputValue">;

/** Command入力値を実行する関数。 */
export type CommandInputExecutor = (inputValue: string) => Promise<void>;

/** 実行後の空入力値。 */
const emptyInputValue = "";

/**
 * 入力がtranscript clear commandか判定。
 * @param {string} inputValue CLI入力値。
 * @param {readonly CommandAlias[]} commandAliases command alias一覧。
 * @returns {boolean} Transcript clear commandならtrue。
 */
const isTranscriptClearCommand = (
  inputValue: string,
  commandAliases: BookmarkCliCommandState["extensionState"]["settings"]["commandAliases"],
): boolean => parseBookmarkCommand(expandCommandAlias(inputValue, commandAliases)).kind === "clear";

/**
 * 指定されたcommand入力を実行する関数を作成。
 * @param {CreateCommandInputExecutorInput} input Command input executor作成入力。
 * @returns {CommandInputExecutor} Command input executor。
 */
export const createCommandInputExecutor = (
  input: CreateCommandInputExecutorInput,
): CommandInputExecutor => {
  /**
   * 指定されたcommand入力を実行。
   * @param {string} submittedInputValue 実行するcommand入力値。
   * @returns {Promise<void>} 実行完了を表すPromise。
   */
  const executeCommandInput = async (submittedInputValue: string): Promise<void> => {
    const nextState = await input.executeAndPersistCommand(
      submittedInputValue,
      input.commandState,
      input.launchContext,
    );

    input.setCommandState(nextState);

    if (
      isTranscriptClearCommand(
        submittedInputValue,
        input.commandState.extensionState.settings.commandAliases,
      )
    ) {
      input.clearExecutedCommands();
    } else {
      input.appendExecutedCommand(submittedInputValue, nextState, input.createEntryId());
    }

    input.setInputValue(emptyInputValue);
    input.setSelectedResultIndex(resultCursorCleared);
  };

  return executeCommandInput;
};

/**
 * 現在入力中のcommandを実行する関数を作成。
 * @param {CreateCurrentCommandExecutorInput} input Current command executor作成入力。
 * @returns {() => Promise<void>} Current command executor。
 */
export const createCurrentCommandExecutor = (
  input: CreateCurrentCommandExecutorInput,
): (() => Promise<void>) => {
  const executeCommandInput = createCommandInputExecutor(input);

  /**
   * 現在入力中のcommandを実行。
   * @returns {Promise<void>} 実行完了を表すPromise。
   */
  const executeCurrentCommand = async (): Promise<void> => {
    await executeCommandInput(input.inputValue);
  };

  return executeCurrentCommand;
};
