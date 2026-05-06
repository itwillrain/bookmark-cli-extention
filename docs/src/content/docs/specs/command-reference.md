---
title: コマンドリファレンス
description: Bookmark CLI Extension v1 の疑似 CLI コマンド、引数、例、代表的なエラーをまとめます。
---

# コマンドリファレンス

このページでは、v1で扱う疑似CLIコマンドをユーザー視点で整理します。

詳細な設計方針は [CLI仕様](../cli/) を正とします。

エラーコードの詳細は [エラーコード一覧](../error-codes/) を参照します。

## 共通仕様

コマンドはDedicated extension pageの入力欄から実行します。

結果一覧の番号は、実行ごとに `1` から振り直します。

番号付きの結果一覧は、直前の結果一覧として一時保存します。

`cd 2` や `mv 3 Archive` のような番号指定は、直前の結果一覧を参照します。

JSON出力は `--format json` で指定します。

`mkdir`、`mv`、`rename` は対象と変更先を解決できたら即時実行します。

`rm` はUnix commandの操作感に寄せ、通常実行では対話確認を挟み、`-f` または `--force` で確認なしに削除します。

Folderを削除する場合は、配下のBookmarkとfolderも削除するため `-r`、`-R`、または `--recursive` を必須にします。

## コマンド一覧

| コマンド | 目的                                   | v1   |
| -------- | -------------------------------------- | ---- |
| `go`     | Bookmarkを検索して開く                 | 対象 |
| `find`   | Bookmarkを検索して一覧表示する         | 対象 |
| `mark`   | CLI起動元タブをBookmarkへ保存する      | 対象 |
| `ls`     | 現在ディレクトリの中身を表示する       | 対象 |
| `cd`     | 現在ディレクトリを移動する             | 対象 |
| `pwd`    | 現在ディレクトリを表示する             | 対象 |
| `tree`   | Bookmark Treeを階層表示する            | 対象 |
| `help`   | ヘルプを表示する                       | 対象 |
| `grep`   | pipeで結果一覧を絞り込む               | 対象 |
| `clear`  | 画面上のscrollback transcriptを消す    | 対象 |
| `history` | Chrome閲覧履歴を表示する             | 対象 |
| `recent` | 最近開いたBookmarkを表示する           | 対象 |
| `freq`   | よく開くBookmarkを表示する             | 対象 |
| `mkdir`  | Folderを追加する                       | 対象 |
| `mv`     | Bookmarkまたはfolderを移動する         | 対象 |
| `rm`     | Bookmarkまたはfolderを削除する         | 対象 |
| `rename` | Bookmarkまたはfolderのtitleを変更する  | 対象 |
| `tag`    | Bookmarkの仮想タグを追加または削除する | 対象 |

## `go`

BookmarkとChrome履歴をfuzzy検索し、もっとも一致したURLを開きます。

```bash
go <query>
go <result-number>
go [-l] <query>
```

```bash
go stripe bill
go github pr
go #prod admin
go 3
go -l stripe
```

候補が明確に1件へ絞れる場合は、そのURLを開きます。

直前結果一覧のBookmarkまたはChrome履歴を開く場合は、`go 3` のように番号指定できます。

候補が複数ある場合は、番号付き一覧を表示して選択を求めます。

実行後の結果行に詳細情報を残したい場合は `-l` を指定します。

代表的なエラーは `not_found`、`chrome_bookmarks_failed`、`permission_denied` です。

## `find`

BookmarkとChrome履歴をfuzzy検索し、候補一覧だけを表示します。

```bash
find [-l] <query> [--format json]
```

```bash
find stripe
find prod admin
find #finance stripe
find -l stripe
find "github.com" --format json
```

検索対象はBookmarkのtitle、url、folder path、仮想タグと、Chrome履歴のtitle、urlです。

`#` で始まるtokenは仮想タグとして扱います。

Chrome履歴は仮想タグを持たないため、`#tag` 検索ではBookmarkだけを対象にします。

BookmarkとChrome履歴に同じURLが存在する場合はBookmark resultとして表示し、Chrome履歴はscore補強にだけ使います。

Bookmark化されていないChrome履歴は `HIST` resultとして表示します。

通常の一覧では検索scoreを表示しません。

検索score、host、仮想tag、利用統計、Chrome Bookmark IDを確認したい場合は `-l` を指定します。

代表的なエラーは `not_found`、`chrome_bookmarks_failed` です。

## `history`

Chrome閲覧履歴をBookmarkとは分けて一覧表示します。

```bash
history [query] [--limit <number>] [--format json]
```

```bash
history
history github
history stripe --limit 20
history | grep docs
```

queryを省略した場合は、Chrome履歴の直近URLを表示します。

queryを指定した場合は、Chrome History APIの検索結果だけを表示します。

初期表示件数は25件です。

結果は `HIST` resultとして表示し、`go <result-number>` で開けます。

Bookmark化済みURLの重複除外やscore補強は `find` / `go` の検索統合だけで行い、`history` はChrome履歴をそのまま読むためのcommandとして扱います。

Chrome履歴は読み取り専用で扱い、履歴の追加、削除、変更は行いません。

