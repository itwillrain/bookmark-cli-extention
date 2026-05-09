---
editUrl: false
next: false
prev: false
title: createBrowserClipboardWriter
slug: 1.3.2/api/infrastructure/browser/clipboard-adapter/functions/createbrowserclipboardwriter
---

> **createBrowserClipboardWriter**(`clipboard`): [`ClipboardWriterPort`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Defined in: [infrastructure/browser/clipboard-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/browser/clipboard-adapter.ts#L18)

Browser Clipboard APIをClipboardWriterPortへ変換します。

## Parameters

### clipboard

[`BrowserClipboard`](/1.3.2/api/infrastructure/browser/clipboard-adapter/interfaces/browserclipboard/)

Browser Clipboard APIです。

## Returns

[`ClipboardWriterPort`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Clipboard writer portです。
