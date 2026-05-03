---
title: UI実装方針
description: Bookmark CLI Extension のUI技術選定、React component設計、Tailwind CSS利用方針を定義します。
---

# UI実装方針

このページでは、Bookmark CLI ExtensionのPresentation層をどう実装するかを定義します。

v1のUIは最初からReactで実装します。

スタイルは基本的にTailwind CSSで実装します。

UI componentは小さく分け、疑似CLIの状態と表示を読みやすく保ちます。

UI componentはStory Firstで実装します。

Dedicated extension pageへ組み込む前に、Storybook上でcomponentのprops、状態、見た目を確認します。

## 技術選定

UIはReactとTypeScriptで実装します。

WXTのReact moduleを使い、entrypointごとにReact appをmountします。

Tailwind CSSはVite pluginとして導入します。

StorybookはReact componentを先に確認するための作業場として使います。

Dedicated extension pageとpopupは、同じUI基盤を使います。

ただし、疑似CLI本体はDedicated extension pageに置きます。

popupは設定画面とDedicated extension pageへの導線に限定します。

## 導入する主なpackage

UI実装を始めるタイミングで、次のpackageを追加します。

```bash
pnpm add react react-dom
pnpm add fuse.js
pnpm add -D @wxt-dev/module-react tailwindcss @tailwindcss/vite
pnpm add -D @storybook/react-vite
```

Reactの型が必要な場合は、次のpackageも追加します。

```bash
pnpm add -D @types/react @types/react-dom
```

## WXT entrypoint方針

Reactを使うentrypointはdirectory形式にします。

entrypoint配下には `index.html`、`main.tsx`、`App.tsx`、entrypoint固有のstyleを置きます。

WXTのentrypoint discoveryに合わせ、深い階層をentrypointとして扱わせません。

```text
src/
  entrypoints/
    cli-page/
      index.html
      main.tsx
      App.tsx
      style.css
    popup/
      index.html
      main.tsx
      App.tsx
      style.css
```

共有componentは `entrypoints` 配下ではなく、Presentation層に配置します。

```text
src/
  presentation/
    cli/
      components/
      hooks/
      view-models/
```

## Component分割方針

Componentは小さく分けます。

1つのcomponentは、できるだけ1つの表示責務だけを持ちます。

新しいcomponentは、原則としてStorybook storyを先に作ります。

巨大な `App.tsx` に状態、layout、結果表示、候補表示、入力処理を詰め込みません。

疑似CLI本体は単なる入力formとして見せず、実行済みpromptとoutputを下方向へ積むtranscript viewとして表示します。

現在入力中のpromptはtranscript末尾に置き、実行後はその入力と結果をtranscript entryへ固定します。

Terminal panelはviewport高に収め、scrollback transcriptだけを内側でscrollさせます。

transcript、入力値、補完候補、選択状態が変わった場合はterminal viewportを最下部へ追従させ、通常のterminalと同じように最新promptを見える位置に保ちます。

補完候補は現在promptの直下にfloating表示します。

候補は現在promptより上へ出さず、terminalの補完出力として見えるようにします。

Container componentは状態とuse case呼び出しを扱います。

Presentational componentはpropsから表示を作ります。

Presentational componentからChrome APIや `chrome.storage` を直接呼びません。

UI stateを持つhookは、componentから切り出します。

## Story First方針

UI componentは、Dedicated extension pageやpopupへ組み込む前にStorybook上で作ります。

Storyでは、通常状態、空状態、選択状態、エラー状態、長い文字列、キーボード操作中の状態を確認します。

Storyはcomponentの仕様書として扱います。

Storyに出せないcomponentは責務過多と判断し、component分割を検討します。

Storybookで確認する対象は次のとおりです。

- `CommandPrompt`
- `SuggestionList`
- `ResultList`
- `ResultItem`
- `ResultSegment`
- `PreviewPanel`
- `ErrorMessage`
- `StatusBar`
- popupの設定component

Story fileはcomponentの近くに置きます。

```text
src/
  presentation/
    cli/
      components/
        ResultItem.tsx
        ResultItem.stories.tsx
```

StorybookではApplication層のuse caseを直接呼びません。

Storyに渡す値は、CommandResultまたはview modelのfixtureとして用意します。

Chrome API、`chrome.storage`、runtime messagingはStoryから直接呼びません。

Storybookで確認したcomponentを、entrypointのcontainer componentから組み込みます。

## Dedicated extension pageのcomponent候補

Dedicated extension pageは、次のcomponentへ分ける想定です。

