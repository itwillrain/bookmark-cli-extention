import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Mkdir commandの入力です。 */
const makeDirectoryCommandInput = "mkdir Tools --preview";

/** Mv commandの入力です。 */
const moveBookmarkCommandInput = "mv 3 Archive --preview";

/** Rm commandの入力です。 */
const removeBookmarkCommandInput = "rm 5 --yes";

/** Rename commandの入力です。 */
const renameBookmarkCommandInput = 'rename 3 "GitHub Pull Requests"';

/**
 * Bookmark作成整理command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand create organize commands", (): void => {
  /**
   * Mkdir commandを解析できることを検証します。
   */
  it("parses mkdir command", (): void => {
    expect(parseBookmarkCommand(makeDirectoryCommandInput)).toStrictEqual({
      kind: "mkdir",
      pathInput: "Tools",
      preview: true,
      yes: false,
    });
  });
});

/**
 * Bookmark変更整理command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand mutation organize commands", (): void => {
  /**
   * Mv commandを対象番号と移動先付きで解析できることを検証します。
   */
  it("parses mv command", (): void => {
    expect(parseBookmarkCommand(moveBookmarkCommandInput)).toStrictEqual({
      kind: "mv",
      preview: true,
      targetFolderPathInput: "Archive",
      targetInput: "3",
      yes: false,
    });
  });

  /**
   * Rm commandを確認済みoption付きで解析できることを検証します。
   */
  it("parses rm command", (): void => {
    expect(parseBookmarkCommand(removeBookmarkCommandInput)).toStrictEqual({
      kind: "rm",
      preview: false,
      targetInput: "5",
      yes: true,
    });
  });

  /**
   * Rename commandをtitle付きで解析できることを検証します。
   */
  it("parses rename command", (): void => {
    expect(parseBookmarkCommand(renameBookmarkCommandInput)).toStrictEqual({
      kind: "rename",
      preview: false,
      targetInput: "3",
      titleInput: "GitHub Pull Requests",
      yes: false,
    });
  });
});
