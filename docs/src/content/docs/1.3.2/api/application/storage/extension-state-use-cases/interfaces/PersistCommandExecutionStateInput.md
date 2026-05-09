---
editUrl: false
next: false
prev: false
title: PersistCommandExecutionStateInput
slug: 1.3.2/api/application/storage/extension-state-use-cases/interfaces/persistcommandexecutionstateinput
---

Defined in: [application/storage/extension-state-use-cases.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L29)

Command実行後の拡張状態保存入力。

## Properties

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/storage/extension-state-use-cases.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L31)

実行したcommand入力。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/storage/extension-state-use-cases.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L33)

実行後の現在ディレクトリ。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [application/storage/extension-state-use-cases.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L35)

現在の拡張状態。

***

### now

> `readonly` **now**: [`NowProvider`](/1.3.2/api/application/storage/extension-state-use-cases/type-aliases/nowprovider/)

Defined in: [application/storage/extension-state-use-cases.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L37)

現在日時を返すport。

***

### preserveExtensionSettings?

> `readonly` `optional` **preserveExtensionSettings?**: `boolean`

Defined in: [application/storage/extension-state-use-cases.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L39)

Command実行結果のsettingsを保存するか。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/storage/extension-state-use-cases.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L41)

Bookmark Tree repository port。

***

### storage

> `readonly` **storage**: [`ExtensionStateStoragePort`](/1.3.2/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [application/storage/extension-state-use-cases.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-use-cases.ts#L43)

Extension state storage port。
