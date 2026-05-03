import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Ls commandの入力です。 */
const listDirectoryCommandInput = "ls Work/Admin";

/** Long all Ls commandの入力です。 */
const longAllListDirectoryCommandInput = "ls -la Work/Admin";

/** Ll alias commandの入力です。 */
const longListDirectoryAliasCommandInput = "ll -a";

/**
 * Bookmark list command parserのテストスイートです。
 */
describe("parseBookmarkCommand list commands", (): void => {
  /**
   * Ls commandをpath付きで解析できることを検証します。
   */
  it("parses ls command with path", (): void => {
    expect(parseBookmarkCommand(listDirectoryCommandInput)).toStrictEqual({
      kind: "ls",
      options: {
        all: false,
        long: false,
      },
      pathInput: "Work/Admin",
    });
  });

  /**
   * Ls commandを短縮option付きで解析できることを検証します。
   */
  it("parses ls command with short options", (): void => {
    expect(parseBookmarkCommand(longAllListDirectoryCommandInput)).toStrictEqual({
      kind: "ls",
      options: {
        all: true,
        long: true,
      },
      pathInput: "Work/Admin",
    });
  });

  /**
   * Ll aliasをlong表示のlsとして解析できることを検証します。
   */
  it("parses ll alias as long ls command", (): void => {
    expect(parseBookmarkCommand(longListDirectoryAliasCommandInput)).toStrictEqual({
      kind: "ls",
      options: {
        all: true,
        long: true,
      },
      pathInput: "",
    });
  });
});
