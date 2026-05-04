import type {
  AliasBookmarkCommand,
  UnaliasBookmarkCommand,
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
import { updateCommandAliases } from "../../domain/storage/extension-state";

/** Alias list status textです。 */
const aliasListStatusText = "aliases";

/** Alias未設定status textです。 */
const noAliasesStatusText = "No aliases";

/** Alias設定失敗status prefixです。 */
const invalidAliasStatusPrefix = "Invalid alias";

/** Alias未検出status prefixです。 */
const aliasNotFoundStatusPrefix = "Alias not found";

/** Help resultのfolder path表示です。 */
const aliasResultFolderPath = "/";

/** Alias result item kindです。 */
const aliasResultKind = "help";

/** 空のalias名です。 */
const emptyAliasName = "";

/** 空のalias件数です。 */
const emptyAliasCount = 0;

/**
 * Alias表示文字列を作ります。
 * @param {string} aliasName alias名です。
 * @param {string} commandInput 展開後command入力です。
 * @returns {string} alias表示文字列です。
 */
const createAliasDisplayText = (aliasName: string, commandInput: string): string =>
  `alias ${aliasName}='${commandInput}'`;

/**
 * Alias一覧status textを作ります。
 * @param {number} aliasCount alias件数です。
 * @returns {string} Alias一覧status textです。
 */
const createAliasListStatusText = (aliasCount: number): string => {
  if (aliasCount === emptyAliasCount) {
    return noAliasesStatusText;
  }

  return `${String(aliasCount)} ${aliasListStatusText}`;
};

/**
 * Alias result itemを作ります。
 * @param {CommandAlias} alias command aliasです。
 * @returns {BookmarkCliResultItem} Alias result itemです。
 */
const createAliasResultItem = (alias: CommandAlias): BookmarkCliResultItem => ({
  description: alias.command,
  details: [createAliasDisplayText(alias.name, alias.command)],
  folderPath: aliasResultFolderPath,
  kind: aliasResultKind,
  title: alias.name,
});

/**
 * Alias一覧を表示します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
const executeAliasListCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const { commandAliases } = dependencies.extensionState.settings;

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: commandAliases.map((alias) => createAliasResultItem(alias)),
    statusText: createAliasListStatusText(commandAliases.length),
  });
};

/**
 * Aliasが保存されたか判定します。
 * @param {BookmarkCliCommandState} state alias設定後stateです。
 * @param {AliasBookmarkCommand} command Alias commandです。
 * @returns {boolean} 保存済みならtrueです。
 */
const hasSavedAlias = (state: BookmarkCliCommandState, command: AliasBookmarkCommand): boolean =>
  state.extensionState.settings.commandAliases.some(
    (alias) => alias.name === command.aliasName && alias.command === command.commandInput,
  );

/**
 * Alias設定commandを実行します。
 * @param {AliasBookmarkCommand} command Alias commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
const executeAliasSetCommand = (
  command: AliasBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const nextExtensionState = updateCommandAliases(
    dependencies.extensionState,
    upsertCommandAlias(dependencies.extensionState.settings.commandAliases, {
      command: command.commandInput,
      name: command.aliasName,
    }),
  );
  const nextState = createEmptyResultState(
    { ...dependencies, extensionState: nextExtensionState },
    createAliasDisplayText(command.aliasName, command.commandInput),
  );

  if (!hasSavedAlias(nextState, command)) {
    return createEmptyResultState(
      dependencies,
      `${invalidAliasStatusPrefix}: ${command.aliasName}`,
    );
  }

  return nextState;
};

/**
 * Alias commandを実行します。
 * @param {AliasBookmarkCommand} command Alias commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeAliasCommand = (
  command: AliasBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (command.operation === "list") {
    return executeAliasListCommand(dependencies);
  }

  return executeAliasSetCommand(command, dependencies);
};

/**
 * Alias名に対応するaliasが存在するか判定します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {string} aliasName alias名です。
 * @returns {boolean} 存在するならtrueです。
 */
const hasAliasName = (dependencies: BookmarkCliCommandDependencies, aliasName: string): boolean =>
  dependencies.extensionState.settings.commandAliases.some((alias) => alias.name === aliasName);

/**
 * Unalias commandを実行します。
 * @param {UnaliasBookmarkCommand} command Unalias commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeUnaliasCommand = (
  command: UnaliasBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (command.aliasName === emptyAliasName || !hasAliasName(dependencies, command.aliasName)) {
    return createEmptyResultState(
      dependencies,
      `${aliasNotFoundStatusPrefix}: ${command.aliasName}`,
    );
  }

  return createEmptyResultState(
    {
      ...dependencies,
      extensionState: updateCommandAliases(
        dependencies.extensionState,
        removeCommandAlias(dependencies.extensionState.settings.commandAliases, command.aliasName),
      ),
    },
    `unalias ${command.aliasName}`,
  );
};
