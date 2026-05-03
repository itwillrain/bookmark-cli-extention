import type { BookmarkCliResultKind } from "./bookmark-cli-result-list";
import type { ReactElement } from "react";

/** Plain separator text。 */
const plainSeparator = " | ";

/** Bookmark label。 */
const bookmarkKindLabel = "URL";

/** Folder label。 */
const folderKindLabel = "DIR";

/** Help label。 */
const helpKindLabel = "HELP";

/** Preview label。 */
const previewKindLabel = "PREV";

/** Result segment props。 */
export interface BookmarkCliResultSegmentsProps {
  /** Folder path。 */
  readonly folderPath: string;
  /** Result item kind。 */
  readonly kind: BookmarkCliResultKind;
  /** Result number表示。 */
  readonly resultNumber: string;
}

/**
 * Result itemのkind labelを作る。
 * @param {BookmarkCliResultKind} kind Result item kind。
 * @returns {string} kind label。
 */
const formatKindLabel = (kind: BookmarkCliResultKind): string => {
  if (kind === "bookmark") {
    return bookmarkKindLabel;
  }

  if (kind === "preview") {
    return previewKindLabel;
  }

  if (kind === "help") {
    return helpKindLabel;
  }

  return folderKindLabel;
};

/**
 * Plain segmentを描画。
 * @param {BookmarkCliResultSegmentsProps} props Result segment props。
 * @returns {ReactElement} Plain segment element。
 */
const PlainSegments = (props: BookmarkCliResultSegmentsProps): ReactElement => (
  <span className="block truncate text-xs text-zinc-500">
    {props.resultNumber}
    {plainSeparator}
    {formatKindLabel(props.kind)}
    {plainSeparator}
    {props.folderPath}
  </span>
);

/**
 * Result segmentを描画。
 * @param {BookmarkCliResultSegmentsProps} props Result segment props。
 * @returns {ReactElement} Result segment element。
 */
export const BookmarkCliResultSegments = (props: BookmarkCliResultSegmentsProps): ReactElement => (
  <PlainSegments {...props} />
);
