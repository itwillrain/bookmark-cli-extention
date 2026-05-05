---
editUrl: false
next: false
prev: false
title: removeCommandAlias
slug: 1.2.0/api/domain/cli/command-alias/functions/removecommandalias
---

> **removeCommandAlias**(`aliases`, `aliasName`): readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/cli/command-alias.ts#L81)

Alias一覧から指定名のaliasを削除します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

削除前alias一覧です。

### aliasName

`string`

削除対象alias名です。

## Returns

readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

削除後alias一覧です。

## Example

```ts
const result = removeCommandAlias([{ name: "c", command: "clear" }], "c");
// []
```
