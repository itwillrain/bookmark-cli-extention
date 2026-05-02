---
title: 保存データ構造と権限
description: Bookmark CLI Extension が chrome.storage に保存するデータと Chrome 拡張権限の v1 方針です。
---

# 保存データ構造と権限

このページでは、拡張機能側に保存するデータと、v1で要求するChrome拡張権限を定義します。

Chrome Bookmark Managerに存在するBookmarkとfolderは、Chrome Bookmarks APIを正とします。

拡張機能側には、疑似CLIの状態、仮想タグ、利用統計、設定だけを保存します。

## 基本方針

Bookmark本体は `chrome.storage` に複製しません。

Bookmarkのtitle、url、folder階層は、実行時にChrome Bookmarks APIから取得します。

拡張機能側の保存データは、Bookmark IDを参照キーとして扱います。

Bookmark IDに紐づく拡張データは、起動時にBookmark Treeと照合します。

削除済みBookmarkに紐づく仮想タグと利用統計は掃除します。

保存データには `schemaVersion` を持たせます。

schemaが変わる場合はmigrationを通します。

migrationは拡張機能側の保存データだけを対象にし、Chrome Bookmark ManagerのBookmark本体は変更しません。

## 保存先

永続化するデータは `chrome.storage.local` に保存します。

`storage.sync` はv1では使いません。

Bookmark IDは端末間で同じとは限らず、`storage.sync` に同期すると仮想タグや利用統計が別端末のBookmarkへ誤って紐づく可能性があるためです。

直前の結果一覧やpreview確認中の状態は、画面内メモリまたは `chrome.storage.session` に保持します。

これらの一時データは、ブラウザ再起動、拡張のreload、Dedicated extension pageの再作成で失われてよいものとして扱います。

`window.localStorage` は使いません。

拡張機能のservice worker、Dedicated extension page、popupから同じ保存領域を扱うため、Chrome Extensions Storage APIを使います。

## `chrome.storage.local` の構造

v1では、次のtop-level keyを保存します。

```json
{
  "schemaVersion": 1,
  "currentDirectory": {
    "bookmarkId": "1",
    "folderPath": "/Work/Admin",
    "updatedAt": "2026-05-03T00:00:00.000Z"
  },
  "commandHistory": [
    {
      "input": "find stripe",
      "executedAt": "2026-05-03T00:00:00.000Z"
    }
  ],
  "virtualTagsByBookmarkId": {
    "42": ["finance", "prod"]
  },
  "usageByBookmarkId": {
    "42": {
      "openCount": 12,
      "lastOpenedAt": "2026-05-03T00:00:00.000Z"
    }
  },
  "settings": {
    "resultViewStyle": "powerline",
    "preferNerdFont": true
  }
}
```

### schemaVersion

`schemaVersion` は保存データのversionを表します。

初期値は `1` です。

保存データのshapeを変更する場合は、この値を上げます。

### currentDirectory

`currentDirectory` は疑似CLIの現在ディレクトリを表します。

`bookmarkId` を正とし、`folderPath` は表示と復元失敗時のdebug用cacheとして扱います。

起動時に `bookmarkId` が存在しない場合、現在ディレクトリは `/` に戻します。

### commandHistory

`commandHistory` はコマンド入力履歴です。

最大100件まで保存します。

連続して同じコマンドを実行した場合は重複追加しません。

保存する値は入力文字列と実行日時だけです。

実行結果は保存しません。

### virtualTagsByBookmarkId

`virtualTagsByBookmarkId` はBookmark IDごとの仮想タグです。

tag名は先頭の `#` を含めずに保存します。

tag名は小文字へ正規化し、重複を取り除き、昇順で保存します。

該当Bookmarkが削除された場合、そのBookmark IDに紐づくtag配列を削除します。

tag配列が空になった場合、そのBookmark IDのkeyも削除します。

### usageByBookmarkId

`usageByBookmarkId` は `recent` と `freq` のための利用統計です。

