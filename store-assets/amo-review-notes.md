# AMO Review Notes

## Unsafe assignment to innerHTML warnings

AMO validator may report the following warnings in the generated Firefox bundle:

```text
Unsafe assignment to innerHTML
chunks/client-ieBDsLeM.js
```

These warnings come from the bundled React DOM runtime. The generated chunk contains React's generic support code for `dangerouslySetInnerHTML`.

Bookmark CLI Extension does not use `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `DOMParser`, or `createContextualFragment` in application source code.

Reviewer verification command:

```bash
rg -n "innerHTML|dangerouslySetInnerHTML|outerHTML|insertAdjacentHTML|DOMParser|createContextualFragment" src public wxt.config.ts package.json
```

Expected result: no matches in application source code.

The extension renders user-visible bookmark data through React text nodes and attributes. It does not intentionally inject HTML from bookmark titles, URLs, folder paths, tags, aliases, history entries, or settings.

## Data handling

The extension reads browser bookmarks, browser history, active tab metadata, and extension-local storage only for the CLI features described in the documentation.

The extension does not intentionally transmit bookmark or history data to external services.
