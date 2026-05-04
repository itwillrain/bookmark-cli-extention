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

ChromeとFirefox間のBookmark同期でも、`storage.sync` だけには依存しません。

Chromeの `storage.sync` はChrome Sync、Firefoxの `storage.sync` はFirefox Syncを通じて同じブラウザのprofile間で同期されるためです。

ブラウザ間同期では、各ブラウザのBookmark IDとは別に `syncId` を発行し、同期snapshotを介して対応付けます。

詳細は [ChromeとFirefoxのBookmark同期ロードマップ](../cross-browser-sync/) で管理します。

直前の結果一覧や確認待ち状態は、画面内メモリまたは `chrome.storage.session` に保持します。

これらの一時データは、ブラウザ再起動、拡張のreload、Dedicated extension pageの再作成で失われてよいものとして扱います。

`window.localStorage` は使いません。

拡張機能のservice worker、Dedicated extension page、popupから同じ保存領域を扱うため、Chrome Extensions Storage APIを使います。

## `chrome.storage.local` の構造

現在は、次のtop-level keyを保存します。

```json
{
  "schemaVersion": 2,
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
    "promptStyle": "powerline",
    "preferNerdFont": false,
    "commandAliases": [
      {
        "name": "g",
        "command": "go"
      },
      {
        "name": "la",
        "command": "ls -la"
      }
    ]
  }
}
```

### schemaVersion

`schemaVersion` は保存データのversionを表します。

現在値は `2` です。

保存データのshapeを変更する場合は、この値を上げます。

## 保存データのschema検証

`chrome.storage.local` から読み込んだ値は、必ず `unknown` として扱います。

保存データのruntime validationには `typia` を使います。

typiaはstorage adapterの境界で使います。

Application層やPresentation層からtypiaを直接呼びません。

検証対象は保存データ全体を表す `ExtensionState` です。

保存データの読み込みは、次の順番で扱います。

1. `chrome.storage.local` からraw valueを読み込む
2. raw valueを `unknown` として受け取る
3. `schemaVersion` を確認する
4. versionが古い場合はmigrationを通す
5. migration後の値を `ExtensionState` として検証する
6. 検証に成功した値だけをApplication層へ渡す

`schemaVersion` がない値、未対応version、検証に失敗した値は、復旧可能な範囲で初期値へ戻します。

復旧できない場合は `storage_failed` を返します。

schema検証とmigrationは、拡張機能側の保存データだけを対象にします。

Chrome Bookmark Manager側のBookmark本体、folder、title、urlは変更しません。

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

Chrome履歴は `history`、`find`、`go` の読み取り対象として扱います。

ただし `usageByBookmarkId` は疑似CLIから開いたBookmarkだけを対象にするため、ブラウザ標準UI、アドレスバー、Chrome履歴URLのopenはBookmark利用統計へ反映しません。

### settings

`settings` はユーザー設定です。

v1ではpromptの表示スタイル、Nerd Font利用方針、command aliasを保存対象にします。

`promptStyle` は `"powerline"` または `"plain"` を扱います。

`preferNerdFont` は将来のNerd Font互換icon opt-in設定として保存します。

初期値は `false` とし、Nerd Font未導入環境でtofu文字が出ないことを優先します。

`commandAliases` はユーザー定義aliasです。

保存経路はPopup設定画面と疑似CLIの `alias` / `unalias` です。

aliasは先頭command tokenにだけ1回展開します。

たとえば `g` を `go` に設定した場合、`g stripe` は `go stripe` として実行します。

aliasの `name` は空白とpipe記号を含まない1 tokenに限定します。

aliasの `command` には引数を含められます。

たとえば `la` を `ls -la` に設定した場合、`la /Work` は `ls -la /Work` として実行します。

aliasは再帰的に展開しません。

v1の標準表示では、結果種別は `URL`、`DIR`、`HIST`、`HELP` のplain text labelで表示します。

Powerline風promptの区切りはfont glyphではなくCSS shapeで描画します。

Fontが利用できない場合でも、結果の意味はplain textで読めるようにします。

## 一時データ

直前の結果一覧は永続化しません。

`cd 2` や `mv 3 Archive` の番号指定は、現在のDedicated extension pageが保持する直前の結果一覧だけを参照します。

拡張機能をreloadした場合、直前の結果一覧は復元しません。

CLI起動元タブの情報は `launchContext` として一時的に保持します。

`launchContext` には `tabId`、`title`、`url` を保存できます。

`mark` はDedicated extension page自身ではなく、CLI起動元タブを保存対象にします。

Dedicated extension pageは別windowで開きます。

別windowで開く直前に `launchContext` を保存するため、`mark` は拡張ページ自身ではなく、ユーザーが見ていたtabを対象にできます。

CLI起動元タブのURLまたはtitleを取得できない場合は `unsupported_tab` を返します。

