---
title: 用語集
description: Bookmark CLI Extension のユビキタス言語と実装上の用語をまとめます。
---

# 用語集

このページでは、Bookmark CLI Extensionで使う用語を定義します。

実装では、このページの語彙を優先して型名、関数名、テスト名を決めます。

## 方針

中心になる考え方はBookmarks as filesystemです。

Chrome Bookmark ManagerのBookmark Treeを、疑似CLI上ではfilesystemのように扱います。

Chrome Bookmark Managerに存在するBookmarkとfolderは、外部システム由来の参照対象です。

`CurrentDirectory`、`VirtualTag`、`ResultList`、`LaunchContext` は、この拡張機能が所有するDomain modelです。

## Bookmark

Chrome Bookmark Managerに保存されたURL付きnodeです。

Chrome Bookmarks APIでは、`url` を持つnodeとして扱います。

Bookmark本体の正はChrome Bookmark Managerです。

拡張機能側にはBookmark本体を複製しません。

## Folder

Bookmarkを含めるChrome Bookmark Manager上のfolderです。

Chrome Bookmarks APIでは、`url` を持たないnodeとして扱います。

疑似CLIではdirectoryとして扱います。

## Root Folder

Bookmark Treeの起点になるfolderです。

v1では `/` をBookmark Barとして扱います。

`Other Bookmarks` はv1に含めず、後続で扱います。

## Bookmark Tree

Chrome Bookmark Managerから取得するBookmarkとfolderの階層構造です。

Infrastructure層がChrome Bookmarks APIから取得し、Domain層で疑似CLI向けに正規化します。

## Bookmark Entry

疑似CLIで扱いやすい形へ正規化したBookmarkです。

`id`、`title`、`url`、`folderPath`、`parentId` などを持ちます。

検索、一覧、結果表示ではBookmark Entryを使います。

## Folder Entry

疑似CLIで扱いやすい形へ正規化したfolderです。

`id`、`title`、`folderPath`、`parentId`、`childrenCount` などを持ちます。

`ls`、`cd`、`tree` ではFolder Entryを使います。

## Folder Path

Bookmark Barを起点にしたfolderのpathです。

例は `/Work/Admin` です。

先頭の `/` は入力時に省略できます。

表示では `/` から始まる絶対pathを優先します。

## Current Directory

疑似CLIが現在いるfolderです。

`ls`、`mark`、相対path解決の基準になります。

保存時はBookmark IDを正とし、folder pathは表示用cacheとして扱います。

保存済みのBookmark IDが存在しない場合は `/` に戻します。

## Virtual Tag

Chrome Bookmark Managerには保存しない拡張機能側のtagです。

Bookmark IDをkeyとして `chrome.storage.local` に保存します。

検索時は `#prod` のようなtokenで指定します。

保存時は先頭の `#` を含めません。

## Result List

コマンド実行で表示された番号付きの結果一覧です。

`cd 2` や `mv 3 Archive` のような番号指定は、直前のResult Listを参照します。

Result Listは永続化しません。

Dedicated extension pageのセッション内だけで保持します。

## Result Item

Result Listに含まれる1件の結果です。

Bookmark Entry、Folder Entry、将来のtag表示などを、番号指定できる形へ変換したものです。

表示ではPowerline風segment UIまたはplain text fallbackへ変換します。

## Bookmark Selection

複数候補からユーザーが選ぶ対象です。

`go` の曖昧な候補、`mark` の重複URL、`mv` の対象指定などで使います。

Bookmark SelectionはUI状態であり、Chrome Bookmark Managerへ保存しません。

## Launch Context

Dedicated extension pageを開いた元タブのsnapshotです。

`tabId`、`title`、`url` を持ちます。

`mark` は実行時のactive tabではなく、Launch Contextのtabを保存対象にします。

Launch Contextは一時データです。

## Command Input

ユーザーが疑似CLIへ入力した文字列です。

例は `find stripe` や `mark --to Work/Admin` です。

Command InputはPresentation層からApplication層へ渡します。

## Command AST

Command Inputをparseした構造です。

Application層のcommand parserが生成します。

Domain層にはCommand ASTではなく、意味づけ済みの値を渡します。

## Command Result

use caseの実行結果です。

成功結果、番号付き一覧、preview、error codeなどを表します。

Presentation層はCommand Resultを画面表示へ変換します。

## Preview

書き込み操作の実行前に表示する変更予定です。

`mv`、`rm`、`rename` で使います。

Preview生成はDomain層の純粋関数として扱います。

## Use Case

ユーザーが達成したい操作をApplication層で表したものです。

例は `findBookmarks`、`goBookmark`、`markCurrentTab`、`moveBookmark` です。

Use CaseはDomain層の純粋関数とPortを組み合わせます。

## Port

Application層が外部世界へアクセスするためのinterfaceです。

Bookmark Tree取得、storage保存、tab操作、時刻取得などをPortとして扱います。

Application層はPortに依存し、Chrome APIの具体実装には依存しません。

## Adapter

Portの具体実装です。

Chrome Bookmarks API、Chrome Extensions Storage API、Tabs APIとの接続を担当します。

AdapterはInfrastructure層に配置します。

## Dedicated Extension Page

疑似CLI本体を表示する拡張機能ページです。

hot keyやpopupから開きます。

開いた後は入力欄へ自動フォーカスします。

## Popup

拡張機能のpopup UIです。

v1のpopupは設定画面として扱います。

Dedicated extension pageを開く導線も置きます。
