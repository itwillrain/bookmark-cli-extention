---
title: 疑似CLI仕様
description: Bookmark CLI Extension が拡張機能内で提供する疑似 CLI コマンドの初期仕様です。
---

# 疑似 CLI 仕様

疑似CLIはChrome Bookmark Managerの操作を、拡張機能内のコマンド入力UIとして表現します。

初期段階ではOSのターミナルと連携せず、Dedicated extension page上にcommand promptと実行結果のtranscriptを表示します。

Popupは疑似CLI本体ではなく、設定画面として扱います。

主役はBookmarkをfuzzy検索して即時に開く `go` です。

`ls` や `cd` はBookmark Treeをfilesystemとして扱うための補助コマンドです。

## UI 方針

- 入力欄は1行のcommand promptとして扱う
- HTML実装上はsubmit可能な `form` と `input` を使う
- Dedicated extension pageを開いたら入力欄へ自動フォーカスする
- terminal surfaceをクリックしたときはcommand inputへfocusを戻し、CLI操作中にfocusが外れたままになる状態を防ぐ
- Dedicated extension pageは別windowで開くため、画面内にはwindow風headerやtraffic light装飾を描画しない
- 実行済みcommandと実行結果はscrollback transcriptとして上から下へ積む
- 結果一覧を持たないstatusやerrorは、実行済みcommand行の右側ではなく次のoutput行に表示する
- 実行後は入力欄を空に戻し、次のpromptをtranscript末尾に表示する
- transcriptが画面高を超えた場合は、terminal viewportを最下部へ追従させる
- terminal viewportはscroll可能にするが、CLI感を保つため視覚上のscrollbarは表示しない
- terminal viewportの最下部追従は、command実行でtranscriptが増えたときだけ行う
- 入力中promptは下部固定せず、scrollback transcriptの末尾行として扱う
- コマンド履歴を上キー、下キー、`Ctrl+p`、`Ctrl+n`、`Ctrl+r` で再利用できるようにする
- 入力中はfish shellのように補完候補やエラーを現在promptの下へfloating表示する
- 空のpromptでは補完候補を表示せず、ユーザーが入力を開始したタイミングで候補を表示する
- 補完候補は現在promptより上には表示しない
- 補完候補用の下余白は候補表示中だけ確保する
- 破壊的操作は結果表示エリアで確認してから実行する
- promptは `bookmark-cli $` を基準にし、Powerline風表示はprompt側へ限定する
- 候補と結果一覧はterminalの出力としてplainな一覧表示にする
- 結果一覧のplain text表現はcopy、詳細表示、fallback用に保持する

## キーバインド

Terminalに近い操作を基本にし、入力編集はUnix readline互換を優先します。

上キーまたは `Ctrl+p` は古いコマンド履歴へ移動します。

下キーまたは `Ctrl+n` は新しいコマンド履歴へ移動します。

`Ctrl+a` はcursorを行頭へ移動します。

`Ctrl+e` はcursorを行末へ移動します。

`Ctrl+u` はcursor以前の入力を削除します。

`Ctrl+k` はcursor以後の入力を削除します。

`Ctrl+w` はcursor前方の単語を削除します。

`Tab` は表示中の補完候補を順方向に選択します。

`Shift+Tab` は表示中の補完候補を逆方向に選択します。

`Tab` と `Shift+Tab` は候補を即時に入力へ反映しません。

`Enter` は選択中のfloating補完候補を入力へ確定します。

空のpromptで結果一覧の行を選択している場合、`Enter` はその行の既定アクションを実行します。

folder行の既定アクションは `cd <result-number>` です。

Bookmark行の既定アクションは `go <result-number>` です。

選択中の候補がない場合、`Enter` は入力中のコマンドを実行します。

`Esc` は候補の選択状態を解除します。

ユーザーが入力欄を手で変更した場合、選択中の補完候補と結果行は解除します。

これにより、`mkdir /project` のような入力済みcommandの `Enter` は補完確定ではなくcommand実行として扱います。

`Ctrl+r` はCLI入力履歴のfloating一覧を表示します。

履歴一覧はChrome閲覧履歴ではなく、疑似CLIで実行したcommand inputを対象にします。

履歴一覧は新しい入力から順に表示し、現在の入力値がある場合はその文字列を含む履歴だけを表示します。

