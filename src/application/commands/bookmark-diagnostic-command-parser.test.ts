import { describe, expect, it } from "vitest";
import { parseBookmarkCommand } from "./bookmark-command-parser";

/** Doctor command入力です。 */
const doctorCommandInput = "doctor";

/** Duplicate titleだけを見るdoctor command入力です。 */
const doctorDuplicateTitleCommandInput = "doctor --duplicate-title";

/** 全診断を有効にするdoctor command入力です。 */
const doctorAllCommandInput = "doctor --all";

/** Dupes command入力です。 */
const dupesCommandInput = "dupes";

/** Title重複を見るdupes command入力です。 */
const dupesTitleCommandInput = "dupes --title";

/**
 * Doctor command parserのテストスイートです。
 */
describe("parseBookmarkCommand doctor command", (): void => {
  /**
   * Doctor commandは空titleとURL重複を初期診断にすることを検証します。
   */
  it("parses doctor command with default checks", (): void => {
    expect(parseBookmarkCommand(doctorCommandInput)).toStrictEqual({
      checks: {
        duplicateTitle: false,
        duplicateUrl: true,
        emptyTitle: true,
      },
      kind: "doctor",
    });
  });

  /**
   * Doctor commandは指定された診断だけを有効にできることを検証します。
   */
  it("parses doctor command with a selected check", (): void => {
    expect(parseBookmarkCommand(doctorDuplicateTitleCommandInput)).toStrictEqual({
      checks: {
        duplicateTitle: true,
        duplicateUrl: false,
        emptyTitle: false,
      },
      kind: "doctor",
    });
  });

  /**
   * Doctor commandはすべての診断を有効にできることを検証します。
   */
  it("parses doctor command with all checks", (): void => {
    expect(parseBookmarkCommand(doctorAllCommandInput)).toStrictEqual({
      checks: {
        duplicateTitle: true,
        duplicateUrl: true,
        emptyTitle: true,
      },
      kind: "doctor",
    });
  });
});

/**
 * Dupes command parserのテストスイートです。
 */
describe("parseBookmarkCommand dupes command", (): void => {
  /**
   * Dupes commandはURL重複を初期診断にすることを検証します。
   */
  it("parses dupes command with default checks", (): void => {
    expect(parseBookmarkCommand(dupesCommandInput)).toStrictEqual({
      checks: {
        duplicateTitle: false,
        duplicateUrl: true,
        emptyTitle: false,
      },
      kind: "dupes",
    });
  });

  /**
   * Dupes commandはtitle重複へ絞れることを検証します。
   */
  it("parses dupes command with title check", (): void => {
    expect(parseBookmarkCommand(dupesTitleCommandInput)).toStrictEqual({
      checks: {
        duplicateTitle: true,
        duplicateUrl: false,
        emptyTitle: false,
      },
      kind: "dupes",
    });
  });
});
