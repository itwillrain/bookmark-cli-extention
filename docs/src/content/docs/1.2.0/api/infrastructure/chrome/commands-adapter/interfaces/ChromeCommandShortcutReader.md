---
editUrl: false
next: false
prev: false
title: ChromeCommandShortcutReader
slug: 1.2.0/api/infrastructure/chrome/commands-adapter/interfaces/chromecommandshortcutreader
---

Defined in: [infrastructure/chrome/commands-adapter.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L86)

Command shortcut readerです。

## Properties

### readCommandShortcut

> `readonly` **readCommandShortcut**: (`commandName`) => `Promise`\<[`CommandShortcut`](/1.2.0/api/infrastructure/chrome/commands-adapter/interfaces/commandshortcut/)>

Defined in: [infrastructure/chrome/commands-adapter.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L88)

Command shortcutを読み取ります。

#### Parameters

##### commandName

`string`

#### Returns

`Promise`\<[`CommandShortcut`](/1.2.0/api/infrastructure/chrome/commands-adapter/interfaces/commandshortcut/)>
