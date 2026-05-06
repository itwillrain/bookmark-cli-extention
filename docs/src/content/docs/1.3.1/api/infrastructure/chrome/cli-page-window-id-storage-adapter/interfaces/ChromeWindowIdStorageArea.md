---
editUrl: false
next: false
prev: false
title: ChromeWindowIdStorageArea
slug: 1.3.1/api/infrastructure/chrome/cli-page-window-id-storage-adapter/interfaces/chromewindowidstoragearea
---

Defined in: infrastructure/chrome/cli-page-window-id-storage-adapter.ts:13

Chrome storage areaのうちadapterが使う最小shapeです。

## Properties

### get

> `readonly` **get**: (`key`) => `Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

Defined in: infrastructure/chrome/cli-page-window-id-storage-adapter.ts:17

保存値を読み込みます。

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

***

### remove

> `readonly` **remove**: (`key`) => `Promise`\<`void`>

Defined in: infrastructure/chrome/cli-page-window-id-storage-adapter.ts:15

保存値を削除します。

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`>

***

### set

> `readonly` **set**: (`items`) => `Promise`\<`void`>

Defined in: infrastructure/chrome/cli-page-window-id-storage-adapter.ts:19

保存値を書き込みます。

#### Parameters

##### items

`ChromeStorageRecord`

#### Returns

`Promise`\<`void`>
