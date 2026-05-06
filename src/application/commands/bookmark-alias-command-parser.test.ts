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

/** Alias一覧command入力です。 */
const aliasListInput = "alias";

/** Alias設定command入力です。 */
const aliasSetInput = "alias g=go";

/** Unalias command入力です。 */
const unaliasInput = "unalias g";

/** Command abbreviation parserのテストスイートです。 */
describe("parseBookmarkCommand abbr commands", (): void => {
  /** Abbr一覧commandを解析できることを検証。 */
  it("parses abbr list command", (): void => {
    expect(parseBookmarkCommand(abbrListInput)).toStrictEqual({
      abbreviationName: "",
      commandInput: "",
      kind: "abbr",
      operation: "list",
    });
  });

  /** Abbr設定commandを解析できることを検証。 */
  it("parses abbr set command", (): void => {
    expect(parseBookmarkCommand(abbrSetInput)).toStrictEqual({
      abbreviationName: "g",
      commandInput: "go",
      kind: "abbr",
      operation: "set",
    });
  });

  /** 引用符付きabbr設定commandを解析できることを検証。 */
  it("parses quoted abbr set command", (): void => {
    expect(parseBookmarkCommand(quotedAbbrSetInput)).toStrictEqual({
      abbreviationName: "la",
      commandInput: "ls -la",
      kind: "abbr",
      operation: "set",
    });
  });

  /** Unabbr commandを解析できることを検証。 */
  it("parses unabbr command", (): void => {
    expect(parseBookmarkCommand(unabbrInput)).toStrictEqual({
      abbreviationName: "g",
      kind: "unabbr",
    });
  });
});

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

  /** Unalias commandを解析できることを検証。 */
  it("parses unalias command", (): void => {
    expect(parseBookmarkCommand(unaliasInput)).toStrictEqual({
      aliasName: "g",
      kind: "unalias",
    });
  });
});
