---
title: プロダクト仕様
description: Chrome Bookmark Manager を拡張機能内の疑似 CLI で扱うプロダクトの目的とスコープです。
---

# プロダクト仕様

Bookmark CLI Extensionは、Chrome Bookmark Managerを拡張機能内の疑似CLIから扱えるようにするためのブラウザ拡張です。

## 解きたい課題

Chrome Bookmark ManagerはGUIでの整理に向いていますが、次のような作業にはコマンド入力の方が向いています。

- 大量のBookmarkをキーワードやURLで素早く検索する
- フォルダ構造をテキストとして確認する
- 重複や古いURLを検出する
- 作業文脈ごとにBookmarkをまとめて追加、移動する
- エクスポートや同期の前処理としてBookmark Treeを検査する

## 目指す体験

拡張機能の画面内で、Bookmark Managerをコマンドとして操作できる状態を目指します。

```bash
list
search astro
add https://starlight.astro.build --title "Starlight"
move <bookmark-id> --to "Docs/Astro"
```

ここでいうCLIは、初期段階ではOSのターミナルではなく、Chrome拡張内に実装する疑似CLIを指します。

## 初期スコープ

- Bookmark Treeの一覧表示
- title、url、folder pathによる検索
- Bookmarkの詳細表示
- 疑似CLI出力向けのBookmark Tree正規化
- コマンド入力、解析、実行、結果表示の責務整理

## 後続スコープ

- Bookmarkの追加
- Bookmarkの更新
- Bookmarkの削除
- Bookmarkの移動
- 重複検出
- JSONエクスポート
- インポート
- preview付きの一括整理
- OSターミナルから利用できるローカルCLI

## 非スコープ

初期段階では、複数ブラウザ対応、クラウド同期、チーム共有機能は扱いません。

まずChromeのBookmark Managerを対象に、拡張機能内で安全に操作できる体験へ集中します。

## 成功条件

- 拡張機能内の疑似CLIからChromeのBookmark Treeを読める
- 疑似CLIで検索した結果がChrome Bookmark Managerの内容と一致する
- 書き込み操作はpreviewまたは確認を通してから実行される
- ドメインロジックは純粋関数として切り出され、テストで保証される
