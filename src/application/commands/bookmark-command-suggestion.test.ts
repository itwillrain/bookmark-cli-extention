import { describe, expect, it } from "vitest";
import { suggestBookmarkCommands } from "./bookmark-command-suggestion";

/** 先頭suggestion index。 */
const firstSuggestionIndex = 0;

/**
 * Bookmark command suggestionのテストスイート。
 */
describe("suggestBookmarkCommands", (): void => {
  /**
   * 空入力では主要commandを返すことを検証。
   */
  it("returns initial command suggestions", (): void => {
    expect(suggestBookmarkCommands("").map((suggestion) => suggestion.commandName)).toStrictEqual([
      "find",
      "go",
      "ls",
      "cd",
      "pwd",
      "tree",
    ]);
  });

  /**
   * 入力prefixに一致するcommandだけ返すことを検証。
   */
  it("filters commands by prefix", (): void => {
    expect(suggestBookmarkCommands("f").map((suggestion) => suggestion.commandName)).toStrictEqual([
      "find",
      "freq",
    ]);
  });

  /**
   * Command補完値に末尾空白が含まれることを検証。
   */
  it("adds a trailing space to command completion", (): void => {
    expect(suggestBookmarkCommands("go")[firstSuggestionIndex]?.completion).toBe("go ");
  });

  /**
   * 引数入力中はcommand suggestionを返さないことを検証。
   */
  it("returns no command suggestions after command arguments start", (): void => {
    expect(suggestBookmarkCommands("find stripe")).toStrictEqual([]);
  });
});

/**
 * Bookmark help command suggestionのprefixテストスイート。
 */
describe("suggestBookmarkCommands help prefix", (): void => {
  /**
   * Help commandをprefixから補完候補へ出せることを検証。
   */
  it("suggests help command by prefix", (): void => {
    expect(suggestBookmarkCommands("h").map((suggestion) => suggestion.commandName)).toStrictEqual([
      "help",
    ]);
  });
});
