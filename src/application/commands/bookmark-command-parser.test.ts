import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/**
 * Find commandの入力です。
 */
const findCommandInput = "find stripe dashboard";

/**
 * Go commandの入力です。
 */
const goCommandInput = "  go   /Work/Admin  ";

/**
 * 未対応commandの入力です。
 */
const unknownCommandInput = "open stripe";

/**
 * 空commandの入力です。
 */
const emptyCommandInput = "   ";

/**
 * Bookmark command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand valid input", (): void => {
  /**
   * Find commandをquery付きで解析できることを検証します。
   */
  it("parses find command with query", (): void => {
    expect(parseBookmarkCommand(findCommandInput)).toStrictEqual({
      kind: "find",
      query: "stripe dashboard",
    });
  });

  /**
   * Go commandの余分な空白を正規化できることを検証します。
   */
  it("parses go command with normalized whitespace", (): void => {
    expect(parseBookmarkCommand(goCommandInput)).toStrictEqual({
      kind: "go",
      query: "/Work/Admin",
    });
  });
});

/**
 * Bookmark command parserの異常系テストスイートです。
 */
describe("parseBookmarkCommand invalid input", (): void => {
  /**
   * 空入力をempty commandとして扱うことを検証します。
   */
  it("parses blank input as empty command", (): void => {
    expect(parseBookmarkCommand(emptyCommandInput)).toStrictEqual({
      kind: "empty",
    });
  });

  /**
   * 未対応commandをunknown commandとして扱うことを検証します。
   */
  it("parses unsupported command as unknown command", (): void => {
    expect(parseBookmarkCommand(unknownCommandInput)).toStrictEqual({
      commandName: "open",
      kind: "unknown",
      rawInput: "open stripe",
    });
  });
});
