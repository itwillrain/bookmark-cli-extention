---
editUrl: false
next: false
prev: false
title: appendCommandHistory
slug: 1.2.1/api/domain/storage/extension-state/functions/appendcommandhistory
---

> **appendCommandHistory**(`state`, `input`, `executedAt`): [`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L183)

Command historyへ入力を追加。

## Parameters

### state

[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

現在の拡張状態。

### input

`string`

入力文字列。

### executedAt

`string`

実行日時ISO文字列。

## Returns

[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

command history更新後の拡張状態。

## Example

```ts
const result = appendCommandHistory(state, input, executedAt);
```
