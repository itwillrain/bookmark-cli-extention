import {
  type BookmarkCliTranscriptEntry,
  appendBookmarkCliTranscriptEntry,
  clearBookmarkCliTranscriptEntries,
  createBookmarkCliTranscriptEntry,
} from "../../presentation/cli/bookmark-cli-transcript";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-command-state";
import { useState } from "react";

/**
 * Bookmark CLI transcript hook戻り値。
 */
export interface UseBookmarkCliTranscriptValue {
  /** 実行済みcommand transcript。 */
  readonly transcriptEntries: readonly BookmarkCliTranscriptEntry[];
  /** 実行済みcommandをtranscriptへ追加。 */
  readonly appendExecutedCommand: (
    inputValue: string,
    commandState: BookmarkCliCommandState,
    entryId: string,
  ) => void;
  /** 実行済みcommand transcriptを削除。 */
  readonly clearExecutedCommands: () => void;
}

/** 初期transcript entry一覧。 */
const initialTranscriptEntries: readonly BookmarkCliTranscriptEntry[] = [];

/**
 * Bookmark CLI transcript stateを管理。
 * @returns {UseBookmarkCliTranscriptValue} Bookmark CLI transcript hook戻り値。
 */
export const useBookmarkCliTranscript = (): UseBookmarkCliTranscriptValue => {
  const [transcriptEntries, setTranscriptEntries] = useState(initialTranscriptEntries);

  /**
   * 実行済みcommandをtranscriptへ追加。
   * @param {string} inputValue 実行したcommand入力。
   * @param {BookmarkCliCommandState} commandState 実行後command state。
   * @param {string} entryId Transcript entry id。
   * @returns {void} 返り値なし。
   */
  const appendExecutedCommand = (
    inputValue: string,
    commandState: BookmarkCliCommandState,
    entryId: string,
  ): void => {
    setTranscriptEntries((currentEntries) =>
      appendBookmarkCliTranscriptEntry(
        currentEntries,
        createBookmarkCliTranscriptEntry({
          commandState,
          id: entryId,
          inputValue,
        }),
      ),
    );
  };

  /**
   * 実行済みcommand transcriptを削除。
   * @returns {void} 返り値なし。
   */
  const clearExecutedCommands = (): void => {
    setTranscriptEntries((currentEntries) => clearBookmarkCliTranscriptEntries(currentEntries));
  };

  return { appendExecutedCommand, clearExecutedCommands, transcriptEntries };
};
