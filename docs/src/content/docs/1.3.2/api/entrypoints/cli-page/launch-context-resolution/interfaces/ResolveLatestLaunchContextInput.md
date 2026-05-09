---
editUrl: false
next: false
prev: false
title: ResolveLatestLaunchContextInput
slug: 1.3.2/api/entrypoints/cli-page/launch-context-resolution/interfaces/resolvelatestlaunchcontextinput
---

Defined in: [entrypoints/cli-page/launch-context-resolution.ts:5](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/launch-context-resolution.ts#L5)

最新LaunchContext解決入力。

## Properties

### fallbackLaunchContext

> `readonly` **fallbackLaunchContext**: [`LaunchContext`](/1.3.2/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`

Defined in: [entrypoints/cli-page/launch-context-resolution.ts:7](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/launch-context-resolution.ts#L7)

State上に保持しているfallback LaunchContext。

***

### storage

> `readonly` **storage**: [`LaunchContextStoragePort`](/1.3.2/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Defined in: [entrypoints/cli-page/launch-context-resolution.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/launch-context-resolution.ts#L9)

LaunchContext storage。
