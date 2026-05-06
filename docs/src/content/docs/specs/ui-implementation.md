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

Dedicated extension pageは実際の別windowとして開くため、Presentation層では内側のwindow風header、traffic light、card frameを描画しません。

Dedicated extension pageのwindowはhot keyで再呼び出しできます。

既存windowがある場合はwindowを増やさず、既存windowへfocusします。

hot key再呼び出し時にDedicated extension page自身がfocus中の場合は、そのCLI windowを閉じます。

再度hot keyで開いた場合は、新しいwindowを作り、保存済みの現在ディレクトリ、設定、command historyを復元します。

誤ってCLI windowが複数存在する場合は、hot keyまたは拡張actionの再実行時に1つへ集約します。

Chrome Extensions APIの制約により、OSの常時最前面固定はv1では扱いません。

PopupはDedicated extension page本体ではなく、設定画面として扱います。

Popupでは現在のhot keyを表示します。

Chrome Extensions Commands APIにはshortcutを書き換えるAPIがないため、Popupの変更buttonはブラウザ標準のshortcut管理UIを開きます。

Chromeでは `chrome://extensions/shortcuts` を新しいtabで開きます。

Firefoxでは `browser.commands.openShortcutSettings()` でManage Extension Shortcutsを開きます。

PopupからCLIを開くbuttonを提供し、backgroundへruntime messageを送ってDedicated extension pageを開きます。

拡張機能本体のiconは `public/icons/16.png`、`public/icons/24.png`、`public/icons/32.png` を使います。

同じく `public/icons/48.png`、`public/icons/128.png` も使い、すべてを `manifest.icons` に設定します。

Toolbar actionのiconは `public/icons/16.png`、`public/icons/24.png`、`public/icons/32.png` を `action.default_icon` に設定します。

Docs siteのfaviconは同じ元画像から生成した `docs/public/favicon.png` を使います。

Popupではcommand aliasの追加、削除、保存も扱います。

疑似CLIでは `alias` / `unalias` commandで同じ `settings.commandAliases` を更新します。

alias設定は `chrome.storage.local` の `settings.commandAliases` に保存します。

CLI windowがすでに開いている状態でPopupからaliasを保存した場合、開いているCLI windowの入力解決へ即時反映することはv1の必須要件にしません。

ただしCLI command実行後の永続化では、保存直前にstorageの最新settingsを読み直し、Popupで保存したaliasを古い画面状態で上書きしないようにします。

`alias` / `unalias` command自身がsettingsを更新した場合は、command実行結果側のsettingsを保存します。

疑似CLIでは `abbr` / `unabbr` commandで `settings.commandAbbreviations` を更新します。

abbreviationはEnter確定時に入力欄とtranscriptの実行commandへ展開します。

Popup UIはTailwindとReact componentで実装し、表示componentとChrome API adapterを分けます。

現在入力中のpromptはtranscript末尾に置き、実行後はその入力と結果をtranscript entryへ固定します。

結果一覧を持たないstatusやerrorは、実行済みcommand行の次のoutput行として描画します。

たとえばunknown commandは、prompt行に混ぜず `Unknown command: <command>` を次の行に表示します。

Terminal surfaceはviewport高に収め、scrollback transcriptだけを内側でscrollさせます。

Scrollback transcriptは操作上scroll可能にしますが、CLI感を保つため視覚上のscrollbarは隠します。

command実行でtranscriptが増えた場合だけterminal viewportを最下部へ追従させ、通常のterminalと同じように最新promptを見える位置に保ちます。

入力中promptは下部固定せず、scrollback transcriptの末尾に置きます。

補完候補は現在promptの直下にfloating表示します。

候補は現在promptより上へ出さず、terminalの補完出力として見えるようにします。

候補overlayはscrollbackの子ではなくterminal body直下に描画し、現在promptのDOM位置からtop、left、widthを解決します。

これにより、scrollbar非表示のscrollbackに候補が巻き込まれて通常outputのように見える状態を避けます。

候補用の下余白は候補表示中だけ確保し、command実行後の出力領域を空白で押し下げません。

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
- `ErrorMessage`
- `StatusBar`

`CommandPrompt` は `bookmark-cli $` のpromptを組み立てます。

Command入力はHTML上で `form` と `input` を使い、Enter submitとaccessibilityを保ちます。

Command入力ではBrowser nativeのautocomplete、autocapitalize、autocorrectを無効化します。

