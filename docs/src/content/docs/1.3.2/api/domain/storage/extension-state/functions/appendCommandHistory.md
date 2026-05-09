---
editUrl: false
next: false
prev: false
title: appendCommandHistory
slug: 1.3.2/api/domain/storage/extension-state/functions/appendcommandhistory
---

> **appendCommandHistory**(`state`, `input`, `executedAt`): [`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state.ts:186](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L186)

Command historyへ入力を追加。

## Parameters

### state

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

現在の拡張状態。

### input

`string`

入力文字列。

### executedAt

`string`

実行日時ISO文字列。

## Returns

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

command history更新後の拡張状態。

## Example

```ts
const result = appendCommandHistory(state, input, executedAt);
```
