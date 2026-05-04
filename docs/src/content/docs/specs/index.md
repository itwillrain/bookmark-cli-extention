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
- [コマンドリファレンス](./command-reference/)
- [エラーコード一覧](./error-codes/)
- [Chrome 連携仕様](./chrome-bookmarks/)
- [保存データ構造と権限](./storage-permissions/)
- [アーキテクチャと責務境界](./architecture/)
- [UI 実装方針](./ui-implementation/)
- [実装ロードマップ](./implementation-roadmap/)
- [Firefox対応ロードマップ](./firefox-roadmap/)
- [ChromeとFirefoxのBookmark同期ロードマップ](./cross-browser-sync/)
- [ユースケース](./use-cases/)
- [テスト方針](./testing-policy/)

## まず決めること

1. `go` と `find` のfuzzy検索体験を定義する
2. ChromeのBookmark Treeをfilesystemとして扱うための表現に落とす
3. `mark` で現在のタブを現在のディレクトリへ保存する流れを定義する
4. 拡張機能UI、コマンドパーサー、Bookmark操作の責務境界を決める
5. 整理系コマンドの即時実行と `rm` の確認を決める
6. 拡張機能側の保存データとChrome拡張権限を決める
7. Domain、Application、Infrastructure、Presentationの責務境界を決める
8. v1を動く縦切り順へ分解する
9. ユビキタス言語を固定する
10. ユーザー視点のコマンド仕様を引ける形にする
11. CommandResultのエラーコードを一覧化する
12. ユースケースをApplication層の単位として整理する
13. テスト方針を実装前に固定する
14. ReactとTailwind CSSを前提にUI実装方針を決める

## v1方針

v1では、ChromeのBookmarkを安全に読み取り、拡張機能内の入力欄からfuzzy検索で素早く開ける状態を最初の目標にします。

また、Bookmark CLIとして一通り使えるように、保存、一覧、移動、削除、名称変更、仮想タグ付けまで扱います。

`mkdir`、`mv`、`rename` は即時実行し、`rm` は確認またはforce指定で実行します。

Chrome履歴統合はv1に含め、`history`、`find`、`go` の読み取り対象として扱います。

OSターミナル連携はv1には含めず、後続未定として扱います。
