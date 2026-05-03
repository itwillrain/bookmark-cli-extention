import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/**
 * Debug付きFind commandの入力です。
 */
const debugFindCommandInput = "find --debug stripe dashboard";

/**
 * Debug付きGo commandの入力です。
 */
const debugGoCommandInput = "go /Work/Admin --debug";

/**
 * Bookmark検索系command debug option parserのテストスイートです。
 */
describe("parseBookmarkCommand search debug option", (): void => {
  /**
   * Find commandのdebug optionを解析できることを検証します。
   */
  it("parses find command with debug option", (): void => {
    expect(parseBookmarkCommand(debugFindCommandInput)).toStrictEqual({
      debug: true,
      kind: "find",
      query: "stripe dashboard",
    });
  });

  /**
   * Go commandのdebug optionを解析できることを検証します。
   */
  it("parses go command with debug option", (): void => {
    expect(parseBookmarkCommand(debugGoCommandInput)).toStrictEqual({
      debug: true,
      kind: "go",
      query: "/Work/Admin",
    });
  });
});
