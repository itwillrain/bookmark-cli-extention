---
editUrl: false
next: false
prev: false
title: BrowserClipboard
slug: 1.3.0/api/infrastructure/browser/clipboard-adapter/interfaces/browserclipboard
---

Defined in: [infrastructure/browser/clipboard-adapter.ts:6](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/browser/clipboard-adapter.ts#L6)

Browser Clipboard APIのうちadapterが使う最小shapeです。

## Properties

### writeText

> `readonly` **writeText**: (`text`) => `Promise`\<`void`>

Defined in: [infrastructure/browser/clipboard-adapter.ts:10](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/browser/clipboard-adapter.ts#L10)

Clipboardへtextを書き込みます。

#### Parameters

##### text

`string`

#### Returns

`Promise`\<`void`>
