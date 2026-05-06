---
editUrl: false
next: false
prev: false
title: normalizeResultCursor
slug: 1.3.0/api/domain/bookmarks/result-cursor/functions/normalizeresultcursor
---

> **normalizeResultCursor**(`currentIndex`, `itemCount`): [`ResultCursorIndex`](/1.3.0/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [domain/bookmarks/result-cursor.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/bookmarks/result-cursor.ts#L99)

Result cursorを現在の件数に合わせて正規化。

## Parameters

### currentIndex

[`ResultCursorIndex`](/1.3.0/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

現在のcursor index。

### itemCount

`number`

Result item件数。

## Returns

[`ResultCursorIndex`](/1.3.0/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

正規化後cursor index。

## Example

```ts
const result = normalizeResultCursor(4, 3);
// false
```