- `CliPage`
- `CommandPrompt`
- `TranscriptList`
- `TranscriptEntry`
- `CommandHistory`
- `SuggestionList`
- `ResultPanel`
- `ResultList`
- `ResultItem`
- `ResultSegment`
- `PreviewPanel`
- `ErrorMessage`
- `StatusBar`

`CommandPrompt` は `bookmark-cli $` のpromptを組み立てます。

Powerline風表示は `CommandPrompt` の装飾として扱います。

`ResultSegment` は番号、種別、folder path、title、仮想タグなどのsegmentを表示します。

`ResultSegment` はPowerline glyphを使わず、terminal outputとして読めるplainな表示にします。

番号指定やResult Listの意味はDomain層で扱い、componentは表示だけを担当します。

## Popupのcomponent候補

popupは設定画面として扱います。

次のcomponentへ分ける想定です。

- `PopupApp`
- `OpenCliButton`
- `ShortcutHint`
- `DisplaySettings`
- `FontPreferenceToggle`
- `SettingsSection`

popupには疑似CLI本体を置きません。

## Tailwind CSS利用方針

スタイルはTailwind CSSのutility classを基本にします。

CSS moduleやglobal CSSは、Tailwindだけでは表現しづらい基盤styleに限定します。

Powerline風prompt、focus ring、scrollbarなど、utility classだけで読みにくくなる場合は小さなCSS classへ切り出します。

Tailwind classはcomponentの責務に沿って配置します。

複数componentで繰り返すclassは、component化または小さなstyle helperへ切り出します。

色、spacing、fontはTailwind themeで管理します。

## Powerline風表示

Powerline風表示は `bookmark-cli $` promptに適用します。

結果一覧や候補一覧は、terminal outputとしてplainに表示します。

Powerline風promptの区切りはfont glyphではなくCSS shapeで描画します。

候補や結果一覧の行にはPowerline glyphを使いません。

Nerd Font互換iconは将来のopt-in表現として扱い、v1の標準表示では使いません。

結果種別は `URL`、`DIR`、`PREV` のplain text labelで表示します。

ただし、Fontの有無に意味を依存させません。

Fontが利用できない環境では、CSS shapeまたはplain text fallbackで同じ情報を表示します。

copy、debug、JSON出力では装飾を含めない値を使います。

## 状態管理方針

v1では外部状態管理libraryを導入しません。

Reactのlocal state、`useReducer`、custom hookで始めます。

状態が複雑になった場合だけ、状態管理libraryを検討します。

RxJSのようなstream libraryは、v1初期では導入しません。

コマンド入力、候補補完、キーバインド、debounce、cancel、非同期実行状態が複雑になった時点で検討します。

streamを導入する場合も、Domain層へ依存を持ち込みません。

UI event streamはPresentation層に閉じ、Application層へはplain dataのcommandとして渡します。

Command実行結果はApplication層のCommandResultを受け取り、Presentation層でview modelへ変換します。

view modelはcomponentが直接使いやすい形にします。

## アクセシビリティ方針

入力欄、候補リスト、preview表示はキーボード操作を前提にします。

上キー、下キー、`Ctrl+p`、`Ctrl+n`、`Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w`、`Tab`、`Enter`、`Esc` の操作をcomponent設計に含めます。

Command suggestionはfish shellの補完に近い操作感を目指します。

現在のprompt直下にfloating候補を表示し、`Tab` で候補選択を進め、`Enter` で選択中候補を入力へ確定します。

`cd ./` のようにpath引数へ入った場合は、現在ディレクトリ配下の存在するfolderを候補として表示します。

選択中の候補やpreview表示中の状態は、視覚的に分かるようにします。

iconだけのbuttonには、ユーザーが意味を理解できるlabelを持たせます。

## テスト方針

UIのテストはview modelと状態遷移を中心にします。

Componentの見た目はStorybookで先に確認します。

ブラウザ上の統合確認は、entrypointへ組み込んだ後に行います。

Domain層の仕様をcomponent testで重複して確認しません。

Presentation層では、CommandResultから表示用view modelへの変換をテストします。

キーバインドはcustom hookまたはreducerとして切り出し、状態遷移をテストします。

Scroll制御はDOM依存を薄くし、最下部へ移動する純粋な境界関数としてテストします。

## 参考

- [WXT Frontend Frameworks](https://wxt.dev/guide/essentials/frontend-frameworks.html)
- [WXT Entrypoints](https://wxt.dev/guide/essentials/entrypoints.html)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React: Describing the UI](https://react.dev/learn/describing-the-ui)
- [Storybook for React with Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)
