import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Recent command入力。 */
const recentCommandInput = "recent";

/** Freq command入力。 */
const frequentCommandInput = "freq --limit 20";

/**
 * 利用統計command parserのテストスイート。
 */
describe("parseBookmarkCommand usage commands", (): void => {
  /**
   * Recent commandを解析できることを検証。
   */
  it("parses recent command", (): void => {
    expect(parseBookmarkCommand(recentCommandInput)).toStrictEqual({
      kind: "recent",
    });
  });

  /**
   * Freq commandをlimit付きで解析できることを検証。
   */
  it("parses freq command with limit", (): void => {
    expect(parseBookmarkCommand(frequentCommandInput)).toStrictEqual({
      kind: "freq",
      limit: 20,
    });
  });
});
