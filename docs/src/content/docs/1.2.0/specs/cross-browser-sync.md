---
title: ChromeとFirefoxのBookmark同期ロードマップ
description: Bookmark CLI ExtensionでChromeとFirefoxのBookmarkを同期するための方針、制約、実装順序です。
slug: 1.2.0/specs/cross-browser-sync
---

# ChromeとFirefoxのBookmark同期ロードマップ

このページでは、後続候補としてChromeとFirefoxのBookmarkを同期するための方針を定義します。

v1.1.0はFirefox desktopでBookmark CLIを動かすことを目的にします。

同期実装では、Chrome版とFirefox版のあいだで同じBookmark Treeを保てる状態を目標にします。

## 結論

ChromeとFirefoxのBookmarkは同じ状態にできます。

ただし、Chrome拡張からFirefoxのBookmarkを直接読むことはできません。

Firefox拡張からChromeのBookmarkを直接読むこともできません。

また、`storage.sync` はChrome SyncまたはFirefox Syncの範囲で同期される拡張用storageです。

ChromeとFirefoxのあいだで同じ `storage.sync` が共有されるわけではありません。

そのため、ブラウザ間同期にはBookmark CLI Extensionが扱う同期データと、そのデータを共有する同期先が必要です。

## 同期の基本方針

Bookmark本体の正は、各ブラウザのBookmarks APIです。

拡張機能は、各ブラウザのBookmark Treeを読み取り、同期用の中間表現へ変換します。

ChromeのBookmark IDとFirefoxのBookmark IDは同じものとして扱いません。

同期データでは、拡張機能側で発行する `syncId` を使います。

各ブラウザでは、実Bookmark IDと `syncId` の対応をlocal storageへ保存します。

Bookmarkの作成、更新、移動、削除は、まず差分として検出します。

その後、同期先の状態と突き合わせて、各ブラウザのBookmarks APIへ反映します。

## 初期同期で扱う同期先

初期同期では、同期先を1つに絞って実装します。

最初の候補は、手動ファイル同期です。

手動ファイル同期では、`sync export` で同期snapshotをJSONとして出力し、別ブラウザで `sync import` します。

自動同期ではありませんが、ChromeとFirefoxのBookmark Treeを同じ状態にする最小単位として扱えます。

この方式は、外部server、外部account、追加のhost permissionを要求しません。

クラウド同期先を扱う場合は、後続versionで別途決めます。

## 初期同期で扱わない同期先

初期同期では、次の同期先を扱いません。

* 独自cloud backend
* Google Drive
* Dropbox
* iCloud
* GitHub Gist
* WebDAV
* OS native messagingを使ったlocal file常時監視
* Chrome SyncとFirefox Syncをまたいだ直接同期

これらは、認証、通信先permission、privacy policy、review説明、conflict解決の複雑さが増えるためです。

## 同期データ

同期snapshotは、次の情報を持ちます。

```json
{
  "schemaVersion": 1,
  "createdAt": "2026-05-04T00:00:00.000Z",
  "source": {
    "browser": "chrome",
    "extensionVersion": "1.2.0"
  },
  "nodes": [
    {
      "syncId": "sync_01HX...",
      "type": "url",
      "title": "Stripe Dashboard",
      "url": "https://dashboard.stripe.com/",
      "parentSyncId": "sync_01HW...",
      "path": "/Work/Admin",
      "index": 3,
      "updatedAt": "2026-05-04T00:00:00.000Z",
      "deletedAt": null
    }
  ]
}
```

`syncId` は、ブラウザのBookmark IDとは別の識別子です。

`type` は `folder` または `url` です。

`path` は人間が差分を確認するための補助情報です。

同期処理の主キーには `path` ではなく `syncId` を使います。

`deletedAt` は削除済みnodeのtombstoneです。

tombstoneは、片方のブラウザで削除したBookmarkが別ブラウザから復活しないように保存します。

## 初回同期

初回同期では、既存Bookmarkへ `syncId` が付いていません。

そのため、次の順番で対応付けます。

1. `url`、`title`、`path` が一致するBookmarkを同一候補にする
2. `url` と `path` が一致するBookmarkを同一候補にする
3. `url` だけが一致するBookmarkは重複候補として表示する
4. folderは `path` で対応付ける
5. 対応できないBookmarkには新しい `syncId` を発行する

同じURLが複数のfolderに存在する場合は、別Bookmarkとして扱います。

同じtitleで別URLのBookmarkは、別Bookmarkとして扱います。

## 差分検出

差分検出は、Bookmark Tree全体のsnapshot比較を基本にします。

Bookmarks APIのeventは補助として使います。

拡張機能が停止していた間の変更を取りこぼさないため、起動時と `sync status` 実行時には必ずBookmark Treeを再取得します。

検出する差分は次のとおりです。

* 追加
* title変更
* url変更
* folder移動
* 並び順変更
* 削除

## conflict方針

同じBookmarkに対してChromeとFirefoxの両方で変更がある場合はconflictにします。

conflictは自動解決しません。

ユーザーが `sync resolve` で採用する側を選びます。

初期同期では、次の解決だけを扱います。

* Chrome側を採用する
* Firefox側を採用する
* 両方残す
* 同期対象から外す