Firefoxなどのフォーム履歴候補ではなく、Bookmark CLI自身のfloating suggestionだけを補完UIとして表示します。

ただし操作感はterminalへ寄せるため、terminal surfaceをクリックした場合はcommand inputへfocusを戻します。

Powerline風表示は `CommandPrompt` の装飾として扱います。

`ResultSegment` は番号、種別、folder path、title、仮想タグなどのsegmentを表示します。

`ResultSegment` はPowerline glyphを使わず、terminal outputとして読めるplainな表示にします。

`ResultItem` はURL resultの場合、titleとURLを積んだtext stackの左に小さなfaviconを表示できます。

faviconは実拡張ページ上でだけChrome拡張の `/_favicon/` endpointから解決します。

Storybookやlocal表示など `chrome-extension:` origin以外の環境では、faviconを表示せずplain text labelだけで読める状態を保ちます。

faviconやiconは `tree` を含むすべてのresultでtext stackの左に置き、text stack全体の縦中央に揃えます。

Directory resultのtitleはURL色のcyanとは分け、blue accentで表示します。

番号指定やResult Listの意味はDomain層で扱い、componentは表示だけを担当します。

## Popupのcomponent候補

popupは設定画面として扱います。

次のcomponentへ分ける想定です。

- `PopupApp`
- `OpenCliButton`
- `ShortcutHint`
- `AliasSettings`
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

結果種別は `URL`、`DIR`、`HIST`、`HELP` のplain text labelで表示します。

ただし、Fontの有無に意味を依存させません。

Fontが利用できない環境では、CSS shapeまたはplain text fallbackで同じ情報を表示します。

copy、詳細表示、JSON出力では装飾を含めない値を使います。

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

入力欄、候補リスト、結果一覧、確認待ち表示はキーボード操作を前提にします。

Dedicated extension pageを開いた直後、command実行後、terminal surfaceのpointer操作後はcommand inputへfocusを戻します。

上キー、下キー、`Ctrl+p`、`Ctrl+n`、`Ctrl+r`、`Ctrl+a`、`Ctrl+e`、`Ctrl+u`、`Ctrl+k`、`Ctrl+w`、`Ctrl+d`、`Tab`、`Shift+Tab`、`Enter`、`Esc` の操作をcomponent設計に含めます。

Command suggestionはfish shellの補完に近い操作感を目指します。

空のpromptではcandidate listを表示せず、command名を入力し始めたタイミングでprefixに一致するcandidate listを表示します。

現在のprompt直下にfloating候補を表示し、`Tab` で候補選択を進め、`Shift+Tab` で候補選択を戻し、`Enter` で選択中のfloating候補を入力へ確定します。

`Ctrl+r` はCLI入力履歴をfloating候補として表示します。

履歴候補は新しい順に並べ、現在入力中の文字列を含む履歴だけに絞り込めます。

履歴候補の選択中もkeyboard focusはcommand inputに残します。

履歴候補を `Enter` で確定した場合は入力欄へ戻すだけで、即時実行はしません。

`Tab` や `Shift+Tab` による候補選択中もkeyboard focusはcommand inputに残します。

選択中候補は `scrollIntoView({ block: "nearest", inline: "nearest" })` で表示範囲へ追従させます。

結果一覧をTabまたはShift+Tabで選択する場合も同じ方針で、DOM focusはcommand inputに残し、選択中result itemだけを表示範囲へ追従させます。

ユーザーがcommand inputを手で編集した場合は、選択中のsuggestion cursorとresult cursorを解除します。

手入力したcommandの `Enter` が古い選択状態に奪われず、通常のsubmitとして実行されるようにします。

空のpromptで結果一覧を選択している場合、`Enter` は選択行の既定アクションを実行します。

folder行は `cd <result-number>`、Bookmark行は `go <result-number>` として扱います。

入力済みcommandがある場合、結果一覧の選択状態が残っていても `Enter` はresult補完ではなく通常のsubmitへ委ねます。

空のpromptで `Ctrl+d` を押した場合は、Dedicated extension pageの現在windowを閉じます。

`cd ./` のように移動先path入力へ入った場合は、現在ディレクトリ配下の存在するfolderを候補として表示します。

`go ./` のようにBookmarkを開くpath入力へ入った場合は、現在ディレクトリ配下のfolderとBookmarkを候補として表示します。

選択中の候補や確認待ちの状態は、視覚的に分かるようにします。

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
