import { currentDirectoryRoot, getParentFolderPath, resolveFolderPath } from "./current-directory";
import { describe, expect, it } from "vitest";

/**
 * Rootから相対pathを解決する入力です。
 */
const relativePathFromRoot = "Work/Admin";

/**
 * ネストした現在ディレクトリです。
 */
const nestedCurrentDirectory = "/Work/Admin";

/**
 * 親ディレクトリを含む相対pathです。
 */
const parentRelativePath = "../Research";

/**
 * 絶対path入力です。
 */
const absolutePathInput = "/Finance/Stripe Billing";

/**
 * Root alias入力です。
 */
const rootAliasInput = "~";

/**
 * Root alias配下のpath入力です。
 */
const rootAliasPathInput = "~/Work";

/**
 * 親へ戻りすぎるpath入力です。
 */
const overParentPathInput = "../../..";

/**
 * 現在ディレクトリを示すpath入力です。
 */
const currentPathInput = ".";

/**
 * CurrentDirectory path解決のテストスイートです。
 */
describe("resolveFolderPath", (): void => {
  /**
   * Rootから相対pathを絶対pathへ解決できることを検証します。
   */
  it("resolves relative path from root", (): void => {
    expect(resolveFolderPath(currentDirectoryRoot, relativePathFromRoot)).toBe("/Work/Admin");
  });

  /**
   * 現在ディレクトリから親segmentを含むpathを解決できることを検証します。
   */
  it("resolves parent relative path from current directory", (): void => {
    expect(resolveFolderPath(nestedCurrentDirectory, parentRelativePath)).toBe("/Work/Research");
  });

  /**
   * 絶対pathを現在ディレクトリに依存せず解決できることを検証します。
   */
  it("resolves absolute path without current directory", (): void => {
    expect(resolveFolderPath(nestedCurrentDirectory, absolutePathInput)).toBe(
      "/Finance/Stripe Billing",
    );
  });

  /**
   * Root aliasをroot pathへ解決できることを検証します。
   */
  it("resolves root alias", (): void => {
    expect(resolveFolderPath(nestedCurrentDirectory, rootAliasInput)).toBe("/");
    expect(resolveFolderPath(nestedCurrentDirectory, rootAliasPathInput)).toBe("/Work");
  });

  /**
   * Rootより上へ戻るpathをroot pathへ丸めることを検証します。
   */
  it("keeps parent traversal at root", (): void => {
    expect(resolveFolderPath(currentDirectoryRoot, overParentPathInput)).toBe("/");
  });

  /**
   * 現在ディレクトリを示すpathを同じpathとして解決できることを検証します。
   */
  it("resolves current directory token", (): void => {
    expect(resolveFolderPath(nestedCurrentDirectory, currentPathInput)).toBe("/Work/Admin");
  });
});

/**
 * Parent path解決のテストスイートです。
 */
describe("getParentFolderPath", (): void => {
  /**
   * Root以外のpathから親pathを取得できることを検証します。
   */
  it("gets parent folder path", (): void => {
    expect(getParentFolderPath("/Work/Admin")).toBe("/Work");
  });

  /**
   * Rootの親pathはrootであることを検証します。
   */
  it("keeps root parent as root", (): void => {
    expect(getParentFolderPath(currentDirectoryRoot)).toBe("/");
  });
});
