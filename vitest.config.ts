import { defineConfig } from "vitest/config";
import typiaVitePlugin from "@typia/unplugin/vite";

/**
 * Vitest がテスト対象として扱うファイルの glob です。
 */
const testIncludePatterns = ["test/**/*.test.ts", "src/**/*.test.ts", "tools/**/*.test.ts"];

/**
 * Coverage の対象から除外するファイルの glob です。
 */
const coverageExcludePatterns = [
  ".wxt/**",
  "docs/**",
  "node_modules/**",
  "test/**",
  "wxt.config.ts",
];

/**
 * Vitest のVite pipelineへ追加するpluginです。
 */
const vitestVitePlugins = [typiaVitePlugin()];

/**
 * Vitest のテスト実行設定です。
 */
export default defineConfig({
  plugins: vitestVitePlugins,
  test: {
    coverage: {
      exclude: coverageExcludePatterns,
      provider: "v8",
      reporter: ["text", "html"],
    },
    environment: "node",
    globals: false,
    include: testIncludePatterns,
    restoreMocks: true,
  },
});
