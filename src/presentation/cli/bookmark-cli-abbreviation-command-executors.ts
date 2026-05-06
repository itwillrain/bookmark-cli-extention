import type {
  AbbrBookmarkCommand,
  UnabbrBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type CommandAlias,
  removeCommandAlias,
  upsertCommandAlias,
} from "../../domain/cli/command-alias";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import { updateCommandAbbreviations } from "../../domain/storage/extension-state";

/** 単数形abbreviation list status textです。 */
const singularAbbreviationListStatusText = "abbreviation";

/** 複数形abbreviation list status textです。 */
const pluralAbbreviationListStatusText = "abbreviations";

/** Abbreviation未設定status textです。 */
const noAbbreviationsStatusText = "No abbreviations";

/** Abbreviation設定失敗status prefixです。 */
const invalidAbbreviationStatusPrefix = "Invalid abbr";

/** Abbreviation未検出status prefixです。 */
const abbreviationNotFoundStatusPrefix = "Abbr not found";

/** Help resultのfolder path表示です。 */
const abbreviationResultFolderPath = "/";

/** Abbreviation result item kindです。 */
const abbreviationResultKind = "help";

/** 空のabbreviation名です。 */
const emptyAbbreviationName = "";

/** 空のabbreviation件数です。 */
const emptyAbbreviationCount = 0;

/** 単数形abbreviation件数です。 */
const singleAbbreviationCount = 1;

/**
 * Abbreviation表示文字列を作ります。
 * @param {string} abbreviationName abbreviation名です。
 * @param {string} commandInput 展開後command入力です。
 * @returns {string} abbreviation表示文字列です。
 */
const createAbbreviationDisplayText = (abbreviationName: string, commandInput: string): string =>
  `abbr ${abbreviationName}='${commandInput}'`;

/**
 * Abbreviation一覧status textを作ります。
 * @param {number} abbreviationCount abbreviation件数です。
 * @returns {string} Abbreviation一覧status textです。
 */
const createAbbreviationListStatusText = (abbreviationCount: number): string => {
  if (abbreviationCount === emptyAbbreviationCount) {
    return noAbbreviationsStatusText;
  }

  if (abbreviationCount === singleAbbreviationCount) {
    return `${String(abbreviationCount)} ${singularAbbreviationListStatusText}`;
  }

  return `${String(abbreviationCount)} ${pluralAbbreviationListStatusText}`;
};

/**
 * Abbreviation result itemを作ります。
 * @param {CommandAlias} abbreviation command abbreviationです。
 * @returns {BookmarkCliResultItem} Abbreviation result itemです。
 */
const createAbbreviationResultItem = (abbreviation: CommandAlias): BookmarkCliResultItem => ({
  description: abbreviation.command,
  details: [createAbbreviationDisplayText(abbreviation.name, abbreviation.command)],
  folderPath: abbreviationResultFolderPath,
  kind: abbreviationResultKind,
  title: abbreviation.name,
});

/**
 * Abbreviation一覧を表示します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
const executeAbbrListCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const { commandAbbreviations } = dependencies.extensionState.settings;

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: commandAbbreviations.map((abbreviation) =>
      createAbbreviationResultItem(abbreviation),
    ),
    statusText: createAbbreviationListStatusText(commandAbbreviations.length),
  });
};

/**
 * Abbreviationが保存されたか判定します。
 * @param {BookmarkCliCommandState} state abbreviation設定後stateです。
 * @param {AbbrBookmarkCommand} command Abbr commandです。
 * @returns {boolean} 保存済みならtrueです。
 */
const hasSavedAbbreviation = (
  state: BookmarkCliCommandState,
  command: AbbrBookmarkCommand,
): boolean =>
  state.extensionState.settings.commandAbbreviations.some(
    (abbreviation) =>
      abbreviation.name === command.abbreviationName &&
      abbreviation.command === command.commandInput,
  );

/**
 * Abbreviation設定commandを実行します。
 * @param {AbbrBookmarkCommand} command Abbr commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
const executeAbbrSetCommand = (
  command: AbbrBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const nextExtensionState = updateCommandAbbreviations(
    dependencies.extensionState,
    upsertCommandAlias(dependencies.extensionState.settings.commandAbbreviations, {
      command: command.commandInput,
      name: command.abbreviationName,
    }),
  );
  const nextState = createEmptyResultState(
    { ...dependencies, extensionState: nextExtensionState },
    createAbbreviationDisplayText(command.abbreviationName, command.commandInput),
  );

  if (!hasSavedAbbreviation(nextState, command)) {
    return createEmptyResultState(
      dependencies,
      `${invalidAbbreviationStatusPrefix}: ${command.abbreviationName}`,
    );
  }

  return nextState;
};

/**
 * Abbr commandを実行します。
 * @param {AbbrBookmarkCommand} command Abbr commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeAbbrCommand = (
  command: AbbrBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (command.operation === "list") {
    return executeAbbrListCommand(dependencies);
  }

  return executeAbbrSetCommand(command, dependencies);
};

/**
 * Abbreviation名に対応するabbreviationが存在するか判定します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {string} abbreviationName abbreviation名です。
 * @returns {boolean} 存在するならtrueです。
 */
const hasAbbreviationName = (
  dependencies: BookmarkCliCommandDependencies,
  abbreviationName: string,
): boolean =>
  dependencies.extensionState.settings.commandAbbreviations.some(
    (abbreviation) => abbreviation.name === abbreviationName,
  );

/**
 * Unabbr commandを実行します。
 * @param {UnabbrBookmarkCommand} command Unabbr commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeUnabbrCommand = (
  command: UnabbrBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (
    command.abbreviationName === emptyAbbreviationName ||
    !hasAbbreviationName(dependencies, command.abbreviationName)
  ) {
    return createEmptyResultState(
      dependencies,
      `${abbreviationNotFoundStatusPrefix}: ${command.abbreviationName}`,
    );
  }

  return createEmptyResultState(
    {
      ...dependencies,
      extensionState: updateCommandAbbreviations(
        dependencies.extensionState,
        removeCommandAlias(
          dependencies.extensionState.settings.commandAbbreviations,
          command.abbreviationName,
        ),
      ),
    },
    `unabbr ${command.abbreviationName}`,
  );
};
