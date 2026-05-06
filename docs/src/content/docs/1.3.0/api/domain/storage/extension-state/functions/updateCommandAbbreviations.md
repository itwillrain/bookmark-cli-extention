---
editUrl: false
next: false
prev: false
title: updateCommandAbbreviations
slug: 1.3.0/api/domain/storage/extension-state/functions/updatecommandabbreviations
---

> **updateCommandAbbreviations**(`state`, `commandAbbreviations`): [`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state.ts:240](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state.ts#L240)

Command abbreviation設定を更新します。

## Parameters

### state

[`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

更新前の拡張状態です。

### commandAbbreviations

readonly [`CommandAlias`](/1.3.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

保存するcommand abbreviation一覧です。

## Returns

[`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

command abbreviation更新後の拡張状態です。

## Example

```ts
const result = updateCommandAbbreviations(state, commandAbbreviations);
```
