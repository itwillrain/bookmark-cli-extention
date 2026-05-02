import { type BookmarkCliResultItem, BookmarkCliResultList } from "./bookmark-cli-result-list";
import type { ReactElement } from "react";

export type { BookmarkCliResultItem, BookmarkCliResultKind } from "./bookmark-cli-result-list";

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
   * Commandを実行するcallbackです。
   */
  readonly onSubmit: () => void;
  /**
   * CLI result一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
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
 * 入力欄のplaceholderです。
 */
const commandInputPlaceholder = "find stripe dashboard";

/**
 * Dedicated extension page向けBookmark CLI画面を描画します。
 * @param {BookmarkCliScreenProps} props Bookmark CLI画面のpropsです。
 * @returns {ReactElement} Bookmark CLI画面のReact elementです。
 */
export const BookmarkCliScreen = (props: BookmarkCliScreenProps): ReactElement => {
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h1 className="font-mono text-lg font-semibold">Bookmark CLI</h1>
          <p className="font-mono text-xs text-zinc-500">{props.statusText}</p>
        </header>
        <form className="mt-5 flex gap-2" onSubmit={handleSubmit}>
          <input
            autoFocus
            className="min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition focus:border-emerald-400"
            onChange={handleInputChange}
            placeholder={commandInputPlaceholder}
            spellCheck={false}
            value={props.inputValue}
          />
          <button
            className="rounded bg-emerald-400 px-4 py-3 font-mono text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Run
          </button>
        </form>
        <section className="mt-5 overflow-hidden rounded border border-zinc-800 bg-zinc-900/70">
          <BookmarkCliResultList resultItems={props.resultItems} />
        </section>
      </section>
    </main>
  );
};
