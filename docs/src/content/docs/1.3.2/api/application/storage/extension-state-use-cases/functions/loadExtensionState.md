---
editUrl: false
next: false
prev: false
title: loadExtensionState
slug: 1.3.2/api/application/storage/extension-state-use-cases/functions/loadextensionstate
---

> **loadExtensionState**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)>>

Defined in: [application/storage/extension-state-use-cases.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L109)

起動時の拡張状態を読み込み、Bookmark Treeと照合。

## Parameters

### input

[`LoadExtensionStateInput`](/1.3.2/api/application/storage/extension-state-use-cases/interfaces/loadextensionstateinput/)

拡張状態読み込み入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)>>

拡張状態読み込み結果。

## Example

```ts
const result = await loadExtensionState({
  now,
  repository,
  storage,
});
```
