---
editUrl: false
next: false
prev: false
title: moveCompletionCursor
slug: 1.3.2/api/domain/cli/completion-cursor/functions/movecompletioncursor
---

> **moveCompletionCursor**(`input`): [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [domain/cli/completion-cursor.ts:110](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/cli/completion-cursor.ts#L110)

Completion cursorを指定方向の候補へ移動。

## Parameters

### input

[`MoveCompletionCursorInput`](/1.3.2/api/domain/cli/completion-cursor/interfaces/movecompletioncursorinput/)

Completion cursor移動入力。

## Returns

[`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

移動後cursor index。

## Example

```ts
const result = moveCompletionCursor({ currentIndex: 2, direction: "next", itemCount: 3 });
// 0
```
