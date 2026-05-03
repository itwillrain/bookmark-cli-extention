import {
  type BookmarkCliTranscriptEntry,
  appendBookmarkCliTranscriptEntry,
  clearBookmarkCliTranscriptEntries,
  createBookmarkCliTranscriptEntry,
} from "./bookmark-cli-transcript";
import { describe, expect, it } from "vitest";
import { createInitialExtensionState } from "../../domain/storage/extension-state";
import { currentDirectoryRoot } from "../../domain/bookmarks/current-directory";

/** 初期status text。 */
const statusText = "2 candidates";

/** Entry id。 */
const entryId = "entry-1";

/** 実行入力。 */
const inputValue = "find stripe";

/** Transcript保持件数。 */
const transcriptEntryLimit = 100;

/** 先頭fixture index。 */
const firstFixtureIndex = 1;

/** 2番目のfixture index。 */
const secondFixtureIndex = 2;

/** 先頭entry index。 */
const firstEntryIndex = 0;

/** 末尾entry index。 */
const latestEntryIndex = -1;

/** 保持後の先頭entry id。 */
const firstRetainedEntryId = "entry-1";

/** 保持後の末尾entry id。 */
const latestRetainedEntryId = "entry-100";

/**
 * Transcript entry fixtureを作成。
 * @param {number} index entry index。
 * @returns {BookmarkCliTranscriptEntry} Transcript entry fixture。
 */
const createTranscriptEntry = (index: number): BookmarkCliTranscriptEntry => ({
  id: `entry-${String(index)}`,
  inputValue: `find ${String(index)}`,
  resultItems: [],
  statusText,
});

/**
 * Transcript entry作成のテストスイート。
 */
describe("createBookmarkCliTranscriptEntry", (): void => {
  /**
   * Command stateからtranscript entryを作れることを検証。
   */
  it("creates a transcript entry from executed command state", (): void => {
    const entry = createBookmarkCliTranscriptEntry({
      commandState: {
        currentDirectory: currentDirectoryRoot,
        extensionState: createInitialExtensionState(),
        lastResultEntries: [],
        resultItems: [
          {
            folderPath: "/Work",
            kind: "bookmark",
            title: "Stripe Dashboard",
            url: "https://dashboard.stripe.com/",
          },
        ],
        statusText,
      },
      id: entryId,
      inputValue,
    });

    expect(entry).toStrictEqual({
      id: entryId,
      inputValue,
      resultItems: [
        {
          folderPath: "/Work",
          kind: "bookmark",
          title: "Stripe Dashboard",
          url: "https://dashboard.stripe.com/",
        },
      ],
      statusText,
    });
  });
});

/**
 * Transcript entry追加のテストスイート。
 */
describe("appendBookmarkCliTranscriptEntry", (): void => {
  /**
   * Transcript entryを末尾へ追加できることを検証。
   */
  it("appends a transcript entry", (): void => {
    const firstEntry = createTranscriptEntry(firstFixtureIndex);
    const secondEntry = createTranscriptEntry(secondFixtureIndex);

    expect(appendBookmarkCliTranscriptEntry([firstEntry], secondEntry)).toStrictEqual([
      firstEntry,
      secondEntry,
    ]);
  });

  /**
   * Transcript entryの保持件数を制限することを検証。
   */
  it("keeps latest transcript entries within limit", (): void => {
    const entries = Array.from({ length: transcriptEntryLimit }, (_value, index) =>
      createTranscriptEntry(index),
    );
    const nextEntry = createTranscriptEntry(transcriptEntryLimit);

    const nextEntries = appendBookmarkCliTranscriptEntry(entries, nextEntry);

    expect(nextEntries).toHaveLength(transcriptEntryLimit);
    expect(nextEntries[firstEntryIndex]?.id).toBe(firstRetainedEntryId);
    expect(nextEntries.at(latestEntryIndex)?.id).toBe(latestRetainedEntryId);
  });
});

/**
 * Transcript entry削除のテストスイート。
 */
describe("clearBookmarkCliTranscriptEntries", (): void => {
  /**
   * Transcript entryを空にできることを検証。
   */
  it("clears transcript entries", (): void => {
    expect(
      clearBookmarkCliTranscriptEntries([createTranscriptEntry(firstFixtureIndex)]),
    ).toStrictEqual([]);
  });
});