履歴一覧の候補も `Tab` と `Shift+Tab` で選択し、`Enter` で選択中の履歴を入力欄へ戻します。

履歴一覧から戻したcommandは、その時点では実行せず、次の `Enter` で通常のcommandとして実行します。

## コマンド実行履歴

コマンド入力履歴は直近100件を `chrome.storage` に保存します。

重複するコマンドを連続で実行した場合は、同じ入力を履歴へ重複追加しません。

上キーまたは `Ctrl+p` で古い履歴へ移動します。

下キーまたは `Ctrl+n` で新しい履歴へ移動します。

`Ctrl+r` で履歴一覧をfloating表示し、表示中の履歴候補を入力欄へ戻せます。

`clear` は画面上のscrollback transcriptだけを消します。

`clear` はコマンド入力履歴を削除しません。

`clear` 自体は通常の入力としてコマンド入力履歴へ保存できます。

直前の結果一覧はセッションメモリだけに保持します。

直前の結果一覧は `cd 2`、`go 3`、`mv 4 Archive` のような番号指定に使います。

拡張を閉じた場合、直前の結果一覧は復元しません。

`mv`、`rm`、`rename` の実行結果は、画面表示とコマンド入力履歴に残します。

## 起動方針

- hot keyからDedicated extension pageを別windowで開く
- 拡張actionからDedicated extension pageを別windowで開く
- Dedicated extension pageがfocus中の場合、hot key再押下でCLI windowを閉じる
- hot keyで再度開いた場合、新しいCLI windowを開き、保存済みの現在ディレクトリ、設定、command historyを復元する
- 空promptで `Ctrl+D` を押した場合、CLI windowを閉じる
- CLI windowを開く直前に、起動元tabの `launchContext` を保存する
- `mark` はCLI window自身ではなく、CLI起動元tabを保存対象にする
- PopupからもDedicated extension pageの別windowを開ける
- Popupは設定画面として扱い、現在のhot keyを表示する
- Popupから `chrome://extensions/shortcuts` を開き、ユーザーがhot keyを変更できるようにする
- Popupでcommand aliasを設定できる
- 疑似CLI内でも `alias` / `unalias` でcommand aliasを設定できる

## コマンド設計方針

- `go` と `find` のfuzzy検索を最初に実装する
- `mark` で現在のタブを現在のディレクトリへ保存する
- `ls`、`cd`、`pwd`、`tree` でBookmark Treeの現在地を扱う
- `help`、`man <command>`、`<command> --help`、`<command> -h` でCLI内から使い方を確認できるようにする
- `ls | grep hoge` のように結果一覧をpipeで絞り込めるようにする
- `history` でChrome閲覧履歴だけを一覧表示し、`history | grep hoge` で絞り込めるようにする
- `mkdir`、`mv`、`rename` は対象と変更先を解決できたら即時実行する
- `rm` は対話確認または `-f` / `--force` で実行する
- 人間が読む番号付き一覧と、機械が読むJSON形式を切り替えられるようにする
- IDだけでなくfolder pathでも対象を指定できるようにする

## fuzzy検索の順位付け

初期実装では、Chrome Bookmark Managerから取得できるBookmark情報とChrome履歴を使って順位付けします。

疑似CLI内の利用頻度は `recent` と `freq` 用の保存データとして扱います。

Chrome履歴のvisit countとlast visit timeは、Bookmark検索結果のscore補強と、Bookmark化されていないURL候補のscoreに使います。

v1のfuzzy検索はFuse.jsを使います。

`match-sorter` はv1では採用しません。

理由は、`find` と `go` でscore、weighted keys、match情報を扱いやすくするためです。

Fuse.jsのscoreを検索順位の基本とし、独自の順位付けは最小限にします。

検索文字列は空白でtokenに分割します。

`#` で始まるtokenは仮想タグとして扱います。

```bash
find #prod
go #finance stripe
```

仮想タグtokenが含まれる場合は、対象のBookmarkがすべての仮想タグを持つ候補だけを検索対象にします。

Chrome履歴は仮想タグを持たないため、仮想タグtokenを含む検索ではChrome履歴を候補に含めません。

仮想タグtoken以外のqueryは、Fuse.jsでtitle、folder path、urlを対象に検索します。

Fuse.jsの設定は、初期値として次の方針にします。

