---
editUrl: false
next: false
prev: false
title: expandCommandAlias
slug: 1.3.0/api/domain/cli/command-alias/functions/expandcommandalias
---

> **expandCommandAlias**(`input`, `aliases`): `string`

Defined in: [domain/cli/command-alias.ts:162](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/cli/command-alias.ts#L162)

CLI入力の先頭command tokenをalias展開します。

## Parameters

### input

`string`

CLI入力です。

### aliases

readonly [`CommandAlias`](/1.3.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

alias一覧です。

## Returns

`string`

alias展開後入力です。該当aliasがなければ元入力です。

## Example

```ts
const result = expandCommandAlias("c ./Admin", [{ name: "c", command: "cd" }]);
// "cd ./Admin"
```