代表的なエラーはありません。

## `mark`

CLI起動元タブをBookmarkへ保存します。

```bash
mark [title] [--to <path>] [--allow-duplicate]
```

```bash
mark
mark "Production Admin"
mark --to Work/Admin
mark "Production Admin" --to Work/Admin
mark --allow-duplicate
```

保存先を省略した場合は、現在ディレクトリへ保存します。

保存先がCLI root `/` の場合は、browser root nodeではなくroot保存用containerへ保存します。

`title` を省略した場合は、CLI起動元タブのtitleを使います。

保存先に同じURLがある場合は保存せず、`already_marked` を返します。

別ディレクトリに同じURLがある場合は候補一覧を表示し、保存を止めます。

代表的なエラーは `unsupported_tab`、`folder_not_found`、`already_marked` です。

## `ls`

現在ディレクトリ、または指定したpathの中身を表示します。

```bash
ls [-a] [-l] [path]
ll [-a] [path]
```

```bash
ls
ls -a
ls -l Work/Admin
ls -la Work/Admin
ll -a
ls Work/Admin
```

`ls` は移動と選択のための軽い一覧として扱います。

`ls -l` と `ll` は整理と判断のための詳細一覧として扱います。

folderを先に表示し、その後にBookmarkを表示します。

各group内はtitle昇順で表示します。

通常の `ls` は `.` で始まるtitleのentryを隠します。

`-a` は `.` で始まるtitleのentryも表示します。

`-l` はURLのhost、仮想tag、疑似CLIから開いた回数、最終open日、folderの子node数、Chrome Bookmark ID、parent IDを詳細行として表示します。

Chrome Bookmark IDとparent IDは `-l` の詳細行へ統合します。

`-la` と `-al` は `-l -a` と同じ意味です。

`ll` は `ls -l` の組み込み別名です。

ユーザー定義command abbreviationはPopupの設定画面、または疑似CLIの `abbr` / `unabbr` で追加、削除、保存します。

abbreviationは先頭command tokenだけを1回展開します。

abbreviation展開後のcommand種別は実行だけでなく、`clear` のscrollback transcript削除のようなUI副作用にも適用します。

```bash
g stripe
la /Work
```

`g = go`、`la = ls -la` と設定している場合、上の入力はそれぞれ `go stripe`、`ls -la /Work` として実行します。

代表的なエラーは `folder_not_found`、`chrome_bookmarks_failed` です。

## `abbr`

command abbreviationを一覧表示、または設定します。

```bash
abbr
abbr <name>=<command>
```

```bash
abbr
abbr g=go
abbr la='ls -la'
```

`abbr` は現在のabbreviation一覧を表示します。

`abbr <name>=<command>` はabbreviationを追加または上書きします。

abbreviation名は空白とpipe記号を含まない1 tokenに限定します。

abbreviationは再帰的に展開しません。

`alias` はv1.3.0以降も互換入力として受け付けます。

## `unabbr`

command abbreviationを削除します。

```bash
unabbr <name>
```

```bash
unabbr g
unabbr la
```

`unalias` はv1.3.0以降も互換入力として受け付けます。

## `cd`

現在ディレクトリを移動します。

```bash
cd [path-or-index]
```

```bash
cd
cd Work
cd ../Research
cd ~
cd 2
```

pathを省略した `cd` はroot pathの `/` へ戻ります。

`~` は `/` のaliasです。

番号指定は直前の結果一覧を参照します。

番号がfolderを指していない場合は `not_found` を返します。

代表的なエラーは `folder_not_found`、`not_found` です。

## `pwd`

現在ディレクトリを表示します。

```bash
pwd
```

代表的なエラーはありません。

保存済みの現在ディレクトリが存在しない場合は `/` に戻します。

## `tree`

現在ディレクトリ、または指定したpath配下のBookmark Treeを表示します。

```bash
tree [-d] [path] [--depth <number>] [--format json]
```

```bash
tree
tree Work
tree -d Work
tree --depth 3
tree Work --depth 3
```

初期表示の深さは2階層です。

`--depth` で表示する深さを指定します。

`-d` を指定した場合は、Bookmarkを表示せずfolderだけを表示します。

表示は結果番号とkind列を揃え、title列にtree guideを表示します。

Faviconやiconは、`tree` を含むすべての結果行でtitleやURLの前に表示します。

これにより、通常resultとtree resultでicon位置を統一します。

Directory行のtitleはURL色のcyanとは分けたblue accentで表示し、Bookmark行のtitleと見分けやすくします。

```text
1 | DIR | /Work/Admin          ├── Admin
2 | DIR | /Work/Admin/Billing  │   ├── Billing
3 | URL | /Work/Admin/Billing  │   │   └── Invoice
4 | URL | /Work                └── Stripe Dashboard
```

代表的なエラーは `folder_not_found`、`chrome_bookmarks_failed` です。

## `help`

コマンド一覧、または指定したコマンドや概念topicの説明を表示します。

```bash
help [command]
man <command>
<command> --help
<command> -h
```

```bash
help
help go
help history
man ls
go --help
ls -h
```

