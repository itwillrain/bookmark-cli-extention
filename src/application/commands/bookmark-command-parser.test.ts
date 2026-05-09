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
 * History commandの入力です。
 */
const historyCommandInput = "history github docs --limit 20";

/**
 * Cd commandの入力です。
 */
const changeDirectoryCommandInput = "cd ../Research";

/**
 * Spaceを含むpathのCd command入力です。
 */
const changeDirectoryWithSpacedPathCommandInput = "cd /Other Bookmarks";

/**
 * Path省略Cd commandの入力です。
 */
const changeDirectoryToRootCommandInput = "cd";

/**
 * Pwd commandの入力です。
 */
const printWorkingDirectoryCommandInput = "pwd";

/**
 * Clear commandの入力です。
 */
const clearCommandInput = "clear";

/**
 * Version commandの入力一覧です。
 */
const versionCommandInputs = ["version", "-v", "--version", "--v", "-version"] as const;

/**
 * Tree commandの入力です。
 */
const showDirectoryTreeCommandInput = "tree Work --depth 3";

/**
 * Tag commandの入力です。
 */
const tagBookmarkCommandInput = "tag 3 prod finance";

/**
 * Tag remove commandの入力です。
 */
const removeTagBookmarkCommandInput = "tag 3 --remove prod";

/**
 * Depth指定だけのTree command入力です。
 */
const showCurrentDirectoryTreeCommandInput = "tree --depth 3";

/**
 * Tree commandのdepth期待値です。
 */
const expectedTreeDepth = 3;

/**
 * 未対応commandの入力です。
 */
const unknownCommandInput = "open stripe";

/**
 * 空commandの入力です。
 */
const emptyCommandInput = "   ";

/**
 * Bookmark検索系command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand search commands", (): void => {
  /**
   * Find commandをquery付きで解析できることを検証します。
   */
  it("parses find command with query", (): void => {
    expect(parseBookmarkCommand(findCommandInput)).toStrictEqual({
      kind: "find",
      long: false,
      query: "stripe dashboard",
    });
  });

  /**
   * Go commandの余分な空白を正規化できることを検証します。
   */
  it("parses go command with normalized whitespace", (): void => {
    expect(parseBookmarkCommand(goCommandInput)).toStrictEqual({
      kind: "go",
      long: false,
      query: "/Work/Admin",
    });
  });

  /**
   * History commandをqueryとlimit付きで解析できることを検証します。
   */
  it("parses history command with query and limit", (): void => {
    expect(parseBookmarkCommand(historyCommandInput)).toStrictEqual({
      kind: "history",
      limit: 20,
      query: "github docs",
    });
  });
});

/**
 * Bookmark directory系command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand directory commands", (): void => {
  /**
   * Cd commandをpath付きで解析できることを検証します。
   */
  it("parses cd command with path", (): void => {
    expect(parseBookmarkCommand(changeDirectoryCommandInput)).toStrictEqual({
      kind: "cd",
      pathInput: "../Research",
    });
  });

  /**
   * Spaceを含むpathのCd commandを解析できることを検証します。
   */
  it("parses cd command with spaced path", (): void => {
    expect(parseBookmarkCommand(changeDirectoryWithSpacedPathCommandInput)).toStrictEqual({
      kind: "cd",
      pathInput: "/Other Bookmarks",
    });
  });

  /**
   * Cd commandをpath省略で解析できることを検証します。
   */
  it("parses cd command without path", (): void => {
    expect(parseBookmarkCommand(changeDirectoryToRootCommandInput)).toStrictEqual({
      kind: "cd",
      pathInput: "",
    });
  });

  /**
   * Pwd commandを解析できることを検証します。
   */
  it("parses pwd command", (): void => {
    expect(parseBookmarkCommand(printWorkingDirectoryCommandInput)).toStrictEqual({
      kind: "pwd",
    });
  });

  /**
   * Clear commandを解析できることを検証します。
   */
  it("parses clear command", (): void => {
    expect(parseBookmarkCommand(clearCommandInput)).toStrictEqual({
      kind: "clear",
    });
  });
});

/**
 * Bookmark version command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand version commands", (): void => {
  /**
   * Version commandとversion option aliasを解析できることを検証します。
   */
  it.each(versionCommandInputs)("parses version command input %s", (versionCommandInput): void => {
    expect(parseBookmarkCommand(versionCommandInput)).toStrictEqual({
      kind: "version",
    });
  });
});

/**
 * Bookmark tree command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand tree commands", (): void => {
  /**
   * Tree commandをpathとdepth付きで解析できることを検証します。
   */
  it("parses tree command with path and depth", (): void => {
    expect(parseBookmarkCommand(showDirectoryTreeCommandInput)).toStrictEqual({
      depth: expectedTreeDepth,
      directoriesOnly: false,
      kind: "tree",
      pathInput: "Work",
    });
  });

  /**
   * Tree commandをdepthだけで解析できることを検証します。
   */
  it("parses tree command with depth only", (): void => {
    expect(parseBookmarkCommand(showCurrentDirectoryTreeCommandInput)).toStrictEqual({
      depth: expectedTreeDepth,
      directoriesOnly: false,
      kind: "tree",
      pathInput: "",
    });
  });

  /** Tree commandをdirectory限定option付きで解析できることを検証します。 */
  it("parses tree command with directories only option", (): void => {
    expect(parseBookmarkCommand("tree Work -d --depth 3")).toStrictEqual({
      depth: expectedTreeDepth,
      directoriesOnly: true,
      kind: "tree",
      pathInput: "Work",
    });
  });
});

/**
 * Bookmark仮想タグcommand parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand tag commands", (): void => {
  /**
   * Tag commandを対象番号とtag一覧付きで解析できることを検証します。
   */
  it("parses tag command with result number and tags", (): void => {
    expect(parseBookmarkCommand(tagBookmarkCommandInput)).toStrictEqual({
      kind: "tag",
      remove: false,
      tagInputs: ["prod", "finance"],
      targetInput: "3",
    });
  });

  /**
   * Tag remove commandを解析できることを検証します。
   */
  it("parses tag remove command", (): void => {
    expect(parseBookmarkCommand(removeTagBookmarkCommandInput)).toStrictEqual({
      kind: "tag",
      remove: true,
      tagInputs: ["prod"],
      targetInput: "3",
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
