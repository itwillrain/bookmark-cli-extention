import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type MarkCurrentTabInput,
  markCurrentTab,
} from "../../application/bookmarks/mark-bookmark-use-case";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { MarkBookmarkCommand } from "../../application/commands/bookmark-command-parser";
import { createBookmarkCliResultItemsFromEntries } from "./bookmark-cli-view-model";

/** 保存完了status prefix。 */
const markedStatusPrefix = "Marked";

/**
 * 保存完了status textを作成。
 * @param {string} title 保存したBookmark title。
 * @returns {string} 保存完了status text。
 */
const createMarkedStatusText = (title: string): string => `${markedStatusPrefix} ${title}`;

/**
 * Mark use case入力にlaunch contextを必要なときだけ追加。
 * @param {MarkCurrentTabInput} input Mark use case入力。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {MarkCurrentTabInput} launch context反映後の入力。
 */
const addLaunchContextToInput = (
  input: MarkCurrentTabInput,
  dependencies: BookmarkCliCommandDependencies,
): MarkCurrentTabInput => {
  if (!dependencies.launchContext) {
    return input;
  }

  return {
    ...input,
    launchContext: dependencies.launchContext,
  };
};

/**
 * Mark commandを実行。
 * @param {MarkBookmarkCommand} command Mark command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeMarkCommand = async (
  command: MarkBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const input = {
    allowDuplicate: command.allowDuplicate,
    creator: dependencies.creator,
    currentDirectory: dependencies.currentDirectory,
    repository: dependencies.repository,
    targetFolderPathInput: command.targetFolderPathInput,
    titleInput: command.titleInput,
  };
  const result = await markCurrentTab(addLaunchContextToInput(input, dependencies));

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: [result.value.entry],
    resultItems: createBookmarkCliResultItemsFromEntries([result.value.entry]),
    statusText: createMarkedStatusText(result.value.entry.title),
  });
};
