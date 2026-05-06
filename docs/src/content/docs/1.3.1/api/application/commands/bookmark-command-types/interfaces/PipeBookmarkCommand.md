---
editUrl: false
next: false
prev: false
title: PipeBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:415](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L415)

Pipe commandです。

## Properties

### kind

> `readonly` **kind**: `"pipe"`

Defined in: [application/commands/bookmark-command-types.ts:419](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L419)

Command種別です。

***

### source

> `readonly` **source**: [`PipeSourceBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

Defined in: [application/commands/bookmark-command-types.ts:423](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L423)

Pipe元の読み取りcommandです。

***

### stages

> `readonly` **stages**: readonly [`PipeStageCommand`](/1.3.1/api/application/commands/bookmark-command-types/type-aliases/pipestagecommand/)\[]

Defined in: [application/commands/bookmark-command-types.ts:427](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L427)

Pipe stage一覧です。
