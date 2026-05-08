---
editUrl: false
next: false
prev: false
title: normalizeCommandHistoryCursor
slug: 1.3.2/api/domain/storage/command-history-navigation/functions/normalizecommandhistorycursor
---

> **normalizeCommandHistoryCursor**(`currentIndex`, `itemCount`): [`CommandHistoryCursorIndex`](/1.3.2/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

Defined in: [domain/storage/command-history-navigation.ts:108](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/command-history-navigation.ts#L108)

Command history cursorを現在の件数に合わせて正規化。

## Parameters

### currentIndex

[`CommandHistoryCursorIndex`](/1.3.2/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

現在のcursor index。

### itemCount

`number`

Command history件数。

## Returns

[`CommandHistoryCursorIndex`](/1.3.2/api/domain/storage/command-history-navigation/type-aliases/commandhistorycursorindex/)

正規化後cursor index。

## Example

```ts
const result = normalizeCommandHistoryCursor(3, 2);
// false
```
