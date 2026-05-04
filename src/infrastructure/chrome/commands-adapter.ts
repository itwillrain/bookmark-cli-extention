/**
 * Chrome commands APIが返すcommandの最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/commands#type-Command
 */
export interface ChromeExtensionCommand {
  /** Command説明です。 */
  readonly description?: string | undefined;
  /** Command名です。 */
  readonly name?: string | undefined;
  /** 有効なshortcutです。 */
  readonly shortcut?: string | undefined;
}

/**
 * Chrome commands APIのうちsettings popupが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/commands#method-getAll
 */
export interface ChromeCommandsApi {
  /** 登録済みcommand一覧を取得します。 */
  readonly getAll: () => Promise<readonly ChromeExtensionCommand[]>;
}

/** Shortcut未設定値です。 */
const emptyShortcut = "";

/** Command未検出状態です。 */
const commandMissing = false;

/** 検出したcommandです。 */
type ResolvedChromeCommand = ChromeExtensionCommand | typeof commandMissing;

/** Command shortcut情報です。 */
export interface CommandShortcut {
  /** Shortcutが設定済みかです。 */
  readonly configured: boolean;
  /** Command説明です。 */
  readonly description: string;
  /** Command名です。 */
  readonly name: string;
  /** Shortcut文字列です。 */
  readonly shortcut: string;
}

/**
 * 対象commandを検索します。
 * @param {readonly ChromeExtensionCommand[]} commands command一覧です。
 * @param {string} commandName 対象command名です。
 * @returns {ResolvedChromeCommand} 対象commandです。
 */
const findCommand = (
  commands: readonly ChromeExtensionCommand[],
  commandName: string,
): ResolvedChromeCommand =>
  commands.find((command) => command.name === commandName) ?? commandMissing;

/**
 * Commandからshortcut情報を作ります。
 * @param {string} commandName 対象command名です。
 * @param {ResolvedChromeCommand} command 対象commandです。
 * @returns {CommandShortcut} shortcut情報です。
 */
const createCommandShortcut = (
  commandName: string,
  command: ResolvedChromeCommand,
): CommandShortcut => {
  if (command === commandMissing) {
    return {
      configured: false,
      description: emptyShortcut,
      name: commandName,
      shortcut: emptyShortcut,
    };
  }

  const shortcut = command.shortcut ?? emptyShortcut;

  return {
    configured: shortcut !== emptyShortcut,
    description: command.description ?? emptyShortcut,
    name: command.name ?? commandName,
    shortcut,
  };
};

/** Command shortcut readerです。 */
export interface ChromeCommandShortcutReader {
  /** Command shortcutを読み取ります。 */
  readonly readCommandShortcut: (commandName: string) => Promise<CommandShortcut>;
}

/**
 * Chrome commands APIをshortcut readerへ変換します。
 * @param {ChromeCommandsApi} commandsApi Chrome commands APIです。
 * @returns {ChromeCommandShortcutReader} Command shortcut readerです。
 */
export const createChromeCommandShortcutReader = (
  commandsApi: ChromeCommandsApi,
): ChromeCommandShortcutReader => {
  /**
   * Command shortcutを読み取ります。
   * @param {string} commandName 対象command名です。
   * @returns {Promise<CommandShortcut>} Command shortcut情報です。
   */
  const readCommandShortcut = async (commandName: string): Promise<CommandShortcut> => {
    const commands = await commandsApi.getAll();

    return createCommandShortcut(commandName, findCommand(commands, commandName));
  };

  return { readCommandShortcut };
};
