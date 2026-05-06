---
editUrl: false
next: false
prev: false
title: upsertCommandAlias
slug: 1.3.1/api/domain/cli/command-alias/functions/upsertcommandalias
---

> **upsertCommandAlias**(`aliases`, `alias`): readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/command-alias.ts#L62)

Alias一覧へaliasを後勝ちで追加します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

追加前alias一覧です。

### alias

[`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)

追加するaliasです。

## Returns

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

追加後alias一覧です。

## Example

```ts
const result = upsertCommandAlias([{ name: "c", command: "clear" }], {
  name: "c",
  command: "cd /Work",
});
```
