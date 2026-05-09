import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  BookmarkDiagnosticChecks,
  BookmarkDiagnosticIssue,
  BookmarkDiagnosticKind,
} from "../../domain/bookmarks/bookmark-diagnostics";
import {
  type DiagnoseBookmarksInput,
  diagnoseBookmarks,
} from "../../application/bookmarks/bookmark-diagnostics-use-case";
import type {
  DoctorBookmarkCommand,
  DupesBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";

/** 空titleの表示用labelです。 */
const emptyTitleLabel = "(empty title)";

/** 診断issueなしのstatus textです。 */
const noIssuesFoundStatusText = "No issues found";

/** 診断issueのstatus suffixです。 */
const issuesStatusSuffix = "issues";

/** 診断issueなしの件数です。 */
const emptyIssueCount = 0;

/** 件数detail prefixです。 */
const countDetailPrefix = "count=";

/** Bookmark ID detail prefixです。 */
const bookmarkIdDetailPrefix = "id=";

/** 診断種別ごとの表示labelです。 */
const diagnosticKindLabels = {
  duplicate_title: "duplicate-title",
  duplicate_url: "duplicate-url",
  empty_title: "empty-title",
} as const satisfies Readonly<Record<BookmarkDiagnosticKind, string>>;

/**
 * 件数status textを作ります。
 * @param {number} issueCount issue件数です。
 * @returns {string} 件数status textです。
 */
const createIssueCountStatusText = (issueCount: number): string =>
  `${String(issueCount)} ${issuesStatusSuffix}`;

/**
 * 診断kindの表示labelを返します。
 * @param {BookmarkDiagnosticKind} kind 診断kindです。
 * @returns {string} 表示labelです。
 */
const getDiagnosticKindLabel = (kind: BookmarkDiagnosticKind): string => diagnosticKindLabels[kind];

/**
 * 診断issueの表示titleを返します。
 * @param {BookmarkDiagnosticIssue} issue 診断issueです。
 * @returns {string} 表示titleです。
 */
const getDiagnosticIssueTitle = (issue: BookmarkDiagnosticIssue): string => {
  if (issue.kind === "empty_title") {
    return emptyTitleLabel;
  }

  return issue.entry.title;
};

/**
 * 診断issueの詳細tokenを作ります。
 * @param {BookmarkDiagnosticIssue} issue 診断issueです。
 * @returns {readonly string[]} 詳細token一覧です。
 */
const createDiagnosticIssueDetails = (issue: BookmarkDiagnosticIssue): readonly string[] => [
  `${countDetailPrefix}${String(issue.groupSize)}`,
  `${bookmarkIdDetailPrefix}${issue.entry.id}`,
];

/**
 * URL以外の診断issue result itemを作ります。
 * @param {BookmarkDiagnosticIssue} issue 診断issueです。
 * @returns {BookmarkCliResultItem} CLI result itemです。
 */
const createBaseDiagnosticResultItem = (issue: BookmarkDiagnosticIssue): BookmarkCliResultItem => ({
  description: getDiagnosticKindLabel(issue.kind),
  details: createDiagnosticIssueDetails(issue),
  folderPath: issue.entry.folderPath,
  kind: "bookmark",
  title: getDiagnosticIssueTitle(issue),
});

/**
 * 診断issueのURLをresult itemへ反映します。
 * @param {BookmarkCliResultItem} item URL反映前のresult itemです。
 * @param {BookmarkDiagnosticIssue} issue 診断issueです。
 * @returns {BookmarkCliResultItem} URL反映後のresult itemです。
 */
const applyDiagnosticIssueUrl = (
  item: BookmarkCliResultItem,
  issue: BookmarkDiagnosticIssue,
): BookmarkCliResultItem => {
  if (typeof issue.entry.url !== "string") {
    return item;
  }

  return { ...item, url: issue.entry.url };
};

/**
 * 診断issueをCLI result itemへ変換します。
 * @param {BookmarkDiagnosticIssue} issue 診断issueです。
 * @returns {BookmarkCliResultItem} CLI result itemです。
 */
const createDiagnosticResultItem = (issue: BookmarkDiagnosticIssue): BookmarkCliResultItem =>
  applyDiagnosticIssueUrl(createBaseDiagnosticResultItem(issue), issue);

/**
 * 診断use case入力を作ります。
 * @param {BookmarkDiagnosticChecks} checks 有効にする診断種別です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {DiagnoseBookmarksInput} 診断use case入力です。
 */
const createDiagnoseBookmarksInput = (
  checks: BookmarkDiagnosticChecks,
  dependencies: BookmarkCliCommandDependencies,
): DiagnoseBookmarksInput => ({
  checks,
  repository: dependencies.repository,
});

/**
 * 診断issue一覧をcommand stateへ変換します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {readonly BookmarkDiagnosticIssue[]} issues 診断issue一覧です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
const createDiagnosticCommandState = (
  dependencies: BookmarkCliCommandDependencies,
  issues: readonly BookmarkDiagnosticIssue[],
): BookmarkCliCommandState => {
  if (issues.length === emptyIssueCount) {
    return createEmptyResultState(dependencies, noIssuesFoundStatusText);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: issues.map((issue) => issue.entry),
    resultItems: issues.map((issue) => createDiagnosticResultItem(issue)),
    statusText: createIssueCountStatusText(issues.length),
  });
};

/**
 * 診断commandを実行します。
 * @param {BookmarkDiagnosticChecks} checks 有効にする診断種別です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeDiagnosticCommand = async (
  checks: BookmarkDiagnosticChecks,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await diagnoseBookmarks(createDiagnoseBookmarksInput(checks, dependencies));

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createDiagnosticCommandState(dependencies, result.value.issues);
};

/**
 * Doctor commandを実行します。
 * @param {DoctorBookmarkCommand} command Doctor commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeDoctorBookmarkCommand = async (
  command: DoctorBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const state = await executeDiagnosticCommand(command.checks, dependencies);

  return state;
};

/**
 * Dupes commandを実行します。
 * @param {DupesBookmarkCommand} command Dupes commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeDupesBookmarkCommand = async (
  command: DupesBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const state = await executeDiagnosticCommand(command.checks, dependencies);

  return state;
};
