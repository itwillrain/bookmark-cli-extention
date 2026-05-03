---
title: テスト方針
description: Bookmark CLI Extension のTDD方針、テスト対象、レイヤー別の確認範囲を定義します。
---

# テスト方針

このページでは、Bookmark CLI Extensionのテスト方針を定義します。

基本方針は、Kent BeckのTDDを小さく適用し、Domain層の純粋関数を厚くテストすることです。

## 基本方針

Domain層の純粋関数にはテストを書きます。

テストは仕様を固定するために書きます。

Domain層はfunctional coreとして扱い、入力と出力の対応をテストします。

不要な網羅ではなく、仕様上意味のあるケースだけを残します。

Chrome API、DOM、storage、時刻、乱数へ直接依存する処理はDomain層に置きません。

stream libraryを導入した場合も、Domain層のテストはplain dataの入出力を確認します。

Application層はPortをmockしてuse caseの分岐を確認します。

Infrastructure層は薄く保ち、Chrome APIとのadapter境界を確認します。

Presentation層は表示用view modelとキーバインドの状態遷移を確認します。

UI componentの分割方針は [UI実装方針](../ui-implementation/) で管理します。

## TDDサイクル

実装は次の順番で進めます。

1. 失敗する最小のテストを書く
2. そのテストを通す最小実装を書く
3. 仕様を壊さずに整理する
4. 不要なテストケースを削る
5. 次の振る舞いへ進む

先に大きな抽象を作りません。

重複や複雑さが実際に見えてから抽象化します。

## レイヤー別テスト

| レイヤー       | 主な対象                                  | 方針                     |
| -------------- | ----------------------------------------- | ------------------------ |
| Domain         | 純粋関数、値の正規化、検索、path解決      | 厚くテストする           |
| Application    | use case、CommandResult、Port失敗時の分岐 | Portをmockする           |
| Infrastructure | Chrome API adapter、storage adapter       | 薄く確認する             |
| Presentation   | view model、キーバインド、表示状態        | 状態遷移を中心に確認する |
| E2E            | 主要sliceの通し動作                       | v1後半で最小限追加する   |

## Domain層

Domain層はもっとも厚くテストします。

対象は次のとおりです。

- Bookmark Tree正規化
- `FolderPath` 生成
- path解決
- fuzzy検索
- 仮想タグ正規化
- Result Listの番号解決
- preview生成
- 利用統計の並び順

同じ入力に対して同じ出力を返すことを確認します。

外部APIのmockは使いません。

`map`、`filter`、`flatMap`、`reduce` を使う場合でも、配列操作の実装詳細ではなく、変換結果をテストします。

## Application層

Application層はuse caseの分岐を確認します。

対象は次のとおりです。

- `findBookmarks`
- `goBookmark`
- `changeCurrentDirectory`
- `markCurrentTab`
- `addVirtualTags`
- `moveBookmark`
- `removeBookmark`
- `renameBookmark`

Portはmockまたはfakeで差し替えます。

Chrome APIの具体的な戻り値ではなく、Portが返すDomain寄りの値を使います。

正常系、代表的な異常系、書き込みの有無を確認します。

## Infrastructure層

Infrastructure層はadapter境界を確認します。

対象は次のとおりです。

- Chrome Bookmarks API adapter
- Chrome Storage API adapter
- TabContext adapter

Chrome API由来の失敗は、Application層で扱えるerror codeへ変換します。

`chrome.storage.local` から読み込んだraw valueは、typia validatorを通した結果だけをApplication層へ渡します。

typiaそのものの生成codeはテスト対象にしません。

storage adapterのwrapper、migration、fallback分岐をテストします。

Infrastructure層では複雑な分岐を持たせません。

複雑な変換が必要な場合は、Domain層またはApplication層の純粋関数へ切り出します。

## Presentation層

Presentation層はUIの状態変化を確認します。

UI componentはStory Firstで作り、Storybook上で状態を確認してからentrypointへ組み込みます。

RxJSのようなstream libraryを導入した場合は、streamそのものではなく、入力eventからview modelまたはCommandResultへ至る境界をテストします。

対象は次のとおりです。

- CommandResultから結果一覧view modelへの変換
- Powerline風prompt表示
- plain text fallback
- React componentのprops境界
- command transcriptの追加と保持件数
- `clear` によるcommand transcript削除
- command実行後のterminal viewport最下部追従
- command suggestionのprompt直下floating表示
- 上キー、下キー、`Ctrl+p`、`Ctrl+n` の履歴移動
- `Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w` の入力編集
- command suggestionのprefix一致
- `cd ./` による現在ディレクトリ配下folder suggestion
- `Tab` による補完候補選択
- `Enter` による選択中補完候補の確定
- `Esc` による候補選択の解除

見た目そのものより、状態と表示用データの整合性を優先します。

## E2E

E2Eはv1後半で最小限追加します。

最初からE2Eを厚くしません。

候補は次のとおりです。

- Dedicated extension pageを開ける
- `find` の結果が表示される
- `go` でBookmark URLを開ける
- `mark` でCLI起動元タブを保存できる
- `rm` が確認なしでは実行されない

E2Eはブラウザ拡張の統合確認として扱います。

Domainの詳細な仕様確認は単体テストで行います。

## テストデータ

テストでは小さなBookmark Treeを使います。

1つのテストに必要なnodeだけを含めます。

巨大なfixtureは避けます。

共通fixtureを使う場合も、テストの意図が読める名前にします。

## 優先して書くテスト

Slice 1では、次のテストを優先します。

- Bookmark TreeをBookmark EntryとFolder Entryへ正規化できる
- folder pathを生成できる
- Fuse.jsへ渡す検索対象がtitle、folder path、urlを含む
- Fuse.jsのscoreをCommandResultのdebug用scoreへ変換できる
- folder path一致が検索結果へ反映される
- `find #tag` が仮想タグで絞り込む
- `go` の候補がない場合は `not_found` を返す

Slice 3では、次のテストを優先します。

- `chrome.storage.local` のraw valueを `unknown` として扱う
- 不正な保存データを初期値または `storage_failed` へ変換できる
- migration後の保存データをtypia validatorへ渡せる
- typia validation成功時だけ `ExtensionState` として扱える

Slice 2以降は、実装ロードマップの完了条件に合わせて追加します。

## テストしないこと

Chrome Bookmarks APIそのものの挙動はテストしません。

Chrome Extensions Storage APIそのものの永続化性能はテストしません。

typiaが生成するvalidatorの内部実装はテストしません。

typia wrapperに渡す入力、成功時の型境界、失敗時のfallbackをテストします。

Fuse.jsそのもののscore計算はテストしません。

Fuse.js wrapperの入力変換、出力変換、仮想タグfilterをテストします。

Nerd Fontの描画品質は単体テストしません。

ただし、初期表示でfont依存glyphを出さないことはcomponent testで検証します。

CSSの見た目は、必要になった時点でStorybookやブラウザ確認へ寄せます。

Storybookで確認できる状態は、component testで重複して確認しません。

## 完了条件

テスト方針としての完了条件は次のとおりです。

- Domain層の主要な純粋関数にテストがある
- Application層の主要use caseにPort mockのテストがある
- 書き込み操作のpreviewと確認不足をテストしている
- storage migration、schema検証、初期化をテストしている
- E2Eは主要sliceに絞っている
