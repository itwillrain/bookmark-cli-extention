---
editUrl: false
next: false
prev: false
title: PipeBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:419](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L419)

Pipe commandです。

## Properties

### kind

> `readonly` **kind**: `"pipe"`

Defined in: [application/commands/bookmark-command-types.ts:423](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L423)

Command種別です。

***

### source

> `readonly` **source**: [`PipeSourceBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

Defined in: [application/commands/bookmark-command-types.ts:427](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L427)

Pipe元の読み取りcommandです。

***

### stages

> `readonly` **stages**: readonly [`PipeStageCommand`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/pipestagecommand/)\[]

Defined in: [application/commands/bookmark-command-types.ts:431](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L431)

Pipe stage一覧です。
