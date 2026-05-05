import {
  compareReleaseVersionsDescending,
  parseReleaseVersion,
  parseReleaseVersionArgument,
  upsertArchivedDocumentationVersion,
} from "./docs-version-archive-semver";
import { describe, expect, it } from "vitest";

describe("parseReleaseVersion", () => {
  it("accepts SemVer without v prefix", () => {
    expect(parseReleaseVersion("1.2.3")).toBe("1.2.3");
    expect(parseReleaseVersion("1.2.3-beta.1")).toBe("1.2.3-beta.1");
  });

  it("rejects missing or v-prefixed values", () => {
    expect(() => parseReleaseVersion("")).toThrow("release version is required");
    expect(() => parseReleaseVersion("v1.2.3")).toThrow("must not include the v prefix");
  });

  it("rejects non SemVer values", () => {
    expect(() => parseReleaseVersion("1.2")).toThrow("must be a SemVer value");
    expect(() => parseReleaseVersion("latest")).toThrow("must be a SemVer value");
  });
});

describe("parseReleaseVersionArgument", () => {
  it("reads the first version argument after the script separator", () => {
    expect(parseReleaseVersionArgument(["node", "script", "--", "1.2.3"])).toBe("1.2.3");
  });
});

describe("compareReleaseVersionsDescending", () => {
  it("sorts newer versions first", () => {
    expect(["1.2.0", "2.0.0", "1.10.0"].toSorted(compareReleaseVersionsDescending)).toEqual([
      "2.0.0",
      "1.10.0",
      "1.2.0",
    ]);
  });

  it("places stable release before prerelease with the same core version", () => {
    expect(["1.2.0-beta.1", "1.2.0"].toSorted(compareReleaseVersionsDescending)).toEqual([
      "1.2.0",
      "1.2.0-beta.1",
    ]);
  });
});

describe("upsertArchivedDocumentationVersion creation", () => {
  it("adds a release version with a display label", () => {
    expect(upsertArchivedDocumentationVersion([], "1.2.0")).toEqual([
      {
        label: "v1.2.0",
        slug: "1.2.0",
      },
    ]);
  });

  it("keeps an existing version entry idempotently", () => {
    expect(
      upsertArchivedDocumentationVersion(
        [
          {
            label: "stable",
            slug: "1.2.0",
          },
        ],
        "1.2.0",
      ),
    ).toEqual([
      {
        label: "stable",
        slug: "1.2.0",
      },
    ]);
  });
});

describe("upsertArchivedDocumentationVersion ordering", () => {
  it("sorts archived versions from newest to oldest", () => {
    expect(
      upsertArchivedDocumentationVersion(
        [
          {
            label: "v1.2.0",
            slug: "1.2.0",
          },
        ],
        "1.3.0",
      ),
    ).toEqual([
      {
        label: "v1.3.0",
        slug: "1.3.0",
      },
      {
        label: "v1.2.0",
        slug: "1.2.0",
      },
    ]);
  });
});
