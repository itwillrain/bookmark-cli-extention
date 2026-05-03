import type { BookmarkCliCommandState } from "./bookmark-cli-command-state";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-result-list";

/**
 * Bookmark CLI transcript entry。
 */
export interface BookmarkCliTranscriptEntry {
  /** Entry識別子。 */
  readonly id: string;
  /** 実行したcommand入力。 */
  readonly inputValue: string;
  /** 実行結果のresult一覧。 */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /** 実行結果のstatus text。 */
  readonly statusText: string;
}

/**
 * Bookmark CLI transcript entry作成入力。
 */
export interface CreateBookmarkCliTranscriptEntryInput {
  /** 実行後command state。 */
  readonly commandState: BookmarkCliCommandState;
  /** Entry識別子。 */
  readonly id: string;
  /** 実行したcommand入力。 */
  readonly inputValue: string;
}

/** Transcriptへ残す最大entry件数。 */
const maxTranscriptEntryCount = 100;

/** Transcript末尾から保持するentry件数。 */
const retainedTranscriptEntryCount = -maxTranscriptEntryCount;

/**
 * Bookmark CLI transcript entryを作成。
 * @param {CreateBookmarkCliTranscriptEntryInput} input Transcript entry作成入力。
 * @returns {BookmarkCliTranscriptEntry} Transcript entry。
 */
export const createBookmarkCliTranscriptEntry = (
  input: CreateBookmarkCliTranscriptEntryInput,
): BookmarkCliTranscriptEntry => ({
  id: input.id,
  inputValue: input.inputValue,
  resultItems: input.commandState.resultItems,
  statusText: input.commandState.statusText,
});

/**
 * Transcriptへentryを追加。
 * @param {readonly BookmarkCliTranscriptEntry[]} entries 現在のtranscript entry一覧。
 * @param {BookmarkCliTranscriptEntry} nextEntry 追加するtranscript entry。
 * @returns {readonly BookmarkCliTranscriptEntry[]} 追加後のtranscript entry一覧。
 */
export const appendBookmarkCliTranscriptEntry = (
  entries: readonly BookmarkCliTranscriptEntry[],
  nextEntry: BookmarkCliTranscriptEntry,
): readonly BookmarkCliTranscriptEntry[] =>
  [...entries, nextEntry].slice(retainedTranscriptEntryCount);
