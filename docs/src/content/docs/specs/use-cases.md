---
title: ユースケース
description: Bookmark CLI Extension v1 でユーザーが達成したい操作と完了条件を整理します。
---

# ユースケース

このページでは、Bookmark CLI Extension v1のユースケースを定義します。

ユースケースはApplication層のuse case設計と、実装ロードマップの受け入れ条件に対応します。

## 方針

ユーザーはChrome Bookmark Managerを直接開かず、Dedicated extension page上の疑似CLIからBookmarkを操作します。

v1では、検索して開く流れと、Bookmark Treeを移動する流れを中心にします。

現在タブの保存、仮想タグ付け、安全な整理もv1の主要ユースケースとして扱います。

Chrome履歴統合とOSターミナル連携はv1に含めません。

## アクター

主アクターはBookmarkを日常的に検索、保存、整理するユーザーです。

外部システムはChrome Bookmark Manager、Chrome Bookmarks API、Chrome Extensions Storage APIです。

## ユースケース一覧

| ID    | 名前                     | 主なコマンド                       | Roadmap slice |
| ----- | ------------------------ | ---------------------------------- | ------------- |
| UC-01 | Bookmarkを検索する       | `find`                             | Slice 1       |
| UC-02 | Bookmarkを開く           | `go`                               | Slice 1       |
| UC-03 | Bookmark Treeを移動する  | `ls`, `cd`, `pwd`, `tree`          | Slice 2       |
| UC-04 | CLI状態を復元する        | command history, current directory | Slice 3       |
| UC-05 | 現在タブを保存する       | `mark`                             | Slice 4       |
| UC-06 | 仮想タグで分類する       | `tag`, `find #tag`, `go #tag`      | Slice 5       |
| UC-07 | Bookmarkを安全に整理する | `mkdir`, `mv`, `rm`, `rename`      | Slice 6       |
| UC-08 | 利用頻度から再訪する     | `recent`, `freq`                   | Slice 7       |
| UC-09 | 疑似CLIを快適に操作する  | hot key, keybinding, result view   | Slice 7       |

## UC-01: Bookmarkを検索する

ユーザーはうろ覚えのtitle、url、folder path、仮想タグからBookmarkを探します。

主コマンドは `find` です。

```bash
find stripe
find #finance stripe
```

事前条件は、Chrome Bookmark ManagerにBookmarkが存在することです。

基本フローは次のとおりです。

1. ユーザーが `find <query>` を入力する
2. Application層がBookmark Treeを取得する
3. Domain層がBookmark Treeを正規化する
4. Domain層がqueryを評価し、候補をscore順に並べる
5. Presentation層が番号付き結果一覧を表示する

完了条件は、一致したBookmarkが番号付き一覧で表示されることです。

候補がない場合は `not_found` を返します。

## UC-02: Bookmarkを開く

ユーザーはqueryにもっとも一致するBookmarkを素早く開きます。

主コマンドは `go` です。

```bash
go github pr
go #prod admin
```

基本フローは次のとおりです。

1. ユーザーが `go <query>` を入力する
2. Application層が `find` と同じ検索評価を実行する
3. 最上位候補が明確な場合は、そのBookmark URLを開く
4. 候補が曖昧な場合は、番号付き一覧を表示して選択を求める
5. 疑似CLIから開いた利用統計を更新する

完了条件は、該当Bookmarkが新しいtabまたは既存tabで開くことです。

候補がない場合は `not_found` を返します。

## UC-03: Bookmark Treeを移動する

ユーザーはBookmark Treeをfilesystemのように移動します。

主コマンドは `ls`、`cd`、`pwd`、`tree` です。

```bash
ls
cd Work/Admin
pwd
tree --depth 3
```

基本フローは次のとおりです。

1. ユーザーが現在ディレクトリを確認する
2. `ls` でfolderとBookmarkを表示する
3. `cd` でfolder pathまたは番号を指定する
4. Application層が `CurrentDirectory` を更新する
5. `pwd` や `tree` で現在地と階層を確認する

完了条件は、現在ディレクトリを基準に一覧、移動、階層表示ができることです。

存在しないfolder pathは `folder_not_found` を返します。

## UC-04: CLI状態を復元する

ユーザーは拡張機能を閉じた後も、現在ディレクトリや履歴を継続して使います。

対象は `currentDirectory`、`commandHistory`、`settings` です。

