---
editUrl: false
next: false
prev: false
title: getBookmarkCommandFactory
slug: 1.2.0/api/application/commands/bookmark-command-factory/functions/getbookmarkcommandfactory
---

> **getBookmarkCommandFactory**(`context`): [`BookmarkCommandFactory`](/1.2.0/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Defined in: [application/commands/bookmark-command-factory.ts:345](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L345)

Command parse contextに対応するfactoryを取得します。

## Parameters

### context

[`CommandParseContext`](/1.2.0/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext/)

Command parse contextです。

## Returns

[`BookmarkCommandFactory`](/1.2.0/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Command factoryです。

## Example

```ts
const result = getBookmarkCommandFactory(context);
```