```ts
const fuseOptions = {
  includeMatches: true,
  includeScore: true,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.55 },
    { name: "folderPath", weight: 0.3 },
    { name: "url", weight: 0.15 },
  ],
  minMatchCharLength: 2,
  threshold: 0.4,
};
```

Fuse.jsのscoreは `0` が最良で、`1` に近いほど一致度が低い値として扱います。

疑似CLIのJSON出力では、読みやすさのため `1 - fuseScore` を `score` として返します。

そのため、JSON出力の `score` は `1` に近いほど一致度が高い値です。

人間向けの通常一覧では、`score` は表示しません。

`score` は詳細情報として扱い、`find -l` または `go -l` のときだけ結果行へ表示します。

JSON出力でも、`score` は `-l` 指定時に含めます。

検索順位はFuse.jsのscore順を正とします。

同じURLがBookmarkとChrome履歴の両方に存在する場合は、Bookmark resultを残し、Chrome履歴resultは重複表示しません。

この場合、Chrome履歴のvisit countとlast visit timeでBookmark resultのscoreを補強します。

Bookmark化されていないChrome履歴は `HIST` resultとして表示します。

同点の場合は、folder pathが短い候補を先に表示します。

さらに同点の場合は、titleの昇順で表示します。

`go` は最上位候補を開きます。

ただし、上位候補のscore差が小さい場合は候補一覧を表示し、ユーザーに選択を求めます。

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
cd
cd /Work/Admin
cd Work/Admin
```

pathを省略した `cd` はroot pathの `/` へ戻ります。

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

候補は現在のpromptの直下にfloating表示します。

候補の表示領域は現在promptの下へ置き、入力中の補完結果が下方向へ流れる感覚を優先します。

候補はscrollback内の通常outputとして描画せず、terminal body直下のoverlayとして描画します。

overlayは現在promptを基準として配置し、scrollbackのスクロールやoverflowへ巻き込まれない状態を保ちます。

`ls` や `cd ./` のような入力中補完候補は、現在promptより上に出しません。

候補表示や入力編集中の変化だけではterminal viewportを自動scrollしません。

Tabキーは候補を順方向に選択します。

Shift+Tabキーは候補を逆方向に選択します。

TabキーやShift+Tabキーで候補を選択しても、DOM focusはcommand inputに残します。

選択中候補はfocus移動の代わりに表示範囲へscrollし、候補が多い場合でも選択位置を見失わないようにします。

結果一覧のBookmark候補をTabキーやShift+Tabキーで選択する場合も、選択中resultを表示範囲へ追従させます。

追従には `scrollIntoView({ block: "nearest", inline: "nearest" })` を使います。

Enterキーは選択中のfloating補完候補を入力へ反映します。

空promptでCtrl+Dキーを押した場合、CLI windowを閉じます。

空のpromptで結果一覧の行を選択している場合、Enterキーは選択行の既定アクションを実行します。

folder行は `cd <result-number>` として実行し、Bookmark行は `go <result-number>` として実行します。

入力中のpromptが残っている場合、結果一覧の選択行は従来どおり入力補完として扱います。

`go` 入力中に結果一覧のBookmark候補を補完する場合は、command名を消さずにquery部分だけを候補titleへ置き換えます。

```bash
go e
go eza
go ./e
go ./eza
```

補完対象は次の引数です。

- `cd <path>`
- `go <path-prefix>`
- `ls [path]`
- `tree [path]`
- `mark --to <path>`
- `mv <item> <path>`

```bash
cd ./
go ./
go ./e
mark --to Work/
```

```text
./Admin
./Research
./eza
Work/Admin
Work/Docs
Work/Research
```

`cd ./` は現在ディレクトリ直下のfolderを候補にします。

`go ./` は現在ディレクトリ直下のfolderとBookmarkを候補にします。

`cd ../` は親ディレクトリ直下のfolderを候補にします。

`cd /` と `cd ~/` はroot直下のfolderを候補にします。

補完候補が1件だけの場合、TabキーやShift+Tabキーでその候補を選択します。

補完候補が複数ある場合、Tabキーは候補選択を次へ進め、Shift+Tabキーは前へ戻します。

末尾候補の次は先頭候補へ循環します。

先頭候補の前は末尾候補へ循環します。

## pipeとgrep

v1では、結果一覧を出す読み取りcommandに対して `grep` pipe stageを使えます。

```bash
ls | grep stripe
ls Work | grep admin
find docs | grep github
tree Work | grep dashboard
recent | grep stripe
help | grep history
history | grep github
```

`grep` はtitle、folder path、url、description、details、result種別を大文字小文字を区別せずに部分一致で検索します。

`grep` は表示中のresult rowsを絞り込み、表示番号も絞り込み後の一覧で振り直します。

そのため、`ls | grep stripe` の後に `go 1` や `cd 1` を実行した場合、絞り込み後の1件目を参照します。

複数stageのgrepも左から順に適用します。

```bash
find stripe | grep dashboard | grep work
```

v1でpipe sourceにできるcommandは `ls`、`ll`、`find`、`history`、`tree`、`recent`、`freq`、`help` です。

`mv`、`rm`、`rename`、`mkdir`、`mark`、`tag` のような書き込み系commandは、意図しない副作用を避けるためpipe sourceにしません。

`grep` はpipe stageとして扱い、standalone commandとしては扱いません。

## 整理操作と確認

`mkdir`、`mv`、`rename` は対象と変更先を解決できたら即時実行します。

`rm` はUnix commandの操作感に寄せ、通常実行では対話確認を挟み、`-f` または `--force` で確認なしに削除します。

### rm

`rm` は通常実行では確認待ちに入ります。

確認待ちの次の入力で `y` または `yes` を入力すると削除します。

`n`、`no`、空入力、またはそれ以外の入力は削除せず確認待ちを解除します。

`-f` または `--force` を指定した場合は確認なしで削除します。

```bash
rm 5
rm -f 5
```

v1の `rm` はBookmarkの削除だけを対象にします。

Folder削除は扱いません。

### mv

`mv` はBookmarkまたはfolderを移動します。

対象と移動先folderを解決できた場合は、確認を挟まずChrome Bookmarks APIへ書き込みます。

```bash
mv 3 Archive
```

### rename

`rename` はBookmarkまたはfolderのtitleを更新します。

対象を解決できた場合は、確認を挟まずChrome Bookmarks APIへ書き込みます。

```bash
rename 3 "GitHub Pull Requests"
```

### undo

v1では `undo` コマンドを提供しません。

ただし、`mv`、`rm`、`rename` の実行結果はコマンド履歴に残します。

`rm` の確認待ち、削除完了、中止はstatus-only outputとして新しい行に表示します。

`rm` は直前の結果番号から対象を解決するため、削除対象のBookmark行を結果一覧として再表示しません。

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
go -l stripe
```

