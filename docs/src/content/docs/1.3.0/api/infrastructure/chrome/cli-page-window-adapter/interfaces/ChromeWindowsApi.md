---
editUrl: false
next: false
prev: false
title: ChromeWindowsApi
slug: 1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowsapi
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L76)

Chrome windows APIのうちadapterが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows

## Properties

### create

> `readonly` **create**: (`createProperties`) => `Promise`\<[`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/) | `undefined`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:78](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L78)

新しいwindowを作成します。

#### Parameters

##### createProperties

[`ChromeWindowCreateProperties`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowcreateproperties/)

#### Returns

`Promise`\<[`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/) | `undefined`>

***

### getAll

> `readonly` **getAll**: (`queryInfo`) => `Promise`\<readonly [`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/)\[]>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:83](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L83)

Window一覧を取得します。

#### Parameters

##### queryInfo

[`ChromeWindowGetAllQuery`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowgetallquery/)

#### Returns

`Promise`\<readonly [`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/)\[]>

***

### remove

> `readonly` **remove**: (`windowId`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L85)

既存windowを閉じます。

#### Parameters

##### windowId

`number`

#### Returns

`Promise`\<`void`>

***

### update

> `readonly` **update**: (`windowId`, `updateProperties`) => `Promise`\<[`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/) | `undefined`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:87](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L87)

既存windowを更新します。

#### Parameters

##### windowId

`number`

##### updateProperties

[`ChromeWindowUpdateProperties`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowupdateproperties/)

#### Returns

`Promise`\<[`ChromeWindow`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow/) | `undefined`>
