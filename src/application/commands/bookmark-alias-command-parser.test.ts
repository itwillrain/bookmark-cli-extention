import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Alias一覧command入力です。 */
const aliasListInput = "alias";

/** Alias設定command入力です。 */
const aliasSetInput = "alias g=go";

/** 引用符付きalias設定command入力です。 */
const quotedAliasSetInput = "alias la='ls -la'";

/** Unalias command入力です。 */
const unaliasInput = "unalias g";

/** Command alias parserのテストスイートです。 */
describe("parseBookmarkCommand alias commands", (): void => {
  /** Alias一覧commandを解析できることを検証。 */
  it("parses alias list command", (): void => {
    expect(parseBookmarkCommand(aliasListInput)).toStrictEqual({
      aliasName: "",
      commandInput: "",
      kind: "alias",
      operation: "list",
    });
  });

  /** Alias設定commandを解析できることを検証。 */
  it("parses alias set command", (): void => {
    expect(parseBookmarkCommand(aliasSetInput)).toStrictEqual({
      aliasName: "g",
      commandInput: "go",
      kind: "alias",
      operation: "set",
    });
  });

  /** 引用符付きalias設定commandを解析できることを検証。 */
  it("parses quoted alias set command", (): void => {
    expect(parseBookmarkCommand(quotedAliasSetInput)).toStrictEqual({
      aliasName: "la",
      commandInput: "ls -la",
      kind: "alias",
      operation: "set",
    });
  });

  /** Unalias commandを解析できることを検証。 */
  it("parses unalias command", (): void => {
    expect(parseBookmarkCommand(unaliasInput)).toStrictEqual({
      aliasName: "g",
      kind: "unalias",
    });
  });
});
