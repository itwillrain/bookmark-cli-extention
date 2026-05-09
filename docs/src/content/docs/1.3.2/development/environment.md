---
title: 開発環境
description: Bookmark CLI Extension とドキュメントサイトの開発環境です。
slug: 1.3.2/development/environment
---

# 開発環境

このリポジトリは、拡張本体をWXT、ドキュメントをAstro Starlightで管理します。

## 拡張本体

```bash
pnpm dev
```

## ドキュメント

```bash
pnpm docs:dev
```

## ビルド

```bash
pnpm build
pnpm docs:build
```

## チェック

```bash
pnpm check
pnpm docs:build
```

`pnpm check` は、TypeScriptの型検査、コードlint、format確認をまとめて実行します。

機微情報検出は `secretlint` と `@secretlint/secretlint-rule-preset-recommend` で実行します。

`secretlint` はPR作成時のCIで実行し、通常のlocal `pnpm check` からは外します。

生成物、依存関係、lockfile、画像は `.secretlintignore` で検査対象から外します。
