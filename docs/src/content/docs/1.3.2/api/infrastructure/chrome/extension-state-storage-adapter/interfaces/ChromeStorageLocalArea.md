---
editUrl: false
next: false
prev: false
title: ChromeStorageLocalArea
slug: 1.3.2/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea
---

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/extension-state-storage-adapter.ts#L13)

Chrome storage.local APIのうちadapterが使う最小shape。

## Properties

### get

> `readonly` **get**: () => `Promise`\<`unknown`>

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/extension-state-storage-adapter.ts#L15)

Storage全体を取得。

#### Returns

`Promise`\<`unknown`>

***

### set

> `readonly` **set**: (`items`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/extension-state-storage-adapter.ts#L17)

Storageへ値を書き込み。

#### Parameters

##### items

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

#### Returns

`Promise`\<`void`>
