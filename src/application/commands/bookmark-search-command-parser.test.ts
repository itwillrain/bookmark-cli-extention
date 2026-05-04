import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/**
 * Long表示付きFind commandの入力です。
 */
const longFindCommandInput = "find -l stripe dashboard";

/**
 * Long表示付きGo commandの入力です。
 */
const longGoCommandInput = "go /Work/Admin -l";

/**
 * Bookmark検索系command long option parserのテストスイートです。
 */
describe("parseBookmarkCommand search long option", (): void => {
  /**
   * Find commandのlong optionを解析できることを検証します。
   */
  it("parses find command with long option", (): void => {
    expect(parseBookmarkCommand(longFindCommandInput)).toStrictEqual({
      kind: "find",
      long: true,
      query: "stripe dashboard",
    });
  });

  /**
   * Go commandのlong optionを解析できることを検証します。
   */
  it("parses go command with long option", (): void => {
    expect(parseBookmarkCommand(longGoCommandInput)).toStrictEqual({
      kind: "go",
      long: true,
      query: "/Work/Admin",
    });
  });
});
