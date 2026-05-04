---
title: 実装ロードマップ
description: Bookmark CLI Extension v1 を動く縦切りで実装するための順序と完了条件です。
---

# 実装ロードマップ

このページでは、v1を最短で動かすための実装順序を定義します。

仕様が固まった順ではなく、ユーザーが触れる価値を早く確認できる縦切り順で進めます。

最初の縦切りは、Bookmark Tree取得、正規化、`find`、`go`、Dedicated extension pageです。

ユースケースの詳細は [ユースケース](../use-cases/) で管理します。

## 実装方針

小さく動く単位を積み上げます。

各sliceは、Domainの純粋関数、Applicationのuse case、Infrastructureのadapter、Presentationの表示を必要な範囲だけ接続します。

Domain層の純粋関数は、実装と同時にテストを書きます。

Chrome APIに依存する処理はPortの外側へ閉じ込めます。

最初から全コマンドを作らず、`find` と `go` で検索体験を先に固めます。

破壊的操作は、読み取り系と保存系が安定してから実装します。

## Slice 1: Bookmark Treeを検索して開く

目的は、拡張機能内の画面からBookmarkを検索し、選択したBookmarkを開ける状態にすることです。

実装対象は次のとおりです。

- Chrome Bookmarks APIからBookmark Treeを取得するadapter
- Bookmark Treeを `BookmarkTree` と `BookmarkEntry` へ正規化するDomain関数
- `FolderPath` を生成するDomain関数
- Fuse.jsを使ったfuzzy検索
- title、url、folder pathのweighted keys設定
- `find` use case
- `go` use case
- Storybookで確認する最小UI component
- Reactで実装するDedicated extension pageの最小UI
- Tailwind CSSで実装する基本layout
- command promptとtranscript形式の結果一覧
- `go` 実行時のBookmark URL open
- `cd ./` による現在ディレクトリ配下folder suggestion

完了条件は次のとおりです。

- `find stripe` で一致したBookmarkが番号付き一覧で表示される
- `go stripe` で最上位のBookmarkが開く
- Bookmark Tree正規化とfuzzy検索にテストがある
- Fuse.jsのscoreをCommandResultの詳細表示用scoreへ変換できる
- `cd ./` で現在ディレクトリ配下のfolder候補が表示される
- Chrome Bookmarks APIの呼び出しがInfrastructure層に閉じている
- Application層がChrome APIを直接参照していない

## Slice 2: ディレクトリとして移動する

目的は、Bookmarks as filesystemの体験を成立させることです。

実装対象は次のとおりです。

- `CurrentDirectory` のDomain model
- `FolderPath` の解決
- `ls`
- `cd`
- `pwd`
- `tree`
- 直前の結果一覧を使った番号指定
- `tree --depth`
- `ls` のfolder先頭表示

完了条件は次のとおりです。

- `ls` で現在ディレクトリのfolderとBookmarkが表示される
- `cd Work` で現在ディレクトリが変わる
- `cd 2` で直前の結果一覧からfolderへ移動できる
- `pwd` で現在ディレクトリが表示される
- `tree --depth 3` で指定階層まで表示される
- path解決と番号解決にテストがある

## Slice 3: 保存状態を扱う

目的は、拡張機能を閉じても現在ディレクトリや設定が復元される状態にすることです。

実装対象は次のとおりです。

- `chrome.storage.local` adapter
- `ExtensionState`
- `schemaVersion`
- typiaによる保存データのschema検証
- storage migration
- `currentDirectory`
- `commandHistory`
- `settings`
- `settings.commandAliases`
- 起動時の保存データ読み込み
- 保存済みcurrent directoryが消えていた場合のfallback

完了条件は次のとおりです。

- コマンド履歴が直近100件まで保存される
- 連続した同じコマンドは重複保存されない
- 最後の現在ディレクトリが再起動後に復元される
- 存在しないcurrent directoryは `/` に戻る
- 不正な保存データは初期値または `storage_failed` として扱える
- storage migrationとschema検証にテストがある

## Slice 4: 現在タブを保存する

目的は、`mark` でCLI起動元タブをBookmarkへ追加できる状態にすることです。

実装対象は次のとおりです。

- `launchContext`
- `TabContext` Port
- hot key、popup、拡張actionからCLIを開く処理
- `mark`
- `mark --to`
- title指定
- `--allow-duplicate`
- 保存先ディレクトリの検証
- 重複URL検出

完了条件は次のとおりです。

- CLI起動元タブを `mark` で現在ディレクトリへ保存できる
- `mark --to Work/Admin` で指定ディレクトリへ保存できる
- 同じURLが保存先に存在する場合は `already_marked` を返す
- 別ディレクトリに同じURLがある場合は候補一覧を表示して保存を止める
- `launchContext` がない場合は `unsupported_tab` を返す

## Slice 5: 仮想タグを扱う

目的は、Chrome Bookmark Managerを変更せずに、拡張機能側のメタ情報としてBookmarkを分類できる状態にすることです。

実装対象は次のとおりです。

- `VirtualTag`
- `virtualTagsByBookmarkId`
- `tag`
- `tag --remove`
- `find #tag`
- `go #tag keyword`
- 起動時の削除済みBookmark掃除

完了条件は次のとおりです。

