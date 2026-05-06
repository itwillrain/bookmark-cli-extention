---
editUrl: false
next: false
prev: false
title: UseCommandHistoryKeyboardInput
slug: 1.3.0/api/entrypoints/cli-page/use-command-history-keyboard/interfaces/usecommandhistorykeyboardinput
---

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L23)

Command history keyboard hook入力。

## Properties

### commandHistory

> `readonly` **commandHistory**: readonly `CommandHistoryKeyboardEntry`\[]

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L25)

Command history一覧。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L27)

現在のCLI入力値。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-command-history-keyboard.ts#L29)

入力値setter。
