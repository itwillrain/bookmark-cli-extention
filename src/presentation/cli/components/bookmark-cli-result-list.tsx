/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types -- Reactのref propsに合わせるため。 */

import type {
  BookmarkCliResultItem,
  BookmarkCliResultListProps,
} from "./bookmark-cli-result-list-types";
import { type CSSProperties, type ReactElement, type RefObject, useEffect, useRef } from "react";
import { BookmarkCliResultContent } from "./bookmark-cli-result-content";
import { BookmarkCliResultSegments } from "./bookmark-cli-result-segments";
import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";
import { scrollSelectedBookmarkCliResultIntoView } from "../bookmark-cli-result-scroll";

export type {
  BookmarkCliResultItem,
  BookmarkCliResultKind,
} from "./bookmark-cli-result-list-types";

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

/** 選択中resultをscroll対象として示す属性値です。 */
const selectedResultScrollTarget = "selected-result";

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
  /** 選択中result indexです。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 選択中result item refです。 */
  readonly selectedResultItemRef: RefObject<HTMLLIElement | null>;
}

/** 選択中result itemにだけ付与するref propsです。 */
interface ResultItemRefProps {
  /** 選択中result item refです。 */
  readonly ref: RefObject<HTMLLIElement | null>;
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
 * 選択中result itemのscroll target属性を返します。
 * @param {ResultItemRenderInput} input Result item描画入力です。
 * @returns {string} Scroll target属性値です。
 */
const resolveResultScrollTarget = (input: ResultItemRenderInput): string => {
  if (isSelectedResultItem(input)) {
    return selectedResultScrollTarget;
  }

  return "";
};

/**
 * 選択中result itemへだけref propsを作ります。
 * @param {ResultItemRenderInput} input Result item描画入力です。
 * @returns {Partial<ResultItemRefProps>} 選択中item ref propsです。
 */
const createResultItemRefProps = (input: ResultItemRenderInput): Partial<ResultItemRefProps> => {
  if (isSelectedResultItem(input)) {
    return { ref: input.selectedResultItemRef };
  }

  return {};
};

/**
 * Result itemの検索scoreを描画します。
 * @param {BookmarkCliResultItem} item scoreを描画するresult itemです。
 * @returns {ReactElement} score表示のReact elementです。
 */
const renderResultScore = (item: BookmarkCliResultItem): ReactElement => {
  const scoreToken = formatScoreToken(item.score);

  if (scoreToken === "") {
    return <></>;
  }

  return <span className="text-xs text-zinc-600">{scoreToken}</span>;
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
    data-scroll-target={resolveResultScrollTarget(input)}
    key={`${formatResultNumber(input.itemIndex)}:${input.item.kind}:${input.item.folderPath}:${input.item.title}`}
    style={createResultItemStyle(input.item)}
    {...createResultItemRefProps(input)}
  >
    <BookmarkCliResultSegments
      folderPath={input.item.folderPath}
      kind={input.item.kind}
      resultNumber={formatResultNumber(input.itemIndex)}
    />
    <span className="min-w-0">
      <BookmarkCliResultContent item={input.item} />
    </span>
    {renderResultScore(input.item)}
  </li>
);

/**
 * Dedicated extension page向けBookmark CLI result listを描画します。
 * @param {BookmarkCliResultListProps} props Bookmark CLI result listのpropsです。
 * @returns {ReactElement} Result listのReact elementです。
 */
export const BookmarkCliResultList = (props: BookmarkCliResultListProps): ReactElement => {
  const selectedResultItemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    scrollSelectedBookmarkCliResultIntoView({
      selectedResultIndex: props.selectedResultIndex,
      target: selectedResultItemRef.current,
    });
  }, [props.resultItems.length, props.selectedResultIndex]);

  if (props.resultItems.length === emptyResultItemCount) {
    return <p className="py-1.5 text-sm text-zinc-600">{emptyResultText}</p>;
  }

  return (
    <ul>
      {props.resultItems.map((item, itemIndex) =>
        renderResultItem({
          item,
          itemIndex,
          selectedResultIndex: props.selectedResultIndex,
          selectedResultItemRef,
        }),
      )}
    </ul>
  );
};
