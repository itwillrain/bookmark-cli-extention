import { BookmarkCliResultFavicon } from "./bookmark-cli-result-favicon";
import type { BookmarkCliResultItem } from "./bookmark-cli-result-list-types";
import type { ReactElement } from "react";

/**
 * Result content componentのpropsです。
 */
export interface BookmarkCliResultContentProps {
  /** 表示するresult itemです。 */
  readonly item: BookmarkCliResultItem;
}

/**
 * 詳細tokenの区切り文字です。
 */
const detailTokenSeparator = " ";

/**
 * 空の詳細token一覧です。
 */
const emptyDetailTokens = [] as const satisfies readonly string[];

/**
 * 空のresult item件数です。
 */
const emptyResultItemCount = 0;

/**
 * Faviconとtitle/url stackを横並びにするclassNameです。
 */
const resultContentClassName = "flex min-w-0 items-center gap-2";

/**
 * TitleとURLを左揃えで積むclassNameです。
 */
const resultTextStackClassName = "min-w-0 flex-1";

/**
 * Result title文字列のclassNameです。
 */
const resultTitleTextClassName = "block min-w-0 truncate text-zinc-100";

/**
 * Directory result title文字列のclassNameです。
 */
const directoryResultTitleTextClassName = "block min-w-0 truncate text-sky-300";

/**
 * Tree guide文字列のclassNameです。
 */
const treePrefixTextClassName = "mr-1 whitespace-pre text-zinc-600";

/**
 * Result itemのtree prefixを描画します。
 * @param {BookmarkCliResultItem} item tree prefixを描画するresult itemです。
 * @returns {ReactElement} tree prefix表示のReact elementです。
 */
const renderTreePrefix = (item: BookmarkCliResultItem): ReactElement => {
  if (typeof item.treePrefix === "string") {
    return <span className={treePrefixTextClassName}>{item.treePrefix}</span>;
  }

  return <></>;
};

/**
 * Result title文字列のclassNameを解決します。
 * @param {BookmarkCliResultItem} item 描画するresult itemです。
 * @returns {string} Result title文字列のclassNameです。
 */
const resolveResultTitleTextClassName = (item: BookmarkCliResultItem): string => {
  if (item.kind === "folder") {
    return directoryResultTitleTextClassName;
  }

  return resultTitleTextClassName;
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
 * @returns {ReactElement} 詳細token表示のReact elementです。
 */
const renderResultDetails = (item: BookmarkCliResultItem): ReactElement => {
  const details = item.details ?? emptyDetailTokens;

  if (details.length === emptyResultItemCount) {
    return <></>;
  }

  return (
    <span className="block truncate text-xs text-zinc-500">
      {details.join(detailTokenSeparator)}
    </span>
  );
};

/**
 * Result itemのtitleを描画します。
 * @param {BookmarkCliResultItem} item titleを描画するresult itemです。
 * @returns {ReactElement} titleのReact elementです。
 */
const renderResultTitle = (item: BookmarkCliResultItem): ReactElement => (
  <span className={resolveResultTitleTextClassName(item)}>
    {renderTreePrefix(item)}
    {item.title}
  </span>
);

/**
 * Result itemのtext stackを描画します。
 * @param {BookmarkCliResultItem} item 描画するresult itemです。
 * @returns {ReactElement} text stack elementです。
 */
const renderResultTextStack = (item: BookmarkCliResultItem): ReactElement => (
  <span className={resultTextStackClassName} data-layout="result-title-url-stack">
    {renderResultTitle(item)}
    {renderResultDescription(item)}
    {renderResultDetails(item)}
    {renderResultUrl(item)}
  </span>
);

/**
 * Result itemを描画します。
 * @param {BookmarkCliResultContentProps} props Result content propsです。
 * @returns {ReactElement} Result content elementです。
 */
const renderResultContent = (props: BookmarkCliResultContentProps): ReactElement => (
  <span className={resultContentClassName} data-layout="result-favicon-and-text">
    <BookmarkCliResultFavicon item={props.item} />
    {renderResultTextStack(props.item)}
  </span>
);

/**
 * Result itemのfaviconとtext stackを描画します。
 * @param {BookmarkCliResultContentProps} props Result content propsです。
 * @returns {ReactElement} Result content elementです。
 */
export const BookmarkCliResultContent = (props: BookmarkCliResultContentProps): ReactElement =>
  renderResultContent(props);
