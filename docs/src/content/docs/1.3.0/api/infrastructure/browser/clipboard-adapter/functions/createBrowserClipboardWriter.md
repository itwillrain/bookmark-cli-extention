---
editUrl: false
next: false
prev: false
title: createBrowserClipboardWriter
slug: 1.3.0/api/infrastructure/browser/clipboard-adapter/functions/createbrowserclipboardwriter
---

> **createBrowserClipboardWriter**(`clipboard`): [`ClipboardWriterPort`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Defined in: [infrastructure/browser/clipboard-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/browser/clipboard-adapter.ts#L18)

Browser Clipboard APIをClipboardWriterPortへ変換します。

## Parameters

### clipboard

[`BrowserClipboard`](/1.3.0/api/infrastructure/browser/clipboard-adapter/interfaces/browserclipboard/)

Browser Clipboard APIです。

## Returns

[`ClipboardWriterPort`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Clipboard writer portです。
