---
editUrl: false
next: false
prev: false
title: updateCommandAliases
slug: 1.2.0/api/domain/storage/extension-state/functions/updatecommandaliases
---

> **updateCommandAliases**(`state`, `commandAliases`): [`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state.ts:216](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state.ts#L216)

Command alias設定を更新します。

## Parameters

### state

[`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

更新前の拡張状態です。

### commandAliases

readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

保存するcommand alias一覧です。

## Returns

[`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

command alias更新後の拡張状態です。

## Example

```ts
const result = updateCommandAliases(state, commandAliases);
```
