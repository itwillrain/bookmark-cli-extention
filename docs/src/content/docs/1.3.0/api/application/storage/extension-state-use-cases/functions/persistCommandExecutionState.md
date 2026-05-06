---
editUrl: false
next: false
prev: false
title: persistCommandExecutionState
slug: 1.3.0/api/application/storage/extension-state-use-cases/functions/persistcommandexecutionstate
---

> **persistCommandExecutionState**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)>>

Defined in: [application/storage/extension-state-use-cases.ts:148](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/storage/extension-state-use-cases.ts#L148)

Command実行後の現在ディレクトリと入力履歴を保存。

## Parameters

### input

[`PersistCommandExecutionStateInput`](/1.3.0/api/application/storage/extension-state-use-cases/interfaces/persistcommandexecutionstateinput/)

拡張状態保存入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)>>

拡張状態保存結果。

## Example

```ts
const result = await persistCommandExecutionState({
  commandInput: "go Stripe",
  currentDirectory: "/Work",
  extensionState,
  now,
  preserveExtensionSettings: true,
  repository,
  storage,
});
```
