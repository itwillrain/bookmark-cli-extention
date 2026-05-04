import { describe, expect, it } from "vitest";
import { findBookmarkCliHelpTopic, listBookmarkCliHelpTopics } from "./bookmark-help";

/** Go help topic名です。 */
const goHelpTopicName = "go";

/** History help topic名です。 */
const historyHelpTopicName = "history";

/** Grep help topic名です。 */
const grepHelpTopicName = "grep";

/** Unknown help topic名です。 */
const unknownHelpTopicName = "missing";

/**
 * Bookmark CLI help catalogのテストスイートです。
 */
describe("bookmark CLI help catalog", (): void => {
  /**
   * Help topic一覧に主要commandを含むことを検証します。
   */
  it("lists command help topics", (): void => {
    expect(listBookmarkCliHelpTopics().map((topic) => topic.commandName)).toContain(
      goHelpTopicName,
    );
  });

  /**
   * Help topic一覧にhistory topicを含むことを検証します。
   */
  it("lists history help topic", (): void => {
    expect(listBookmarkCliHelpTopics().map((topic) => topic.commandName)).toContain(
      historyHelpTopicName,
    );
  });

  /**
   * Help topic一覧にgrep topicを含むことを検証します。
   */
  it("lists grep help topic", (): void => {
    expect(listBookmarkCliHelpTopics().map((topic) => topic.commandName)).toContain(
      grepHelpTopicName,
    );
  });

  /**
   * Command名からhelp topicを取得できることを検証します。
   */
  it("finds a help topic by command name", (): void => {
    const topic = findBookmarkCliHelpTopic(goHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.usage).toContain("go <query>");
      expect(topic.examples).toContain("go 3");
    }
  });

  /**
   * 未登録command名ではhelp topicを返さないことを検証します。
   */
  it("returns false for unknown help topic", (): void => {
    expect(findBookmarkCliHelpTopic(unknownHelpTopicName)).toBe(false);
  });
});

/**
 * Bookmark CLI history help catalogのテストスイートです。
 */
describe("bookmark CLI history help catalog", (): void => {
  /**
   * History topicからChrome履歴の一覧と検索仕様を取得できることを検証します。
   */
  it("finds history help topic", (): void => {
    const topic = findBookmarkCliHelpTopic(historyHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.description).toBe("Chrome履歴を一覧表示しfind/goの検索候補として扱う");
      expect(topic.usage).toContain("history [query] [--limit <number>]");
      expect(topic.usage).toContain("#tag queries search bookmarks only");
    }
  });
});
