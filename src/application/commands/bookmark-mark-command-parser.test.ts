import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Mark commandの入力です。 */
const markBookmarkCommandInput = 'mark "Production Admin" --to Work/Admin --allow-duplicate';

/** Mark commandの保存先だけを指定する入力です。 */
const markBookmarkToDirectoryCommandInput = "mark --to Work/Admin";

/** 明示的な空titleのMark command入力です。 */
const markBookmarkWithExplicitEmptyTitleInput = 'mark "" --to Work/Admin';

/**
 * Bookmark保存command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand mark commands", (): void => {
  /**
   * Mark commandをtitle、保存先、重複許可付きで解析できることを検証します。
   */
  it("parses mark command with title and options", (): void => {
    expect(parseBookmarkCommand(markBookmarkCommandInput)).toStrictEqual({
      allowDuplicate: true,
      kind: "mark",
      targetFolderPathInput: "Work/Admin",
      titleInput: "Production Admin",
      titleSpecified: true,
    });
  });

  /**
   * Mark commandを保存先だけで解析できることを検証します。
   */
  it("parses mark command with target folder only", (): void => {
    expect(parseBookmarkCommand(markBookmarkToDirectoryCommandInput)).toStrictEqual({
      allowDuplicate: false,
      kind: "mark",
      targetFolderPathInput: "Work/Admin",
      titleInput: "",
      titleSpecified: false,
    });
  });

  /**
   * Mark commandを明示的な空titleとして解析できることを検証します。
   */
  it("parses mark command with explicit empty title", (): void => {
    expect(parseBookmarkCommand(markBookmarkWithExplicitEmptyTitleInput)).toStrictEqual({
      allowDuplicate: false,
      kind: "mark",
      targetFolderPathInput: "Work/Admin",
      titleInput: "",
      titleSpecified: true,
    });
  });
});
