---
editUrl: false
next: false
prev: false
title: UseBookmarkCliAppKeyboardInput
slug: 1.2.0/api/entrypoints/cli-page/use-bookmark-cli-app-keyboard/interfaces/usebookmarkcliappkeyboardinput
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L37)

Bookmark CLI app keyboard入力。

## Properties

### closeCliPage

> `readonly` **closeCliPage**: `CloseCliPageHandler`

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L39)

CLI pageを閉じる関数。

***

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L41)

現在のcommand state。

***

### cursors

> `readonly` **cursors**: [`BookmarkCliCursorState`](/1.2.0/api/entrypoints/cli-page/use-bookmark-cli-cursor-state/interfaces/bookmarkclicursorstate/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L43)

Cursor state。

***

### executeInputValue

> `readonly` **executeInputValue**: `CommandInputExecutor`

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L45)

Command入力値を実行する関数。

***

### handleCommandExecutionError

> `readonly` **handleCommandExecutionError**: `CommandExecutionErrorHandler`

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L47)

Command実行失敗handler。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L49)

現在のCLI入力値。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L51)

Bookmark Tree取得port。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-app-keyboard.ts#L53)

入力値setter。
