---
editUrl: false
next: false
prev: false
title: convertFuseScoreToCommandScore
slug: 1.3.0/api/domain/search/bookmark-search/functions/convertfusescoretocommandscore
---

> **convertFuseScoreToCommandScore**(`fuseScore`): `number`

Defined in: [domain/search/bookmark-search.ts:260](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/search/bookmark-search.ts#L260)

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
