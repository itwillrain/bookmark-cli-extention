---
editUrl: false
next: false
prev: false
title: moveCommandHistoryCursor
slug: 1.3.2/api/domain/storage/command-history-navigation/functions/movecommandhistorycursor
---

> **moveCommandHistoryCursor**(`input`): [`CommandHistoryCursorIndex`](/1.3.2/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

Defined in: [domain/storage/command-history-navigation.ts:79](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/command-history-navigation.ts#L79)

Command history cursorを移動。

## Parameters

### input

[`MoveCommandHistoryCursorInput`](/1.3.2/api/domain/storage/command-history-navigation/interfaces/movecommandhistorycursorinput/)

Command history cursor移動入力。

## Returns

[`CommandHistoryCursorIndex`](/1.3.2/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

移動後cursor index。

## Example

```ts
const result = moveCommandHistoryCursor({ currentIndex: false, direction: "previous", itemCount: 3 });
// 2
```
