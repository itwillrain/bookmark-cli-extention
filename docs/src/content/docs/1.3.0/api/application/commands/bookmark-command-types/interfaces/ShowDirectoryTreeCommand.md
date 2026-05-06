---
editUrl: false
next: false
prev: false
title: ShowDirectoryTreeCommand
slug: 1.3.0/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand
---

Defined in: [application/commands/bookmark-command-types.ts:78](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L78)

Directory tree表示commandです。

## Properties

### depth

> `readonly` **depth**: `number`

Defined in: [application/commands/bookmark-command-types.ts:82](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L82)

表示する最大depthです。

***

### directoriesOnly

> `readonly` **directoriesOnly**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L86)

Directoryだけを表示するかです。

***

### kind

> `readonly` **kind**: `"tree"`

Defined in: [application/commands/bookmark-command-types.ts:90](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L90)

Command種別です。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:94](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L94)

対象path入力です。
