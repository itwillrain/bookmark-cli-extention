---
title: リリース運用
description: Bookmark CLI Extension のtag、GitHub Release、Release Drafter、release workflowの運用方針です。
---

# リリース運用

このページでは、Bookmark CLI Extensionのリリース運用を定義します。

リリースは `main`、SemVer tag、GitHub Releaseを基準にします。

常設の `release` branchは持ちません。

必要な場合だけ、短命の `release/vX.Y.Z` branchを作ります。

## 基本方針

`main` は常にリリース可能な状態を保ちます。

リリース対象のcommitは、`main` 上のcommitに限定します。

tagは `vX.Y.Z` 形式で作ります。

例は次のとおりです。

```bash
v1.0.0
v1.1.0
v1.2.0
```

package versionはtagから `v` を除いた値と一致させます。

`v1.1.0` を切る場合、rootの `package.json` は `1.1.0` にします。

docsの `package.json` も同じ公開単位で扱う場合は、同じversionへ更新します。

## docs version

docsサイトは `starlight-versions` でversion selectorを提供します。

`docs/src/content/docs/` は内部的な最新原稿として扱います。

公開サイトでは、rootや未version URLを最新の公開済みversionへredirectします。

GitHub Pagesはproject siteとして公開するため、公開URLには `/bookmark-cli-extention/` base pathを含めます。

GitHub Actions上のdocs buildでは、rootや未version URLのredirect先にもこのbase pathを含めます。

version selectorには、`main` などのbranch名ではなく公開済みversionだけを表示します。

リリース済みversionのsnapshotは、`docs/src/content/docs/<version>/` と `docs/src/content/versions/<version>.json` に保持します。

新しいversionをarchiveする場合は、release workflowが `docs:archive` scriptを実行します。

同じ処理を手元で確認する場合は、次のcommandで対象versionを指定します。

```bash
pnpm run docs:archive -- 1.2.0
```

このscriptは `docs/src/data/archived-documentation-versions.json` にversionを追加します。

このJSONの先頭versionを最新の公開済みversionとして扱います。

続けて、`starlight-versions` でsnapshotとversion sidebar設定を生成します。

release workflowは生成されたsnapshotをmainへcommitしてからtagとGitHub Release draftを作ります。

main branch保護でGitHub Actionsのpushを許可しない場合は、version更新PRでsnapshotを事前生成します。

その場合は `pnpm run docs:archive -- X.Y.Z` を実行し、snapshotをreviewしてからmergeします。

公開済みversionのsnapshotは、仕様変更ではなくリンク切れや誤字の修正だけを行います。

## Release Drafter

Release Drafterは、`main` へmergeされたPRから次のGitHub Release draftを更新します。

Release Drafterはrelease noteの下書き係です。

tag作成、build、zip生成、GitHub Release公開はRelease Drafterだけでは扱いません。

PRには、必要に応じて次のlabelを付けます。

- `major`
- `minor`
- `patch`
- `feature`
- `enhancement`
- `bug`
- `fix`
- `documentation`
- `docs`
- `chore`
- `refactor`
- `dependencies`
- `skip-changelog`

version bumpの判断は次の順番で行います。

- `major` labelがある場合はmajor release
- `minor`、`feature`、`enhancement` labelがある場合はminor release
- `patch`、`bug`、`fix`、`documentation`、`docs`、`chore`、`refactor`、`dependencies` labelがある場合はpatch release
- labelがない場合はpatch release

## release workflow

GitHub Actionsの `Release` workflowは、手動実行でrelease draftを作ります。

入力は次のとおりです。

- `version`: `v` prefixなしのSemVerです。例は `1.1.0` です。
- `prerelease`: GitHub Releaseをpre-release扱いにするかどうかです。

workflowは次の順番で実行します。

1. `main` から実行されているか確認する
2. 入力versionがSemVerか確認する
3. `package.json` のversionと入力versionが一致するか確認する
4. dependencyをinstallする
5. docs dependencyをinstallする
6. `pnpm run docs:archive -- X.Y.Z` を実行する
7. `pnpm run check` を実行する
8. `pnpm test` を実行する
9. `pnpm run build` を実行する
10. Firefox対応後は `pnpm run build:firefox` を実行する
11. `pnpm run zip` を実行する
12. Firefox対応後は `pnpm run zip:firefox` を実行する
13. `dist` のうち入力versionと一致するzipをrelease assetとして集める
14. docs archiveの差分があればmainへcommitしてpushする
15. release対象commitを解決する
16. `vX.Y.Z` のtagがなければ作成してpushする
17. `vX.Y.Z` のGitHub Release draftを作成または更新する

既存のrelease draftがある場合は、zip assetを上書きuploadします。

release draftがない場合は、`vX.Y.Z` のrelease draftを作成します。

## リリース手順

通常のリリース手順は次のとおりです。

1. リリース対象のPRを `main` へmergeする
2. 必要であれば `release/vX.Y.Z` branchでversionだけを更新する
3. version更新PRを `main` へmergeする
4. GitHub Actionsから `Release` workflowを手動実行する
5. `version` に `1.1.0` のような値を入力する
6. workflowが作ったdocs archive commit、GitHub Release draftを確認する
7. release noteとassetを確認する
8. 問題なければGitHub Releaseをpublishする

## branch方針

常設の `release` branchは作りません。

release branchが必要な場合は、`release/vX.Y.Z` のような短命branchだけを使います。

release branchでは、version bump、release note調整、申請前の最終docs修正だけを扱います。

機能追加や大きな修正はrelease branchへ入れません。

## v1.0.0初回リリース

v1.0.0では、Chrome向けzipをGitHub Release assetとして添付します。

Chrome Web Store申請やFirefox Add-ons申請は、GitHub Releaseとは別の公開作業として扱います。

Firefox対応後は、Firefox向けzipまたは提出物もrelease assetへ追加します。

Firefox向け提出物は `pnpm run zip:firefox` で生成します。
