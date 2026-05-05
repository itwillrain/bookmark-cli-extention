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

/** Recursive rm commandの入力です。 */
const recursiveRemoveBookmarkCommandInput = "rm -r 2";

/** Force付きrecursive rm commandの入力です。 */
const forceRecursiveRemoveBookmarkCommandInput = "rm -rf 2";

/** Path対象のrm commandの入力です。 */
const removeBookmarkPathCommandInput = "rm -rf ./Admin/Stripe Dashboard";

/** Long option付きrecursive rm commandの入力です。 */
const longRecursiveRemoveBookmarkCommandInput = "rm --recursive --force 2";

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
      recursive: false,
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
      recursive: false,
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
      recursive: false,
      targetInput: "5",
    });
  });
});

/**
 * Bookmark recursive削除command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand recursive remove command", (): void => {
  /**
   * Rm commandをrecursive option付きで解析できることを検証します。
   */
  it("parses rm command with recursive option", (): void => {
    expect(parseBookmarkCommand(recursiveRemoveBookmarkCommandInput)).toStrictEqual({
      force: false,
      kind: "rm",
      recursive: true,
      targetInput: "2",
    });
  });

  /**
   * Rm commandをcombined short option付きで解析できることを検証します。
   */
  it("parses rm command with force recursive combined option", (): void => {
    expect(parseBookmarkCommand(forceRecursiveRemoveBookmarkCommandInput)).toStrictEqual({
      force: true,
      kind: "rm",
      recursive: true,
      targetInput: "2",
    });
  });

  /**
   * Rm commandをpath対象で解析できることを検証します。
   */
  it("parses rm command with path target", (): void => {
    expect(parseBookmarkCommand(removeBookmarkPathCommandInput)).toStrictEqual({
      force: true,
      kind: "rm",
      recursive: true,
      targetInput: "./Admin/Stripe Dashboard",
    });
  });

  /**
   * Rm commandをlong option付きで解析できることを検証します。
   */
  it("parses rm command with long recursive and force options", (): void => {
    expect(parseBookmarkCommand(longRecursiveRemoveBookmarkCommandInput)).toStrictEqual({
      force: true,
      kind: "rm",
      recursive: true,
      targetInput: "2",
    });
  });
});
