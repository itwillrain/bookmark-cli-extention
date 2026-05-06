---
editUrl: false
next: false
prev: false
title: killCommandLineAfterCursor
slug: 1.2.1/api/domain/cli/command-line-editing/functions/killcommandlineaftercursor
---

> **killCommandLineAfterCursor**(`state`): [`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Defined in: [domain/cli/command-line-editing.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/cli/command-line-editing.ts#L86)

Cursor以後の入力を削除。

## Parameters

### state

[`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

現在の編集状態。

## Returns

[`CommandLineEditState`](/1.2.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Cursor以後を削除した編集状態。

## Example

```ts
const result = killCommandLineAfterCursor({ value: "go Stripe", selectionStart: 2, selectionEnd: 2 });
// { value: "go", selectionStart: 2, selectionEnd: 2 }
```