- `tag 3 prod finance` で仮想タグを追加できる
- `tag 3 --remove prod` で仮想タグを削除できる
- `find #prod` で該当Bookmarkだけが表示される
- 削除済みBookmark IDに紐づく仮想タグが起動時に掃除される
- tag名の正規化にテストがある

## Slice 6: 整理系コマンドを安全に実装する

目的は、Bookmarkの移動、削除、名称変更、folder作成をCLIから扱える状態にすることです。

実装対象は次のとおりです。

- `mkdir`
- `mv`
- `rm`
- `rename`
- `rm -f`
- rm確認待ち

完了条件は次のとおりです。

- `mv 3 Archive` でBookmarkを移動できる
- `rm 5` は削除せず確認待ちに入る
- 確認待ちで `y` または `yes` を入力するとBookmarkを削除できる
- `rm -f 5` で確認なしにBookmarkを削除できる
- 確認待ちで `n`、`no`、空入力、またはそれ以外の入力をすると削除せず確認待ちを解除する
- `rename 3 "GitHub Pull Requests"` でtitleを変更できる
- `mkdir Tools` でfolderを作成できる
- 整理系use caseの対象解決と書き込み分岐にテストがある

## Slice 7: 利用統計と表示体験を磨く

目的は、日常的に使いやすい疑似CLIへ整えることです。

実装対象は次のとおりです。

- `usageByBookmarkId`
- `recent`
- `freq`
- `--limit`
- Powerline風prompt
- plain text fallback
- Nerd Font設定
- React componentの細分化
- 上キー
- 下キー
- `Ctrl+p`
- `Ctrl+n`
- `Ctrl+a`
- `Ctrl+e`
- `Ctrl+k`
- `Ctrl+u`
- `Ctrl+w`
- `Tab` による補完候補の順方向選択
- `Shift+Tab` による補完候補の逆方向選択
- `Enter` による選択中補完候補の確定
- `Esc`
- `clear`
- command suggestion表示
- command transcript表示

完了条件は次のとおりです。

- `recent` が直近に開いたBookmarkを10件表示する
- `freq` がよく開くBookmarkを10件表示する
- `--limit 20` で表示件数を変えられる
- promptがPowerline風に表示される
- 結果一覧はplainなterminal outputとして表示される
- Fontがない場合もplain textで意味が読める
- 主要UI componentがStorybookで確認できる
- 上キー、下キー、`Ctrl+p`、`Ctrl+n` で履歴を移動できる
- `Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w` で入力を編集できる
- 入力中のcommand suggestionを`Tab`と`Shift+Tab`で選択できる
- 選択中のcommand suggestionを`Enter`で入力へ確定できる
- 実行したpromptとoutputがtranscriptへ追加される
- `clear` でscrollback transcriptを削除できる

## Slice 8: Chrome履歴を検索に統合する

目的は、Bookmark化していないURLも疑似CLIから再訪できるようにすることです。

実装対象は次のとおりです。

- `history` manifest permission
- Chrome History API adapter
- Chrome履歴entryの正規化
- Bookmark検索結果とChrome履歴候補のmerge
- Bookmarkと同じURLの履歴によるscore補強
- Bookmark化されていない履歴の `HIST` result表示
- `go <result-number>` による履歴URL起動

完了条件は次のとおりです。

- `find <query>` がBookmark候補とChrome履歴候補を同じ番号付き一覧へ表示する
- `go <query>` がBookmark候補またはChrome履歴候補の最上位URLを開く
- `go <result-number>` が履歴resultを開ける
- BookmarkとChrome履歴に同じURLがある場合はBookmark resultを表示し、重複表示しない
- Chrome History APIの呼び出しがInfrastructure層に閉じている
- Domain層のmergeロジックにテストがある

## 実装順まとめ

1. Bookmark Tree取得と正規化
2. `find`
3. `go`
4. Dedicated extension page
5. `ls`、`cd`、`pwd`、`tree`
6. `chrome.storage.local` 連携
7. `mark`
8. 仮想タグ
9. `mkdir`、`mv`、`rm`、`rename`
10. `recent`、`freq`、表示改善
11. Chrome履歴統合

## v1完了条件

v1は、次の状態を満たしたら完了とします。

- Dedicated extension pageからBookmarkを検索して開ける
- Bookmark Treeをfilesystemとして移動できる
- 現在タブを指定ディレクトリへ保存できる
- 仮想タグでBookmarkを分類できる
- 移動、名称変更、folder作成が即時実行でき、削除は確認またはforce指定で実行できる
- 結果一覧を番号指定で再利用できる
- Chrome履歴URLを検索して開ける
- Domain層の主要な純粋関数にテストがある
- OSターミナル連携を含めない

## v1.1.0方針

v1.1.0ではFirefox desktop対応を追加します。

Chrome版の主要体験を維持したまま、Firefox向けbuild、manifest調整、runtime API差分を吸収します。

詳細な順序と完了条件は [Firefox対応ロードマップ](../firefox-roadmap/) で管理します。

## v1.2.0方針

v1.2.0ではChromeとFirefoxのBookmark同期を候補にします。

Chrome拡張からFirefoxのBookmarkを直接読むことはできないため、同期用の中間snapshotと各ブラウザのBookmarks APIを使います。

最初は外部serverを持たない手動ファイル同期を対象にし、cloud同期先は後続候補として扱います。

詳細な順序と完了条件は [ChromeとFirefoxのBookmark同期ロードマップ](../cross-browser-sync/) で管理します。
