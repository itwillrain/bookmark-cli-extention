---
editUrl: false
next: false
prev: false
title: getBookmarkCommandFactory
slug: 1.3.1/api/application/commands/bookmark-command-factory/functions/getbookmarkcommandfactory
---

> **getBookmarkCommandFactory**(`context`): [`BookmarkCommandFactory`](/1.3.1/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Defined in: [application/commands/bookmark-command-factory.ts:384](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-factory.ts#L384)

Command parse contextに対応するfactoryを取得します。

## Parameters

### context

[`CommandParseContext`](/1.3.1/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext/)

Command parse contextです。

## Returns

[`BookmarkCommandFactory`](/1.3.1/api/application/commands/bookmark-command-factory/type-aliases/bookmarkcommandfactory/)

Command factoryです。

## Example

```ts
const result = getBookmarkCommandFactory(context);
```
