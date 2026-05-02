import type { ReactElement } from "react";

/**
 * CLI resultの表示種別です。
 */
export type BookmarkCliResultKind = "bookmark" | "folder";

/**
 * CLI resultとして表示するitemです。
 */
export interface BookmarkCliResultItem {
  /**
   * Bookmarkまたはfolderを表す種別です。
   */
  readonly kind: BookmarkCliResultKind;
  /**
   * 表示名です。
   */
  readonly title: string;
  /**
   * Folder pathです。
   */
  readonly folderPath: string;
  /**
   * Bookmark URLです。
   */
  readonly url?: string;
  /**
   * 検索scoreです。
   */
  readonly score?: number;
}

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
 * 結果がない場合に表示するtextです。
 */
const emptyResultText = "No candidates";

/**
 * 入力欄のplaceholderです。
 */
const commandInputPlaceholder = "find stripe dashboard";

/**
 * Score表示の小数桁です。
 */
const scoreFractionDigits = 2;

/**
 * Bookmark種別の表示labelです。
 */
const bookmarkKindLabel = "url";

/**
 * Folder種別の表示labelです。
 */
const folderKindLabel = "dir";

/**
 * 空のresult item件数です。
 */
const emptyResultItemCount = 0;

/**
 * Result itemのkind labelを作ります。
 * @param {BookmarkCliResultKind} kind Result itemのkindです。
 * @returns {string} 表示用kind labelです。
 */
const formatKindLabel = (kind: BookmarkCliResultKind): string => {
  if (kind === "bookmark") {
    return bookmarkKindLabel;
  }

  return folderKindLabel;
};

/**
 * Scoreを表示用文字列へ変換します。
 * @param {number | undefined} score 検索scoreです。
 * @returns {string} 表示用scoreです。
 */
const formatScore = (score: number | undefined): string => {
  if (typeof score === "number") {
    return score.toFixed(scoreFractionDigits);
  }

  return "";
};

/**
 * Bookmark URLを描画します。
 * @param {BookmarkCliResultItem} item URLを描画するresult itemです。
 * @returns {ReactElement} URL表示のReact elementです。
 */
const renderResultUrl = (item: BookmarkCliResultItem): ReactElement => {
  if (typeof item.url === "string") {
    return <span className="block truncate text-xs text-cyan-300">{item.url}</span>;
  }

  return <></>;
};

/**
 * Bookmark CLIのresult itemを描画します。
 * @param {BookmarkCliResultItem} item 描画するresult itemです。
 * @returns {ReactElement} Result itemのReact elementです。
 */
const renderResultItem = (item: BookmarkCliResultItem): ReactElement => (
  <li
    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-800 px-4 py-3 last:border-b-0"
    key={`${item.kind}:${item.folderPath}:${item.title}`}
  >
    <span className="rounded bg-emerald-400 px-2 py-1 font-mono text-[11px] font-semibold uppercase text-zinc-950">
      {formatKindLabel(item.kind)}
    </span>
    <span className="min-w-0">
      <span className="block truncate font-medium text-zinc-100">{item.folderPath}</span>
      <span className="block truncate text-sm text-zinc-400">{item.title}</span>
      {renderResultUrl(item)}
    </span>
    <span className="font-mono text-xs text-zinc-500">{formatScore(item.score)}</span>
  </li>
);

/**
 * Bookmark CLIのresult listを描画します。
 * @param {readonly BookmarkCliResultItem[]} resultItems 描画するresult item一覧です。
 * @returns {ReactElement} Result listのReact elementです。
 */
const renderResultList = (resultItems: readonly BookmarkCliResultItem[]): ReactElement => {
  if (resultItems.length === emptyResultItemCount) {
    return <p className="px-4 py-6 text-sm text-zinc-500">{emptyResultText}</p>;
  }

  return <ul>{resultItems.map((item) => renderResultItem(item))}</ul>;
};

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
          {renderResultList(props.resultItems)}
        </section>
      </section>
    </main>
  );
};
