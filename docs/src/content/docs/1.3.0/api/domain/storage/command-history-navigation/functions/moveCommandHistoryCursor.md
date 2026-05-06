---
editUrl: false
next: false
prev: false
title: moveCommandHistoryCursor
slug: 1.3.0/api/domain/storage/command-history-navigation/functions/movecommandhistorycursor
---

> **moveCommandHistoryCursor**(`input`): [`CommandHistoryCursorIndex`](/1.3.0/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

Defined in: [domain/storage/command-history-navigation.ts:79](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/command-history-navigation.ts#L79)

Command history cursorを移動。

## Parameters

### input

[`MoveCommandHistoryCursorInput`](/1.3.0/api/domain/storage/command-history-navigation/interfaces/movecommandhistorycursorinput/)

Command history cursor移動入力。

## Returns

[`CommandHistoryCursorIndex`](/1.3.0/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

移動後cursor index。

## Example

```ts
const result = moveCommandHistoryCursor({ currentIndex: false, direction: "previous", itemCount: 3 });
// 2
```
