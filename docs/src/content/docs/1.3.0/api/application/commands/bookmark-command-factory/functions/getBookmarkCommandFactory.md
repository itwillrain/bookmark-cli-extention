---
editUrl: false
next: false
prev: false
title: getBookmarkCommandFactory
slug: 1.3.0/api/application/commands/bookmark-command-factory/functions/getbookmarkcommandfactory
---

> **getBookmarkCommandFactory**(`context`): [`BookmarkCommandFactory`](/1.3.0/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Defined in: [application/commands/bookmark-command-factory.ts:384](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L384)

Command parse contextに対応するfactoryを取得します。

## Parameters

### context

[`CommandParseContext`](/1.3.0/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext/)

Command parse contextです。

## Returns

[`BookmarkCommandFactory`](/1.3.0/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Command factoryです。

## Example

```ts
const result = getBookmarkCommandFactory(context);
```
