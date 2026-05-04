import { type CommandAlias, expandCommandAlias, normalizeCommandAliases } from "./command-alias";
import { describe, expect, it } from "vitest";

/** Go alias fixture。 */
const goAlias = {
  command: "go",
  name: "g",
} satisfies CommandAlias;

/** Long list alias fixture。 */
const longListAlias = {
  command: "ls -la",
  name: "la",
} satisfies CommandAlias;

/** Invalid alias fixture。 */
const invalidAlias = {
  command: "find stripe",
  name: "bad alias",
} satisfies CommandAlias;

/** Command alias正規化のテストスイート。 */
describe("normalizeCommandAliases", (): void => {
  /** 空白を丸め、有効なaliasだけ残すことを検証。 */
  it("trims and keeps valid aliases", (): void => {
    expect(
      normalizeCommandAliases([
        { command: "  go  ", name: "  g  " },
        invalidAlias,
        { command: "", name: "empty" },
      ]),
    ).toStrictEqual([goAlias]);
  });

  /** 重複aliasは後勝ちにすることを検証。 */
  it("keeps the last duplicate alias", (): void => {
    expect(
      normalizeCommandAliases([
        { command: "find", name: "f" },
        { command: "freq", name: "f" },
      ]),
    ).toStrictEqual([{ command: "freq", name: "f" }]);
  });
});

/** Command alias展開のテストスイート。 */
describe("expandCommandAlias", (): void => {
  /** 先頭command tokenをalias展開することを検証。 */
  it("expands the first command token", (): void => {
    expect(expandCommandAlias("g stripe", [goAlias])).toBe("go stripe");
  });

  /** 引数付きaliasの後ろへ入力引数を接続することを検証。 */
  it("appends input arguments after alias command", (): void => {
    expect(expandCommandAlias("la /Work", [longListAlias])).toBe("ls -la /Work");
  });

  /** Aliasが存在しない入力はそのまま返すことを検証。 */
  it("keeps input when alias is missing", (): void => {
    expect(expandCommandAlias("find stripe", [goAlias])).toBe("find stripe");
  });
});
