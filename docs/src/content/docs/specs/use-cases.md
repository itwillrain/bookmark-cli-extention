---
title: ユースケース
description: Bookmark CLI Extension v1 でユーザーが達成したい操作と完了条件を整理します。
---

# ユースケース

このページでは、Bookmark CLI Extension v1のユースケースを定義します。

ユースケースはApplication層のuse case設計と、実装ロードマップの受け入れ条件に対応します。

## 方針

ユーザーはChrome Bookmark Managerを直接開かず、Dedicated extension page上の疑似CLIからBookmarkを操作します。

v1では、検索して開く流れ、Chrome履歴から再訪する流れ、Bookmark Treeを移動する流れを中心にします。

現在タブの保存、仮想タグ付け、安全な整理もv1の主要ユースケースとして扱います。

OSターミナル連携はv1に含めません。

## アクター

主アクターはBookmarkを日常的に検索、保存、整理するユーザーです。

外部システムはChrome Bookmark Manager、Chrome Bookmarks API、Chrome History API、Chrome Extensions Storage APIです。

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
| UC-10 | Chrome履歴から再訪する   | `history`, `find`, `go`            | Slice 8       |

## UC-01: Bookmarkを検索する

ユーザーはうろ覚えのtitle、url、folder path、仮想タグ、Chrome履歴からURLを探します。

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
4. Application層がChrome履歴も取得する
5. Domain層がqueryを評価し、候補をscore順に並べる
6. Bookmarkと同じURLの履歴はBookmark候補のscoreを補強する
7. Bookmark化されていない履歴は `history` resultとして候補に含める
8. Presentation層が番号付き結果一覧を表示する

通常表示ではscoreを出さず、`find -l` 指定時だけ詳細情報として表示します。

完了条件は、一致したBookmarkまたはChrome履歴が番号付き一覧で表示されることです。

候補がない場合は `not_found` を返します。

## UC-02: Bookmarkを開く

ユーザーはqueryにもっとも一致するBookmarkまたはChrome履歴を素早く開きます。

主コマンドは `go` です。

```bash
go github pr
go #prod admin
```

基本フローは次のとおりです。

1. ユーザーが `go <query>` を入力する
2. Application層が `find` と同じ検索評価を実行する
3. 最上位候補が明確な場合は、そのURLを開く
4. 候補が曖昧な場合は、番号付き一覧を表示して選択を求める
5. 疑似CLIから開いた利用統計を更新する

完了条件は、該当BookmarkまたはChrome履歴URLが新しいtabまたは既存tabで開くことです。

候補がない場合は `not_found` を返します。

## UC-03: Bookmark Treeを移動する

ユーザーはBookmark Treeをfilesystemのように移動します。

主コマンドは `ls`、`cd`、`pwd`、`tree` です。

```bash
ls
cd
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

pathを省略した `cd` は `/` へ戻ります。

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

Dedicated extension pageがすでに開いている場合、拡張actionは既存windowを前面へ戻します。

Dedicated extension pageがfocus中の場合、hot key再押下は既存windowを閉じます。

hot keyで再度開くと、新しいwindowを作り、保存済みの現在ディレクトリ、設定、command historyを復元します。

Dedicated extension pageが複数開いている場合、hot keyや拡張actionは1つだけを残して重複windowを閉じます。

Chrome Extensions APIではOSの常時最前面固定を指定できないため、v1ではfocus中のhot key再押下によるclose/reopenを完了条件に含めます。

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
mv 3 Archive
rm 5
rm -f 5
rename 3 "GitHub Pull Requests"
```

基本フローは次のとおりです。

1. ユーザーが整理系コマンドを入力する
2. Application層が対象と変更先を解決する
3. `mkdir`、`mv`、`rename` はChrome Bookmarks APIへ即時に書き込む
4. `rm` は通常実行で確認待ちに入る
5. `rm` 確認待ちで `y` または `yes` を入力した場合、Chrome Bookmarks APIへ書き込む
6. `rm -f` または `rm --force` の場合、確認なしにChrome Bookmarks APIへ書き込む

完了条件は、`mkdir`、`mv`、`rename` が即時実行され、`rm` が確認またはforce指定で実行されることです。

`mv`、`rename` は確認不足エラーを返しません。

