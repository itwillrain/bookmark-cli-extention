---
editUrl: false
next: false
prev: false
title: updateCurrentDirectory
slug: 1.2.1/api/domain/storage/extension-state-cleanup/functions/updatecurrentdirectory
---

> **updateCurrentDirectory**(`input`): [`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state-cleanup.ts:66](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state-cleanup.ts#L66)

現在ディレクトリを保存状態へ反映。

## Parameters

### input

[`UpdateCurrentDirectoryInput`](/1.2.1/api/domain/storage/extension-state-cleanup/interfaces/updatecurrentdirectoryinput/)

現在ディレクトリ更新入力。

## Returns

[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

現在ディレクトリ更新後の拡張状態。

## Example

```ts
const result = updateCurrentDirectory({
  bookmarkTree,
  currentDirectory: "/Work",
  state,
  updatedAt: "2026-05-05T00:00:00.000Z",
});
```
