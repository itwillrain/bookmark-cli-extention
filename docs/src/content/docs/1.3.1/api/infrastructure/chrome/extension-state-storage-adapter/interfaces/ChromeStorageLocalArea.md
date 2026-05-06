---
editUrl: false
next: false
prev: false
title: ChromeStorageLocalArea
slug: 1.3.1/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea
---

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/extension-state-storage-adapter.ts#L13)

Chrome storage.local APIのうちadapterが使う最小shape。

## Properties

### get

> `readonly` **get**: () => `Promise`\<`unknown`>

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/extension-state-storage-adapter.ts#L15)

Storage全体を取得。

#### Returns

`Promise`\<`unknown`>

***

### set

> `readonly` **set**: (`items`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/extension-state-storage-adapter.ts#L17)

Storageへ値を書き込み。

#### Parameters

##### items

[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

#### Returns

`Promise`\<`void`>
