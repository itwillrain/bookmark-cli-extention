---
editUrl: false
next: false
prev: false
title: deleteCommandLinePreviousWord
slug: 1.3.1/api/domain/cli/command-line-editing/functions/deletecommandlinepreviousword
---

> **deleteCommandLinePreviousWord**(`state`): [`CommandLineEditState`](/1.3.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

Defined in: [domain/cli/command-line-editing.ts:102](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/command-line-editing.ts#L102)

Cursor前方の単語を削除。

## Parameters

### state

[`CommandLineEditState`](/1.3.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

現在の編集状態。

## Returns

[`CommandLineEditState`](/1.3.1/api/domain/cli/command-line-editing/interfaces/commandlineeditstate/)

前方単語を削除した編集状態。

## Example

```ts
const result = deleteCommandLinePreviousWord({ value: "go Stripe", selectionStart: 9, selectionEnd: 9 });
// { value: "go ", selectionStart: 3, selectionEnd: 3 }
```
