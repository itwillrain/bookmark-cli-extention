import { describe, expect, it } from "vitest";

/**
 * テスト環境の基本的な算術検証に使う左辺の数値です。
 */
const addend = 1;

/**
 * テスト環境の基本的な算術検証に使う右辺の数値です。
 */
const augend = 1;

/**
 * テスト環境の基本的な算術検証に使う加算結果です。
 */
const expectedSum = 2;

/**
 * Vitest の起動確認用テストスイートです。
 */
describe("test environment", (): void => {
  /**
   * Vitest の assertion が実行されることを検証します。
   */
  it("runs a smoke test", (): void => {
    expect(addend + augend).toBe(expectedSum);
  });
});
