import type { Dispatch, SetStateAction } from "react";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";

/** Command state setter。 */
type CommandStateSetter = Dispatch<SetStateAction<BookmarkCliCommandState>>;

/** Command実行失敗handler。 */
export type CommandExecutionErrorHandler = () => void;

/** Command実行関数。 */
export type ExecuteCurrentCommand = () => Promise<void>;

/** 失敗state作成関数。 */
type FailedCommandStateCreator = (currentState: BookmarkCliCommandState) => BookmarkCliCommandState;

/**
 * Command実行失敗handlerを作成。
 * @param {CommandStateSetter} setCommandState command state setter。
 * @param {FailedCommandStateCreator} createFailedState 失敗state作成関数。
 * @returns {CommandExecutionErrorHandler} Command実行失敗handler。
 */
export const createCommandExecutionErrorHandler = (
  setCommandState: CommandStateSetter,
  createFailedState: FailedCommandStateCreator,
): CommandExecutionErrorHandler => {
  /**
   * Command実行失敗をstatusへ反映。
   * @returns {void} 返り値なし。
   */
  const handleCommandExecutionError = (): void => {
    setCommandState(createFailedState);
  };

  return handleCommandExecutionError;
};

/**
 * Submit handlerを作成。
 * @param {ExecuteCurrentCommand} executeCurrentCommand 現在command実行関数。
 * @param {CommandExecutionErrorHandler} handleError command実行失敗handler。
 * @returns {() => void} Submit handler。
 */
export const createSubmitHandler = (
  executeCurrentCommand: ExecuteCurrentCommand,
  handleError: CommandExecutionErrorHandler,
): (() => void) => {
  /**
   * Submit操作を非同期command実行へ接続。
   * @returns {void} 返り値なし。
   */
  const handleSubmit = (): void => {
    executeCurrentCommand().catch(handleError);
  };

  return handleSubmit;
};
