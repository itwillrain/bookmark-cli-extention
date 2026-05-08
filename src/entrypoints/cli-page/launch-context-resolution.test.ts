import { describe, expect, it } from "vitest";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { LaunchContextStoragePort } from "../../infrastructure/chrome/launch-context-storage-adapter";
import { resolveLatestLaunchContext } from "./launch-context-resolution";

/** 古いLaunchContext fixture。 */
const staleLaunchContext = {
  tabId: 1,
  title: "Old tab",
  url: "https://old.example.com/",
} satisfies LaunchContext;

/** 最新LaunchContext fixture。 */
const latestLaunchContext = {
  tabId: 2,
  title: "Latest tab",
  url: "https://latest.example.com/",
} satisfies LaunchContext;

/**
 * 最新LaunchContextを返すstorage fixtureを作成。
 * @param {LaunchContext | false} launchContext storage上のLaunchContext。
 * @returns {LaunchContextStoragePort} LaunchContext storage fixture。
 */
const createLaunchContextStorage = (
  launchContext: LaunchContext | false,
): LaunchContextStoragePort => ({
  /**
   * LaunchContextを読み込む。
   * @returns {ReturnType<LaunchContextStoragePort["readLaunchContext"]>} 読み込み結果。
   */
  readLaunchContext: async (): ReturnType<LaunchContextStoragePort["readLaunchContext"]> => {
    await Promise.resolve();

    if (launchContext === false) {
      return { ok: false };
    }

    return { ok: true, value: launchContext };
  },
  /**
   * LaunchContextを書き込む。
   * @returns {Promise<void>} 書き込み完了Promise。
   */
  writeLaunchContext: async (): Promise<void> => {
    await Promise.resolve();
  },
});

/** Resolve latest LaunchContextのテストスイート。 */
describe("resolveLatestLaunchContext", (): void => {
  /**
   * StorageのLaunchContextをstate上の古いLaunchContextより優先することを検証。
   */
  it("prefers the latest launch context from session storage", async (): Promise<void> => {
    await expect(
      resolveLatestLaunchContext({
        fallbackLaunchContext: staleLaunchContext,
        storage: createLaunchContextStorage(latestLaunchContext),
      }),
    ).resolves.toStrictEqual(latestLaunchContext);
  });

  /**
   * StorageにLaunchContextがない場合はstate上のLaunchContextを使うことを検証。
   */
  it("falls back to the current app state when storage is empty", async (): Promise<void> => {
    await expect(
      resolveLatestLaunchContext({
        fallbackLaunchContext: staleLaunchContext,
        storage: createLaunchContextStorage(false),
      }),
    ).resolves.toStrictEqual(staleLaunchContext);
  });
});
