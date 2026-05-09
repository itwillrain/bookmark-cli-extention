---
editUrl: false
next: false
prev: false
title: ChromeTabsApi
slug: 1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chrometabsapi
---

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L42)

Chrome Tabs APIのうちadapterが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/tabs

## Properties

### create

> `readonly` **create**: (`createProperties`) => `Promise`\<[`ChromeCreatedTab`](/1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chromecreatedtab/) | `undefined`>

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L46)

新しいtabを作成します。

#### Parameters

##### createProperties

[`ChromeTabCreateProperties`](/1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chrometabcreateproperties/)

#### Returns

`Promise`\<[`ChromeCreatedTab`](/1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chromecreatedtab/) | `undefined`>
