---
editUrl: false
next: false
prev: false
title: ChromeWindowIdStorageArea
slug: 1.3.2/api/infrastructure/chrome/cli-page-window-id-storage-adapter/interfaces/chromewindowidstoragearea
---

Defined in: [infrastructure/chrome/cli-page-window-id-storage-adapter.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-id-storage-adapter.ts#L13)

Chrome storage areaのうちadapterが使う最小shapeです。

## Properties

### get

> `readonly` **get**: (`key`) => `Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

Defined in: [infrastructure/chrome/cli-page-window-id-storage-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-id-storage-adapter.ts#L17)

保存値を読み込みます。

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

***

### remove

> `readonly` **remove**: (`key`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-id-storage-adapter.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-id-storage-adapter.ts#L15)

保存値を削除します。

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`>

***

### set

> `readonly` **set**: (`items`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-id-storage-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-id-storage-adapter.ts#L19)

保存値を書き込みます。

#### Parameters

##### items

`ChromeStorageRecord`

#### Returns

`Promise`\<`void`>
