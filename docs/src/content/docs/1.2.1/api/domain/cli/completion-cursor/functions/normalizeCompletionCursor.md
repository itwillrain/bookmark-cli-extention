---
editUrl: false
next: false
prev: false
title: normalizeCompletionCursor
slug: 1.2.1/api/domain/cli/completion-cursor/functions/normalizecompletioncursor
---

> **normalizeCompletionCursor**(`currentIndex`, `itemCount`): [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [domain/cli/completion-cursor.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/cli/completion-cursor.ts#L133)

Completion cursorを現在の件数に合わせて正規化。

## Parameters

### currentIndex

[`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

現在のcursor index。

### itemCount

`number`

Completion item件数。

## Returns

[`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

正規化後cursor index。

## Example

```ts
const result = normalizeCompletionCursor(5, 3);
// false
```
