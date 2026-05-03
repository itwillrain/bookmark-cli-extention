import { describe, expect, it } from "vitest";
import { suggestBookmarkCommands } from "./bookmark-command-suggestion";

/** 先頭suggestion index。 */
const firstSuggestionIndex = 0;

/**
 * Bookmark command suggestionの空入力テストスイート。
 */
describe("suggestBookmarkCommands empty input", (): void => {
  /**
   * 空入力ではcommand suggestionを返さないことを検証。
   */
  it("returns no command suggestions before typing starts", (): void => {
    expect(suggestBookmarkCommands("")).toStrictEqual([]);
  });

  /**
   * 空白だけの入力ではcommand suggestionを返さないことを検証。
   */
  it("returns no command suggestions for whitespace-only input", (): void => {
    expect(suggestBookmarkCommands("   ")).toStrictEqual([]);
  });
});

/**
 * Bookmark command suggestionのprefixテストスイート。
 */
describe("suggestBookmarkCommands prefix", (): void => {
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
   * L prefixではlsとllを補完候補へ出すことを検証。
   */
  it("suggests ls and ll by l prefix", (): void => {
    expect(suggestBookmarkCommands("l").map((suggestion) => suggestion.commandName)).toStrictEqual([
      "ls",
      "ll",
    ]);
  });

  /**
   * Clear commandをprefixから補完候補へ出せることを検証。
   */
  it("suggests clear command by prefix", (): void => {
    expect(suggestBookmarkCommands("cl").map((suggestion) => suggestion.commandName)).toStrictEqual(
      ["clear"],
    );
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
