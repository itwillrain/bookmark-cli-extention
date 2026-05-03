import { type CommandExecutionErrorHandler, createSubmitHandler } from "./app-command-handlers";
import {
  type CommandInputExecutor,
  type CreateCommandInputExecutorInput,
  createCommandInputExecutor,
} from "./current-command-executor";
import type { Dispatch, SetStateAction } from "react";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-command-state";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { ResultCursorIndex } from "../../domain/bookmarks/result-cursor";
import type { UseBookmarkCliTranscriptValue } from "./use-bookmark-cli-transcript";

/** Command state setter。 */
type CommandStateSetter = Dispatch<SetStateAction<BookmarkCliCommandState>>;

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Command実行と永続化を行う関数。 */
type ExecuteAndPersistCommand = CreateCommandInputExecutorInput["executeAndPersistCommand"];

/** Entry id生成関数。 */
type EntryIdFactory = CreateCommandInputExecutorInput["createEntryId"];

/** 現在入力中のcommand submit handler。 */
type SubmitCommandHandler = () => void;

/**
 * App command runtime作成入力です。
 */
export interface CreateAppCommandRuntimeInput {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** Entry id生成関数。 */
  readonly createEntryId: EntryIdFactory;
  /** Command実行と永続化を行う関数。 */
  readonly executeAndPersistCommand: ExecuteAndPersistCommand;
  /** Command実行失敗handler。 */
  readonly handleCommandExecutionError: CommandExecutionErrorHandler;
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
  /** Transcript hook戻り値。 */
  readonly transcript: UseBookmarkCliTranscriptValue;
}

/**
 * App command runtimeです。
 */
export interface AppCommandRuntime {
  /** 任意のcommand入力値を実行する関数。 */
  readonly executeInputValue: CommandInputExecutor;
  /** 現在入力中のcommand submit handler。 */
  readonly submitCommand: SubmitCommandHandler;
}

/**
 * Appから使うcommand実行runtimeを作ります。
 * @param {CreateAppCommandRuntimeInput} input App command runtime作成入力です。
 * @returns {AppCommandRuntime} App command runtimeです。
 */
export const createAppCommandRuntime = (input: CreateAppCommandRuntimeInput): AppCommandRuntime => {
  const executeInputValue = createCommandInputExecutor({
    appendExecutedCommand: input.transcript.appendExecutedCommand,
    clearExecutedCommands: input.transcript.clearExecutedCommands,
    commandState: input.commandState,
    createEntryId: input.createEntryId,
    executeAndPersistCommand: input.executeAndPersistCommand,
    launchContext: input.launchContext,
    setCommandState: input.setCommandState,
    setInputValue: input.setInputValue,
    setSelectedResultIndex: input.setSelectedResultIndex,
  });

  return {
    executeInputValue,
    submitCommand: createSubmitHandler(async (): Promise<void> => {
      await executeInputValue(input.inputValue);
    }, input.handleCommandExecutionError),
  };
};
