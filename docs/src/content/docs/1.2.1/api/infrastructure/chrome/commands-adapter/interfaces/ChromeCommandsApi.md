---
editUrl: false
next: false
prev: false
title: ChromeCommandsApi
slug: 1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/chromecommandsapi
---

Defined in: [infrastructure/chrome/commands-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/commands-adapter.ts#L18)

Chrome commands APIのうちsettings popupが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/commands#method-getAll

## Properties

### getAll

> `readonly` **getAll**: () => `Promise`\<readonly [`ChromeExtensionCommand`](/1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/chromeextensioncommand/)\[]>

Defined in: [infrastructure/chrome/commands-adapter.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/commands-adapter.ts#L20)

登録済みcommand一覧を取得します。

#### Returns

`Promise`\<readonly [`ChromeExtensionCommand`](/1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/chromeextensioncommand/)\[]>
