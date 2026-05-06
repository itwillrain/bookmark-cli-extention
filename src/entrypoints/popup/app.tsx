/* oxlint-disable max-lines, max-lines-per-function -- Popup設定はReact state wiringをentrypointに集約するため。 */

import { type ReactElement, useEffect, useState } from "react";
import type { CommandAlias } from "../../domain/cli/command-alias";
import { SettingsPopup } from "../../presentation/settings/components/settings-popup";
import { createChromeCommandShortcutReader } from "../../infrastructure/chrome/commands-adapter";
import { createChromeExtensionStateStorage } from "../../infrastructure/chrome/extension-state-storage-adapter";
import { createChromeShortcutSettingsPageOpener } from "../../infrastructure/chrome/shortcut-settings-page-adapter";
import { createOpenCliPageMessage } from "./popup-messages";
import { updateCommandAliases } from "../../domain/storage/extension-state";

/** Dedicated extension pageを開くcommand名です。 */
const openCliPageCommandName = "open-cli-page";

/** 初期shortcut表示です。 */
const initialShortcutLabel = "";

/** 初期alias一覧です。 */
const initialCommandAliases = [] as const satisfies readonly CommandAlias[];

/** 空のalias fixtureです。 */
const emptyCommandAlias = {
  command: "",
  name: "",
} as const satisfies CommandAlias;

/** Abbr保存成功messageです。 */
const aliasSavedStatusText = "Abbrを保存しました";

/** Abbr保存失敗messageです。 */
const aliasSaveFailedStatusText = "Abbrを保存できませんでした";

/** Chrome commands APIを使うshortcut readerです。 */
const shortcutReader = createChromeCommandShortcutReader(browser.commands);

/** Chrome tabs APIを使うshortcut settings openerです。 */
const shortcutSettingsPageOpener = createChromeShortcutSettingsPageOpener(browser);

/** Chrome storage.localを使う拡張状態storageです。 */
const extensionStateStorage = createChromeExtensionStateStorage(browser.storage.local);

/** Alias更新関数です。 */
type CommandAliasUpdater = (alias: CommandAlias) => CommandAlias;

/**
 * Alias一覧の指定indexを更新します。
 * @param {readonly CommandAlias[]} aliases 更新前alias一覧です。
 * @param {number} targetIndex 更新対象indexです。
 * @param {CommandAliasUpdater} updater alias更新関数です。
 * @returns {readonly CommandAlias[]} 更新後alias一覧です。
 */
const updateCommandAliasAt = (
  aliases: readonly CommandAlias[],
  targetIndex: number,
  updater: CommandAliasUpdater,
): readonly CommandAlias[] =>
  aliases.map((alias, aliasIndex) => {
    if (aliasIndex !== targetIndex) {
      return alias;
    }

    return updater(alias);
  });

/**
 * Alias一覧から指定indexを削除します。
 * @param {readonly CommandAlias[]} aliases 削除前alias一覧です。
 * @param {number} targetIndex 削除対象indexです。
 * @returns {readonly CommandAlias[]} 削除後alias一覧です。
 */
const removeCommandAliasAt = (
  aliases: readonly CommandAlias[],
  targetIndex: number,
): readonly CommandAlias[] => {
  const remainingAliases: CommandAlias[] = [];

  for (const [aliasIndex, alias] of aliases.entries()) {
    if (aliasIndex !== targetIndex) {
      remainingAliases.push(alias);
    }
  }

  return remainingAliases;
};

/**
 * Popup失敗を握りつぶします。
 * @returns {void} 返り値なし。
 */
const ignorePopupError = (): void => {
  browser.runtime.getManifest();
};

/**
 * CLI pageをbackground経由で開きます。
 * @returns {Promise<void>} message送信完了Promiseです。
 */
const openCliPage = async (): Promise<void> => {
  await browser.runtime.sendMessage(createOpenCliPageMessage());
};

/** Shortcut settings stateです。 */
interface ShortcutSettingsState {
  /** CLI pageを開くcallbackです。 */
  readonly onOpenCliPage: () => void;
  /** Shortcut設定画面を開くcallbackです。 */
  readonly onOpenShortcutSettings: () => void;
  /** Shortcutが設定済みかです。 */
  readonly shortcutConfigured: boolean;
  /** Shortcut表示文字列です。 */
  readonly shortcutLabel: string;
}

/** Command alias settings stateです。 */
interface CommandAliasSettingsState {
  /** Alias保存状態表示です。 */
  readonly aliasStatusText: string;
  /** Command alias一覧です。 */
  readonly commandAliases: readonly CommandAlias[];
  /** Alias追加callbackです。 */
  readonly onAddAlias: () => void;
  /** Alias command変更callbackです。 */
  readonly onChangeAliasCommand: (index: number, command: string) => void;
  /** Alias name変更callbackです。 */
  readonly onChangeAliasName: (index: number, name: string) => void;
  /** Alias削除callbackです。 */
  readonly onRemoveAlias: (index: number) => void;
  /** Alias保存callbackです。 */
  readonly onSaveAliases: () => void;
}

/**
 * Shortcut settings stateを作ります。
 * @returns {ShortcutSettingsState} Shortcut settings stateです。
 */
