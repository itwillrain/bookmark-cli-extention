import { describe, expect, it } from "vitest";
import {
  expandCommandAbbreviationOnBoundary,
  expandSubmittedCommandAbbreviation,
} from "./command-abbreviation";

/** Go abbreviation fixtureです。 */
const goAbbreviation = {
  command: "go",
  name: "g",
};

/** Long list abbreviation fixtureです。 */
const longListAbbreviation = {
  command: "ls -la",
  name: "la",
};

/** Find command入力fixtureです。 */
const findInputValue = "find stripe";

/** Command abbreviation入力fixtureです。 */
const abbreviationInputValue = "g stripe";

/** Command abbreviation展開後入力fixtureです。 */
const expandedAbbreviationInputValue = "go stripe";

/** Command abbreviation境界展開のテストスイートです。 */
describe("expandCommandAbbreviationOnBoundary", (): void => {
  /** 空白で確定された先頭command tokenを展開することを検証します。 */
  it("expands the first command token after a boundary whitespace", (): void => {
    expect(expandCommandAbbreviationOnBoundary("g ", [goAbbreviation])).toBe("go ");
  });

  /** 引数付き入力でも先頭command tokenを展開することを検証します。 */
  it("expands the first command token before arguments", (): void => {
    expect(expandCommandAbbreviationOnBoundary(abbreviationInputValue, [goAbbreviation])).toBe(
      expandedAbbreviationInputValue,
    );
  });

  /** 展開後commandが引数を含む場合も入力引数を保持することを検証します。 */
  it("keeps input arguments after an abbreviation command with arguments", (): void => {
    expect(expandCommandAbbreviationOnBoundary("la /Work", [longListAbbreviation])).toBe(
      "ls -la /Work",
    );
  });

  /** 空白で未確定の入力は展開しないことを検証します。 */
  it("keeps input before a boundary whitespace", (): void => {
    expect(expandCommandAbbreviationOnBoundary("g", [goAbbreviation])).toBe("g");
  });

  /** 対応するabbreviationが存在しない場合は入力を保持することを検証します。 */
  it("keeps input when abbreviation is missing", (): void => {
    expect(expandCommandAbbreviationOnBoundary(findInputValue, [goAbbreviation])).toBe(
      findInputValue,
    );
  });
});

/** Command abbreviation確定展開のテストスイートです。 */
describe("expandSubmittedCommandAbbreviation", (): void => {
  /** Enter確定時は空白なしのcommand tokenも展開することを検証します。 */
  it("expands the first command token on submit", (): void => {
    expect(expandSubmittedCommandAbbreviation("g", [goAbbreviation])).toBe("go");
  });

  /** Enter確定時に引数付き入力を展開することを検証します。 */
  it("expands the first command token with arguments on submit", (): void => {
    expect(expandSubmittedCommandAbbreviation(abbreviationInputValue, [goAbbreviation])).toBe(
      expandedAbbreviationInputValue,
    );
  });
});
