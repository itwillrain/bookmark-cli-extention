import { type BookmarkCliResultItem, BookmarkCliResultList } from "./bookmark-cli-result-list";
import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
} from "./bookmark-cli-suggestion-list";
import type { ReactElement } from "react";
import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";
import type { ResultViewStyle } from "../../../domain/storage/extension-state";

export type { BookmarkCliResultItem, BookmarkCliResultKind } from "./bookmark-cli-result-list";
export type { BookmarkCliSuggestionItem } from "./bookmark-cli-suggestion-list";

/**
 * Bookmark CLI画面のpropsです。
 */
export interface BookmarkCliScreenProps {
  /**
   * CLI入力値です。
   */
  readonly inputValue: string;
  /**
   * 入力値を更新するcallbackです。
   */
  readonly onInputChange: (value: string) => void;
  /**
   * 入力欄のkey操作callbackです。
   */
  readonly onInputKeyDown: (event: CommandInputKeyEvent) => void;
  /**
   * Commandを実行するcallbackです。
   */
  readonly onSubmit: () => void;
  /**
   * Nerd Font iconを優先するかです。
   */
  readonly preferNerdFont: boolean;
  /**
   * CLI result一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Result表示styleです。
   */
  readonly resultViewStyle: ResultViewStyle;
  /**
   * 選択中result indexです。
   */
  readonly selectedResultIndex: ResultCursorIndex;
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
  /**
   * 入力中commandのsuggestion一覧です。
   */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/**
 * 入力変更eventとして扱う最小shapeです。
 */
interface InputChangeEvent {
  /**
   * 入力要素です。
   */
  readonly currentTarget: {
    /**
     * 入力値です。
     */
    readonly value: string;
  };
}

/**
 * Form submit eventとして扱う最小shapeです。
 */
interface FormSubmitEvent {
  /**
   * Browser標準のsubmit動作を止めます。
   */
  readonly preventDefault: () => void;
}

/**
 * 入力欄key eventとして扱う最小shapeです。
 */
export interface CommandInputKeyEvent {
  /**
   * Control keyが押されているかです。
   */
  readonly ctrlKey: boolean;
  /**
   * 入力要素です。
   */
  readonly currentTarget: CommandInputElement;
  /**
   * 押されたkey名です。
   */
  readonly key: string;
  /**
   * Browser標準のkey動作を止めます。
   */
  readonly preventDefault: () => void;
}

/**
 * 入力欄DOM elementとして使う最小shapeです。
 */
export interface CommandInputElement {
  /**
   * 選択範囲の終端indexです。
   */
  readonly selectionEnd: number | null;
  /**
   * 選択範囲の開始indexです。
   */
  readonly selectionStart: number | null;
  /**
   * 選択範囲を更新します。
   */
  readonly setSelectionRange: (selectionStart: number, selectionEnd: number) => void;
  /**
   * 入力値です。
   */
  readonly value: string;
}

/**
 * 入力欄のplaceholderです。
 */
const commandInputPlaceholder = "find stripe dashboard";

/**
 * CLI promptの表示textです。
 */
const commandPromptText = "bookmark-cli $";

/**
 * Terminal windowのtitleです。
 */
const terminalWindowTitle = "bookmark-cli";

/**
 * Command formのpropsです。
 */
interface CommandFormProps {
  /**
   * CLI入力値です。
   */
  readonly inputValue: string;
  /**
   * 入力値を更新するcallbackです。
   */
  readonly onInputChange: (value: string) => void;
  /**
   * 入力欄のkey操作callbackです。
   */
  readonly onInputKeyDown: (event: CommandInputKeyEvent) => void;
  /**
   * Commandを実行するcallbackです。
   */
  readonly onSubmit: () => void;
}

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
 * CLI commandのprompt formを描画します。
 * @param {CommandFormProps} props Command formのpropsです。
 * @returns {ReactElement} Prompt formのReact elementです。
 */
const CommandForm = (props: CommandFormProps): ReactElement => {
  /**
   * 入力変更を親componentへ通知します。
   * @param {InputChangeEvent} event 入力変更eventです。
   * @returns {void} 返り値はありません。
   */
  const handleInputChange = (event: InputChangeEvent): void => {
    props.onInputChange(event.currentTarget.value);
  };

  /**
   * Form submitをcommand実行へ変換します。
   * @param {FormSubmitEvent} event form submit eventです。
   * @returns {void} 返り値はありません。
   */
  const handleSubmit = (event: FormSubmitEvent): void => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-b border-zinc-900 pb-3"
      onSubmit={handleSubmit}
    >
      <label className="whitespace-nowrap text-emerald-300" htmlFor="bookmark-cli-command">
        {commandPromptText}
      </label>
      <input
        aria-label="Bookmark CLI command"
        autoFocus
        className="min-w-0 bg-transparent text-zinc-100 caret-emerald-300 outline-none placeholder:text-zinc-600"
        id="bookmark-cli-command"
        onChange={handleInputChange}
        onKeyDown={props.onInputKeyDown}
        placeholder={commandInputPlaceholder}
        spellCheck={false}
        value={props.inputValue}
      />
    </form>
  );
};

/**
 * Dedicated extension page向けBookmark CLI画面を描画します。
 * @param {BookmarkCliScreenProps} props Bookmark CLI画面のpropsです。
 * @returns {ReactElement} Bookmark CLI画面のReact elementです。
 */
export const BookmarkCliScreen = (props: BookmarkCliScreenProps): ReactElement => (
  <main className="min-h-screen bg-[#050607] text-zinc-100">
    <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-7">
      <section className="flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-md border border-zinc-800 bg-[#090b0c] shadow-2xl shadow-black/40 sm:min-h-[calc(100vh-3.5rem)]">
        <TerminalHeader statusText={props.statusText} />
        <section className="flex flex-1 flex-col px-4 py-4 font-mono text-sm leading-6 sm:px-5">
          <CommandForm
            inputValue={props.inputValue}
            onInputChange={props.onInputChange}
            onInputKeyDown={props.onInputKeyDown}
            onSubmit={props.onSubmit}
          />
          <BookmarkCliSuggestionList suggestionItems={props.suggestionItems} />
          <section className="min-h-0 flex-1 overflow-auto pt-4">
            <BookmarkCliResultList
              preferNerdFont={props.preferNerdFont}
              resultItems={props.resultItems}
              resultViewStyle={props.resultViewStyle}
              selectedResultIndex={props.selectedResultIndex}
            />
          </section>
        </section>
      </section>
    </section>
  </main>
);
