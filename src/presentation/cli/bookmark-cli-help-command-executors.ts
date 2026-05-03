import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type BookmarkCliHelpTopic,
  findBookmarkCliHelpTopic,
  listBookmarkCliHelpTopics,
} from "../../application/commands/bookmark-help";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { HelpBookmarkCommand } from "../../application/commands/bookmark-command-parser";

/** Topic一覧表示のstatus text。 */
const helpTopicsStatusText = "Help topics";

/** Topic表示のstatus prefix。 */
const helpTopicStatusPrefix = "Help";

/** Topic未検出のstatus prefix。 */
const helpTopicNotFoundStatusPrefix = "Help topic was not found";

/** Help resultのfolder path表示。 */
const helpResultFolderPath = "/";

/** Usage detailのprefix。 */
const usageDetailPrefix = "usage: ";

/** 空のtopic入力。 */
const emptyTopicInput = "";

/**
 * Usageをresult item詳細tokenへ変換。
 * @param {string} usage Usage表記。
 * @returns {string} Detail token。
 */
const createUsageDetail = (usage: string): string => `${usageDetailPrefix}${usage}`;

/**
 * Help topicをCLI result itemへ変換。
 * @param {BookmarkCliHelpTopic} topic Help topic。
 * @returns {BookmarkCliResultItem} CLI表示item。
 */
const createHelpResultItem = (topic: BookmarkCliHelpTopic): BookmarkCliResultItem => ({
  description: topic.description,
  details: topic.usage.map((usage) => createUsageDetail(usage)),
  folderPath: helpResultFolderPath,
  kind: "help",
  title: topic.commandName,
});

/**
 * Help topic一覧をCLI result itemsへ変換。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧。
 */
const createHelpTopicResultItems = (): readonly BookmarkCliResultItem[] =>
  listBookmarkCliHelpTopics().map((topic) => createHelpResultItem(topic));

/**
 * Help topicのstatus textを作る。
 * @param {BookmarkCliHelpTopic} topic Help topic。
 * @returns {string} Status text。
 */
const createHelpTopicStatusText = (topic: BookmarkCliHelpTopic): string =>
  `${helpTopicStatusPrefix} ${topic.commandName}`;

/**
 * Help topic未検出のstatus textを作る。
 * @param {string} topicInput Help topic入力。
 * @returns {string} Status text。
 */
const createHelpTopicNotFoundStatusText = (topicInput: string): string =>
  `${helpTopicNotFoundStatusPrefix}: ${topicInput}`;

/**
 * Topic一覧help commandを実行。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
const executeHelpTopicsCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState =>
  createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: createHelpTopicResultItems(),
    statusText: helpTopicsStatusText,
  });

/**
 * Topic指定help commandを実行。
 * @param {HelpBookmarkCommand} command Help command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
const executeHelpTopicCommand = (
  command: HelpBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const topic = findBookmarkCliHelpTopic(command.topicInput);

  if (topic === false) {
    return createEmptyResultState(
      dependencies,
      createHelpTopicNotFoundStatusText(command.topicInput),
    );
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: [createHelpResultItem(topic)],
    statusText: createHelpTopicStatusText(topic),
  });
};

/**
 * Help commandを実行。
 * @param {HelpBookmarkCommand} command Help command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
export const executeHelpCommand = (
  command: HelpBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (command.topicInput === emptyTopicInput) {
    return executeHelpTopicsCommand(dependencies);
  }

  return executeHelpTopicCommand(command, dependencies);
};
