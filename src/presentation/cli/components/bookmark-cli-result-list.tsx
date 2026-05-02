import type { CSSProperties, ReactElement } from "react";

/**
 * CLI resultの表示種別です。
 */
export type BookmarkCliResultKind = "bookmark" | "folder";

/**
 * CLI resultとして表示するitemです。
 */
export interface BookmarkCliResultItem {
  /**
   * Tree表示時の階層です。
   */
  readonly depth?: number;
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
 * Bookmark CLI result listのpropsです。
 */
export interface BookmarkCliResultListProps {
  /**
   * CLI result一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
}

/**
 * 結果がない場合に表示するtextです。
 */
const emptyResultText = "No candidates";

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
 * Result number表示のoffsetです。
 */
const resultNumberOffset = 1;

/**
 * Tree表示ではないitemの基準depthです。
 */
const defaultResultItemDepth = 1;

/**
 * Tree depthごとのindent幅です。
 */
const treeIndentStepRem = 1.25;

/**
 * Indentなしの幅です。
 */
const noIndentRem = 0;

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
 * Result numberを表示用文字列へ変換します。
 * @param {number} itemIndex 0-based result item indexです。
 * @returns {string} 表示用result numberです。
 */
const formatResultNumber = (itemIndex: number): string => String(itemIndex + resultNumberOffset);

/**
 * Result itemのtree depthを取得します。
 * @param {BookmarkCliResultItem} item Result itemです。
 * @returns {number} 表示用tree depthです。
 */
const getResultItemDepth = (item: BookmarkCliResultItem): number => {
  if (typeof item.depth === "number") {
    return item.depth;
  }

  return defaultResultItemDepth;
};

/**
 * Result itemのindent幅を計算します。
 * @param {BookmarkCliResultItem} item Result itemです。
 * @returns {number} indent幅です。
 */
const getResultItemIndentRem = (item: BookmarkCliResultItem): number => {
  const depth = getResultItemDepth(item);

  if (depth <= defaultResultItemDepth) {
    return noIndentRem;
  }

  return (depth - defaultResultItemDepth) * treeIndentStepRem;
};

/**
 * Result itemのstyleを作ります。
 * @param {BookmarkCliResultItem} item Result itemです。
 * @returns {CSSProperties} Result itemのstyleです。
 */
const createResultItemStyle = (item: BookmarkCliResultItem): CSSProperties => ({
  paddingLeft: `${String(getResultItemIndentRem(item))}rem`,
});

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
 * @param {number} itemIndex Result itemの0-based indexです。
 * @returns {ReactElement} Result itemのReact elementです。
 */
const renderResultItem = (item: BookmarkCliResultItem, itemIndex: number): ReactElement => (
  <li
    className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-zinc-800 py-3 pr-4 last:border-b-0"
    key={`${formatResultNumber(itemIndex)}:${item.kind}:${item.folderPath}:${item.title}`}
    style={createResultItemStyle(item)}
  >
    <span className="w-8 text-right font-mono text-xs text-zinc-500">
      {formatResultNumber(itemIndex)}
    </span>
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
 * Dedicated extension page向けBookmark CLI result listを描画します。
 * @param {BookmarkCliResultListProps} props Bookmark CLI result listのpropsです。
 * @returns {ReactElement} Result listのReact elementです。
 */
export const BookmarkCliResultList = (props: BookmarkCliResultListProps): ReactElement => {
  if (props.resultItems.length === emptyResultItemCount) {
    return <p className="px-4 py-6 text-sm text-zinc-500">{emptyResultText}</p>;
  }

  return <ul>{props.resultItems.map((item, itemIndex) => renderResultItem(item, itemIndex))}</ul>;
};
