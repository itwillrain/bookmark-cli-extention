import {
  createOpenCliPageMessage,
  isOpenCliPageMessage,
  openCliPageMessageType,
} from "./popup-messages";
import { describe, expect, it } from "vitest";

/** Popup runtime messageのテストスイートです。 */
describe("popup runtime messages", (): void => {
  /** CLI page open messageを作ることを検証します。 */
  it("creates open cli page message", (): void => {
    expect(createOpenCliPageMessage()).toStrictEqual({ type: openCliPageMessageType });
  });

  /** CLI page open messageを判定することを検証します。 */
  it("detects open cli page message", (): void => {
    expect(isOpenCliPageMessage(createOpenCliPageMessage())).toBe(true);
    expect(isOpenCliPageMessage({ type: "other" })).toBe(false);
  });
});