const useShortcutSettingsState = (): ShortcutSettingsState => {
  const [shortcutConfigured, setShortcutConfigured] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState(initialShortcutLabel);

  useEffect((): void => {
    shortcutReader
      .readCommandShortcut(openCliPageCommandName)
      .then((shortcut) => {
        setShortcutConfigured(shortcut.configured);
        setShortcutLabel(shortcut.shortcut);
      })
      .catch(ignorePopupError);
  }, []);

  /**
   * Shortcut設定画面を開きます。
   * @returns {void} 返り値なし。
   */
  const handleOpenShortcutSettings = (): void => {
    shortcutSettingsPageOpener.openShortcutSettingsPage().catch(ignorePopupError);
  };

  /**
   * CLI pageを開きます。
   * @returns {void} 返り値なし。
   */
  const handleOpenCliPage = (): void => {
    openCliPage().catch(ignorePopupError);
  };

  return {
    onOpenCliPage: handleOpenCliPage,
    onOpenShortcutSettings: handleOpenShortcutSettings,
    shortcutConfigured,
    shortcutLabel,
  };
};

/**
 * Alias設定を保存します。
 * @param {readonly CommandAlias[]} commandAliases 保存対象alias一覧です。
 * @param {(aliases: readonly CommandAlias[]) => void} setCommandAliases alias setterです。
 * @param {(statusText: string) => void} setAliasStatusText status setterです。
 * @returns {void} 返り値なし。
 */
const saveCommandAliases = (
  commandAliases: readonly CommandAlias[],
  setCommandAliases: (aliases: readonly CommandAlias[]) => void,
  setAliasStatusText: (statusText: string) => void,
): void => {
  extensionStateStorage
    .readExtensionState()
    .then((state) => updateCommandAliases(state, commandAliases))
    .then(async (nextState) => {
      await extensionStateStorage.writeExtensionState(nextState);
      setCommandAliases(nextState.settings.commandAliases);
      setAliasStatusText(aliasSavedStatusText);
    })
    .catch(() => {
      setAliasStatusText(aliasSaveFailedStatusText);
    });
};

/**
 * Command alias settings stateを作ります。
 * @returns {CommandAliasSettingsState} Command alias settings stateです。
 */
const useCommandAliasSettingsState = (): CommandAliasSettingsState => {
  const [aliasStatusText, setAliasStatusText] = useState("");
  const [commandAliases, setCommandAliases] =
    useState<readonly CommandAlias[]>(initialCommandAliases);

  useEffect((): void => {
    extensionStateStorage
      .readExtensionState()
      .then((state) => {
        setCommandAliases(state.settings.commandAliases);
      })
      .catch(ignorePopupError);
  }, []);

  /**
   * Alias行を追加します。
   * @returns {void} 返り値なし。
   */
  const handleAddAlias = (): void => {
    setCommandAliases((currentAliases) => [...currentAliases, emptyCommandAlias]);
    setAliasStatusText("");
  };

  /**
   * Alias nameを更新します。
   * @param {number} aliasIndex alias indexです。
   * @param {string} name alias nameです。
   * @returns {void} 返り値なし。
   */
  const handleChangeAliasName = (aliasIndex: number, name: string): void => {
    setCommandAliases((currentAliases) =>
      updateCommandAliasAt(currentAliases, aliasIndex, (alias) => ({ ...alias, name })),
    );
    setAliasStatusText("");
  };

  /**
   * Alias commandを更新します。
   * @param {number} aliasIndex alias indexです。
   * @param {string} command alias commandです。
   * @returns {void} 返り値なし。
   */
  const handleChangeAliasCommand = (aliasIndex: number, command: string): void => {
    setCommandAliases((currentAliases) =>
      updateCommandAliasAt(currentAliases, aliasIndex, (alias) => ({ ...alias, command })),
    );
    setAliasStatusText("");
  };

  /**
   * Alias行を削除します。
   * @param {number} aliasIndex alias indexです。
   * @returns {void} 返り値なし。
   */
  const handleRemoveAlias = (aliasIndex: number): void => {
    setCommandAliases((currentAliases) => removeCommandAliasAt(currentAliases, aliasIndex));
    setAliasStatusText("");
  };

  /**
   * Alias設定を保存します。
   * @returns {void} 返り値なし。
   */
  const handleSaveAliases = (): void => {
    saveCommandAliases(commandAliases, setCommandAliases, setAliasStatusText);
  };

  return {
    aliasStatusText,
    commandAliases,
    onAddAlias: handleAddAlias,
    onChangeAliasCommand: handleChangeAliasCommand,
    onChangeAliasName: handleChangeAliasName,
    onRemoveAlias: handleRemoveAlias,
    onSaveAliases: handleSaveAliases,
  };
};

/**
 * Bookmark CLI settings popup appです。
 * @returns {ReactElement} Popup app elementです。
 */
export const App = (): ReactElement => {
  const shortcutSettings = useShortcutSettingsState();
  const aliasSettings = useCommandAliasSettingsState();

  return (
    <SettingsPopup
      aliasStatusText={aliasSettings.aliasStatusText}
      commandAliases={aliasSettings.commandAliases}
      onAddAlias={aliasSettings.onAddAlias}
      onChangeAliasCommand={aliasSettings.onChangeAliasCommand}
      onChangeAliasName={aliasSettings.onChangeAliasName}
      onOpenCliPage={shortcutSettings.onOpenCliPage}
      onOpenShortcutSettings={shortcutSettings.onOpenShortcutSettings}
      onRemoveAlias={aliasSettings.onRemoveAlias}
      onSaveAliases={aliasSettings.onSaveAliases}
      shortcutConfigured={shortcutSettings.shortcutConfigured}
      shortcutLabel={shortcutSettings.shortcutLabel}
    />
  );
};
