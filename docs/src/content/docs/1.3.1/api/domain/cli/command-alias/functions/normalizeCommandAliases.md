---
editUrl: false
next: false
prev: false
title: normalizeCommandAliases
slug: 1.3.1/api/domain/cli/command-alias/functions/normalizecommandaliases
---

> **normalizeCommandAliases**(`aliases`): readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:96](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/command-alias.ts#L96)

Command alias一覧を保存可能な形へ正規化します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

正規化対象alias一覧です。

## Returns

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

正規化済みalias一覧です。

## Example

```ts
const result = normalizeCommandAliases([{ name: " c ", command: " clear " }]);
// [{ name: "c", command: "clear" }]
```
