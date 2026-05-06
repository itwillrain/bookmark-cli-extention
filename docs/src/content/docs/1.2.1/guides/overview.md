---
title: 概要
description: Bookmark CLI Extension の目的と v1 スコープです。
slug: 1.2.1/guides/overview
---

# 概要

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIから管理するためのブラウザ拡張です。

Chromeに保存されたBookmarkを、拡張機能の画面上でfuzzy検索し、素早く開き、現在のタブを保存できる状態にすることを目指します。

## 目的

* Chrome Bookmark Managerの主要操作を拡張機能内の疑似CLIから実行できるようにする
* うろ覚えのキーワードから `go` でBookmarkを開けるようにする
* Bookmark Treeをコマンド入力UIで扱いやすい形式として表示、検索、更新できるようにする
* 将来的な同期、エクスポート、インポート、自動整理の土台を作る

## v1スコープ

* ブラウザ拡張としてChrome Bookmarks APIへアクセスする
* 疑似CLIからBookmarkを検索、起動、保存、整理する
* `go`、`find`、`mark`、`ls`、`cd`、`pwd`、`tree` を提供する
* `recent`、`freq`、`mkdir`、`mv`、`rm`、`rename`、`tag` を提供する
* プロダクト仕様、CLI仕様、Chrome連携仕様をdocs配下で管理する

## 設計メモ

Bookmarkは単なるURL一覧ではなく、日々の調査や作業文脈を保持する知識資産として扱います。
実装では、Bookmarkの取得や変換などの純粋関数を分離し、テストしやすい形に保ちます。

仕様は [仕様トップ](../../specs/) から読み始めます。
