---
editUrl: false
next: false
prev: false
title: ChromeStorageSessionArea
slug: 1.3.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/chromestoragesessionarea
---

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:5](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/launch-context-storage-adapter.ts#L5)

Chrome storage.session APIのうちadapterが使う最小shape。

## Properties

### get

> `readonly` **get**: (`keys`) => `Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:7](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/launch-context-storage-adapter.ts#L7)

Storage keyに対応する値を取得。

#### Parameters

##### keys

`string`

#### Returns

`Promise`\<`Readonly`\<`Record`\<`string`, `unknown`>>>

***

### set

> `readonly` **set**: (`items`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/launch-context-storage-adapter.ts#L9)

Storageへ値を書き込み。

#### Parameters

##### items

`Readonly`\<`Record`\<`string`, `unknown`>>

#### Returns

`Promise`\<`void`>