基本フローは次のとおりです。

1. Dedicated extension pageを開く
2. Application層が `chrome.storage.local` から保存状態を読み込む
3. 保存済みcurrent directoryをBookmark Treeと照合する
4. 存在する場合はcurrent directoryとして復元する
5. 存在しない場合は `/` に戻す

完了条件は、最後の現在ディレクトリとコマンド履歴が復元されることです。

保存データの読み書きに失敗した場合は `storage_failed` を返します。

## UC-05: 現在タブを保存する

ユーザーはCLI起動元タブをBookmarkとして保存します。

主コマンドは `mark` です。

```bash
mark
mark "Production Admin" --to Work/Admin
```

基本フローは次のとおりです。

1. ユーザーがhot key、popup、拡張actionからDedicated extension pageを開く
2. background entrypointがCLI起動元タブの `LaunchContext` を保存する
3. ユーザーが `mark` を入力する
4. Application層が保存先folderを解決する
5. 重複URLを検査する
6. Chrome Bookmarks APIでBookmarkを作成する

完了条件は、CLI起動元タブが指定folderへ保存されることです。

CLI起動元タブのURLまたはtitleを取得できない場合は `unsupported_tab` を返します。

保存先に同じURLが存在する場合は `already_marked` を返します。

## UC-06: 仮想タグで分類する

ユーザーはChrome Bookmark Managerを変更せず、拡張機能側のメタ情報としてBookmarkを分類します。

主コマンドは `tag`、`find #tag`、`go #tag` です。

```bash
tag 3 prod finance
find #prod
go #finance stripe
```

基本フローは次のとおりです。

1. ユーザーが番号または `current` でBookmarkを指定する
2. Application層が対象Bookmarkを解決する
3. Domain層がtag名を正規化する
4. `chrome.storage.local` にBookmark ID基準で保存する
5. `find` と `go` が `#tag` tokenを検索条件に含める

完了条件は、仮想タグの追加、削除、検索ができることです。

対象Bookmarkが存在しない場合は `not_found` を返します。

## UC-07: Bookmarkを安全に整理する

ユーザーはBookmarkやfolderを整理します。

主コマンドは `mkdir`、`mv`、`rm`、`rename` です。

```bash
mkdir Tools
mv 3 Archive --preview
rm 5 --yes
rename 3 "GitHub Pull Requests"
```

基本フローは次のとおりです。

1. ユーザーが整理系コマンドを入力する
2. Application層が対象と変更先を解決する
3. Domain層がpreviewを生成する
4. `--preview` の場合は書き込みを行わない
5. `--yes` の場合はChrome Bookmarks APIへ書き込む
6. 確認が必要な場合は `confirmation_required` とpreview内容を返す

完了条件は、破壊的操作がpreviewまたは確認付きで実行されることです。

確認が不足している場合は `confirmation_required` を返します。

## UC-08: 利用頻度から再訪する

ユーザーは疑似CLIから最近開いたBookmarkや、よく開くBookmarkへ再訪します。

主コマンドは `recent` と `freq` です。

```bash
recent
freq --limit 20
```

基本フローは次のとおりです。

1. `go` や選択操作でBookmarkを開く
2. Application層が `usageByBookmarkId` を更新する
3. `recent` は `lastOpenedAt` の降順で表示する
4. `freq` は `openCount` の降順で表示する

完了条件は、疑似CLI内の利用統計からBookmarkを再訪できることです。

Chrome履歴はv1では参照しません。

## UC-09: 疑似CLIを快適に操作する

ユーザーはキーボード中心で疑似CLIを操作します。

対象はhot key、コマンド履歴、readline風入力編集、候補補完、結果表示です。

基本フローは次のとおりです。

1. ユーザーがhot keyでDedicated extension pageを開く
2. 入力欄へ自動フォーカスする
3. 上キー、下キー、`Ctrl+p`、`Ctrl+n` で履歴を移動する
4. `Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w` で入力を編集する
5. 入力中にcommand suggestionを確認する
6. `Tab` で補完する
7. `Esc` で候補選択を解除する
8. 実行したpromptと結果がtranscriptに追加される
9. 結果一覧をPowerline風segment UIで読む

完了条件は、マウス操作なしで主要な検索、移動、保存、整理ができることです。

Fontが利用できない場合でもplain text fallbackで意味が読めるようにします。