Bookmarkを疑似CLIから開いたタイミングで更新します。

`openCount` は疑似CLIから開いた回数です。

`lastOpenedAt` は疑似CLIから最後に開いた日時です。

Chrome履歴はv1に含めないため、ブラウザ標準UIやアドレスバーから開いた履歴は反映しません。

### settings

`settings` はユーザー設定です。

v1では結果一覧の表示スタイルとNerd Font利用方針を保存対象にします。

`resultViewStyle` は `"powerline"` または `"plain"` を扱います。

`preferNerdFont` はPowerline風表示でNerd Font互換iconを優先するかを表します。

Fontが利用できない場合でも、結果の意味はplain textへfallbackできるようにします。

## 一時データ

直前の結果一覧は永続化しません。

`cd 2` や `mv 3 Archive` の番号指定は、現在のDedicated extension pageが保持する直前の結果一覧だけを参照します。

拡張機能をreloadした場合、直前の結果一覧は復元しません。

CLI起動元タブの情報は `launchContext` として一時的に保持します。

`launchContext` には `tabId`、`title`、`url` を保存できます。

`mark` はDedicated extension page自身ではなく、CLI起動元タブを保存対象にします。

CLI起動元タブのURLまたはtitleを取得できない場合は `unsupported_tab` を返します。

## 必要な権限

v1の必須権限は `bookmarks`、`storage`、`activeTab` です。

```json
{
  "permissions": ["bookmarks", "storage", "activeTab"]
}
```

`bookmarks` はChrome Bookmark Managerの読み取り、追加、更新、移動、削除に使います。

`storage` は拡張機能側の設定、コマンド履歴、仮想タグ、利用統計を保存するために使います。

`activeTab` は、ユーザー操作で疑似CLIを開いたときに、CLI起動元タブのtitleとurlを取得するために使います。

hot keyは `commands` manifest keyで定義します。

`commands` はショートカット定義であり、v1の権限一覧には含めません。

```json
{
  "commands": {
    "open-cli": {
      "suggested_key": {
        "default": "Ctrl+Shift+K",
        "mac": "Command+Shift+K"
      },
      "description": "Open Bookmark CLI"
    }
  }
}
```

## v1で要求しない権限

`tabs` はv1では要求しません。

タブを開く、更新する、拡張ページを開くといった基本操作だけであれば、`tabs` 権限を要求しない方針にします。

現在タブのtitleやurlが必要な場面は、ユーザー操作に紐づく `activeTab` で扱います。

`history` はv1では要求しません。

Chrome履歴統合は後続未定として扱います。

`host_permissions` はv1では要求しません。

Webページ上へcontent scriptを注入しないためです。

`scripting` はv1では要求しません。

WebページのDOMを読む、CSSを注入する、scriptを実行する操作を扱わないためです。

`unlimitedStorage` はv1では要求しません。

保存対象は設定、履歴、仮想タグ、利用統計に限定し、`chrome.storage.local` の通常quota内に収めます。

## 起動時の掃除

起動時またはBookmark Tree再取得時に、拡張機能側の保存データを検証します。

`currentDirectory.bookmarkId` が存在しない場合は `/` へ戻します。

`virtualTagsByBookmarkId` のkeyが存在しないBookmark IDを指す場合は削除します。

`usageByBookmarkId` のkeyが存在しないBookmark IDを指す場合は削除します。

掃除処理は拡張機能側の保存データだけに作用します。

Chrome Bookmark Manager側のBookmarkやfolderは削除しません。

## 参考

- [Chrome Extensions Storage API](https://developer.chrome.com/docs/extensions/reference/api/storage)
- [Chrome Extensions Bookmarks API](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
- [Chrome Extensions activeTab](https://developer.chrome.com/docs/extensions/activeTab)
- [Chrome Extensions Permissions](https://developer.chrome.com/docs/extensions/reference/permissions-list)
- [Chrome Extensions Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)
