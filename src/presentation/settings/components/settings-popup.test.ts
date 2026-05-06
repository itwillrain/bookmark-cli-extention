import { SettingsPopup, type SettingsPopupProps } from "./settings-popup";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** Shortcut fixtureです。 */
const shortcutLabel = "Command+Shift+K";

/** Shortcut設定button labelです。 */
const shortcutSettingsButtonLabel = "ショートカットを変更";

/** 未設定shortcut labelです。 */
const unconfiguredShortcutLabel = "未設定";

/** Popup headingです。 */
const settingsHeading = "設定";

/** Abbr headingです。 */
const aliasHeading = "Abbr";

/** Abbr保存button labelです。 */
const saveAliasesButtonLabel = "Abbrを保存";

/**
 * Test用のCLI page open callbackです。
 * @returns {void} 返り値なし。
 */
const handleOpenCliPage = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-open-cli"));
};

/**
 * Test用のshortcut settings open callbackです。
 * @returns {void} 返り値なし。
 */
const handleOpenShortcutSettings = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-open-shortcuts"));
};

/**
 * Test用のalias追加callbackです。
 * @returns {void} 返り値なし。
 */
const handleAddAlias = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-add-alias"));
};

/**
 * Test用のalias name変更callbackです。
 * @returns {void} 返り値なし。
 */
const handleChangeAliasName = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-change-alias-name"));
};

/**
 * Test用のalias command変更callbackです。
 * @returns {void} 返り値なし。
 */
const handleChangeAliasCommand = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-change-alias-command"));
};

/**
 * Test用のalias削除callbackです。
 * @returns {void} 返り値なし。
 */
const handleRemoveAlias = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-remove-alias"));
};

/**
 * Test用のalias保存callbackです。
 * @returns {void} 返り値なし。
 */
const handleSaveAliases = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-save-aliases"));
};

/** Settings popup props fixtureです。 */
const baseProps = {
  aliasStatusText: "",
  commandAliases: [{ command: "go", name: "g" }],
  onAddAlias: handleAddAlias,
  onChangeAliasCommand: handleChangeAliasCommand,
  onChangeAliasName: handleChangeAliasName,
  onOpenCliPage: handleOpenCliPage,
  onOpenShortcutSettings: handleOpenShortcutSettings,
  onRemoveAlias: handleRemoveAlias,
  onSaveAliases: handleSaveAliases,
  shortcutConfigured: true,
  shortcutLabel,
} satisfies SettingsPopupProps;

/** Settings popup componentのテストスイートです。 */
describe("SettingsPopup", (): void => {
  /** 現在のhotkeyを表示することを検証します。 */
  it("renders current hotkey", (): void => {
    const html = renderToStaticMarkup(createElement(SettingsPopup, baseProps));

    expect(html).toContain(settingsHeading);
    expect(html).toContain(shortcutLabel);
    expect(html).toContain(shortcutSettingsButtonLabel);
  });

  /** Shortcut未設定状態を表示することを検証します。 */
  it("renders unconfigured shortcut", (): void => {
    const html = renderToStaticMarkup(
      createElement(SettingsPopup, {
        ...baseProps,
        shortcutConfigured: false,
        shortcutLabel: "",
      }),
    );

    expect(html).toContain(unconfiguredShortcutLabel);
  });

  /** Alias設定を表示することを検証します。 */
  it("renders command aliases", (): void => {
    const html = renderToStaticMarkup(createElement(SettingsPopup, baseProps));

    expect(html).toContain(aliasHeading);
    expect(html).toContain('value="g"');
    expect(html).toContain('value="go"');
    expect(html).toContain(saveAliasesButtonLabel);
  });
});
