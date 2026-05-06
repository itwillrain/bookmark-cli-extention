---
editUrl: false
next: false
prev: false
title: normalizeCommandAliases
slug: 1.2.1/api/domain/cli/command-alias/functions/normalizecommandaliases
---

> **normalizeCommandAliases**(`aliases`): readonly [`CommandAlias`](/1.2.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [domain/cli/command-alias.ts:96](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/cli/command-alias.ts#L96)

Command alias一覧を保存可能な形へ正規化します。

## Parameters

### aliases

readonly [`CommandAlias`](/1.2.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

正規化対象alias一覧です。

## Returns

readonly [`CommandAlias`](/1.2.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

正規化済みalias一覧です。

## Example

```ts
const result = normalizeCommandAliases([{ name: " c ", command: " clear " }]);
// [{ name: "c", command: "clear" }]
```
