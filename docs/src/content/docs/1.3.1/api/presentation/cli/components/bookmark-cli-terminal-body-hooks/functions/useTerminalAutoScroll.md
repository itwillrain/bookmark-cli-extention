---
editUrl: false
next: false
prev: false
title: useTerminalAutoScroll
slug: 1.3.1/api/presentation/cli/components/bookmark-cli-terminal-body-hooks/functions/useterminalautoscroll
---

> **useTerminalAutoScroll**(`transcriptEntries`): [`TerminalAutoScrollValue`](/1.3.1/api/presentation/cli/components/bookmark-cli-terminal-body-hooks/interfaces/terminalautoscrollvalue/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body-hooks.ts:100](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-terminal-body-hooks.ts#L100)

Terminal bodyを最新promptが見える位置へ追従させる。

## Parameters

### transcriptEntries

readonly [`BookmarkCliTranscriptEntry`](/1.3.1/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

transcript entry一覧。

## Returns

[`TerminalAutoScrollValue`](/1.3.1/api/presentation/cli/components/bookmark-cli-terminal-body-hooks/interfaces/terminalautoscrollvalue/)

Scroll制御値。
