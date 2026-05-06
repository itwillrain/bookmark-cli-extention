import { describe, expect, it } from "vitest";
import { findBookmarkCliHelpTopic, listBookmarkCliHelpTopics } from "./bookmark-help";

/** Go help topic名です。 */
const goHelpTopicName = "go";

/** History help topic名です。 */
const historyHelpTopicName = "history";

/** Grep help topic名です。 */
const grepHelpTopicName = "grep";

/** Abbr help topic名です。 */
const abbrHelpTopicName = "abbr";

/** 互換用Alias help topic名です。 */
const legacyAliasHelpTopicName = "alias";

/** Tree help topic名です。 */
const treeHelpTopicName = "tree";

/** Rm help topic名です。 */
const removeHelpTopicName = "rm";

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
    const topicNames = listBookmarkCliHelpTopics().map((topic) => topic.commandName);

    expect(topicNames).toContain(goHelpTopicName);
    expect(topicNames).toContain(historyHelpTopicName);
    expect(topicNames).toContain(grepHelpTopicName);
    expect(topicNames).toContain(abbrHelpTopicName);
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
 * Bookmark CLI abbr help catalogのテストスイートです。
 */
describe("bookmark CLI abbr help catalog", (): void => {
  /**
   * Abbr topicから設定と一覧表示の使い方を取得できることを検証します。
   */
  it("finds abbr help topic", (): void => {
    const topic = findBookmarkCliHelpTopic(abbrHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.usage).toContain("abbr <name>=<command>");
      expect(topic.examples).toContain("abbr la='ls -la'");
    }
  });

  /**
   * 互換用alias topicからabbr help topicを取得できることを検証します。
   */
  it("finds abbr help topic by legacy alias topic", (): void => {
    const topic = findBookmarkCliHelpTopic(legacyAliasHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.commandName).toBe(abbrHelpTopicName);
    }
  });
});

/**
 * Bookmark CLI tree help catalogのテストスイートです。
 */
describe("bookmark CLI tree help catalog", (): void => {
  /**
   * Tree topicからdirectory限定表示のoptionを確認できることを検証します。
   */
  it("finds tree help topic with directories only option", (): void => {
    const topic = findBookmarkCliHelpTopic(treeHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.usage).toContain("tree [-d] [path] [--depth <number>]");
      expect(topic.examples).toContain("tree -d Work");
    }
  });
});

/**
 * Bookmark CLI rm help catalogのテストスイートです。
 */
describe("bookmark CLI rm help catalog", (): void => {
  /**
   * Rm topicからpathまたはindex指定の削除仕様を確認できることを検証します。
   */
  it("finds rm help topic with path or index target", (): void => {
    const topic = findBookmarkCliHelpTopic(removeHelpTopicName);

    expect(topic).not.toBe(false);

    if (topic !== false) {
      expect(topic.usage).toContain("rm <path-or-index>");
      expect(topic.examples).toContain("rm ./Stripe Dashboard");
    }
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
