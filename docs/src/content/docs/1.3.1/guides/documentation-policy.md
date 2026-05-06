---
title: ドキュメント方針
description: ドキュメントを更新するときの基本方針です。
slug: 1.3.1/guides/documentation-policy
---

# ドキュメント方針

このドキュメントは、実装の前提と意思決定を後から追えるよう整備します。

docs配下をBookmark CLI ExtensionのSSOTとして扱います。

`docs/src/content/docs/` は内部的な最新原稿です。

公開サイトでは、rootや未version URLを最新の公開済みversionへredirectします。

version selectorには、公開済みversionだけを表示します。

公開済みversionのsnapshotは `docs/src/content/docs/<version>/` と `docs/src/content/versions/<version>.json` で保持します。

公開済みversionのsnapshotは、誤字やリンク切れなど閲覧性の修正だけを行い、仕様差分は現在のmain向けdocsへ反映します。

仕様、振る舞い、UI、データ構造、権限、テスト方針に影響する変更は、コードだけで完結させません。

実装を変える場合は、対応するdocsを同じ変更単位で更新します。

docsに対応する変更がない場合は、レビューや作業報告で「docs更新不要」と判断した理由を明示します。

Codexなどの自動作業者は、作業前にこの方針と関連する仕様ページを確認します。

## 書くもの

* プロダクト仕様
* 疑似CLIコマンド仕様
* Chrome Bookmarks APIとの連携仕様
* ユースケース
* ドメインモデル
* ブラウザ拡張としての権限と制約
* テスト方針

## 書き方

* 実装と同じ言葉を使う
* 未確定の仮説は、確定事項と分けて書く
* 仕様変更が起きたら、古い前提を残さず更新する
* 仕様ファイルはdocs配下に置き、Starlightのページとして読める状態にする
* 純粋関数にロジックを置く場合は、テスト観点も合わせて整理する

## TypeDoc

TypeDocは、公開APIを読むための補助ドキュメントとして扱います。

`src/domain` と `src/application` のexported関数は、呼び出し方が分かるように `@example` を追加します。

説明文は、その関数が担う境界、成功時の結果、失敗時の扱いを短く書きます。

`@remarks` は、単純な説明文だけでは伝わりにくい判断理由や副作用の境界を補足する場合に使います。

`@example` は、`foo(input)` のようなplaceholderではなく、実際のcommand、path、tag、またはobject literalを使います。

返り値の形が読み取りにくい純粋関数では、example内に期待結果をcommentで添えます。

ただし、単純な文字列定数、index定数、separator定数には機械的に `@example` を追加しません。

React componentはTypeDocの `@example` よりStorybookを正とします。

`@example` の不足とplaceholder exampleはESLintでerrorとして検出します。

## 実装時の確認手順

1. 変更対象に関係するdocsを先に読む
2. docsに仕様がない場合は、先にdocsへ仕様を追加する
3. TDDで必要なテストを追加する
4. 実装する
5. 実装差分とdocs差分が同じ仕様を指しているか確認する

## docs更新が必要な変更

* CLIコマンド、オプション、キーバインド、補完挙動の変更
* UIの状態、画面構成、表示形式の変更
* Domain model、Application use case、Architecture境界の変更
* Chrome API連携、権限、storage構造の変更
* テスト方針、TDDの粒度、Storybook確認対象の変更
* ロードマップやv1スコープの変更

## docs更新が不要な変更

* typo修正
* formattingだけの変更
* 仕様に影響しない内部実装の小さな整理
* 既存仕様を満たすためのテストfixture整理

docs更新不要と判断した場合も、作業報告ではその判断を短く残します。
