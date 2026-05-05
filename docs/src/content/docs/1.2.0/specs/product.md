---
title: プロダクト仕様
description: Chrome Bookmark Manager を拡張機能内の疑似 CLI で扱うプロダクトの目的とスコープです。
slug: 1.2.0/specs/product
---

# プロダクト仕様

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIから扱えるようにするためのブラウザ拡張です。

プロダクトの中心思想は、Bookmarks as filesystemです。

Chromeに保存されたBookmarkをフォルダ階層として扱い、`go` で素早く開き、`find` で候補を絞り、`mark` で現在のタブを保存します。

v1.2.0では、Bookmarks BarをCLI root `/` として扱い、Other Bookmarksなどのbrowser root直下containerをCLI root直下のfolderとして扱います。

## 解きたい課題

Chrome Bookmark ManagerはGUIでの整理に向いていますが、次のような作業にはコマンド入力の方が向いています。

* 大量のBookmarkをうろ覚えのキーワードやURLで素早く開く
* フォルダ構造をテキストとして確認する
* 重複や古いURLを検出する
* 作業文脈ごとにBookmarkをまとめて追加、移動する
* エクスポートや同期の前処理としてBookmark Treeを検査する

## 目指す体験

拡張機能の画面内で、Bookmark Managerをコマンドとして操作できる状態を目指します。

```bash
go stripe bill
find github pr
ls
cd Work/Admin
mark "Production Admin"
```

ここでいうCLIは、初期段階ではOSのターミナルではなく、Chrome拡張内に実装する疑似CLIを指します。

## v1スコープ

* title、url、folder pathによるfuzzy検索
* Chrome履歴を含めたURL再訪検索
* 検索結果からのBookmark起動
* 現在のタブを指定したディレクトリへ保存
* Bookmark Treeの一覧表示とディレクトリ移動
* Bookmark Treeのツリー表示
* 最近開いたBookmarkの表示
* よく使うBookmarkの表示
* Folderの追加
* Bookmarkまたはfolderの移動
* Bookmarkの削除
* Bookmarkまたはfolderの名称変更
* Bookmarkの仮想タグ付け
* 疑似CLI出力向けのBookmark Tree正規化
* Other Bookmarksなどのbrowser root直下container表示
* コマンド入力、解析、実行、結果表示の責務整理

## 後続スコープ

* 重複検出
* JSONエクスポート
* インポート
* 一括整理
* ChromeとFirefox間のBookmark同期
* OSターミナルから利用できるローカルCLI

## 非スコープ

v1では、複数ブラウザ対応、クラウド同期、チーム共有機能は扱いません。

まずChromeのBookmark Managerを対象に、拡張機能内で安全に操作できる体験へ集中します。

ChromeとFirefox間のBookmark同期は、後続候補として [ChromeとFirefoxのBookmark同期ロードマップ](../cross-browser-sync/) で管理します。

## 成功条件

* 拡張機能内の疑似CLIからChromeのBookmark Treeを読める
* `go` と `find` の検索結果がChrome Bookmark ManagerとChrome履歴の内容を反映する
* `mark` で現在のタブを現在のディレクトリへ保存できる
* `mkdir`、`mv`、`rename` は解決できたら即時実行され、`rm` は確認またはforce指定で実行される
* ドメインロジックは純粋関数として切り出され、テストで保証される
