/** Bookmark整理操作の種類。 */
export type BookmarkOrganizationAction = "mkdir" | "move" | "remove" | "rename";

/** Bookmark整理preview作成入力。 */
export interface BookmarkOrganizationPreviewInput {
  /** 整理操作の種類。 */
  readonly action: BookmarkOrganizationAction;
  /** 操作後の場所またはtitle。 */
  readonly after: string;
  /** 操作前の場所またはtitle。 */
  readonly before: string;
  /** 操作対象title。 */
  readonly title: string;
}

/** Bookmark整理preview。 */
export interface BookmarkOrganizationPreview {
  /** 整理操作の種類。 */
  readonly action: BookmarkOrganizationAction;
  /** 操作後の場所またはtitle。 */
  readonly after: string;
  /** 操作前の場所またはtitle。 */
  readonly before: string;
  /** CLI表示用の説明文。 */
  readonly description: string;
  /** 操作対象title。 */
  readonly title: string;
}

/** Preview descriptionの区切り文字。 */
const previewDescriptionSeparator = " -> ";

/**
 * Bookmark整理previewの説明文を作成。
 * @param {BookmarkOrganizationPreviewInput} input Bookmark整理preview作成入力。
 * @returns {string} Preview説明文。
 */
const createPreviewDescription = (input: BookmarkOrganizationPreviewInput): string =>
  `${input.action} ${input.title}: ${input.before}${previewDescriptionSeparator}${input.after}`;

/**
 * Bookmark整理previewを作成。
 * @param {BookmarkOrganizationPreviewInput} input Bookmark整理preview作成入力。
 * @returns {BookmarkOrganizationPreview} Bookmark整理preview。
 */
export const createBookmarkOrganizationPreview = (
  input: BookmarkOrganizationPreviewInput,
): BookmarkOrganizationPreview => ({
  action: input.action,
  after: input.after,
  before: input.before,
  description: createPreviewDescription(input),
  title: input.title,
});
