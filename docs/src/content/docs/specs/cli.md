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
- コマンド履歴を `Ctrl+k`、`Ctrl+j`、上下キーで再利用できるようにする
- 入力中に候補やエラーを表示できる余地を残す
- 破壊的操作は結果表示エリアで確認してから実行する

## キーバインド

vimmer friendlyな操作を優先します。

`Ctrl+j` と `Ctrl+k` は、候補リスト、入力履歴、preview確認の選択を上下に移動します。

上下キーも同じ挙動として扱います。

`Enter` は選択中の候補を確定します。

候補が表示されていない場合は、入力中のコマンドを実行します。

`Esc` は候補表示またはpreview確認を閉じます。

`Tab` は選択中の補完候補を入力へ反映します。

`Ctrl+r` は将来の履歴検索用に予約します。

## コマンド実行履歴

コマンド入力履歴は直近100件を `chrome.storage` に保存します。

重複するコマンドを連続で実行した場合は、同じ入力を履歴へ重複追加しません。

`Ctrl+k` または上キーで古い履歴へ移動します。

`Ctrl+j` または下キーで新しい履歴へ移動します。

`clear` は画面表示だけを消します。

`clear` はコマンド入力履歴を削除しません。

直前の結果一覧はセッションメモリだけに保持します。

直前の結果一覧は `cd 2` や `mv 3 Archive` のような番号指定に使います。

拡張を閉じた場合、直前の結果一覧は復元しません。

`mv`、`rm`、`rename` の実行結果は、画面表示とコマンド入力履歴に残します。

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

`#` で始まるtokenは仮想タグとして扱います。

```bash
find #prod
go #finance stripe
```

仮想タグtokenが含まれる場合は、対象のBookmarkがすべての仮想タグを持つ候補だけを検索対象にします。

仮想タグtoken以外のtokenは、通常どおりtitle、folder path、urlを対象に一致度を計算します。

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

## ディレクトリ状態

`/` はChromeのBookmark Barを表します。

`Other Bookmarks` はv1の対象に含めず、後続で扱います。

現在ディレクトリは拡張全体で1つだけ保持します。

Dedicated extension pageを複数開いた場合も、現在ディレクトリは共有します。

セッション中はメモリ上で現在ディレクトリを保持します。

拡張を閉じた場合は、最後の現在ディレクトリを `chrome.storage` に保存し、次回起動時に復元します。

保存済みの現在ディレクトリが存在しなくなっている場合は `/` に戻します。

## path表現

pathはBookmark Barを起点にしたfolder pathとして扱います。

先頭の `/` は省略できます。

```bash
cd /Work/Admin
cd Work/Admin
```

`.` は現在ディレクトリを表します。

`..` は親ディレクトリを表します。

`~` は `/` のaliasとして扱います。

```bash
cd .
cd ..
cd ~
```

`ls` の結果に表示された番号は、直前の結果一覧に対する短縮指定として扱います。

```bash
ls
cd 2
```

番号指定は直前の結果一覧が存在しない場合、または番号がfolderを指していない場合に `not_found` を返します。

## ディレクトリ補完

入力中は、既存ディレクトリを候補として表示します。

補完は存在するfolder pathだけを対象にします。

存在しないfolderを補完候補として作成しません。

候補は入力欄の下に表示し、矢印キーで選択できます。

Tabキーは選択中の候補を入力へ反映します。

補完対象は次の引数です。

- `cd <path>`
- `ls [path]`
- `tree [path]`
- `mark --to <path>`
- `mv <item> <path>`

```bash
mark --to Work/
```

```text
Work/Admin
Work/Docs
Work/Research
```

補完候補が1件だけの場合、Tabキーでその候補を確定します。

補完候補が複数ある場合、Tabキーは共通prefixまで補完します。

共通prefixがない場合は候補一覧だけを表示します。

## previewと確認

`mv`、`rm`、`rename` は実行前に変更内容をpreviewします。

`--preview` を指定した場合は、変更内容だけを表示し、書き込みは行いません。

`--yes` を指定した場合は、確認を省略して実行します。

### rm

`rm` は `--yes` を指定した場合だけ実行します。

`rm` に `--yes` がない場合はpreviewを表示し、`confirmation_required` を返します。

```bash
rm 5 --preview
rm 5 --yes
```

v1の `rm` はBookmarkの削除だけを対象にします。

Folder削除は扱いません。

### mv

`mv` は実行前に移動元と移動先をpreviewします。

`--preview` なし、かつ `--yes` なしの場合は、preview表示後にEnterで確定し、Escでキャンセルします。

```bash
mv 3 Archive
mv 3 Archive --preview
mv 3 Archive --yes
```

### rename

`rename` は実行前に変更前titleと変更後titleをpreviewします。

`--preview` なし、かつ `--yes` なしの場合は、preview表示後にEnterで確定し、Escでキャンセルします。

```bash
rename 3 "GitHub Pull Requests"
rename 3 "GitHub Pull Requests" --preview
rename 3 "GitHub Pull Requests" --yes
```

### preview表示

previewは、操作種別、対象、変更前、変更後を表示します。

```text
operation: move
target: [url] /Work/GitHub
from: /Work
to: /Archive
```

```text
operation: rename
target: [url] /Work/GitHub
from: GitHub
to: GitHub Pull Requests
```

```text
operation: remove
target: [url] /Work/GitHub
url: https://github.com/
```

### undo

v1では `undo` コマンドを提供しません。

ただし、`mv`、`rm`、`rename` の実行結果はコマンド履歴に残します。

削除後に復元できるよう、`rm` の実行結果には削除したBookmarkのtitle、url、folder pathを表示します。

## 仮想タグ仕様

仮想タグはChrome Bookmark Managerには保存せず、拡張機能側のメタ情報として扱います。

保存先は `chrome.storage` です。

保存キーはBookmark IDを基準にします。

`tag` は指定したBookmarkへ仮想タグを追加します。

既存の仮想タグは置き換えず、追加します。

```bash
tag 3 prod finance
tag current urgent
```

`current` は現在のタブと同じURLを持つBookmarkを対象にします。

同じURLを持つBookmarkが複数ある場合は候補一覧を表示し、ユーザーに選択を求めます。

仮想タグを削除する場合は `tag --remove` を使います。

`untag` コマンドはv1では提供しません。

```bash
tag 3 --remove prod
tag 3 --remove prod finance
```

`go` と `find` は `#tag` 検索に対応します。

```bash
find #prod
go #finance stripe
```

削除済みBookmarkの仮想タグは、起動時にBookmark Treeと照合して掃除します。

存在しないBookmark IDに紐づく仮想タグは削除します。

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
rm 5 --yes
```

### rename

Bookmarkまたはfolderのtitleを更新します。

```bash
rename 3 "GitHub Pull Requests"
rename 3 "GitHub Pull Requests" --preview
```

### tag

Bookmarkへ仮想タグを付与します。

```bash
tag 3 prod finance
tag current urgent
tag 3 --remove prod
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
- ユーザーがpreview後の確認をキャンセルした場合は `cancelled` を返す
