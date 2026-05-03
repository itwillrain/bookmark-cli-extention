import { describe, expect, it } from "vitest";
import { findBookmarkCliHelpTopic, listBookmarkCliHelpTopics } from "./bookmark-help";

/** Go help topic名です。 */
const goHelpTopicName = "go";

/** History help topic名です。 */
const historyHelpTopicName = "history";

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
   * History topicからChrome履歴の検索仕様を取得できることを検証します。
   */
  it("finds history help topic", (): void => {
    const topic = findBookmarkCliHelpTopic(historyHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.description).toBe("Chrome履歴をfind/goの検索候補として扱う");
      expect(topic.usage).toContain("find <query> includes HIST results");
      expect(topic.usage).toContain("#tag queries search bookmarks only");
    }
  });
});
