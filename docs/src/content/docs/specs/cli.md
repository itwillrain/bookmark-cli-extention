---
title: 疑似CLI仕様
description: Bookmark CLI Extension が拡張機能内で提供する疑似 CLI コマンドの初期仕様です。
---

# 疑似 CLI 仕様

疑似CLIはChrome Bookmark Managerの操作を、拡張機能内のコマンド入力UIとして表現します。

初期段階ではOSのターミナルと連携せず、Dedicated extension page上にコマンド入力欄と実行結果を表示します。

Popupは疑似CLI本体ではなく、設定画面として扱います。

主役はBookmarkをfuzzy検索して即時に開く `go` です。

`ls` や `cd` はBookmark Treeをfilesystemとして扱うための補助コマンドです。

## UI 方針

- 入力欄は1行のcommand promptとして扱う
- Dedicated extension pageを開いたら入力欄へ自動フォーカスする
- 実行結果は入力履歴の下に表示する
- コマンド履歴を上下キーで再利用できるようにする
- 入力中に候補やエラーを表示できる余地を残す
- 破壊的操作は結果表示エリアで確認してから実行する

## 起動方針

- hot keyからDedicated extension pageを開く
- すでに開いている場合は既存タブへフォーカスする
- PopupからもDedicated extension pageを開ける
- Popupにはショートカット設定への案内を置く

## コマンド設計方針

- `go` と `find` のfuzzy検索を最初に実装する
- `mark` で現在のタブを現在のディレクトリへ保存する
- `ls`、`cd`、`pwd`、`tree` でBookmark Treeの現在地を扱う
- 書き込み操作には確認または `--preview` を用意する
- 人間が読む番号付き一覧と、機械が読むJSON形式を切り替えられるようにする
- IDだけでなくfolder pathでも対象を指定できるようにする

## fuzzy検索の順位付け

初期実装では、Chrome Bookmark Managerから取得できるBookmark情報だけを使って順位付けします。

利用頻度、最近開いた日時、Chrome履歴は初期スコアに含めません。

検索文字列は空白でtokenに分割し、title、folder path、urlを対象に一致度を計算します。

順位付けは次の優先度で行います。

1. titleの完全一致
2. titleの前方一致
3. folder pathの一致
4. titleの部分一致
5. urlまたはdomainの一致

同じ優先度の候補が複数ある場合は、folder pathが短い候補を先に表示します。

さらに同点の場合は、titleの昇順で表示します。

`go` は最上位候補を開きます。

ただし、上位候補の一致度が同程度の場合は候補一覧を表示し、ユーザーに選択を求めます。

`find` は候補一覧だけを表示し、Bookmarkを開きません。

## mark保存仕様

`mark` は現在のタブを指定したディレクトリへ保存します。

保存先を指定しない場合は、`pwd` で表示される現在のディレクトリに保存します。

保存先を指定する場合は、`--to` にfolder pathを渡します。

titleを指定しない場合は、現在のタブのtitleをBookmark titleとして使います。

titleを指定した場合は、指定した文字列をBookmark titleとして使います。

```bash
mark
mark "Production Admin"
mark --to Work/Admin
mark "Production Admin" --to Work/Admin
```

同じURLが保存先ディレクトリに存在する場合は、重複保存せず `already_marked` を返します。

同じURLが別ディレクトリに存在する場合は、既存候補を番号付き一覧で表示し、保存を止めます。

別ディレクトリへの重複保存を許可したい場合は、明示的に `--allow-duplicate` を指定します。

```bash
mark --allow-duplicate
mark "Production Admin" --allow-duplicate
mark "Production Admin" --to Work/Admin --allow-duplicate
```

指定した保存先ディレクトリが存在しない場合は `folder_not_found` を返します。

現在のタブからURLまたはtitleを取得できない場合は `unsupported_tab` を返します。

## 初期コマンド

### go

title、url、folder pathを対象にfuzzy検索し、もっとも一致したBookmarkを開きます。

```bash
go stripe bill
go github pr
go notion spec
```

複数候補がある場合は番号付き一覧を表示し、数字や矢印キーで選択します。

### find

title、url、folder pathを対象にfuzzy検索し、候補一覧だけを表示します。

```bash
find stripe
find prod admin
find "github.com" --format json
```

### mark

現在のタブを現在のディレクトリへ保存します。

```bash
mark
mark "Production Admin"
mark --to Work/Admin
mark --allow-duplicate
```

### ls

現在のディレクトリ、または指定したpathのBookmark Treeを一覧表示します。

```bash
ls
ls Work/Admin
ls --format json
```

### cd

現在のディレクトリを移動します。

```bash
cd Work
cd ../Research
cd 2
```

### pwd

現在のディレクトリを表示します。

```bash
pwd
```

### tree

現在のディレクトリ、または指定したpath配下のBookmark Treeをツリー表示します。

```bash
tree
tree Work
```

### help

利用できるコマンドと短い説明を表示します。

```bash
help
help go
```

### clear

実行結果の表示を消します。

```bash
clear
```

## v1整理コマンド

### recent

最近開いたBookmarkを表示します。

```bash
recent
```

### freq

よく使うBookmarkを表示します。

```bash
freq
```

### mkdir

Folderを追加します。

```bash
mkdir Tools
```

### mv

Bookmarkまたはfolderを移動します。

```bash
mv 3 Archive
mv "GitHub" Work/DevTools
```

### rm

Bookmarkを削除します。

```bash
rm 5 --preview
rm 5
```

### rename

Bookmarkまたはfolderのtitleを更新します。

```bash
rename 3 "GitHub Pull Requests"
```

### tag

Bookmarkへ仮想タグを付与します。

```bash
tag 3 prod finance
tag current urgent
```

## 出力形式

初期状態では、人間向けの番号付き一覧を標準とします。

JSON出力は `--format json` で指定します。

```text
1. [url] /Work/Admin/Stripe Dashboard
2. [url] /Finance/Stripe Billing
3. [dir] /Work/Admin
```

```json
{
  "id": "42",
  "title": "Starlight",
  "url": "https://starlight.astro.build/",
  "folderPath": "Docs/Astro"
}
```

## エラー方針

- 対象が見つからない場合は `not_found` を返す
- 書き込み権限が不足している場合は `permission_denied` を返す
- 指定したfolder pathが見つからない場合は `folder_not_found` を返す
- Chrome Bookmarks APIの呼び出しに失敗した場合は `chrome_bookmarks_failed` を返す
- 破壊的操作の確認が不足している場合は `confirmation_required` を返す
