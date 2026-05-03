/* oxlint-disable max-lines -- Result list componentと表示型を同じfileに保つため。 */

import type { CSSProperties, ReactElement } from "react";
import { BookmarkCliResultSegments } from "./bookmark-cli-result-segments";
import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";
import type { ResultViewStyle } from "../../../domain/storage/extension-state";

/**
 * CLI resultの表示種別です。
 */
export type BookmarkCliResultKind = "bookmark" | "folder" | "help" | "history" | "preview";

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
   * 補足説明です。
   */
  readonly description?: string;
  /**
   * 詳細token一覧です。
   */
  readonly details?: readonly string[];
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
}

/**
 * 結果がない場合に表示するtextです。
 */
const emptyResultText = "No output";

/**
 * Score表示の小数桁です。
 */
const scoreFractionDigits = 2;

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
 * Score表示のprefix付き文字列を作ります。
 * @param {number | undefined} score 検索scoreです。
 * @returns {string} prefix付きscoreです。
 */
const formatScoreToken = (score: number | undefined): string => {
  const formattedScore = formatScore(score);

  if (formattedScore === "") {
    return "";
  }

  return `score=${formattedScore}`;
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

/** Result item描画入力です。 */
interface ResultItemRenderInput {
  /** 描画するresult itemです。 */
  readonly item: BookmarkCliResultItem;
  /** Result itemの0-based indexです。 */
  readonly itemIndex: number;
  /** Nerd Font iconを優先するかです。 */
  readonly preferNerdFont: boolean;
  /** Result表示styleです。 */
  readonly resultViewStyle: ResultViewStyle;
  /** 選択中result indexです。 */
  readonly selectedResultIndex: ResultCursorIndex;
}

/**
 * Result itemが選択中かを判定します。
 * @param {ResultItemRenderInput} input Result item描画入力です。
 * @returns {boolean} 選択中ならtrueです。
 */
const isSelectedResultItem = (input: ResultItemRenderInput): boolean =>
  input.selectedResultIndex !== false && input.selectedResultIndex === input.itemIndex;

/**
 * Result itemのclassNameを作ります。
 * @param {ResultItemRenderInput} input Result item描画入力です。
 * @returns {string} Result item classNameです。
 */
const createResultItemClassName = (input: ResultItemRenderInput): string => {
  if (isSelectedResultItem(input)) {
    return "grid grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] items-start gap-3 rounded-sm bg-emerald-950/50 py-1.5 pr-2 text-sm ring-1 ring-emerald-700/60";
  }

  return "grid grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] items-start gap-3 py-1.5 pr-2 text-sm";
};

/**
 * Bookmark URLを描画します。
 * @param {BookmarkCliResultItem} item URLを描画するresult itemです。
 * @returns {ReactElement} URL表示のReact elementです。
 */
const renderResultUrl = (item: BookmarkCliResultItem): ReactElement => {
  if (typeof item.url === "string") {
    return <span className="block truncate text-cyan-300">{item.url}</span>;
  }

  return <></>;
};

/**
 * Result itemの補足説明を描画します。
 * @param {BookmarkCliResultItem} item 補足説明を描画するresult itemです。
 * @returns {ReactElement} 補足説明のReact elementです。
 */
const renderResultDescription = (item: BookmarkCliResultItem): ReactElement => {
  if (typeof item.description === "string") {
    return <span className="block truncate text-amber-200">{item.description}</span>;
  }

  return <></>;
};

/**
 * Result itemの詳細tokenを描画します。
 * @param {BookmarkCliResultItem} item 詳細tokenを描画するresult itemです。
 * @returns {ReactElement} 詳細tokenのReact elementです。
 */
const renderResultDetails = (item: BookmarkCliResultItem): ReactElement => {
  if (Array.isArray(item.details) && item.details.length > emptyResultItemCount) {
    return <span className="block truncate text-zinc-500">{item.details.join(" ")}</span>;
  }

  return <></>;
};

/**
 * Bookmark CLIのresult itemを描画します。
 * @param {ResultItemRenderInput} input Result item描画入力です。
 * @returns {ReactElement} Result itemのReact elementです。
 */
const renderResultItem = (input: ResultItemRenderInput): ReactElement => (
  <li
    aria-selected={isSelectedResultItem(input)}
    className={createResultItemClassName(input)}
    key={`${formatResultNumber(input.itemIndex)}:${input.item.kind}:${input.item.folderPath}:${input.item.title}`}
    style={createResultItemStyle(input.item)}
  >
    <BookmarkCliResultSegments
      folderPath={input.item.folderPath}
      kind={input.item.kind}
      preferNerdFont={input.preferNerdFont}
      resultNumber={formatResultNumber(input.itemIndex)}
      resultViewStyle={input.resultViewStyle}
    />
    <span className="min-w-0">
      <span className="block truncate text-zinc-100">{input.item.title}</span>
      {renderResultDescription(input.item)}
      {renderResultDetails(input.item)}
      {renderResultUrl(input.item)}
    </span>
    <span className="text-xs text-zinc-600">{formatScoreToken(input.item.score)}</span>
  </li>
);

/**
 * Dedicated extension page向けBookmark CLI result listを描画します。
 * @param {BookmarkCliResultListProps} props Bookmark CLI result listのpropsです。
 * @returns {ReactElement} Result listのReact elementです。
 */
export const BookmarkCliResultList = (props: BookmarkCliResultListProps): ReactElement => {
  if (props.resultItems.length === emptyResultItemCount) {
    return <p className="py-1.5 text-sm text-zinc-600">{emptyResultText}</p>;
  }

  return (
    <ul>
      {props.resultItems.map((item, itemIndex) =>
        renderResultItem({
          item,
          itemIndex,
          preferNerdFont: props.preferNerdFont,
          resultViewStyle: props.resultViewStyle,
          selectedResultIndex: props.selectedResultIndex,
        }),
      )}
    </ul>
  );
};
