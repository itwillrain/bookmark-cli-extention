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
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}

/**
 * Terminal windowのtitleです。
 */
const terminalWindowTitle = "bookmark-cli";

/**
 * Terminal headerのpropsです。
 */
interface TerminalHeaderProps {
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}

/**
 * Terminal windowのheaderを描画します。
 * @param {TerminalHeaderProps} props Terminal headerのpropsです。
 * @returns {ReactElement} Terminal headerのReact elementです。
 */
const TerminalHeader = (props: TerminalHeaderProps): ReactElement => (
  <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
    <span className="flex gap-1.5" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-red-500" />
      <span className="h-3 w-3 rounded-full bg-amber-400" />
      <span className="h-3 w-3 rounded-full bg-emerald-500" />
    </span>
    <h1 className="truncate text-center font-mono text-xs font-medium text-zinc-400">
      {terminalWindowTitle}
    </h1>
    <p className="font-mono text-xs text-zinc-500">{props.statusText}</p>
  </header>
);

/**
 * Dedicated extension page向けBookmark CLI画面を描画します。
 * @param {BookmarkCliScreenProps} props Bookmark CLI画面のpropsです。
 * @returns {ReactElement} Bookmark CLI画面のReact elementです。
 */
export const BookmarkCliScreen = (props: BookmarkCliScreenProps): ReactElement => (
  <main className="min-h-screen bg-[#050607] text-zinc-100">
    <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-7">
      <section className="flex h-[calc(100vh-2rem)] min-h-0 flex-col overflow-hidden rounded-md border border-zinc-800 bg-[#090b0c] shadow-2xl shadow-black/40 sm:h-[calc(100vh-3.5rem)]">
        <TerminalHeader statusText={props.statusText} />
        <BookmarkCliTerminalBody {...props} />
      </section>
    </section>
  </main>
);
