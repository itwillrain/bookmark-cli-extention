import type { BookmarkCliResultKind } from "./bookmark-cli-result-list";
import type { ReactElement } from "react";
import type { ResultViewStyle } from "../../../domain/storage/extension-state";

/** Powerline separator glyph。 */
const powerlineSeparator = "";

/** Plain separator text。 */
const plainSeparator = " | ";

/** Bookmark label。 */
const bookmarkKindLabel = "URL";

/** Folder label。 */
const folderKindLabel = "DIR";

/** Preview label。 */
const previewKindLabel = "PREV";

/** Bookmark Nerd Font icon。 */
const bookmarkNerdFontIcon = "󰈙";

/** Folder Nerd Font icon。 */
const folderNerdFontIcon = "󰉋";

/** Preview Nerd Font icon。 */
const previewNerdFontIcon = "";

/** Result segment props。 */
export interface BookmarkCliResultSegmentsProps {
  /** Folder path。 */
  readonly folderPath: string;
  /** Result item kind。 */
  readonly kind: BookmarkCliResultKind;
  /** Nerd Font iconを優先するか。 */
  readonly preferNerdFont: boolean;
  /** Result number表示。 */
  readonly resultNumber: string;
  /** Result表示style。 */
  readonly resultViewStyle: ResultViewStyle;
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

  return folderKindLabel;
};

/**
 * Result itemのNerd Font iconを作る。
 * @param {BookmarkCliResultKind} kind Result item kind。
 * @returns {string} Nerd Font icon。
 */
const formatKindIcon = (kind: BookmarkCliResultKind): string => {
  if (kind === "bookmark") {
    return bookmarkNerdFontIcon;
  }

  if (kind === "preview") {
    return previewNerdFontIcon;
  }

  return folderNerdFontIcon;
};

/**
 * Result itemの表示labelを作る。
 * @param {BookmarkCliResultKind} kind Result item kind。
 * @param {boolean} preferNerdFont Nerd Font iconを優先するか。
 * @returns {string} 表示label。
 */
const createKindDisplayLabel = (kind: BookmarkCliResultKind, preferNerdFont: boolean): string => {
  if (!preferNerdFont) {
    return formatKindLabel(kind);
  }

  return `${formatKindIcon(kind)} ${formatKindLabel(kind)}`;
};

/**
 * Segment separatorを作る。
 * @param {boolean} preferNerdFont Nerd Font iconを優先するか。
 * @returns {string} Segment separator。
 */
const createSegmentSeparator = (preferNerdFont: boolean): string => {
  if (preferNerdFont) {
    return powerlineSeparator;
  }

  return plainSeparator;
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
 * Powerline風segmentを描画。
 * @param {BookmarkCliResultSegmentsProps} props Result segment props。
 * @returns {ReactElement} Powerline segment element。
 */
const PowerlineSegments = (props: BookmarkCliResultSegmentsProps): ReactElement => (
  <span className="inline-flex max-w-full overflow-hidden rounded-sm font-mono text-xs leading-5">
    <span className="bg-emerald-500 px-2 font-semibold text-zinc-950">{props.resultNumber}</span>
    <span className="bg-emerald-900 px-2 text-emerald-100">
      {createKindDisplayLabel(props.kind, props.preferNerdFont)}
    </span>
    <span className="bg-zinc-800 px-2 text-zinc-300" aria-hidden="true">
      {createSegmentSeparator(props.preferNerdFont)}
    </span>
    <span className="truncate bg-zinc-900 px-2 text-zinc-300">{props.folderPath}</span>
  </span>
);

/**
 * Result segmentを描画。
 * @param {BookmarkCliResultSegmentsProps} props Result segment props。
 * @returns {ReactElement} Result segment element。
 */
export const BookmarkCliResultSegments = (props: BookmarkCliResultSegmentsProps): ReactElement => {
  if (props.resultViewStyle === "plain") {
    return <PlainSegments {...props} />;
  }

  return <PowerlineSegments {...props} />;
};
