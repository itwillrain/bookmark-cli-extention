---
editUrl: false
next: false
prev: false
title: PipeBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:330](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L330)

Pipe commandです。

## Properties

### kind

> `readonly` **kind**: `"pipe"`

Defined in: [application/commands/bookmark-command-types.ts:334](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L334)

Command種別です。

***

### source

> `readonly` **source**: [`PipeSourceBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

Defined in: [application/commands/bookmark-command-types.ts:338](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L338)

Pipe元の読み取りcommandです。

***

### stages

> `readonly` **stages**: readonly [`GrepPipeStageCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/greppipestagecommand/)\[]

Defined in: [application/commands/bookmark-command-types.ts:342](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L342)

Pipe stage一覧です。
