---
title: 仕様トップ
description: Bookmark CLI Extension の仕様ドキュメントの入口です。
---

# 仕様トップ

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIで扱うためのブラウザ拡張です。

このディレクトリでは、実装前に合意しておきたい仕様をdocs配下に集約します。

## 仕様一覧

- [プロダクト仕様](./product/)
- [用語集](./glossary/)
- [CLI 仕様](./cli/)
- [Chrome 連携仕様](./chrome-bookmarks/)
- [保存データ構造と権限](./storage-permissions/)
- [アーキテクチャと責務境界](./architecture/)
- [実装ロードマップ](./implementation-roadmap/)

## まず決めること

1. `go` と `find` のfuzzy検索体験を定義する
2. ChromeのBookmark Treeをfilesystemとして扱うための表現に落とす
3. `mark` で現在のタブを現在のディレクトリへ保存する流れを定義する
4. 拡張機能UI、コマンドパーサー、Bookmark操作の責務境界を決める
5. 破壊的操作は確認やpreviewを挟む
6. 拡張機能側の保存データとChrome拡張権限を決める
7. Domain、Application、Infrastructure、Presentationの責務境界を決める
8. v1を動く縦切り順へ分解する
9. ユビキタス言語を固定する

## v1方針

v1では、ChromeのBookmarkを安全に読み取り、拡張機能内の入力欄からfuzzy検索で素早く開ける状態を最初の目標にします。

また、Bookmark CLIとして一通り使えるように、保存、一覧、移動、削除、名称変更、仮想タグ付けまで扱います。

破壊的操作は確認またはpreviewを挟みます。

Chrome履歴統合とOSターミナル連携はv1には含めず、後続未定として扱います。
