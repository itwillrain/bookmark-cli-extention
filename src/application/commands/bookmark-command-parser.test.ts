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
 * Cd commandの入力です。
 */
const changeDirectoryCommandInput = "cd ../Research";

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
 * Tree commandの入力です。
 */
const showDirectoryTreeCommandInput = "tree Work --depth 3";

/**
 * Mark commandの入力です。
 */
const markBookmarkCommandInput = 'mark "Production Admin" --to Work/Admin --allow-duplicate';

/**
 * Mark commandの保存先だけを指定する入力です。
 */
const markBookmarkToDirectoryCommandInput = "mark --to Work/Admin";

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
      debug: false,
      kind: "find",
      query: "stripe dashboard",
    });
  });

  /**
   * Go commandの余分な空白を正規化できることを検証します。
   */
  it("parses go command with normalized whitespace", (): void => {
    expect(parseBookmarkCommand(goCommandInput)).toStrictEqual({
      debug: false,
      kind: "go",
      query: "/Work/Admin",
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
 * Bookmark tree command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand tree commands", (): void => {
  /**
   * Tree commandをpathとdepth付きで解析できることを検証します。
   */
  it("parses tree command with path and depth", (): void => {
    expect(parseBookmarkCommand(showDirectoryTreeCommandInput)).toStrictEqual({
      depth: expectedTreeDepth,
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
      kind: "tree",
      pathInput: "",
    });
  });
});

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
