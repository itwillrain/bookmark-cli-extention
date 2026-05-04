---
title: Firefox対応ロードマップ
description: Bookmark CLI Extension v1.1.0でFirefox desktopへ対応するための順序と完了条件です。
---

# Firefox対応ロードマップ

このページでは、v1.1.0でFirefox desktop対応を追加するための実装順序を定義します。

v1.1.0は、Chrome版の体験を保ったままFirefoxでも利用できる状態を目標にします。

対象はFirefox desktopです。

Firefox for Androidはv1.1.0の対象外です。

## 前提

WXTはFirefox向けbuildを `-b firefox` で生成できます。

現時点では `pnpm exec wxt build -b firefox` が成功し、`dist/firefox-mv2` が生成されます。

Firefox版はManifest V2として生成され、toolbar actionは `browser_action` へ変換されます。

Bookmark、History、Storage、Windows、Tabs、Commandsの主要APIはFirefox WebExtensionsにも存在します。

ただしChrome専用のfavicon endpointと、action API名の差分は吸収が必要です。

## v1.1.0スコープ

- Firefox desktop向けbuild
- Firefox desktop向けzip生成
- Firefox manifest調整
- AMO申請に必要なdata collection宣言
- `browser.action` と `browser.browserAction` の互換層
- FirefoxではChrome専用favicon endpointを使わないfallback
- FirefoxでのBookmarks API動作確認
- FirefoxでのHistory API動作確認
- FirefoxでのStorage API動作確認
- FirefoxでのWindows API動作確認
- FirefoxでのCommands API動作確認
- AMO listed申請に必要な成果物整理

## 非スコープ

- Firefox for Android対応
- Firefox Syncを使ったブラウザ間同期
- ChromeとFirefox間のBookmark同期
- OS native messaging
- Manifest V3版Firefox buildへの移行
- Firefox専用UIの大きな作り替え

ChromeとFirefox間のBookmark同期はv1.1.0では扱いません。

同期方針は [ChromeとFirefoxのBookmark同期ロードマップ](../cross-browser-sync/) で管理します。

## Slice 1: Firefox buildをCI可能にする

目的は、Firefox向け成果物を毎回同じ手順で生成できる状態にすることです。

実装済みの手順は次のとおりです。

- `pnpm run build:firefox`
- `pnpm run zip:firefox`

実装対象は次のとおりです。

- `build:firefox`
- `zip:firefox`
- Firefox buildの出力確認
- Firefox zipの出力確認
- READMEまたはdocsへのbuild手順追記

完了条件は次のとおりです。

- `pnpm run build:firefox` が成功する
- `pnpm run zip:firefox` が成功する
- `dist/firefox-mv2/manifest.json` が生成される
- Firefox向けzipまたはxpi相当の提出物を生成できる

## Slice 2: Firefox manifestを整える

目的は、Firefox向けmanifestをAMOに提出できる形へ近づけることです。

Firefox buildではChrome専用の `favicon` permissionを除外します。

Firefox向けmanifestには `browser_specific_settings.gecko.id` と `data_collection_permissions.required: ["none"]` を追加します。

実装対象は次のとおりです。

- Firefox build時だけChrome専用 `favicon` permissionを除外
- `browser_specific_settings.gecko` の追加
- Add-on ID方針の決定
- `data_collection_permissions.required` に `none` を設定
- Firefox向けminimum versionの必要性確認
- Firefox manifestのsnapshot確認

完了条件は次のとおりです。

- Firefox manifestにChrome専用 `favicon` permissionが含まれない
- Firefox manifestに `browser_specific_settings.gecko.data_collection_permissions` が含まれる
- 外部送信しない方針が `required: ["none"]` として表現される
- Chrome manifestにはFirefox専用設定が混ざらない

## Slice 3: Runtime API差分を吸収する

目的は、ChromeとFirefoxで同じApplication層を使える状態にすることです。

Toolbar action clickは、Chrome MV3の `browser.action` を優先し、Firefox MV2では `browser.browserAction` へfallbackします。

Popupのshortcut変更導線は、Firefoxでは `browser.commands.openShortcutSettings()` を優先します。

Chromeでは `chrome://extensions/shortcuts` をtabで開きます。

実装対象は次のとおりです。

- toolbar action clickの互換adapter
- `browser.action` の存在判定
- `browser.browserAction` へのfallback
- shortcut設定画面を開くbrowser差分adapter
- Firefox MV2 backgroundでの起動確認
- adapterの単体テスト