`rm` はCLI上の確認待ち状態として扱います。

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

Chrome履歴は `find` と `go` の検索対象として参照します。

## UC-09: 疑似CLIを快適に操作する

ユーザーはキーボード中心で疑似CLIを操作します。

対象はhot key、コマンド履歴、readline風入力編集、候補補完、結果表示、pipe filterです。

基本フローは次のとおりです。

1. ユーザーがhot keyでDedicated extension pageを開く
2. 入力欄へ自動フォーカスする
3. 上キー、下キー、`Ctrl+p`、`Ctrl+n` で履歴を移動する
4. `Ctrl+r` でCLI入力履歴のfloating一覧を表示する
5. `Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w` で入力を編集する
6. 入力中にcommand suggestionを確認する
7. `Tab` または `Shift+Tab` で補完候補を選択する
8. `Enter` で選択中候補を入力へ確定する
9. `Esc` で候補選択を解除する
10. 実行したpromptと結果がtranscriptに追加される
11. `ls | grep stripe` のように結果一覧を絞り込む
12. 必要に応じて `clear` でscrollback transcriptを消す
13. 空promptで `Ctrl+d` を押してCLI windowを閉じる
14. Powerline風promptとplainな結果一覧で実行結果を読む

完了条件は、マウス操作なしで主要な検索、移動、保存、整理ができることです。

Fontが利用できない場合でもplain text fallbackで意味が読めるようにします。

`clear` は画面上のtranscriptだけを消し、コマンド入力履歴や現在ディレクトリは維持します。

## UC-10: Chrome履歴から再訪する

ユーザーはBookmark化していないURLも、Chrome履歴から疑似CLIで再訪します。

主コマンドは `history`、`find`、`go` です。

```bash
history
history design
find design system
go stripe login
```

基本フローは次のとおりです。

1. ユーザーが `history` でChrome履歴だけを一覧表示する
2. 必要に応じて `history query` または `history | grep query` で履歴を絞り込む
3. ユーザーが `find` または `go` でBookmark TreeとChrome履歴を横断検索する
4. Application層がBookmark TreeとChrome履歴を取得する
5. Domain層がBookmark候補と履歴候補をmergeする
6. 同じURLがBookmarkとChrome履歴の両方に存在する場合はBookmark候補として表示する
7. Bookmark化されていないChrome履歴は `HIST` resultとして表示する
8. `go <result-number>` でBookmark resultと同じように履歴URLを開ける

完了条件は、Bookmarkに存在しないChrome履歴URLを一覧表示、絞り込み、検索、番号指定、直接起動できることです。

Chrome履歴は読み取りだけに使い、履歴の追加、削除、変更は行いません。

## UC-11: Popupで設定する

ユーザーは拡張actionから設定を確認します。

主な対象はhot key設定とcommand alias設定です。

基本フローは次のとおりです。

1. ユーザーが拡張actionをクリックする
2. Popupが設定画面として開く
3. Popupが `chrome.commands.getAll()` で現在のhot keyを読み取る
4. ユーザーが変更buttonを押す
5. ChromeではPopupが `chrome://extensions/shortcuts` を新しいtabで開く
6. FirefoxではPopupが `browser.commands.openShortcutSettings()` でManage Extension Shortcutsを開く
7. ユーザーがブラウザ標準UIでhot keyを変更する
8. ユーザーがPopupでaliasを追加、編集、削除する
9. Popupがaliasを `chrome.storage.local` の `settings.commandAliases` に保存する
10. ユーザーが疑似CLIで `alias g=go` を実行する
11. 疑似CLIがaliasを `settings.commandAliases` に保存する
12. ユーザーが疑似CLIで `unalias g` を実行する
13. 疑似CLIがaliasを削除して保存する

完了条件は、Popupで現在のhot keyを確認でき、ブラウザ標準のshortcut管理UIへ移動でき、Popupと疑似CLIの両方からcommand aliasを保存できることです。

Chrome Extensions Commands APIにはshortcutを書き換えるAPIがないため、拡張機能内で直接hot keyを保存、変更しません。

aliasは拡張機能側の設定として保存し、CLI入力の先頭command tokenだけを1回展開します。

alias展開後のcommand種別は、`clear` によるscrollback transcript削除のようなUI副作用にも反映します。
