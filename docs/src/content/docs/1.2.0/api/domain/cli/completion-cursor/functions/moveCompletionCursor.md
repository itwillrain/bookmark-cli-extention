---
editUrl: false
next: false
prev: false
title: moveCompletionCursor
slug: 1.2.0/api/domain/cli/completion-cursor/functions/movecompletioncursor
---

> **moveCompletionCursor**(`input`): [`CompletionCursorIndex`](/1.2.0/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [domain/cli/completion-cursor.ts:110](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/cli/completion-cursor.ts#L110)

Completion cursorを指定方向の候補へ移動。

## Parameters

### input

[`MoveCompletionCursorInput`](/1.2.0/api/domain/cli/completion-cursor/interfaces/movecompletioncursorinput/)

Completion cursor移動入力。

## Returns

[`CompletionCursorIndex`](/1.2.0/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

移動後cursor index。

## Example

```ts
const result = moveCompletionCursor({ currentIndex: 2, direction: "next", itemCount: 3 });
// 0
```
