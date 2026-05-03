import {
  type ResultCursorIndex,
  resultCursorCleared,
} from "../../../domain/bookmarks/result-cursor";
import { BookmarkCliResultList } from "./bookmark-cli-result-list";
import type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";
import type { ReactElement } from "react";
import type { ResultViewStyle } from "../../../domain/storage/extension-state";

/**
 * Bookmark CLI transcript list props。
 */
export interface BookmarkCliTranscriptListProps {
  /** Nerd Font iconを優先するか。 */
  readonly preferNerdFont: boolean;
  /** Result表示style。 */
  readonly resultViewStyle: ResultViewStyle;
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** Transcript entry一覧。 */
  readonly transcriptEntries: readonly BookmarkCliTranscriptEntry[];
}

/** CLI promptの表示text。 */
const commandPromptText = "bookmark-cli $";

/** 空のresult item件数。 */
const emptyResultItemCount = 0;

/** 空のtranscript item件数。 */
const emptyTranscriptEntryCount = 0;

/** 最後のentryを求めるoffset。 */
const lastEntryOffset = 1;

/**
 * Transcript entryが最新かどうかを判定。
 * @param {number} entryIndex Entry index。
 * @param {number} entryCount Entry件数。
 * @returns {boolean} 最新entryならtrue。
 */
const isLatestTranscriptEntry = (entryIndex: number, entryCount: number): boolean =>
  entryIndex === entryCount - lastEntryOffset;

/**
 * Transcript entryに使うresult cursorを解決。
 * @param {boolean} isLatestEntry 最新entryならtrue。
 * @param {ResultCursorIndex} selectedResultIndex 選択中result index。
 * @returns {ResultCursorIndex} Transcript entryに渡すresult cursor。
 */
const resolveTranscriptResultCursor = (
  isLatestEntry: boolean,
  selectedResultIndex: ResultCursorIndex,
): ResultCursorIndex => {
  if (isLatestEntry) {
    return selectedResultIndex;
  }

  return resultCursorCleared;
};

/**
 * Transcript entryのresult listを描画。
 * @param {BookmarkCliTranscriptListProps} props Transcript list props。
 * @param {BookmarkCliTranscriptEntry} entry Transcript entry。
 * @param {boolean} isLatestEntry 最新entryならtrue。
 * @returns {ReactElement | false} Result list element。
 */
const renderTranscriptResultList = (
  props: BookmarkCliTranscriptListProps,
  entry: BookmarkCliTranscriptEntry,
  isLatestEntry: boolean,
): ReactElement | false => {
  if (entry.resultItems.length === emptyResultItemCount) {
    return false;
  }

  return (
    <div className="mt-2">
      <BookmarkCliResultList
        preferNerdFont={props.preferNerdFont}
        resultItems={entry.resultItems}
        resultViewStyle={props.resultViewStyle}
        selectedResultIndex={resolveTranscriptResultCursor(
          isLatestEntry,
          props.selectedResultIndex,
        )}
      />
    </div>
  );
};

/**
 * Transcript entryを描画。
 * @param {BookmarkCliTranscriptListProps} props Transcript list props。
 * @param {BookmarkCliTranscriptEntry} entry Transcript entry。
 * @param {number} entryIndex Entry index。
 * @returns {ReactElement} Transcript entry element。
 */
const renderTranscriptEntry = (
  props: BookmarkCliTranscriptListProps,
  entry: BookmarkCliTranscriptEntry,
  entryIndex: number,
): ReactElement => {
  const isLatestEntry = isLatestTranscriptEntry(entryIndex, props.transcriptEntries.length);

  return (
    <article className="pb-5" key={entry.id}>
      <p className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-2">
        <span className="whitespace-nowrap text-emerald-300">{commandPromptText}</span>
        <span className="min-w-0 truncate text-zinc-100">{entry.inputValue}</span>
        <span className="text-xs text-zinc-600">{entry.statusText}</span>
      </p>
      {renderTranscriptResultList(props, entry, isLatestEntry)}
    </article>
  );
};

/**
 * Bookmark CLI transcript listを描画。
 * @param {BookmarkCliTranscriptListProps} props Transcript list props。
 * @returns {ReactElement | false} Transcript list element。
 */
export const BookmarkCliTranscriptList = (
  props: BookmarkCliTranscriptListProps,
): ReactElement | false => {
  if (props.transcriptEntries.length === emptyTranscriptEntryCount) {
    return false;
  }

  return (
    <section aria-label="Command transcript">
      {props.transcriptEntries.map((entry, entryIndex) =>
        renderTranscriptEntry(props, entry, entryIndex),
      )}
    </section>
  );
};
