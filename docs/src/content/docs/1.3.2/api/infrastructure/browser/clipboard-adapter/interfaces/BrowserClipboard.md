---
editUrl: false
next: false
prev: false
title: BrowserClipboard
slug: 1.3.2/api/infrastructure/browser/clipboard-adapter/interfaces/browserclipboard
---

Defined in: [infrastructure/browser/clipboard-adapter.ts:6](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/browser/clipboard-adapter.ts#L6)

Browser Clipboard APIのうちadapterが使う最小shapeです。

## Properties

### writeText

> `readonly` **writeText**: (`text`) => `Promise`\<`void`>

Defined in: [infrastructure/browser/clipboard-adapter.ts:10](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/browser/clipboard-adapter.ts#L10)

Clipboardへtextを書き込みます。

#### Parameters

##### text

`string`

#### Returns

`Promise`\<`void`>
