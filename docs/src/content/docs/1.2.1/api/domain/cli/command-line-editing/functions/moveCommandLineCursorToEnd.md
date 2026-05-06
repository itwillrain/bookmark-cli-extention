---
editUrl: false
next: false
prev: false
title: moveCommandLineCursorToEnd
slug: 1.2.1/api/domain/cli/command-line-editing/functions/movecommandlinecursortoend
---

> **moveCommandLineCursorToEnd**(`state`): [`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Defined in: [domain/cli/command-line-editing.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/cli/command-line-editing.ts#L60)

Cursorを行末へ移動。

## Parameters

### state

[`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

現在の編集状態。

## Returns

[`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

行末へ移動した編集状態。

## Example

```ts
const result = moveCommandLineCursorToEnd({ value: "go Stripe", selectionStart: 0, selectionEnd: 0 });
// { value: "go Stripe", selectionStart: 9, selectionEnd: 9 }
```
