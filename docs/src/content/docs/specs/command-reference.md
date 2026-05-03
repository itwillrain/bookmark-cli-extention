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

破壊的操作はpreviewまたは確認を挟みます。

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
| `clear`  | 画面上の実行結果を消す                 | 対象 |
| `recent` | 最近開いたBookmarkを表示する           | 対象 |
| `freq`   | よく開くBookmarkを表示する             | 対象 |
| `mkdir`  | Folderを追加する                       | 対象 |
| `mv`     | Bookmarkまたはfolderを移動する         | 対象 |
| `rm`     | Bookmarkを削除する                     | 対象 |
| `rename` | Bookmarkまたはfolderのtitleを変更する  | 対象 |
| `tag`    | Bookmarkの仮想タグを追加または削除する | 対象 |

## `go`

Bookmarkをfuzzy検索し、もっとも一致したBookmarkを開きます。

```bash
go <query>
```

```bash
go stripe bill
go github pr
go #prod admin
```

候補が明確に1件へ絞れる場合は、そのBookmarkを開きます。

候補が複数ある場合は、番号付き一覧を表示して選択を求めます。

代表的なエラーは `not_found`、`chrome_bookmarks_failed`、`permission_denied` です。

## `find`

Bookmarkをfuzzy検索し、候補一覧だけを表示します。

```bash
find <query> [--format json]
```

```bash
find stripe
find prod admin
find #finance stripe
find "github.com" --format json
```

検索対象はtitle、url、folder path、仮想タグです。

`#` で始まるtokenは仮想タグとして扱います。

代表的なエラーは `not_found`、`chrome_bookmarks_failed` です。

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

`title` を省略した場合は、CLI起動元タブのtitleを使います。

保存先に同じURLがある場合は保存せず、`already_marked` を返します。

別ディレクトリに同じURLがある場合は候補一覧を表示し、保存を止めます。

代表的なエラーは `unsupported_tab`、`folder_not_found`、`already_marked` です。

## `ls`

現在ディレクトリ、または指定したpathの中身を表示します。

```bash
ls [path] [--format json]
```

```bash
ls
ls Work/Admin
ls --format json
```

folderを先に表示し、その後にBookmarkを表示します。

各group内はtitle昇順で表示します。

代表的なエラーは `folder_not_found`、`chrome_bookmarks_failed` です。

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
tree [path] [--depth <number>] [--format json]
```

```bash
tree
tree Work
tree --depth 3
tree Work --depth 3
```

初期表示の深さは2階層です。

`--depth` で表示する深さを指定します。

代表的なエラーは `folder_not_found`、`chrome_bookmarks_failed` です。

## `help`

コマンド一覧、または指定したコマンドの説明を表示します。

```bash
help [command]
```

```bash
help
help go
```

代表的なエラーは `not_found` です。

## `clear`

画面上の実行結果を消します。

```bash
clear
```

コマンド入力履歴は削除しません。

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
mkdir Admin --to Work
```

同じ親folderに同名folderが存在する場合は `already_exists` を返します。

代表的なエラーは `folder_not_found`、`already_exists`、`permission_denied` です。

## `mv`

Bookmarkまたはfolderを移動します。

```bash
mv <item> <path> [--preview] [--yes]
```

```bash
mv 3 Archive
mv 3 Archive --preview
mv 3 Archive --yes
mv "GitHub" Work/DevTools
```

`--preview` は変更内容だけを表示します。

`--yes` は確認を省略して移動します。

`--preview` と `--yes` がない場合は書き込みを行わず、`confirmation_required` を返します。

代表的なエラーは `not_found`、`folder_not_found`、`confirmation_required` です。

## `rm`

Bookmarkを削除します。

```bash
rm <item> [--preview] [--yes]
```

```bash
rm 5 --preview
rm 5 --yes
```

v1ではfolder削除を扱いません。

`--yes` がない場合は削除せず、previewを表示して `confirmation_required` を返します。

代表的なエラーは `not_found`、`confirmation_required`、`permission_denied` です。

## `rename`

Bookmarkまたはfolderのtitleを変更します。

```bash
rename <item> <title> [--preview] [--yes]
```

```bash
rename 3 "GitHub Pull Requests"
rename 3 "GitHub Pull Requests" --preview
rename 3 "GitHub Pull Requests" --yes
```

`--preview` は変更内容だけを表示します。

`--yes` は確認を省略して変更します。

`--preview` と `--yes` がない場合は書き込みを行わず、`confirmation_required` を返します。

代表的なエラーは `not_found`、`confirmation_required` です。

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
