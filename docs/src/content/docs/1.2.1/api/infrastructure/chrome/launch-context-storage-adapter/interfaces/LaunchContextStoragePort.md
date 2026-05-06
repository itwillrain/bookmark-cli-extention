---
editUrl: false
next: false
prev: false
title: LaunchContextStoragePort
slug: 1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport
---

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/launch-context-storage-adapter.ts#L30)

Launch context storage port。

## Properties

### readLaunchContext

> `readonly` **readLaunchContext**: () => `Promise`\<[`LaunchContextReadResult`](/1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/type-aliases/launchcontextreadresult/)>

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:32](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/launch-context-storage-adapter.ts#L32)

Launch contextを読み込み。

#### Returns

`Promise`\<[`LaunchContextReadResult`](/1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/type-aliases/launchcontextreadresult/)>

***

### writeLaunchContext

> `readonly` **writeLaunchContext**: (`launchContext`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/launch-context-storage-adapter.ts#L34)

Launch contextを書き込み。

#### Parameters

##### launchContext

[`LaunchContext`](/1.2.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/)

#### Returns

`Promise`\<`void`>
