import {
  createBookmarkCliFaviconUrl,
  resolveBookmarkCliFaviconExtensionOrigin,
} from "./bookmark-cli-favicon-url";
import { describe, expect, it } from "vitest";

/** Extension origin fixture。 */
const extensionOrigin = "chrome-extension://extension-id";

/** Bookmark URL fixture。 */
const bookmarkUrl = "https://dashboard.stripe.com/";

/** Favicon size fixture。 */
const faviconSize = 16;

/**
 * Bookmark CLI favicon URL生成のテストスイート。
 */
describe("createBookmarkCliFaviconUrl", (): void => {
  /**
   * Chrome extension favicon URLを生成することを検証。
   */
  it("creates Chrome extension favicon URL for web bookmark", (): void => {
    expect(
      createBookmarkCliFaviconUrl({
        extensionOrigin,
        pageUrl: bookmarkUrl,
        size: faviconSize,
      }),
    ).toBe(
      "chrome-extension://extension-id/_favicon/?pageUrl=https%3A%2F%2Fdashboard.stripe.com%2F&size=16",
    );
  });

  /**
   * Web URLではないBookmarkではfavicon URLを作らないことを検証。
   */
  it("returns false for non-web bookmark URL", (): void => {
    expect(
      createBookmarkCliFaviconUrl({
        extensionOrigin,
        pageUrl: "chrome://extensions/",
        size: faviconSize,
      }),
    ).toBe(false);
  });
});

/**
 * Bookmark CLI favicon origin解決のテストスイート。
 */
describe("resolveBookmarkCliFaviconExtensionOrigin", (): void => {
  /**
   * Locationがextension originでない場合はfavicon originを返さないことを検証。
   */
  it("returns false outside an extension origin", (): void => {
    expect(resolveBookmarkCliFaviconExtensionOrigin("http://localhost:6006")).toBe(false);
  });

  /**
   * Extension originだけを返すことを検証。
   */
  it("returns extension origin", (): void => {
    expect(resolveBookmarkCliFaviconExtensionOrigin(extensionOrigin)).toBe(extensionOrigin);
  });
});
