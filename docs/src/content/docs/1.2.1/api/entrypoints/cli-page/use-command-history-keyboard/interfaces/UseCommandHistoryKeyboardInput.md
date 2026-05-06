---
editUrl: false
next: false
prev: false
title: UseCommandHistoryKeyboardInput
slug: 1.2.1/api/entrypoints/cli-page/use-command-history-keyboard/interfaces/usecommandhistorykeyboardinput
---

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L23)

Command history keyboard hook入力。

## Properties

### commandHistory

> `readonly` **commandHistory**: readonly `CommandHistoryKeyboardEntry`\[]

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L25)

Command history一覧。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L27)

現在のCLI入力値。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/use-command-history-keyboard.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-command-history-keyboard.ts#L29)

入力値setter。