Dedicated extension pageは単一のpopup windowとして扱います。

hot keyまたは拡張actionで起動するたびに `chrome.windows.getAll({ populate: true })` で既存のCLI windowを探します。

既存のCLI windowが残っており、focusされていない場合は新規作成しません。

この場合は `chrome.windows.update(windowId, { focused: true })` で前面へ戻します。

hot key再押下時にCLI window自身がfocus中の場合は、`chrome.windows.remove(windowId)` でCLI windowを閉じます。

このとき `launchContext` は更新しません。

再度hot keyで開いた場合は、新しいpopup windowを作り、保存済みの `currentDirectory`、`settings`、`commandHistory` を復元します。

既存windowがユーザー操作などで閉じられている場合は新しいpopup windowを作り、保存済みの `currentDirectory`、`settings`、`commandHistory` を復元します。

CLI windowが複数見つかった場合は、先頭の1つだけを残して重複windowを閉じます。

同時に複数の起動要求が来た場合も、background側で実行中のopen taskへ合流し、window作成は1回だけにします。

既存windowが閉じられている場合は新しいpopup windowを作ります。

Chrome Extensionsの `windows` APIにはalways-on-topとしてOS上へ固定する指定がないため、v1では常時最前面固定を扱いません。

Dedicated extension page内で空promptの `Ctrl+d` を押した場合も、現在window IDを取得します。

取得には `chrome.windows.getCurrent()` を使い、`chrome.windows.remove(windowId)` で閉じます。

## 必要な権限

v1のChrome必須権限は `bookmarks`、`history`、`storage`、`activeTab`、`favicon` です。

```json
{
  "permissions": ["bookmarks", "history", "storage", "activeTab", "favicon"]
}
```

Firefox版ではChrome専用の `favicon` permissionを要求しません。

```json
{
  "permissions": ["bookmarks", "history", "storage", "activeTab"]
}
```

`bookmarks` はChrome Bookmark Managerの読み取り、追加、更新、移動、削除に使います。

`history` はChrome履歴を読み取り、`history` commandの一覧表示と `find` / `go` の候補へ含めるために使います。

Chrome履歴は読み取り専用で扱い、履歴の追加、削除、変更は行いません。

Chrome History APIの `history.search()` は `startTime` を省略すると既定で直近24時間だけを対象にするため、疑似CLIでは `startTime: 0` を明示して検索対象を全期間にします。

`storage` は拡張機能側の設定、コマンド履歴、仮想タグ、利用統計を保存するために使います。

`activeTab` は、ユーザー操作で疑似CLIを開いたときに、CLI起動元タブのtitleとurlを取得するために使います。

`favicon` は、URL resultにChromeが保持するfaviconを表示するために使います。

faviconは `chrome-extension://<extension-id>/_favicon/?pageUrl=<url>&size=<size>` のURLとして参照します。

Firefoxでは `/_favicon/` endpointを参照せず、faviconなしの表示へfallbackします。

外部favicon serviceや `host_permissions` は使いません。

`chrome.windows.create` はDedicated extension pageを別windowで開くために使います。

hot keyは `commands` manifest keyで定義します。

`commands` はショートカット定義であり、v1の権限一覧には含めません。

Popupは `chrome.commands.getAll()` で現在のshortcutを読み取ります。

Chrome Extensions Commands APIはshortcutを直接変更するAPIを提供しないため、変更操作は `chrome://extensions/shortcuts` を新しいtabで開く導線として扱います。

```json
{
  "commands": {
    "open-cli-page": {
      "suggested_key": {
        "default": "Ctrl+Shift+K",
        "mac": "Command+Shift+K"
      },
      "description": "Open Bookmark CLI"
    }
  }
}
```

ユーザーは `chrome://extensions/shortcuts` からhot keyを変更できます。

## v1で要求しない権限

`tabs` はv1では要求しません。

タブを開く、更新する、拡張ページを開くといった基本操作だけであれば、`tabs` 権限を要求しない方針にします。

現在タブのtitleやurlが必要な場面は、ユーザー操作に紐づく `activeTab` で扱います。

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
- [Chrome Extensions History API](https://developer.chrome.com/docs/extensions/reference/api/history)
- [Chrome Extensions activeTab](https://developer.chrome.com/docs/extensions/activeTab)
- [Chrome Extensions commands API](https://developer.chrome.com/docs/extensions/reference/api/commands)
- [Chrome Extensions windows API](https://developer.chrome.com/docs/extensions/reference/api/windows)
- [Chrome Extensions Fetching favicons](https://developer.chrome.com/docs/extensions/how-to/ui/favicons)
- [Chrome Extensions Permissions](https://developer.chrome.com/docs/extensions/reference/permissions-list)
- [Chrome Extensions Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)
- [MDN WebExtensions storage.sync](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync)
- [Typia Setup](https://typia.io/docs/setup/)
