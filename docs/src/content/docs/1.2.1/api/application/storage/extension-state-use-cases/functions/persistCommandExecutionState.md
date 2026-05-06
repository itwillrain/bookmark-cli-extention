---
editUrl: false
next: false
prev: false
title: persistCommandExecutionState
slug: 1.2.1/api/application/storage/extension-state-use-cases/functions/persistcommandexecutionstate
---

> **persistCommandExecutionState**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)>>

Defined in: [application/storage/extension-state-use-cases.ts:148](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/storage/extension-state-use-cases.ts#L148)

Command実行後の現在ディレクトリと入力履歴を保存。

## Parameters

### input

[`PersistCommandExecutionStateInput`](/1.2.1/api/application/storage/extension-state-use-cases/interfaces/persistcommandexecutionstateinput/)

拡張状態保存入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)>>

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