複数候補がある場合は番号付き一覧を表示し、数字指定で選択します。

### find

title、url、folder pathを対象にfuzzy検索し、候補一覧だけを表示します。

```bash
find stripe
find prod admin
find -l stripe
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
ls -a
ls -l Work/Admin
ls -la Work/Admin
ll -a
ls Work/Admin
```

`ls` は現在ディレクトリ直下のentryを短い一覧で表示します。

通常の `ls` は、titleが `.` で始まるentryを隠します。

`ls -a` はtitleが `.` で始まるentryも表示します。

`ls -l` はChrome Bookmark ID、parent ID、子node数を詳細行として表示します。

`ls -la` と `ls -al` は `-l -a` と同じ意味です。

`ll` は `ls -l` のaliasとして扱います。

ユーザー定義aliasはPopupの設定画面、または疑似CLIの `alias` / `unalias` で保存します。

aliasは先頭command tokenだけを1回展開します。

alias展開後のcommand種別は実行だけでなく、`clear` のscrollback transcript削除のようなUI副作用にも適用します。

```bash
g stripe
la /Work
```

たとえば `g = go`、`la = ls -la` と設定している場合、上の入力はそれぞれ `go stripe`、`ls -la /Work` として実行します。

### alias

command aliasを一覧表示、または設定します。

```bash
alias
alias g=go
alias la='ls -la'
```

`alias` は現在のalias一覧を表示します。

`alias <name>=<command>` はaliasを追加または上書きします。

### unalias

command aliasを削除します。

```bash
unalias g
unalias la
```

### cd

現在のディレクトリを移動します。

```bash
cd
cd Work
cd ../Research
cd 2
```

pathを省略した場合は `/` へ戻ります。

### pwd

現在のディレクトリを表示します。

```bash
pwd
```

### tree

現在のディレクトリ、または指定したpath配下のBookmark Treeをツリー表示します。

