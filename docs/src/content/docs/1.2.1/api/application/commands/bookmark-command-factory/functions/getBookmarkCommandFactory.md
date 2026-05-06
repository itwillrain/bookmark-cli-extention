---
editUrl: false
next: false
prev: false
title: getBookmarkCommandFactory
slug: 1.2.1/api/application/commands/bookmark-command-factory/functions/getbookmarkcommandfactory
---

> **getBookmarkCommandFactory**(`context`): [`BookmarkCommandFactory`](/1.2.1/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Defined in: [application/commands/bookmark-command-factory.ts:345](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-factory.ts#L345)

Command parse contextに対応するfactoryを取得します。

## Parameters

### context

[`CommandParseContext`](/1.2.1/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext/)

Command parse contextです。

## Returns

[`BookmarkCommandFactory`](/1.2.1/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Command factoryです。

## Example

```ts
const result = getBookmarkCommandFactory(context);
```
