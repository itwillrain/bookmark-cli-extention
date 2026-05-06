---
editUrl: false
next: false
prev: false
title: killCommandLineBeforeCursor
slug: 1.3.0/api/domain/cli/command-line-editing/functions/killcommandlinebeforecursor
---

> **killCommandLineBeforeCursor**(`state`): [`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Defined in: [domain/cli/command-line-editing.ts:73](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/cli/command-line-editing.ts#L73)

Cursor以前の入力を削除。

## Parameters

### state

[`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

現在の編集状態。

## Returns

[`CommandLineEditState`](/1.3.0/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Cursor以前を削除した編集状態。

## Example

```ts
const result = killCommandLineBeforeCursor({ value: "go Stripe", selectionStart: 3, selectionEnd: 3 });
// { value: "Stripe", selectionStart: 0, selectionEnd: 0 }
```
