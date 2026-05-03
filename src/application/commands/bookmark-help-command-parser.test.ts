import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/**
 * Help commandの入力。
 */
const helpCommandInput = "help";

/**
 * Topic付きHelp commandの入力。
 */
const helpTopicCommandInput = "help go";

/**
 * Man alias commandの入力。
 */
const manualTopicCommandInput = "man go";

/**
 * Help option付きcommandの入力。
 */
const commandHelpOptionInput = "go --help";

/**
 * 短縮Help option付きcommandの入力。
 */
const commandShortHelpOptionInput = "ls -h";

/**
 * Bookmark help command parserの正常系テストスイート。
 */
describe("parseBookmarkCommand help commands", (): void => {
  /**
   * Help commandをtopic省略で解析できることを検証。
   */
  it("parses help command without topic", (): void => {
    expect(parseBookmarkCommand(helpCommandInput)).toStrictEqual({
      kind: "help",
      topicInput: "",
    });
  });

  /**
   * Help commandをtopic付きで解析できることを検証。
   */
  it("parses help command with topic", (): void => {
    expect(parseBookmarkCommand(helpTopicCommandInput)).toStrictEqual({
      kind: "help",
      topicInput: "go",
    });
  });
});

/**
 * Bookmark help alias parserの正常系テストスイート。
 */
describe("parseBookmarkCommand help aliases", (): void => {
  /**
   * Man aliasをHelp commandとして解析できることを検証。
   */
  it("parses man alias as help command", (): void => {
    expect(parseBookmarkCommand(manualTopicCommandInput)).toStrictEqual({
      kind: "help",
      topicInput: "go",
    });
  });

  /**
   * Long help optionをHelp commandとして解析できることを検証。
   */
  it("parses long help option as help command", (): void => {
    expect(parseBookmarkCommand(commandHelpOptionInput)).toStrictEqual({
      kind: "help",
      topicInput: "go",
    });
  });

  /**
   * Short help optionをHelp commandとして解析できることを検証。
   */
  it("parses short help option as help command", (): void => {
    expect(parseBookmarkCommand(commandShortHelpOptionInput)).toStrictEqual({
      kind: "help",
      topicInput: "ls",
    });
  });
});
