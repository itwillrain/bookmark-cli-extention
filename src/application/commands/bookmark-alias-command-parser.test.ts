import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Abbr一覧command入力です。 */
const abbrListInput = "abbr";

/** Abbr設定command入力です。 */
const abbrSetInput = "abbr g=go";

/** 引用符付きabbr設定command入力です。 */
const quotedAbbrSetInput = "abbr la='ls -la'";

/** Unabbr command入力です。 */
const unabbrInput = "unabbr g";

/** 互換用alias一覧command入力です。 */
const legacyAliasListInput = "alias";

/** 互換用unalias command入力です。 */
const legacyUnaliasInput = "unalias g";

/** Command abbreviation parserのテストスイートです。 */
describe("parseBookmarkCommand abbr commands", (): void => {
  /** Abbr一覧commandを解析できることを検証。 */
  it("parses abbr list command", (): void => {
    expect(parseBookmarkCommand(abbrListInput)).toStrictEqual({
      aliasName: "",
      commandInput: "",
      kind: "alias",
      operation: "list",
    });
  });

  /** Abbr設定commandを解析できることを検証。 */
  it("parses abbr set command", (): void => {
    expect(parseBookmarkCommand(abbrSetInput)).toStrictEqual({
      aliasName: "g",
      commandInput: "go",
      kind: "alias",
      operation: "set",
    });
  });

  /** 引用符付きabbr設定commandを解析できることを検証。 */
  it("parses quoted abbr set command", (): void => {
    expect(parseBookmarkCommand(quotedAbbrSetInput)).toStrictEqual({
      aliasName: "la",
      commandInput: "ls -la",
      kind: "alias",
      operation: "set",
    });
  });

  /** Unabbr commandを解析できることを検証。 */
  it("parses unabbr command", (): void => {
    expect(parseBookmarkCommand(unabbrInput)).toStrictEqual({
      aliasName: "g",
      kind: "unalias",
    });
  });
});

/** Command abbreviation互換parserのテストスイートです。 */
describe("parseBookmarkCommand legacy alias commands", (): void => {
  /** 互換用alias commandを解析できることを検証。 */
  it("parses legacy alias command", (): void => {
    expect(parseBookmarkCommand(legacyAliasListInput)).toStrictEqual({
      aliasName: "",
      commandInput: "",
      kind: "alias",
      operation: "list",
    });
  });

  /** 互換用unalias commandを解析できることを検証。 */
  it("parses legacy unalias command", (): void => {
    expect(parseBookmarkCommand(legacyUnaliasInput)).toStrictEqual({
      aliasName: "g",
      kind: "unalias",
    });
  });
});
