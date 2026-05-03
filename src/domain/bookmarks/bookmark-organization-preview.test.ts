import { describe, expect, it } from "vitest";
import { createBookmarkOrganizationPreview } from "./bookmark-organization-preview";

/** Preview作成入力fixture。 */
const movePreviewInput = {
  action: "move",
  after: "/Archive",
  before: "/Work/Admin",
  title: "Stripe Dashboard",
} as const;

/** Bookmark整理previewのテストスイート。 */
describe("createBookmarkOrganizationPreview", (): void => {
  /**
   * 整理操作のpreview説明を生成できることを検証。
   */
  it("creates preview description", (): void => {
    expect(createBookmarkOrganizationPreview(movePreviewInput)).toStrictEqual({
      action: "move",
      after: "/Archive",
      before: "/Work/Admin",
      description: "move Stripe Dashboard: /Work/Admin -> /Archive",
      title: "Stripe Dashboard",
    });
  });
});
