---
editUrl: false
next: false
prev: false
title: createBrowserClipboardWriter
slug: 1.3.1/api/infrastructure/browser/clipboard-adapter/functions/createbrowserclipboardwriter
---

> **createBrowserClipboardWriter**(`clipboard`): [`ClipboardWriterPort`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Defined in: [infrastructure/browser/clipboard-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/browser/clipboard-adapter.ts#L18)

Browser Clipboard APIをClipboardWriterPortへ変換します。

## Parameters

### clipboard

[`BrowserClipboard`](/1.3.1/api/infrastructure/browser/clipboard-adapter/interfaces/browserclipboard/)

Browser Clipboard APIです。

## Returns

[`ClipboardWriterPort`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Clipboard writer portです。
