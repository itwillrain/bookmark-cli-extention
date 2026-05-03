import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { TagBookmarkCommand } from "../../application/commands/bookmark-command-parser";
import { createBookmarkCliResultItemsFromEntries } from "./bookmark-cli-view-model";
import { tagBookmark } from "../../application/bookmarks/tag-bookmark-use-case";

/** 仮想タグ追加status prefix。 */
const taggedStatusPrefix = "Tagged";

/** 仮想タグ削除status prefix。 */
const untaggedStatusPrefix = "Untagged";

/** Status内のtag区切り文字。 */
const statusTagSeparator = " ";

/**
 * 仮想タグ操作のstatus prefixを取得。
 * @param {boolean} remove 削除操作ならtrue。
 * @returns {string} status prefix。
 */
const getTagStatusPrefix = (remove: boolean): string => {
  if (remove) {
    return untaggedStatusPrefix;
  }

  return taggedStatusPrefix;
};

/**
 * 仮想タグ操作status textを作成。
 * @param {TagBookmarkCommand} command Tag command。
 * @param {string} title 対象Bookmark title。
 * @param {readonly string[]} tags 操作対象tag一覧。
 * @returns {string} status text。
 */
const createTagStatusText = (
  command: TagBookmarkCommand,
  title: string,
  tags: readonly string[],
): string => `${getTagStatusPrefix(command.remove)} ${title}: ${tags.join(statusTagSeparator)}`;

/**
 * Tag commandを実行。
 * @param {TagBookmarkCommand} command Tag command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
export const executeTagCommand = (
  command: TagBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const result = tagBookmark({
    extensionState: dependencies.extensionState,
    lastResultEntries: dependencies.lastResultEntries,
    remove: command.remove,
    tagInputs: command.tagInputs,
    targetInput: command.targetInput,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: result.value.extensionState,
    lastResultEntries: [result.value.entry],
    resultItems: createBookmarkCliResultItemsFromEntries([result.value.entry]),
    statusText: createTagStatusText(command, result.value.entry.title, result.value.tags),
  });
};
