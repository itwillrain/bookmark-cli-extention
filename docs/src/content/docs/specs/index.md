---
title: 仕様トップ
description: Bookmark CLI Extension の仕様ドキュメントの入口です。
---

# 仕様トップ

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIで扱うためのブラウザ拡張です。

このディレクトリでは、実装前に合意しておきたい仕様をdocs配下に集約します。

## 仕様一覧

- [プロダクト仕様](./product/)
- [CLI 仕様](./cli/)
- [Chrome 連携仕様](./chrome-bookmarks/)

## まず決めること

1. 疑似CLIで実行したいBookmark Managerの操作を定義する
2. ChromeのBookmark Treeを疑似CLIで扱うための表現に落とす
3. 拡張機能UI、コマンドパーサー、Bookmark操作の責務境界を決める
4. 読み取り操作から始め、破壊的操作は確認やpreviewを挟む

## 初期方針

初期実装では、ChromeのBookmarkを安全に読み取り、拡張機能内の入力欄で検索・一覧できる状態を最初の目標にします。

追加、更新、削除、移動などの書き込み操作は、仕様とテスト観点をdocsに整理してから実装します。
