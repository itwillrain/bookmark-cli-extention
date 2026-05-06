---
editUrl: false
next: false
prev: false
title: expandCommandAbbreviationOnBoundary
slug: 1.3.1/api/domain/cli/command-abbreviation/functions/expandcommandabbreviationonboundary
---

> **expandCommandAbbreviationOnBoundary**(`inputValue`, `commandAbbreviations`): `string`

Defined in: [domain/cli/command-abbreviation.ts:92](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/command-abbreviation.ts#L92)

入力中commandを単語境界でcommand abbreviation展開します。

## Parameters

### inputValue

`string`

CLI入力値です。

### commandAbbreviations

readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

command abbreviation一覧です。

## Returns

`string`

展開後の入力値です。

## Example

```ts
const result = expandCommandAbbreviationOnBoundary("g ", [{ name: "g", command: "go" }]);
// "go "
```
