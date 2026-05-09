---
editUrl: false
next: false
prev: false
title: resolveLatestLaunchContext
slug: 1.3.2/api/entrypoints/cli-page/launch-context-resolution/functions/resolvelatestlaunchcontext
---

> **resolveLatestLaunchContext**(`input`): `Promise`\<[`LaunchContext`](/1.3.2/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`>

Defined in: [entrypoints/cli-page/launch-context-resolution.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/launch-context-resolution.ts#L24)

Storage上の最新LaunchContextを優先して解決。

## Parameters

### input

[`ResolveLatestLaunchContextInput`](/1.3.2/api/entrypoints/cli-page/launch-context-resolution/interfaces/resolvelatestlaunchcontextinput/)

最新LaunchContext解決入力。

## Returns

`Promise`\<[`LaunchContext`](/1.3.2/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`>

最新LaunchContext。

## Example

```ts
const launchContext = await resolveLatestLaunchContext({
  fallbackLaunchContext,
  storage,
});
```
