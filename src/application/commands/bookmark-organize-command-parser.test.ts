import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Mkdir commandの入力です。 */
const makeDirectoryCommandInput = "mkdir Tools";

/** Mv commandの入力です。 */
const moveBookmarkCommandInput = "mv 3 Archive";

/** Rm commandの入力です。 */
const removeBookmarkCommandInput = "rm 5";

/** Force Rm commandの入力です。 */
const forceRemoveBookmarkCommandInput = "rm -f 5";

/** Long force Rm commandの入力です。 */
const longForceRemoveBookmarkCommandInput = "rm --force 5";

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
      targetFolderPathInput: "Archive",
      targetInput: "3",
    });
  });

  /**
   * Rename commandをtitle付きで解析できることを検証します。
   */
  it("parses rename command", (): void => {
    expect(parseBookmarkCommand(renameBookmarkCommandInput)).toStrictEqual({
      kind: "rename",
      targetInput: "3",
      titleInput: "GitHub Pull Requests",
    });
  });
});

/**
 * Bookmark削除command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand remove command", (): void => {
  /**
   * Rm commandを解析できることを検証します。
   */
  it("parses rm command", (): void => {
    expect(parseBookmarkCommand(removeBookmarkCommandInput)).toStrictEqual({
      force: false,
      kind: "rm",
      targetInput: "5",
    });
  });

  /**
   * Rm commandをforce option付きで解析できることを検証します。
   */
  it("parses rm force command", (): void => {
    expect(parseBookmarkCommand(forceRemoveBookmarkCommandInput)).toStrictEqual({
      force: true,
      kind: "rm",
      targetInput: "5",
    });
  });

  /**
   * Rm commandをlong force option付きで解析できることを検証します。
   */
  it("parses rm long force command", (): void => {
    expect(parseBookmarkCommand(longForceRemoveBookmarkCommandInput)).toStrictEqual({
      force: true,
      kind: "rm",
      targetInput: "5",
    });
  });
});
