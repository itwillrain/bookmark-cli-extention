---
editUrl: false
next: false
prev: false
title: expandSubmittedCommandAbbreviation
slug: 1.3.0/api/domain/cli/command-abbreviation/functions/expandsubmittedcommandabbreviation
---

> **expandSubmittedCommandAbbreviation**(`inputValue`, `commandAbbreviations`): `string`

Defined in: [domain/cli/command-abbreviation.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/cli/command-abbreviation.ts#L125)

確定入力をcommand abbreviation展開します。

## Parameters

### inputValue

`string`

CLI入力値です。

### commandAbbreviations

readonly [`CommandAlias`](/1.3.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

command abbreviation一覧です。

## Returns

`string`

展開後の入力値です。

## Example

```ts
const result = expandSubmittedCommandAbbreviation("g stripe", [{ name: "g", command: "go" }]);
// "go stripe"
```
