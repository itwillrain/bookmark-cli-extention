import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Pipe付きLs commandの入力です。 */
const pipeListGrepCommandInput = "ls Work | grep stripe";

/** 複数grep stage付きPipe commandの入力です。 */
const multipleGrepPipeCommandInput = "find stripe | grep dashboard | grep work";

/** History commandをpipe sourceにする入力です。 */
const historyGrepCommandInput = "history github --limit 20 | grep docs";

/** Pwd commandをcopy pipe sourceにする入力です。 */
const printWorkingDirectoryCopyCommandInput = "pwd | copy";

/** Ls commandをgrepしてcopyする入力です。 */
const listGrepCopyCommandInput = "ls Work | grep stripe | copy";

/** 未対応pipe stage付きcommandの入力です。 */
const unsupportedPipeStageCommandInput = "ls Work | sort";

/** 書き込みcommandをpipe sourceにした入力です。 */
const unsupportedPipeSourceCommandInput = "mv 1 Archive | grep stripe";

/**
 * Bookmark pipe command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand pipe commands", (): void => {
  /**
   * Ls commandとgrep stageをpipe commandとして解析できることを検証します。
   */
  it("parses ls piped to grep", (): void => {
    expect(parseBookmarkCommand(pipeListGrepCommandInput)).toStrictEqual({
      kind: "pipe",
      source: {
        kind: "ls",
        options: {
          all: false,
          long: false,
        },
        pathInput: "Work",
      },
      stages: [
        {
          kind: "grep",
          queryInput: "stripe",
        },
      ],
    });
  });

  /**
   * 複数grep stageを順番どおりに解析できることを検証します。
   */
  it("parses multiple grep stages", (): void => {
    expect(parseBookmarkCommand(multipleGrepPipeCommandInput)).toStrictEqual({
      kind: "pipe",
      source: {
        kind: "find",
        long: false,
        query: "stripe",
      },
      stages: [
        {
          kind: "grep",
          queryInput: "dashboard",
        },
        {
          kind: "grep",
          queryInput: "work",
        },
      ],
    });
  });
});

/**
 * Bookmark history pipe command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand history pipe commands", (): void => {
  /**
   * History commandとgrep stageをpipe commandとして解析できることを検証します。
   */
  it("parses history piped to grep", (): void => {
    expect(parseBookmarkCommand(historyGrepCommandInput)).toStrictEqual({
      kind: "pipe",
      source: {
        kind: "history",
        limit: 20,
        query: "github",
      },
      stages: [
        {
          kind: "grep",
          queryInput: "docs",
        },
      ],
    });
  });
});

/**
 * Bookmark copy pipe command parserの正常系テストスイートです。
 */
describe("parseBookmarkCommand copy pipe commands", (): void => {
  /**
   * Pwd commandとcopy stageをpipe commandとして解析できることを検証します。
   */
  it("parses pwd piped to copy", (): void => {
    expect(parseBookmarkCommand(printWorkingDirectoryCopyCommandInput)).toStrictEqual({
      kind: "pipe",
      source: {
        kind: "pwd",
      },
      stages: [
        {
          kind: "copy",
        },
      ],
    });
  });

  /**
   * Grep後のcopy stageをpipe commandとして解析できることを検証します。
   */
  it("parses grep followed by copy", (): void => {
    expect(parseBookmarkCommand(listGrepCopyCommandInput)).toStrictEqual({
      kind: "pipe",
      source: {
        kind: "ls",
        options: {
          all: false,
          long: false,
        },
        pathInput: "Work",
      },
      stages: [
        {
          kind: "grep",
          queryInput: "stripe",
        },
        {
          kind: "copy",
        },
      ],
    });
  });
});

/**
 * Bookmark pipe command parserの異常系テストスイートです。
 */
describe("parseBookmarkCommand invalid pipe commands", (): void => {
  /**
   * 未対応pipe stageをunknown commandとして扱うことを検証します。
   */
  it("parses unsupported pipe stage as unknown command", (): void => {
    expect(parseBookmarkCommand(unsupportedPipeStageCommandInput)).toStrictEqual({
      commandName: "sort",
      kind: "unknown",
      rawInput: "ls Work | sort",
    });
  });

  /**
   * 書き込みcommandをpipe sourceにしないことを検証します。
   */
  it("parses unsupported pipe source as unknown command", (): void => {
    expect(parseBookmarkCommand(unsupportedPipeSourceCommandInput)).toStrictEqual({
      commandName: "mv",
      kind: "unknown",
      rawInput: "mv 1 Archive | grep stripe",
    });
  });
});
