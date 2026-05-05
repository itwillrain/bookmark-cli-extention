---
editUrl: false
next: false
prev: false
title: upsertCommandAlias
slug: 1.2.0/api/domain/cli/command-alias/functions/upsertcommandalias
---

> **upsertCommandAlias**(`aliases`, `alias`): readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/cli/command-alias.ts#L62)

Alias一覧へaliasを後勝ちで追加します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

追加前alias一覧です。

### alias

[`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)

追加するaliasです。

## Returns

readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

追加後alias一覧です。

## Example

```ts
const result = upsertCommandAlias([{ name: "c", command: "clear" }], {
  name: "c",
  command: "cd /Work",
});
```
