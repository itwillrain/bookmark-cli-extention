---
editUrl: false
next: false
prev: false
title: ChromeTabsApi
slug: 1.3.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chrometabsapi
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/bookmarks-adapter.ts#L125)

Chrome Tabs APIのうちadapterが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/tabs

## Properties

### create

> `readonly` **create**: (`createProperties`) => `Promise`\<`unknown`>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:129](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/bookmarks-adapter.ts#L129)

新しいtabを作成します。

#### Parameters

##### createProperties

[`ChromeTabCreateProperties`](/1.3.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chrometabcreateproperties/)

#### Returns

`Promise`\<`unknown`>