## CLIコマンド

初期同期では、次の同期コマンドを候補にします。

```bash
sync status
sync export ./bookmark-cli-sync.json
sync import ./bookmark-cli-sync.json
sync apply
sync resolve
sync doctor
```

`sync status` は、現在ブラウザのBookmark Treeとlocal bindingの状態を表示します。

`sync export` は、現在ブラウザのBookmark Treeから同期snapshotを生成します。

`sync import` は、同期snapshotを読み込み、反映前の差分を作ります。

`sync apply` は、import後に確定した差分をBookmarks APIへ反映します。

`sync resolve` は、conflictの解決に使います。

`sync doctor` は、壊れたbinding、存在しないBookmark ID、重複した `syncId` を検査します。

## Slice 1: 同期モデルを定義する

目的は、ChromeとFirefoxのBookmark Treeを同じDomain modelで扱える状態にすることです。

実装対象は次のとおりです。

* `SyncBookmarkNode`
* `SyncSnapshot`
* `SyncBinding`
* `SyncConflict`
* `SyncPlan`
* snapshot schema検証
* snapshot migration
* Domain modelの単体テスト

完了条件は次のとおりです。

* Chrome由来のBookmark Treeを `SyncSnapshot` へ変換できる
* Firefox由来のBookmark Treeを `SyncSnapshot` へ変換できる
* Bookmark IDを同期用IDとして使っていない
* snapshotの不正値を検出できる

## Slice 2: 手動exportを実装する

目的は、片方のブラウザから同期snapshotを取り出せる状態にすることです。

実装対象は次のとおりです。

* `sync export`
* snapshot JSON生成
* download処理
* export結果のCLI表示
* exportの単体テスト

完了条件は次のとおりです。

* Chromeで `sync export` できる
* Firefoxで `sync export` できる
* 出力されたJSONをschema検証できる
* Bookmark本体を書き換えない

## Slice 3: 手動importを実装する

目的は、別ブラウザで作成された同期snapshotを読み込める状態にすることです。

実装対象は次のとおりです。

* `sync import`
* file pickerまたは入力path相当のUI
* snapshot JSON読み込み
* import差分生成
* conflict検出
* importの単体テスト

完了条件は次のとおりです。

* ChromeでFirefox由来snapshotを読み込める
* FirefoxでChrome由来snapshotを読み込める
* 差分が即時反映されず、`sync apply` 待ちになる
* conflictがある場合は `sync apply` を止める

## Slice 4: applyを安全に実装する

目的は、importで作った差分をBookmarks APIへ反映できる状態にすることです。

実装対象は次のとおりです。

* `sync apply`
* folder作成
* Bookmark作成
* title更新
* url更新
* folder移動
* 削除反映
* applyの単体テスト

完了条件は次のとおりです。

* 追加差分を反映できる
* 更新差分を反映できる
* 移動差分を反映できる
* 削除差分を反映できる
* 途中失敗時にCLIへ失敗内容を表示できる

## Slice 5: bindingを保存する

目的は、2回目以降の同期で同じBookmarkを安定して対応付けることです。

実装対象は次のとおりです。

* `syncBindingsByBookmarkId`
* `syncId` の重複検出
* 削除済みBookmark IDの掃除
* binding migration
* bindingの単体テスト

完了条件は次のとおりです。

* 同じBookmarkに同じ `syncId` を再利用できる
* 削除済みBookmarkのbindingを掃除できる
* bindingが壊れていても `sync doctor` で検出できる

## Slice 6: conflict解決を実装する

目的は、ChromeとFirefoxの両方で変更されたBookmarkを安全に扱うことです。

実装対象は次のとおりです。

* `sync resolve`
* Chrome側採用
* Firefox側採用
* 両方残す
* 同期対象から外す
* conflict表示
* conflict解決の単体テスト

完了条件は次のとおりです。

* conflictがある状態では `sync apply` できない
* conflictを解決すると `sync apply` できる
* 解決結果がCLI transcriptに残る

## Slice 7: manual QAを通す

目的は、実際のChromeとFirefoxで往復同期できる状態を確認することです。

実装対象は次のとおりです。

* ChromeからexportしてFirefoxへimportする
* FirefoxからexportしてChromeへimportする
* 追加の往復確認
* 更新の往復確認
* 移動の往復確認
* 削除の往復確認
* conflictの手動確認

完了条件は次のとおりです。

* ChromeとFirefoxで同じBookmark Treeを作れる
* 同期対象外のBookmarkが壊れない
* 同期後も `find`、`go`、`ls` が動く
* 既知制約がdocsに残っている

## 後続候補

手動ファイル同期が安定したあと、次の候補を検討します。

* WebDAV同期
* GitHub Gist同期
* user-owned backend同期
* end-to-end encryption
* 自動同期interval
* 差分だけのoperation log同期

## 参考

* [Chrome Extensions Bookmarks API](https://developer.chrome.com/docs/extensions/reference/api/bookmarks)
* [Chrome Extensions Storage API](https://developer.chrome.com/docs/extensions/reference/api/storage)
* [MDN WebExtensions bookmarks API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks)
* [MDN WebExtensions storage.sync](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync)
