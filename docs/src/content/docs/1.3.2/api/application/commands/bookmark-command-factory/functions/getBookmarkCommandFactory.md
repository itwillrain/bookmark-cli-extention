---
editUrl: false
next: false
prev: false
title: getBookmarkCommandFactory
slug: 1.3.2/api/application/commands/bookmark-command-factory/functions/getbookmarkcommandfactory
---

> **getBookmarkCommandFactory**(`context`): [`BookmarkCommandFactory`](/1.3.2/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Defined in: [application/commands/bookmark-command-factory.ts:384](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-factory.ts#L384)

Command parse contextに対応するfactoryを取得します。

## Parameters

### context

[`CommandParseContext`](/1.3.2/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext/)

Command parse contextです。

## Returns

[`BookmarkCommandFactory`](/1.3.2/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Command factoryです。

## Example

```ts
const result = getBookmarkCommandFactory(context);
```
