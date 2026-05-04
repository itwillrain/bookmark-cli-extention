import { type ChromeCommandsApi, createChromeCommandShortcutReader } from "./commands-adapter";
import { describe, expect, it } from "vitest";

/** CLI pageを開くcommand名です。 */
const openCliPageCommandName = "open-cli-page";

/** Shortcut fixtureです。 */
const shortcut = "Command+Shift+K";

/** Command説明fixtureです。 */
const commandDescription = "Open Bookmark CLI";

/**
 * Commands API fixtureを作ります。
 * @param {ChromeCommandsApi["getAll"]} getAll command一覧取得関数です。
 * @returns {ChromeCommandsApi} Commands API fixtureです。
 */
const createCommandsApi = (getAll: ChromeCommandsApi["getAll"]): ChromeCommandsApi => ({ getAll });

/** Chrome command shortcut readerのテストスイートです。 */
describe("createChromeCommandShortcutReader", (): void => {
  /** Command shortcutを読み取ることを検証します。 */
  it("reads command shortcut", async (): Promise<void> => {
    const reader = createChromeCommandShortcutReader(
      createCommandsApi(async () => {
        await Promise.resolve();

        return [
          {
            description: commandDescription,
            name: openCliPageCommandName,
            shortcut,
          },
        ];
      }),
    );

    await expect(reader.readCommandShortcut(openCliPageCommandName)).resolves.toStrictEqual({
      configured: true,
      description: commandDescription,
      name: openCliPageCommandName,
      shortcut,
    });
  });

  /** Shortcut未設定の場合は未設定として扱うことを検証します。 */
  it("marks blank shortcut as unconfigured", async (): Promise<void> => {
    const reader = createChromeCommandShortcutReader(
      createCommandsApi(async () => {
        await Promise.resolve();

        return [{ name: openCliPageCommandName, shortcut: "" }];
      }),
    );

    await expect(reader.readCommandShortcut(openCliPageCommandName)).resolves.toStrictEqual({
      configured: false,
      description: "",
      name: openCliPageCommandName,
      shortcut: "",
    });
  });
});
