---
editUrl: false
next: false
prev: false
title: UseCommandHistoryKeyboardValue
slug: 1.3.0/api/entrypoints/cli-page/use-command-history-keyboard/interfaces/usecommandhistorykeyboardvalue
---

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L33)

Command history keyboard hook戻り値。

## Properties

### clearHistoryCursor

> `readonly` **clearHistoryCursor**: () => `void`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L35)

Command history cursorを解除。

#### Returns

`void`

***

### moveCommandHistoryInput

> `readonly` **moveCommandHistoryInput**: (`direction`) => `boolean`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L37)

Command historyを入力欄へ反映。

#### Parameters

##### direction

[`CommandHistoryCursorDirection`](/1.3.0/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursordirection/)

#### Returns

`boolean`
