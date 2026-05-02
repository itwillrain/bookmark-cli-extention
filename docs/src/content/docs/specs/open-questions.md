---
title: 未決事項
description: Bookmark CLI Extension の仕様決定が必要な論点です。
---

# 未決事項

このページでは、実装前の合意が必要な論点を管理します。

## 疑似 CLI の配置

初期UIをどこに置くかを決めます。

- Popup
- Side panel
- Dedicated extension page

初期案はDedicated extension pageです。

Popupは素早く開けますが、Bookmark Treeの表示や履歴の確認には狭い可能性があります。

## コマンド体系

初期コマンドをどこまで入れるかを決めます。

- `list`
- `search`
- `show`
- `help`
- `clear`

初期案は読み取り系の `list`、`search`、`show` と、操作補助の `help`、`clear` です。

## 書き込み操作の開始タイミング

追加、更新、移動、削除をいつ入れるかを決めます。

初期案では、読み取り系コマンドとBookmark Tree正規化が安定してから書き込み操作を追加します。

## 結果表示

検索結果や一覧をどう表示するかを決めます。

- 表形式
- Tree形式
- JSON形式
- 詳細カード形式

初期案は、`list` はTree形式、`search` は表形式、`show` は詳細カード形式です。

## コマンド実行履歴

履歴をどこまで保持するかを決めます。

初期案では、拡張機能内のセッション中だけ保持します。
