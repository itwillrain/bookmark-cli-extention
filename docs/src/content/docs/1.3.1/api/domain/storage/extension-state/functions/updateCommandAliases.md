---
editUrl: false
next: false
prev: false
title: updateCommandAliases
slug: 1.3.1/api/domain/storage/extension-state/functions/updatecommandaliases
---

> **updateCommandAliases**(`state`, `commandAliases`): [`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state.ts:219](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/extension-state.ts#L219)

Command alias設定を更新します。

## Parameters

### state

[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

更新前の拡張状態です。

### commandAliases

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

保存するcommand alias一覧です。

## Returns

[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

command alias更新後の拡張状態です。

## Example

```ts
const result = updateCommandAliases(state, commandAliases);
```
