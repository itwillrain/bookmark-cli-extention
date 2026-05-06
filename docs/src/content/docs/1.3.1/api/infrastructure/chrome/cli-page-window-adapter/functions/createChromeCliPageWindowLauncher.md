---
editUrl: false
next: false
prev: false
title: createChromeCliPageWindowLauncher
slug: 1.3.1/api/infrastructure/chrome/cli-page-window-adapter/functions/createchromeclipagewindowlauncher
---

> **createChromeCliPageWindowLauncher**(`windowsApi`, `windowIdStorage?`): [`ChromeCliPageWindowLauncher`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher/)

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:377](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L377)

Chrome windows APIをCLI page launcherへ変換します。

## Parameters

### windowsApi

[`ChromeWindowsApi`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowsapi/)

Chrome windows APIです。

### windowIdStorage?

[`CliPageWindowIdStoragePort`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/clipagewindowidstorageport/) = `cliPageWindowIdStorageMissing`

CLI page window ID storageです。

## Returns

[`ChromeCliPageWindowLauncher`](/1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher/)

CLI page launcherです。
