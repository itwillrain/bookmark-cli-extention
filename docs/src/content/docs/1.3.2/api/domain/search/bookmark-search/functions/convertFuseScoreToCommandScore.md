---
editUrl: false
next: false
prev: false
title: convertFuseScoreToCommandScore
slug: 1.3.2/api/domain/search/bookmark-search/functions/convertfusescoretocommandscore
---

> **convertFuseScoreToCommandScore**(`fuseScore`): `number`

Defined in: [domain/search/bookmark-search.ts:260](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/search/bookmark-search.ts#L260)

Fuse.js scoreをCLI表示用scoreへ変換します。

## Parameters

### fuseScore

`number`

Fuse.jsが返したscoreです。

## Returns

`number`

1に近いほど一致度が高いCLI用scoreです。

## Example

```ts
const result = convertFuseScoreToCommandScore(0.2);
// 0.8
```
