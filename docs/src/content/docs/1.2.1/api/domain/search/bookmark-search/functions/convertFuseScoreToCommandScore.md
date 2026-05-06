---
editUrl: false
next: false
prev: false
title: convertFuseScoreToCommandScore
slug: 1.2.1/api/domain/search/bookmark-search/functions/convertfusescoretocommandscore
---

> **convertFuseScoreToCommandScore**(`fuseScore`): `number`

Defined in: [domain/search/bookmark-search.ts:260](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L260)

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
