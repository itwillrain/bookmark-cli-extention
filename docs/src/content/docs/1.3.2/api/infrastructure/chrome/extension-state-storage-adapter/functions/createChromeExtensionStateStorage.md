---
editUrl: false
next: false
prev: false
title: createChromeExtensionStateStorage
slug: 1.3.2/api/infrastructure/chrome/extension-state-storage-adapter/functions/createchromeextensionstatestorage
---

> **createChromeExtensionStateStorage**(`storageArea`): [`ExtensionStateStoragePort`](/1.3.2/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/extension-state-storage-adapter.ts#L153)

Chrome storage.localをExtensionStateStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageLocalArea`](/1.3.2/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea/)

Chrome storage.local API。

## Returns

[`ExtensionStateStoragePort`](/1.3.2/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

拡張状態storage port。
