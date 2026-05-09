import {
  amoSourcePackageRelativeSourcePaths,
  createAmoSourcePackageBaseName,
  createAmoSourcePackagePlan,
  createAmoSourcePackageReadme,
  createAmoSourcePackageZipFileName,
  normalizeDependencyVersionLabel,
} from "./amo-source-package-core";
import { describe, expect, it } from "vitest";

/** Test用package metadata。 */
const testMetadata = {
  packageManager: "pnpm@10.30.0",
  packageName: "bookmark-cli-extention",
  releaseVersion: "1.3.2",
  wxtVersion: "^0.20.25",
} as const;

describe("createAmoSourcePackageBaseName", () => {
  it("creates an AMO-specific source package name", () => {
    expect(createAmoSourcePackageBaseName(testMetadata)).toBe(
      "bookmark-cli-extention-1.3.2-amo-sources",
    );
  });
});

describe("createAmoSourcePackageZipFileName", () => {
  it("creates an AMO-specific source zip file name", () => {
    expect(createAmoSourcePackageZipFileName(testMetadata)).toBe(
      "bookmark-cli-extention-1.3.2-amo-sources.zip",
    );
  });
});

describe("createAmoSourcePackagePlan", () => {
  it("copies only Firefox rebuild inputs into dist staging", () => {
    const plan = createAmoSourcePackagePlan({
      metadata: testMetadata,
      repositoryRootPath: "/repo",
    });

    expect(plan.stagingDirectoryPath).toBe("/repo/dist/bookmark-cli-extention-1.3.2-amo-sources");
    expect(plan.outputZipPath).toBe("/repo/dist/bookmark-cli-extention-1.3.2-amo-sources.zip");
    expect(plan.sourceCopies.map((copy) => copy.sourcePath)).toEqual(
      amoSourcePackageRelativeSourcePaths.map((relativePath) => `/repo/${relativePath}`),
    );
  });

  it("excludes generated docs and release output directories", () => {
    expect(amoSourcePackageRelativeSourcePaths).toContain("store-assets/amo-review-notes.md");
    expect(amoSourcePackageRelativeSourcePaths).not.toContain("store-assets");
    expect(amoSourcePackageRelativeSourcePaths).not.toContain("docs");
    expect(amoSourcePackageRelativeSourcePaths).not.toContain("dist");
  });
});

describe("normalizeDependencyVersionLabel", () => {
  it("removes npm range prefixes for reviewer-readable tool versions", () => {
    expect(normalizeDependencyVersionLabel("^0.20.25")).toBe("0.20.25");
    expect(normalizeDependencyVersionLabel("~0.20.25")).toBe("0.20.25");
    expect(normalizeDependencyVersionLabel("0.20.25")).toBe("0.20.25");
  });
});

describe("createAmoSourcePackageReadme", () => {
  it("documents the rebuild command and excluded bulky docs", () => {
    const readme = createAmoSourcePackageReadme(testMetadata);

    expect(readme).toContain("bookmark-cli-extention-1.3.2-firefox.zip");
    expect(readme).toContain("corepack prepare pnpm@10.30.0 --activate");
    expect(readme).toContain("pnpm run zip:firefox");
    expect(readme).toContain(
      "The repository documentation site and archived documentation snapshots are excluded",
    );
  });
});
