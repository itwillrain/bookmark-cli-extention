import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";

/** ESLint の対象から除外する生成物や外部ドキュメントです。 */
const ignoredPaths = [
  ".output/**",
  ".pnpm-store/**",
  ".wxt/**",
  "dist/**",
  "docs/**",
  "node_modules/**",
];

/** JSDoc の存在を必須にする TypeScript AST セレクターです。 */
const requiredJsdocContexts = [
  "ArrowFunctionExpression",
  "ClassDeclaration",
  "ClassExpression",
  "FunctionDeclaration",
  "FunctionExpression",
  "MethodDefinition",
  "PropertyDefinition",
  "TSInterfaceDeclaration",
  "TSTypeAliasDeclaration",
  "TSEnumDeclaration",
  "VariableDeclaration[kind='const']",
];

/** ESLint の flat config です。 */
export default defineConfig(
  {
    ignores: ignoredPaths,
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsdoc.configs["flat/recommended-typescript-error"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      jsdoc,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "jsdoc/no-types": "off",
      "jsdoc/require-description": "error",
      "jsdoc/require-jsdoc": [
        "error",
        {
          checkConstructors: true,
          checkGetters: true,
          checkSetters: true,
          contexts: requiredJsdocContexts,
          enableFixer: false,
          publicOnly: false,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": [
        "error",
        {
          forceRequireReturn: true,
          forceReturnsWithAsync: true,
        },
      ],
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-throws": "error",
    },
  },
);
