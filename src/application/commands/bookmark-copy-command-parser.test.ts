import { describe, expect, it } from "vitest";
import { parseCopyBookmarkCommand } from "./bookmark-copy-command-parser";

/** Copy対象result numberです。 */
const resultNumberInput = "1";

/** Copy path optionです。 */
const pathOption = "--path";

/** Copy url optionです。 */
const urlOption = "--url";

/** Copy title optionです。 */
const titleOption = "--title";

/** Copy command parserのテストスイートです。 */
describe("parseCopyBookmarkCommand", (): void => {
  /** Optionなしではdefault copyとして解析することを検証します。 */
  it("parses default copy command", (): void => {
    expect(parseCopyBookmarkCommand([resultNumberInput])).toStrictEqual({
      kind: "copy",
      targetInput: resultNumberInput,
      valueKind: "default",
    });
  });

  /** Path optionを解析することを検証します。 */
  it("parses path copy option", (): void => {
    expect(parseCopyBookmarkCommand([pathOption, resultNumberInput])).toStrictEqual({
      kind: "copy",
      targetInput: resultNumberInput,
      valueKind: "path",
    });
  });

  /** URL optionを解析することを検証します。 */
  it("parses url copy option", (): void => {
    expect(parseCopyBookmarkCommand([resultNumberInput, urlOption])).toStrictEqual({
      kind: "copy",
      targetInput: resultNumberInput,
      valueKind: "url",
    });
  });

  /** Title optionを解析することを検証します。 */
  it("parses title copy option", (): void => {
    expect(parseCopyBookmarkCommand([titleOption, resultNumberInput])).toStrictEqual({
      kind: "copy",
      targetInput: resultNumberInput,
      valueKind: "title",
    });
  });
});
