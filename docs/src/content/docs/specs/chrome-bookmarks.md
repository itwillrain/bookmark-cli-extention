---
title: Chrome連携仕様
description: Chrome Bookmark Manager と拡張機能内の疑似 CLI を接続するための仕様です。
---

# Chrome 連携仕様

Bookmark CLI Extensionは、ChromeのBookmarks APIを通してBookmark Managerの内容にアクセスします。

## 連携対象

対象はChromeのBookmark Treeです。

- Bookmark
- Folder
- Root folder

## 必要な権限

ChromeのBookmarkを扱うため、拡張機能には `bookmarks` 権限が必要です。

v1の権限全体は、[保存データ構造と権限](../storage-permissions/)で管理します。

```json
{
  "permissions": ["bookmarks", "storage", "activeTab"]
}
```

## データ取得

初期実装では、Bookmark Tree全体を取得し、疑似CLI向けの正規化データへ変換します。

```ts
chrome.bookmarks.getTree();
```

## 疑似 CLI 向けの正規化

Chrome Bookmarks APIのtree nodeは階層構造です。

疑似CLIでは検索や一覧表示をしやすくするため、次の情報を持つ形へ変換します。

- `id`
- `parentId`
- `title`
- `url`
- `type`
- `folderPath`
- `childrenCount`

## 責務境界

Chrome連携層はChrome Bookmarks APIへのアクセスを担当します。

疑似CLI層は、入力文字列の解析、実行結果の表示、コマンド履歴を担当します。

アプリケーション層は、コマンドから呼び出されるユースケースを担当します。

Bookmark Treeの正規化や検索条件の評価は、純粋関数として実装し、テスト対象にします。

実装全体の責務境界は、[アーキテクチャと責務境界](../architecture/)で管理します。

## 書き込み操作の扱い

追加、更新、削除、移動はChrome Bookmarks APIの書き込み操作に対応します。

書き込み操作は取り消しが難しいため、初期仕様では次の制約を置きます。

- `--preview` で実行予定の変更を確認できる
- 削除と移動は確認を必須にする
- 一括操作は個別操作が安定してから追加する

## 参考

- [Chrome Extensions Bookmarks API](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
