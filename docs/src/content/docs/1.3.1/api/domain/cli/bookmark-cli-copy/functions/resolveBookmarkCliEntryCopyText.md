---
editUrl: false
next: false
prev: false
title: resolveBookmarkCliEntryCopyText
slug: 1.3.1/api/domain/cli/bookmark-cli-copy/functions/resolvebookmarkclientrycopytext
---

> **resolveBookmarkCliEntryCopyText**(`entry`, `valueKind`): [`CopyTextResolution`](/1.3.1/api/domain/cli/bookmark-cli-copy/type-aliases/copytextresolution/)

Defined in: [domain/cli/bookmark-cli-copy.ts:92](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/bookmark-cli-copy.ts#L92)

Entryからcopy textを解決します。

## Parameters

### entry

[`BookmarkCliEntry`](/1.3.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)

対象entryです。

### valueKind

[`BookmarkCliCopyValueKind`](/1.3.1/api/domain/cli/bookmark-cli-copy/type-aliases/bookmarkclicopyvaluekind/)

Copyする値種別です。

## Returns

[`CopyTextResolution`](/1.3.1/api/domain/cli/bookmark-cli-copy/type-aliases/copytextresolution/)

Copy text解決結果です。

## Example

```ts
const result = resolveBookmarkCliEntryCopyText(entry, "default");
```