初期表示の深さは2階層です。

`--depth` で表示する深さを指定できます。

```bash
tree
tree Work
tree --depth 3
tree Work --depth 3
```

### help

利用できるコマンドと短い説明を表示します。

```bash
help
help go
```

### clear

画面上のscrollback transcriptを消します。

```bash
clear
```

現在ディレクトリ、直前のコマンド入力履歴、保存済みBookmarkデータは変更しません。

## v1整理コマンド

### recent

最近開いたBookmarkを表示します。

初期表示件数は10件です。

```bash
recent
recent --limit 20
```

### freq

よく使うBookmarkを表示します。

初期表示件数は10件です。

```bash
freq
freq --limit 20
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
rm 5
rm -f 5
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
tag 3 --remove prod
```

## 出力形式

初期状態では、人間向けの番号付き一覧を標準とします。

番号は実行ごとに `1` から振り直します。

番号付き一覧は、直前の結果一覧としてセッションメモリに保持します。

`cd 2` や `mv 3 Archive` のような番号指定は、この直前の結果一覧を参照します。

表示種別は `[dir]` と `[url]` を使います。

仮想タグを一覧する専用表示を追加する場合だけ `[tag]` を使います。

Bookmarkの仮想タグは種別ではなく、行の補足情報として表示します。

`ls` はfolderを先に表示し、その後にBookmarkを表示します。

各group内はtitle昇順で表示します。

`find` はtitle、folder path、url、仮想タグを表示します。

`find` の結果はscore順で表示します。

通常表示ではscoreを出さず、`-l` 指定時だけ `score=0.96` のように表示します。

`tree` は初期状態で2階層まで表示します。

`tree --depth <number>` を指定した場合は、その深さまで表示します。

`recent` と `freq` は初期状態で10件まで表示します。

`--limit <number>` を指定した場合は、その件数まで表示します。

JSON出力は `--format json` で指定します。

Dedicated extension page上のpromptは、`bookmark-cli $` をPowerline風に表示できます。

Powerline風promptの区切りはfont glyphではなくCSS shapeで描画します。

候補と結果一覧にはPowerline glyphを使いません。

番号、種別、folder path、title、仮想タグはterminal outputのplainな行として表示します。

Nerd Font互換のiconは将来のopt-in表現として扱い、v1の標準表示では使いません。

結果種別は `URL`、`DIR`、`HIST`、`HELP` のplain text labelで表示します。

ただし、Nerd Fontの有無に結果の意味を依存させません。

Fontが利用できない環境では、plain text表現へfallbackします。

copy、詳細表示、JSON出力では、装飾を含めない値を使います。

```text
1. [dir] /Work/Admin
2. [url] /Work/Admin/Stripe Dashboard #prod #finance
3. [url] /Finance/Stripe Billing #finance
```

```json
{
  "command": "find -l stripe",
  "format": "json",
  "items": [
    {
      "index": 1,
      "id": "42",
      "type": "url",
      "title": "Stripe Dashboard",
      "url": "https://dashboard.stripe.com/",
      "folderPath": "/Work/Admin",
      "tags": ["prod", "finance"],
      "score": 0.96,
      "childrenCount": null
    }
  ],
  "meta": {
    "currentDirectory": "/",
    "total": 1
  }
}
```

JSON出力の `items` は、コマンド間で共通のshapeを優先します。

`tree` のJSON出力も、初期実装では `depth` を持つflat listとして扱います。

```json
{
  "command": "tree Work --depth 2",
  "format": "json",
  "items": [
    {
      "index": 1,
      "id": "10",
      "type": "dir",
      "title": "Admin",
      "url": null,
      "folderPath": "/Work",
      "tags": [],
      "score": null,
      "childrenCount": 4,
      "depth": 1
    }
  ],
  "meta": {
    "currentDirectory": "/Work",
    "total": 1
  }
}
```

## エラー方針

エラーコードの詳細は [エラーコード一覧](./error-codes/) で管理します。

- 対象が見つからない場合は `not_found` を返す
- 書き込み権限が不足している場合は `permission_denied` を返す
- 指定したfolder pathが見つからない場合は `folder_not_found` を返す
- Chrome Bookmarks APIの呼び出しに失敗した場合は `chrome_bookmarks_failed` を返す
- `rm` の確認はCLI上の確認待ち状態として扱う
