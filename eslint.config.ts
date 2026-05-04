import type { ESLint, Rule } from "eslint";
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";

/** ESLint の対象から除外する生成物や外部ドキュメント。 */
const ignoredPaths = [
  ".output/**",
  ".pnpm-store/**",
  ".wxt/**",
  "coverage/**",
  "dist/**",
  "docs/**",
  "node_modules/**",
  "storybook-static/**",
];

/** JSDoc の存在を必須にする TypeScript AST セレクター。 */
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
  "Program > VariableDeclaration[kind='const']",
];

/** TypeDoc向けのexampleを要求する TypeScript AST セレクター。 */
const requiredTypedocExampleContexts = [
  "ExportNamedDeclaration > FunctionDeclaration",
  "ExportNamedDeclaration > VariableDeclaration[kind='const'] > VariableDeclarator > ArrowFunctionExpression",
  "ExportNamedDeclaration > VariableDeclaration[kind='const'] > VariableDeclarator > FunctionExpression",
];

/** JSDoc commentの開始文字。 */
const jsdocCommentStart = "*";

/** 改行に一致する正規表現。 */
const lineBreakPattern = /\r?\n/u;

/** JSDoc行頭の装飾を取り除く正規表現。 */
const jsdocLinePrefixPattern = /^\s*\*\s?/u;

/** 避けたいJSDoc文末表現。 */
const desuSentenceEnding = "です。";

/** JSDoc文体lintのnamespace。 */
const jsdocStylePluginName = "bookmark-jsdoc-style";

/** JSDoc文体lint rule名。 */
const noDesuEndingJsdocRuleName = "no-desu-ending";

/** ESLint comment tokenの位置情報。 */
interface EslintCommentLocation {
  /** Comment開始位置。 */
  readonly start: {
    /** 開始行。 */
    readonly line: number;
    /** 開始桁。 */
    readonly column: number;
  };
  /** Comment終了位置。 */
  readonly end: {
    /** 終了行。 */
    readonly line: number;
    /** 終了桁。 */
    readonly column: number;
  };
}

/** ESLint comment tokenのうちruleが参照する最小shape。 */
interface EslintCommentToken {
  /** Comment位置情報。 */
  readonly loc?: EslintCommentLocation | null | undefined;
  /** Comment token種別。 */
  readonly type: string;
  /** Comment本文。 */
  readonly value: string;
}

/**
 * JSDoc commentかどうかを判定。
 * @param {EslintCommentToken} comment ESLint comment token。
 * @returns {boolean} JSDoc commentならtrue。
 */
const isJsdocComment = (comment: EslintCommentToken): boolean =>
  comment.type === "Block" && comment.value.startsWith(jsdocCommentStart);

/**
 * JSDoc comment本文を行単位へ正規化。
 * @param {EslintCommentToken} comment ESLint comment token。
 * @returns {readonly string[]} 正規化したJSDoc行。
 */
const normalizeJsdocCommentLines = (comment: EslintCommentToken): readonly string[] =>
  comment.value
    .split(lineBreakPattern)
    .map((line: string) => line.replace(jsdocLinePrefixPattern, "").trim());

/**
 * JSDoc commentが「です。」で終わる行を持つかを判定。
 * @param {EslintCommentToken} comment ESLint comment token。
 * @returns {boolean} 「です。」で終わる行を持てばtrue。
 */
const hasDesuEndingJsdocLine = (comment: EslintCommentToken): boolean =>
  normalizeJsdocCommentLines(comment).some((line) => line.endsWith(desuSentenceEnding));

/** JSDocの「です。」終わりを検出するESLint rule。 */
const noDesuEndingJsdocRule: Rule.RuleModule = {
  /**
   * JSDoc文体lintのvisitorを作成。
   * @param {Rule.RuleContext} context ESLint rule context。
   * @returns {Rule.RuleListener} ESLint visitor。
   */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- ESLint rule APIのcontext型に合わせる。
  create(context) {
    return {
      /**
       * Program全体のJSDoc commentを検査。
       * @returns {void} 返り値はありません。
       */
      // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- ESLint visitor APIのnode型に合わせる。
      Program(): void {
        for (const comment of context.sourceCode.getAllComments()) {
          if (comment.loc && isJsdocComment(comment) && hasDesuEndingJsdocLine(comment)) {
            context.report({
              loc: comment.loc,
              messageId: "avoidDesuEnding",
            });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      description: "JSDocの説明文が「です。」で終わる文体を避ける",
    },
    messages: {
      avoidDesuEnding:
        "JSDocの文末が「です。」で終わっています。名詞句や短い説明に寄せてください。",
    },
    schema: [],
    type: "suggestion",
  },
};

/** Bookmark CLI固有のESLint plugin。 */
const bookmarkCliEslintPlugin: ESLint.Plugin = {
  rules: {
    [noDesuEndingJsdocRuleName]: noDesuEndingJsdocRule,
  },
};

/** ESLint の flat config。 */
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
      [jsdocStylePluginName]: bookmarkCliEslintPlugin,
      jsdoc,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "jsdoc/no-types": "off",
      "jsdoc/require-description": "error",
      "jsdoc/require-example": "off",
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
      [`${jsdocStylePluginName}/${noDesuEndingJsdocRuleName}`]: "off",
    },
  },
  {
    files: ["src/application/**/*.ts", "src/domain/**/*.ts"],
    ignores: ["**/*.test.ts", "**/*test-helper.ts"],
    rules: {
      "jsdoc/require-example": [
        "warn",
        {
          contexts: requiredTypedocExampleContexts,
          enableFixer: false,
          exemptNoArguments: false,
          exemptedBy: ["inheritdoc", "internal"],
        },
      ],
    },
  },
);
