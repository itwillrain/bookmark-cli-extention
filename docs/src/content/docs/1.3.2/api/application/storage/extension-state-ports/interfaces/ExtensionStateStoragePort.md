---
editUrl: false
next: false
prev: false
title: ExtensionStateStoragePort
slug: 1.3.2/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport
---

Defined in: [application/storage/extension-state-ports.ts:4](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-ports.ts#L4)

Extension state storage port。

## Properties

### readExtensionState

> `readonly` **readExtensionState**: () => `Promise`\<[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)>

Defined in: [application/storage/extension-state-ports.ts:6](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-ports.ts#L6)

拡張状態を読み込み。

#### Returns

`Promise`\<[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)>

***

### writeExtensionState

> `readonly` **writeExtensionState**: (`state`) => `Promise`\<`void`>

Defined in: [application/storage/extension-state-ports.ts:8](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/storage/extension-state-ports.ts#L8)

拡張状態を書き込み。

#### Parameters

##### state

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

#### Returns

`Promise`\<`void`>
