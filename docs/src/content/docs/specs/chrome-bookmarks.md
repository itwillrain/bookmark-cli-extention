---
title: Chrome連携仕様
description: Chrome Bookmark Manager と拡張機能内の疑似 CLI を接続するための仕様です。
---

# Chrome 連携仕様

Bookmark CLI Extensionは、ChromeのBookmarks APIとHistory APIを通してBookmark ManagerとChrome履歴の内容にアクセスします。

## 連携対象

対象はChromeのBookmark TreeとChrome履歴です。

- Bookmark
- Folder
- Root folder
- History URL

## 必要な権限

ChromeのBookmarkと履歴を扱うため、拡張機能には `bookmarks` と `history` 権限が必要です。

v1の権限全体は、[保存データ構造と権限](../storage-permissions/)で管理します。

```json
{
  "permissions": ["bookmarks", "history", "storage", "activeTab", "favicon"]
}
```

`favicon` はURL resultの小さなsite icon表示に使います。

favicon取得はChrome拡張の `/_favicon/` endpointを使い、Bookmark URLへ直接fetchしません。

## データ取得

初期実装では、Bookmark Tree全体を取得し、疑似CLI向けの正規化データへ変換します。

```ts
chrome.bookmarks.getTree();
```

Chrome履歴は `history` commandで直接一覧表示し、`find` と `go` のqueryに対しても検索します。

```ts
chrome.history.search({
  maxResults: 25,
  startTime: 0,
  text: query,
});
```

`history` commandでqueryを省略した場合は、`text: ""` で直近履歴を取得します。

History APIの検索結果はBookmark Treeへ保存せず、検索結果表示用の一時候補として扱います。

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

ChromeとFirefoxでroot node IDやroot直下containerのIDは異なります。

疑似CLIではbrowser root nodeを表示しません。

Chromeでは `Bookmarks Bar` をCLI root `/` として扱い、`Other Bookmarks`、`Mobile Bookmarks`、`Managed Bookmarks` などの他のbrowser root直下containerはCLI root直下のfolderとして表示します。

Chrome 134以降で取得できる `folderType` がある場合は、`bookmarks-bar` をCLI rootへ割り当てます。

`folderType` がない環境では、browser root直下containerの先頭をCLI rootへ割り当てます。

書き込み時は、CLI rootへ割り当てたcontainer IDをroot保存用containerとして保持します。

Chromeの通常treeでは `Bookmarks Bar` がroot保存用containerになり、`parentId` 省略による `Other Bookmarks` への保存を避けます。

## 責務境界

Chrome連携層はChrome Bookmarks APIへのアクセスを担当します。

Chrome履歴連携層はChrome History APIへの読み取りアクセスを担当します。

疑似CLI層は、入力文字列の解析、実行結果の表示、コマンド履歴を担当します。

アプリケーション層は、コマンドから呼び出されるユースケースを担当します。

Bookmark Treeの正規化や検索条件の評価は、純粋関数として実装し、テスト対象にします。

実装全体の責務境界は、[アーキテクチャと責務境界](../architecture/)で管理します。

## 書き込み操作の扱い

追加、更新、削除、移動はChrome Bookmarks APIの書き込み操作に対応します。

書き込み操作は取り消しが難しいため、初期仕様では次の制約を置きます。

- `mkdir`、`mv`、`rename` は対象と変更先を解決できた場合だけ即時実行する
- CLI root直下へ `mark`、`mkdir`、`mv` する場合はroot node IDを直接渡さず、正規化時に保持したroot保存用container IDを `parentId` にする
- `rm` は通常実行で対話確認を必須にし、`-f` または `--force` の場合だけ確認なしに実行する
- `rm` でfolderを削除する場合は `-r`、`-R`、または `--recursive` を必須にし、Bookmarks APIの `removeTree` でsubtreeごと削除する
- `Other Bookmarks`、`Mobile Bookmarks`、`Managed Bookmarks` などのbrowser管理folderは削除せず `permission_denied` を返す
- 一括操作は個別操作が安定してから追加する

## 参考

- [Chrome Extensions Bookmarks API](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
- [Chrome Extensions History API](https://developer.chrome.com/docs/extensions/reference/api/history)
- [Chrome Extensions Fetching favicons](https://developer.chrome.com/docs/extensions/how-to/ui/favicons)
