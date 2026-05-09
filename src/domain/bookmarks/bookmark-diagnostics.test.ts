import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";
import { describe, expect, it } from "vitest";
import { findBookmarkDiagnostics } from "./bookmark-diagnostics";

/** 診断結果snapshotです。 */
interface BookmarkDiagnosticIssueSnapshot {
  /** Bookmark IDです。 */
  readonly bookmarkId: string;
  /** 診断group keyです。 */
  readonly groupKey: string;
  /** 診断group sizeです。 */
  readonly groupSize: number;
  /** 診断種別です。 */
  readonly kind: string;
}

/** Root parent ID fixtureです。 */
const rootParentId = "1";

/** Stripe URL fixtureです。 */
const stripeUrl = "https://dashboard.stripe.com/";

/** GitHub URL fixtureです。 */
const githubUrl = "https://github.com/";

/** GitHub docs URL fixtureです。 */
const githubDocsUrl = "https://docs.github.com/";

/** Empty title URL fixtureです。 */
const emptyTitleUrl = "https://example.com/icon-only";

/** Default doctor checks fixtureです。 */
const defaultDoctorChecks = {
  duplicateTitle: false,
  duplicateUrl: true,
  emptyTitle: true,
} as const;

/** Title duplicate checks fixtureです。 */
const duplicateTitleChecks = {
  duplicateTitle: true,
  duplicateUrl: false,
  emptyTitle: false,
} as const;

/**
 * Bookmark entry fixtureを作ります。
 * @param {Partial<BookmarkEntry>} entry 上書きするentry値です。
 * @returns {BookmarkEntry} Bookmark entry fixtureです。
 */
const createBookmarkEntry = (entry: Partial<BookmarkEntry>): BookmarkEntry => ({
  childrenCount: 0,
  folderPath: "/Work",
  id: "bookmark",
  kind: "bookmark",
  parentId: rootParentId,
  title: "Bookmark",
  url: "https://example.com/",
  ...entry,
});

/** Stripe production bookmark fixtureです。 */
const stripeProductionBookmark = createBookmarkEntry({
  folderPath: "/Work/Admin",
  id: "stripe-production",
  title: "Stripe Dashboard",
  url: stripeUrl,
});

/** Stripe finance bookmark fixtureです。 */
const stripeFinanceBookmark = createBookmarkEntry({
  folderPath: "/Finance",
  id: "stripe-finance",
  title: "Stripe Billing",
  url: stripeUrl,
});

/** Empty title bookmark fixtureです。 */
const emptyTitleBookmark = createBookmarkEntry({
  folderPath: "/Bookmarks Bar",
  id: "empty-title",
  title: "",
  url: emptyTitleUrl,
});

/** GitHub bookmark fixtureです。 */
const githubBookmark = createBookmarkEntry({
  folderPath: "/Dev",
  id: "github",
  title: "GitHub",
  url: githubUrl,
});

/** GitHub docs bookmark fixtureです。 */
const githubDocsBookmark = createBookmarkEntry({
  folderPath: "/Docs",
  id: "github-docs",
  title: " github ",
  url: githubDocsUrl,
});

/** Empty title duplicate guard bookmark fixtureです。 */
const anotherEmptyTitleBookmark = createBookmarkEntry({
  folderPath: "/Other",
  id: "another-empty-title",
  title: " ",
  url: "https://example.com/another-icon-only",
});

/** Bookmark Tree fixtureです。 */
const bookmarkTree = {
  bookmarks: [
    stripeProductionBookmark,
    stripeFinanceBookmark,
    emptyTitleBookmark,
    githubBookmark,
    githubDocsBookmark,
    anotherEmptyTitleBookmark,
  ],
  entries: [],
  folders: [],
} satisfies BookmarkTree;

/**
 * 診断結果を比較しやすいsnapshotへ変換します。
 * @param {ReturnType<typeof findBookmarkDiagnostics>} issues 診断結果です。
 * @returns {readonly BookmarkDiagnosticIssueSnapshot[]} 比較用snapshotです。
 */
const createIssueSnapshot = (
  issues: ReturnType<typeof findBookmarkDiagnostics>,
): readonly BookmarkDiagnosticIssueSnapshot[] =>
  issues.map((issue) => ({
    bookmarkId: issue.entry.id,
    groupKey: issue.groupKey,
    groupSize: issue.groupSize,
    kind: issue.kind,
  }));

/** 空titleとURL重複診断のテストスイートです。 */
describe("findBookmarkDiagnostics default checks", (): void => {
  /** 空titleと重複URLを検出できることを検証します。 */
  it("finds empty titles and duplicate URLs", (): void => {
    expect(
      createIssueSnapshot(
        findBookmarkDiagnostics({
          bookmarkTree,
          checks: defaultDoctorChecks,
        }),
      ),
    ).toStrictEqual([
      {
        bookmarkId: "empty-title",
        groupKey: "empty-title",
        groupSize: 1,
        kind: "empty_title",
      },
      {
        bookmarkId: "another-empty-title",
        groupKey: "empty-title",
        groupSize: 1,
        kind: "empty_title",
      },
      {
        bookmarkId: "stripe-production",
        groupKey: stripeUrl,
        groupSize: 2,
        kind: "duplicate_url",
      },
      {
        bookmarkId: "stripe-finance",
        groupKey: stripeUrl,
        groupSize: 2,
        kind: "duplicate_url",
      },
    ]);
  });
});

/** Title重複診断のテストスイートです。 */
describe("findBookmarkDiagnostics duplicate title checks", (): void => {
  /** Trimと大文字小文字を正規化してtitle重複を検出できることを検証します。 */
  it("finds duplicate titles by normalized title", (): void => {
    expect(
      createIssueSnapshot(
        findBookmarkDiagnostics({
          bookmarkTree,
          checks: duplicateTitleChecks,
        }),
      ),
    ).toStrictEqual([
      {
        bookmarkId: "github",
        groupKey: "github",
        groupSize: 2,
        kind: "duplicate_title",
      },
      {
        bookmarkId: "github-docs",
        groupKey: "github",
        groupSize: 2,
        kind: "duplicate_title",
      },
    ]);
  });
});
