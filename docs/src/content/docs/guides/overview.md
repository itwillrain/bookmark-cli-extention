---
title: 概要
description: Bookmark CLI Extension の目的と初期スコープです。
---

# 概要

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIから管理するためのブラウザ拡張です。

Chromeに保存されたBookmarkを、拡張機能の画面上で検索、追加、移動、削除、整理できる状態にすることを目指します。

## 目的

- Chrome Bookmark Managerの主要操作を拡張機能内の疑似CLIから実行できるようにする
- Bookmark Treeをコマンド入力UIで扱いやすい形式として表示、検索、更新できるようにする
- 将来的な同期、エクスポート、インポート、自動整理の土台を作る

## 初期スコープ

- ブラウザ拡張としてChrome Bookmarks APIへアクセスする
- 疑似CLIから扱うためのコマンドと入出力を整理する
- プロダクト仕様、CLI仕様、Chrome連携仕様をdocs配下で管理する

## 設計メモ

Bookmarkは単なるURL一覧ではなく、日々の調査や作業文脈を保持する知識資産として扱います。
実装では、Bookmarkの取得や変換などの純粋関数を分離し、テストしやすい形に保ちます。

仕様は [仕様トップ](/bookmark-cli-extention/specs/) から読み始めます。
