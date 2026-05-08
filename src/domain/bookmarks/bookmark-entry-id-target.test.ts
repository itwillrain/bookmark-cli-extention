import {
  createBookmarkEntryIdTargetInput,
  parseBookmarkEntryIdTargetInput,
} from "./bookmark-entry-id-target";
import { describe, expect, it } from "vitest";

/** Bookmark entry ID fixture。 */
const bookmarkEntryId = "42";

/** Bookmark entry ID target input fixture。 */
const bookmarkEntryIdTargetInput = "entry-id:42";

/** 通常path入力fixture。 */
const pathTargetInput = "./Stripe Dashboard";

/**
 * Bookmark entry ID target作成のテストスイート。
 */
describe("createBookmarkEntryIdTargetInput", (): void => {
  /**
   * Entry IDをrm target用入力に変換できることを検証。
   */
  it("creates an entry-id target input", (): void => {
    expect(createBookmarkEntryIdTargetInput(bookmarkEntryId)).toBe(bookmarkEntryIdTargetInput);
  });
});

/**
 * Bookmark entry ID target解析のテストスイート。
 */
describe("parseBookmarkEntryIdTargetInput", (): void => {
  /**
   * Entry ID target入力からentry IDを取り出すことを検証。
   */
  it("parses an entry-id target input", (): void => {
    expect(parseBookmarkEntryIdTargetInput(bookmarkEntryIdTargetInput)).toBe(bookmarkEntryId);
  });

  /**
   * 通常path入力はentry ID targetとして扱わないことを検証。
   */
  it("ignores path target input", (): void => {
    expect(parseBookmarkEntryIdTargetInput(pathTargetInput)).toBe(false);
  });
});
