import { type CommandExecutionErrorHandler, createSubmitHandler } from "./app-command-handlers";
import {
  type CreateCurrentCommandExecutorInput,
  createCurrentCommandExecutor,
} from "./current-command-executor";

/** Submit handler作成入力。 */
export interface CreateCurrentSubmitCommandInput extends CreateCurrentCommandExecutorInput {
  /** Command実行失敗handler。 */
  readonly handleCommandExecutionError: CommandExecutionErrorHandler;
}

/**
 * Current command executorをsubmit handlerへ接続。
 * @param {CreateCurrentSubmitCommandInput} input Submit handler作成入力。
 * @returns {() => void} Submit handler。
 */
export const createCurrentSubmitCommand = (
  input: CreateCurrentSubmitCommandInput,
): (() => void) => {
  const { handleCommandExecutionError, ...executorInput } = input;

  return createSubmitHandler(
    createCurrentCommandExecutor(executorInput),
    handleCommandExecutionError,
  );
};
