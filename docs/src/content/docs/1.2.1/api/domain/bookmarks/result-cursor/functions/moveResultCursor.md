---
editUrl: false
next: false
prev: false
title: moveResultCursor
slug: 1.2.1/api/domain/bookmarks/result-cursor/functions/moveresultcursor
---

> **moveResultCursor**(`input`): [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [domain/bookmarks/result-cursor.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/result-cursor.ts#L76)

Result cursorを移動。

## Parameters

### input

[`MoveResultCursorInput`](/1.2.1/api/domain/bookmarks/result-cursor/interfaces/moveresultcursorinput/)

Result cursor移動入力。

## Returns

[`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

移動後cursor index。

## Example

```ts
const result = moveResultCursor({ currentIndex: false, direction: "next", itemCount: 3 });
// 0
```
