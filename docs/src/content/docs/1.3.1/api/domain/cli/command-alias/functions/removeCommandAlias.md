---
editUrl: false
next: false
prev: false
title: removeCommandAlias
slug: 1.3.1/api/domain/cli/command-alias/functions/removecommandalias
---

> **removeCommandAlias**(`aliases`, `aliasName`): readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/command-alias.ts#L81)

Alias一覧から指定名のaliasを削除します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

削除前alias一覧です。

### aliasName

`string`

削除対象alias名です。

## Returns

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

削除後alias一覧です。

## Example

```ts
const result = removeCommandAlias([{ name: "c", command: "clear" }], "c");
// []
```
