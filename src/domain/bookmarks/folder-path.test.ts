import { describe, expect, it } from "vitest";
import { joinFolderPath, normalizeFolderPathInput, rootFolderPath } from "./folder-path";

/**
 * Work folder名です。
 */
const workFolderTitle = "Work";

/**
 * Admin folder名です。
 */
const adminFolderTitle = "Admin";

/**
 * FolderPath生成のテストスイートです。
 */
describe("FolderPath", (): void => {
  /**
   * Root folder pathへfolder titleを追加できることを検証します。
   */
  it("joins root folder path and folder title", (): void => {
    expect(joinFolderPath(rootFolderPath, workFolderTitle)).toBe("/Work");
  });

  /**
   * ネストしたfolder pathへfolder titleを追加できることを検証します。
   */
  it("joins nested folder path and folder title", (): void => {
    expect(joinFolderPath("/Work", adminFolderTitle)).toBe("/Work/Admin");
  });

  /**
   * 先頭slashのない入力を絶対folder pathへ正規化できることを検証します。
   */
  it("normalizes path input without leading slash", (): void => {
    expect(normalizeFolderPathInput("Work/Admin")).toBe("/Work/Admin");
  });

  /**
   * Root aliasをroot folder pathへ正規化できることを検証します。
   */
  it("normalizes root alias", (): void => {
    expect(normalizeFolderPathInput("~")).toBe(rootFolderPath);
  });
});
