---
editUrl: false
next: false
prev: false
title: moveCommandLineCursorToEnd
slug: 1.3.0/api/domain/cli/command-line-editing/functions/movecommandlinecursortoend
---

> **moveCommandLineCursorToEnd**(`state`): [`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Defined in: [domain/cli/command-line-editing.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/cli/command-line-editing.ts#L60)

Cursorを行末へ移動。

## Parameters

### state

[`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

現在の編集状態。

## Returns

[`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

行末へ移動した編集状態。

## Example

```ts
const result = moveCommandLineCursorToEnd({ value: "go Stripe", selectionStart: 0, selectionEnd: 0 });
// { value: "go Stripe", selectionStart: 9, selectionEnd: 9 }
```
