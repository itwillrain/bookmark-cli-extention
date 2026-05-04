import { describe, expect, it } from "vitest";
import { suggestBookmarkCommandHistory } from "./bookmark-command-history-suggestion";

/** 古い履歴実行日時fixture。 */
const olderExecutedAt = "2026-05-01T00:00:00.000Z";

/** 新しい履歴実行日時fixture。 */
const newerExecutedAt = "2026-05-02T00:00:00.000Z";

/** 最も新しい履歴実行日時fixture。 */
const newestExecutedAt = "2026-05-03T00:00:00.000Z";

/** Command history fixture。 */
const commandHistory = [
  {
    executedAt: olderExecutedAt,
    input: "find stripe",
  },
  {
    executedAt: newerExecutedAt,
    input: "go ./Admin",
  },
  {
    executedAt: newestExecutedAt,
    input: "ls -la",
  },
] as const;

/** 空の入力値fixture。 */
const emptyInputValue = "";

/** 大文字混じりの検索入力fixture。 */
const mixedCaseQueryInputValue = "GO";

/**
 * Command history suggestionのテストスイート。
 */
describe("suggestBookmarkCommandHistory", (): void => {
  /**
   * 履歴を新しい順でfloating suggestionへ変換することを検証。
   */
  it("returns command history suggestions in newest first order", (): void => {
    expect(
      suggestBookmarkCommandHistory({
        commandHistory,
        inputValue: emptyInputValue,
      }),
    ).toStrictEqual([
      {
        commandName: "#1",
        completion: "ls -la",
        description: "ls -la",
      },
      {
        commandName: "#2",
        completion: "go ./Admin",
        description: "go ./Admin",
      },
      {
        commandName: "#3",
        completion: "find stripe",
        description: "find stripe",
      },
    ]);
  });

  /**
   * 入力値に一致する履歴だけを候補にすることを検証。
   */
  it("filters command history suggestions by current input", (): void => {
    expect(
      suggestBookmarkCommandHistory({
        commandHistory,
        inputValue: mixedCaseQueryInputValue,
      }),
    ).toStrictEqual([
      {
        commandName: "#1",
        completion: "go ./Admin",
        description: "go ./Admin",
      },
    ]);
  });
});
