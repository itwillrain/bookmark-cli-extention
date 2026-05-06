---
editUrl: false
next: false
prev: false
title: CliPageWindowIdStoragePort
slug: 1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/clipagewindowidstorageport
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:115](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L115)

CLI page window ID storageです。

## Properties

### clearCliPageWindowId

> `readonly` **clearCliPageWindowId**: () => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:117](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L117)

保存済みCLI page window IDを削除します。

#### Returns

`Promise`\<`void`>

***

### readCliPageWindowId

> `readonly` **readCliPageWindowId**: () => `Promise`\<[`StoredCliPageWindowId`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/type-aliases/storedclipagewindowid/)>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:119](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L119)

保存済みCLI page window IDを読み込みます。

#### Returns

`Promise`\<[`StoredCliPageWindowId`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/type-aliases/storedclipagewindowid/)>

***

### writeCliPageWindowId

> `readonly` **writeCliPageWindowId**: (`windowId`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L121)

CLI page window IDを保存します。

#### Parameters

##### windowId

`number`

#### Returns

`Promise`\<`void`>
