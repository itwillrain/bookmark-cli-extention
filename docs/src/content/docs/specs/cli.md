---
title: 疑似CLI仕様
description: Bookmark CLI Extension が拡張機能内で提供する疑似 CLI コマンドの初期仕様です。
---

# 疑似 CLI 仕様

疑似CLIはChrome Bookmark Managerの操作を、拡張機能内のコマンド入力UIとして表現します。

初期段階ではOSのターミナルと連携せず、ブラウザ拡張のpopupまたはdedicated page上にコマンド入力欄と実行結果を表示します。

## UI 方針

- 入力欄は1行のcommand promptとして扱う
- 実行結果は入力履歴の下に表示する
- コマンド履歴を上下キーで再利用できるようにする
- 入力中に候補やエラーを表示できる余地を残す
- 破壊的操作は結果表示エリアで確認してから実行する

## コマンド設計方針

- 読み取り操作を先に実装する
- 書き込み操作には確認または `--preview` を用意する
- 人間が読む表形式と、機械が読むJSON形式を切り替えられるようにする
- IDだけでなくfolder pathでも対象を指定できるようにする

## 初期コマンド

### list

Bookmark Treeを一覧表示します。

```bash
list
list --folder "Docs"
list --format json
```

### search

title、url、folder pathを対象にBookmarkを検索します。

```bash
search astro
search "github.com" --format json
```

### show

Bookmarkまたはfolderの詳細を表示します。

```bash
show <bookmark-id>
```

## 後続コマンド

### add

Bookmarkを追加します。

```bash
add https://example.com --title "Example" --folder "Inbox"
```

### update

Bookmarkのtitleまたはurlを更新します。

```bash
update <bookmark-id> --title "New Title"
```

### remove

Bookmarkを削除します。

```bash
remove <bookmark-id> --preview
remove <bookmark-id>
```

### move

Bookmarkまたはfolderを移動します。

```bash
move <bookmark-id> --to "Docs/Astro"
```

## 出力形式

初期状態では、人間向けの表形式を標準とします。

JSON出力は `--format json` で指定します。

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
- Chrome Bookmarks APIの呼び出しに失敗した場合は `chrome_bookmarks_failed` を返す
- 破壊的操作の確認が不足している場合は `confirmation_required` を返す
