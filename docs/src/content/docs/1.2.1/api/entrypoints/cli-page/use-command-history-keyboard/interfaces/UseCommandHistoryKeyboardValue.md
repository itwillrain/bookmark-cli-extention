---
editUrl: false
next: false
prev: false
title: UseCommandHistoryKeyboardValue
slug: 1.2.1/api/entrypoints/cli-page/use-command-history-keyboard/interfaces/usecommandhistorykeyboardvalue
---

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L33)

Command history keyboard hook戻り値。

## Properties

### clearHistoryCursor

> `readonly` **clearHistoryCursor**: () => `void`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L35)

Command history cursorを解除。

#### Returns

`void`

***

### moveCommandHistoryInput

> `readonly` **moveCommandHistoryInput**: (`direction`) => `boolean`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L37)

Command historyを入力欄へ反映。

#### Parameters

##### direction

[`CommandHistoryCursorDirection`](/1.2.1/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursordirection/)

#### Returns

`boolean`
