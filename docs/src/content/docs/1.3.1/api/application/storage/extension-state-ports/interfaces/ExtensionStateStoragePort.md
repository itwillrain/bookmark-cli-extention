---
editUrl: false
next: false
prev: false
title: ExtensionStateStoragePort
slug: 1.3.1/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport
---

Defined in: [application/storage/extension-state-ports.ts:4](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/storage/extension-state-ports.ts#L4)

Extension state storage port。

## Properties

### readExtensionState

> `readonly` **readExtensionState**: () => `Promise`\<[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)>

Defined in: [application/storage/extension-state-ports.ts:6](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/storage/extension-state-ports.ts#L6)

拡張状態を読み込み。

#### Returns

`Promise`\<[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)>

***

### writeExtensionState

> `readonly` **writeExtensionState**: (`state`) => `Promise`\<`void`>

Defined in: [application/storage/extension-state-ports.ts:8](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/storage/extension-state-ports.ts#L8)

拡張状態を書き込み。

#### Parameters

##### state

[`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

#### Returns

`Promise`\<`void`>
