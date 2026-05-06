---
editUrl: false
next: false
prev: false
title: ChromeCommandShortcutReader
slug: 1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/chromecommandshortcutreader
---

Defined in: [infrastructure/chrome/commands-adapter.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/commands-adapter.ts#L86)

Command shortcut readerです。

## Properties

### readCommandShortcut

> `readonly` **readCommandShortcut**: (`commandName`) => `Promise`\<[`CommandShortcut`](/1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/commandshortcut/)>

Defined in: [infrastructure/chrome/commands-adapter.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/commands-adapter.ts#L88)

Command shortcutを読み取ります。

#### Parameters

##### commandName

`string`

#### Returns

`Promise`\<[`CommandShortcut`](/1.2.1/api/infrastructure/chrome/commands-adapter/interfaces/commandshortcut/)>