`history` topicでは、`history` commandでChrome履歴を一覧表示できることを確認できます。

Chrome履歴が `find` / `go` の検索候補として扱われることも確認できます。

`HIST` result、`#tag` 検索では履歴を含めないことも確認できます。

代表的なエラーは `not_found` です。

## `grep`

結果一覧を出す読み取りcommandの出力を絞り込みます。

```bash
<result-command> | grep <query>
<result-command> | grep <query> | grep <query>
```

```bash
ls | grep stripe
ls Work | grep admin
find docs | grep github
history | grep docs
recent | grep stripe
```

v1でpipe sourceにできるcommandは `ls`、`ll`、`find`、`history`、`tree`、`recent`、`freq`、`help` です。

`grep` はtitle、folder path、url、description、details、result種別を大文字小文字を区別せずに部分一致で検索します。

絞り込み後の結果一覧は番号を振り直し、直前結果一覧も絞り込み後の結果へ更新します。

`grep` はpipe stageとして扱い、standalone commandとしては扱いません。

未対応のpipe stageや書き込み系commandをpipe sourceにした場合は、未対応commandとして扱います。

## `clear`

画面上のscrollback transcriptを消します。

```bash
clear
```

現在ディレクトリ、コマンド入力履歴、保存済みBookmarkデータは削除しません。

`clear` 自体は通常の入力としてコマンド入力履歴へ保存できます。

代表的なエラーはありません。

## `recent`

疑似CLIから最近開いたBookmarkを表示します。

```bash
recent [--limit <number>] [--format json]
```

```bash
recent
recent --limit 20
```

初期表示件数は10件です。

Chrome履歴は参照しません。

代表的なエラーはありません。

## `freq`

疑似CLIからよく開くBookmarkを表示します。

```bash
freq [--limit <number>] [--format json]
```

```bash
freq
freq --limit 20
```

初期表示件数は10件です。

Chrome履歴は参照しません。

代表的なエラーはありません。

## `mkdir`

現在ディレクトリ、または指定したpath配下にfolderを追加します。

```bash
mkdir <name> [--to <path>]
```

```bash
mkdir Tools
mkdir /Project
mkdir Admin --to Work
```

CLI root直下へ作成する場合は、Bookmarks APIへroot node IDを渡さず、root保存用containerへ作成します。

同じ親folderに同名folderが存在する場合は `already_exists` を返します。

代表的なエラーは `folder_not_found`、`already_exists`、`permission_denied` です。

## `mv`

Bookmarkまたはfolderを移動します。

```bash
mv <item> <path>
```

```bash
mv 3 Archive
mv "GitHub" Work/DevTools
```

対象と移動先folderを解決できた場合は、確認を挟まずChrome Bookmarks APIへ書き込みます。

代表的なエラーは `not_found`、`folder_not_found` です。

## `rm`

Bookmarkまたはfolderを削除します。

```bash
rm <path-or-index>
rm -f <path-or-index>
rm --force <path-or-index>
rm -r <path-or-index>
rm -rf <path-or-index>
rm --recursive --force <path-or-index>
```

```bash
rm 5
rm ./Stripe Dashboard
rm -r ./Archive
rm -rf /Other Bookmarks
```

`rm <path-or-index>` は対象を表示し、`Remove <title>? y/N` の確認待ちに入ります。

対象は直前の結果番号、または現在ディレクトリからの相対path、rootからの絶対pathで指定します。

確認待ちはcommand行とは別の新しいstatus output行に表示します。

`rm` は削除対象の行を結果一覧として再表示しません。

確認待ちの次の入力で `y` または `yes` を入力すると削除します。

`n`、`no`、空入力、またはそれ以外の入力は削除せず確認待ちを解除します。

`-f` または `--force` を指定した場合は確認なしで削除します。

Folderを対象に `-r` を指定しない場合は削除せず、recursive指定が必要であることを表示します。

Bookmark削除はChrome Bookmarks APIの `remove` を使います。

Folder削除はChrome Bookmarks APIの `removeTree` を使い、対象folder配下のsubtreeを削除します。

`Other Bookmarks` などのbrowser管理folderは、`-rf` 指定でも削除せず理由を表示します。

代表的なエラーは `not_found`、`permission_denied` です。

## `rename`

Bookmarkまたはfolderのtitleを変更します。

```bash
rename <item> <title>
```

```bash
rename 3 "GitHub Pull Requests"
```

対象を解決できた場合は、確認を挟まずChrome Bookmarks APIへ書き込みます。

代表的なエラーは `not_found` です。

## `tag`

Bookmarkへ仮想タグを追加または削除します。

```bash
tag <item> <tag...>
tag <item> --remove <tag...>
```

```bash
tag 3 prod finance
tag current urgent
tag 3 --remove prod
tag 3 --remove prod finance
```

tag名は先頭の `#` を含めずに指定します。

`current` は現在タブと同じURLを持つBookmarkを対象にします。

同じURLを持つBookmarkが複数ある場合は候補一覧を表示します。

代表的なエラーは `not_found`、`unsupported_tab`、`invalid_argument` です。