完了条件は次のとおりです。

- Chromeでは `browser.action.onClicked` を使う
- Firefox MV2では `browser.browserAction.onClicked` を使う
- Firefoxでは `browser.commands.openShortcutSettings()` でshortcut設定画面を開く
- Chromeでは `chrome://extensions/shortcuts` をtabで開く
- background初期化で存在しないAPIを直接参照しない
- action clickからDedicated extension pageを開ける

## Slice 4: favicon表示をFirefox対応にする

目的は、FirefoxでChrome専用favicon endpointへ依存しない表示にすることです。

Firefoxではextension pageのoriginが `moz-extension://` になるため、Chrome専用の `/_favicon/` endpoint URLを生成しません。

Firefox版ではfaviconなしのplain text result表示を正とします。

実装対象は次のとおりです。

- favicon URL生成のbrowser判定
- Firefoxではfavicon URL生成をfalseへfallback
- Result表示のplain text fallback維持
- Firefox向けfaviconなし表示のStoryまたはテスト
- docsのfavicon仕様更新

完了条件は次のとおりです。

- Chromeでは既存の `/_favicon/` endpointを使う
- Firefoxでは `/_favicon/` endpointを参照しない
- Firefoxでfaviconがなくてもtitleとurlが読める
- faviconなしでもlayoutが崩れない

## Slice 5: Firefoxで主要CLI操作を動かす

目的は、v1の主要体験をFirefoxでも成立させることです。

実装対象は次のとおりです。

- `find`
- `go`
- `ls`
- `cd`
- `mark`
- `history`
- `recent`
- `freq`
- `tag`
- `mkdir`
- `mv`
- `rename`
- `rm`
- hot key起動
- popup設定

完了条件は次のとおりです。

- FirefoxでBookmark Treeを取得できる
- Firefoxのroot直下containerをCLI上のfolderとして表示せず、Chromeと同じ仮想root `/` として扱える
- FirefoxでBookmark URLを新しいtabで開ける
- Firefoxで現在tabをBookmarkへ保存できる
- FirefoxでHistoryを検索できる
- Firefoxでstorageから状態を復元できる
- FirefoxでDedicated extension pageの単一window制御が動く
- Firefoxでhot keyからCLI windowを開ける

## Slice 6: AMO申請準備を整える

目的は、Firefox Add-onsへ提出できる材料を揃えることです。

実装対象は次のとおりです。

- AMO listedで出すかself-distributionで出すかの最終決定
- listed申請用summary
- listed申請用description
- privacy policy URL
- screenshot
- icon
- source code package要否の確認
- reviewで説明しやすい権限理由の整理

完了条件は次のとおりです。

- AMO掲載文がdocsまたはstore-assets配下で管理されている
- privacy policyをAMOへ提出できる
- permissionごとの利用理由を説明できる
- 外部送信なしの説明が用意されている
- Firefox版提出物が200MB未満である

## Slice 7: Firefox manual QAを通す

目的は、実際のFirefox上でv1.1.0の動作を確認することです。

実装対象は次のとおりです。

- `about:debugging` で一時的に読み込む
- Dedicated extension page起動確認
- hot key確認
- popup確認
- Bookmark検索確認
- Bookmark作成確認
- Bookmark整理確認
- History検索確認
- storage復元確認
- console error確認

完了条件は次のとおりです。

- manual QA checklistがdocsに残っている
- blocking issueがない
- Chrome版の既存動作が壊れていない
- Firefox版の既知制約がdocsに記載されている

## リリース完了条件

v1.1.0は、次の状態を満たしたら完了とします。

- `pnpm run check` が成功する
- `pnpm test` が成功する
- `pnpm run build` が成功する
- `pnpm run build:firefox` が成功する
- `pnpm run zip:firefox` が成功する
- Chrome版manifestが期待どおり生成される
- Firefox版manifestが期待どおり生成される
- Firefox desktopで主要CLI操作を確認できる
- AMO申請に必要な情報が揃っている

## 参照

- [WXT Targeting Different Browsers](https://wxt.dev/guide/essentials/target-different-browsers.html)
- [Firefox Extension Workshop: Signing and distribution](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/)
- [Firefox Extension Workshop: Submitting an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
- [Firefox Extension Workshop: Data collection consent](https://www.extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/)
- [MDN WebExtensions bookmarks API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks)
- [MDN WebExtensions history API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history)
- [MDN WebExtensions storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage)
- [MDN WebExtensions windows API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows)
