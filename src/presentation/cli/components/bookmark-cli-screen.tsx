import {
  BookmarkCliTerminalBody,
  type BookmarkCliTerminalBodyProps,
} from "./bookmark-cli-terminal-body";
import type { ReactElement } from "react";

export type { BookmarkCliResultItem, BookmarkCliResultKind } from "./bookmark-cli-result-list";
export type { BookmarkCliSuggestionItem } from "./bookmark-cli-suggestion-list";
export type { CommandInputElement, CommandInputKeyEvent } from "./bookmark-cli-command-form";
export type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";

/**
 * Bookmark CLI画面のpropsです。
 */
export interface BookmarkCliScreenProps extends BookmarkCliTerminalBodyProps {
  /**
   * Dedicated window titleなど、外側のchromeへ渡すstatus textです。
   */
  readonly statusText: string;
}

/**
 * Dedicated extension page向けBookmark CLI画面を描画します。
 * @param {BookmarkCliScreenProps} props Bookmark CLI画面のpropsです。
 * @returns {ReactElement} Bookmark CLI画面のReact elementです。
 */
export const BookmarkCliScreen = (props: BookmarkCliScreenProps): ReactElement => (
  <main className="flex h-screen min-h-0 bg-[#050607] text-zinc-100">
    <BookmarkCliTerminalBody {...props} />
  </main>
);
