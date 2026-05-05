---
title: Issue運用
description: GitHub Issueの入口、triage、ラベル、対応判断の運用方針です。
slug: 1.2.0/development/issues
---

# Issue運用

このページでは、Bookmark CLI ExtensionのIssue受付とtriageの流れを定義します。

Issueは、バグ報告、機能要望、質問・ドキュメント確認に分けて受け付けます。

Security vulnerabilityは公開Issueでは扱わず、GitHub Security Advisoriesで受け付けます。

## 入口

Issue Formsは次の3種類です。

| Template | 用途 | 初期label |
| --- | --- | --- |
| Bug report | 再現可能な不具合、回帰、ブラウザ差分 | `bug`, `needs-triage` |
| Feature request | 新しいcommand、検索仕様、UI挙動、ブラウザ対応 | `enhancement`, `needs-triage` |
| Question or documentation | 使い方、設定、貢献方法、仕様確認、docsの不足やズレ | `question`, `needs-triage` |

blank issueは無効にします。

ただしmaintainerには、GitHub UI上で `Blank issue` が表示される場合があります。

情報が不足するIssueを減らすため、バグ報告ではブラウザ、拡張version、対象area、現在の挙動、期待する挙動、再現手順を必須にします。

Issue Formで使う初期labelは、GitHub上にも事前に作成します。

## triageの流れ

Issueを受けたら、まず次の順で確認します。

1. Security vulnerabilityではないか確認する
2. templateが適切か確認する
3. `needs-triage` のまま再現情報と影響範囲を読む
4. area、browser、priorityのlabelを付ける
5. docsがSSOTとして更新対象になるか判断する
6. 対応方針をコメントする
7. 実装Issueなら受け入れ条件を明文化する

Security vulnerabilityの場合は、公開Issue上で詳細を掘らず、GitHub Security Advisoriesへ誘導してIssueを閉じます。

## label設計

既存のRelease Drafterと合わせるため、user-facingな変更分類は次のlabelを使います。

* `bug`
* `fix`
* `enhancement`
* `feature`
* `documentation`
* `docs`
* `chore`
* `refactor`
* `dependencies`
* `skip-changelog`
* `question`

release versionの判断には次のlabelを使います。

* `major`
* `minor`
* `patch`

triage用には次のlabelを使います。

* `needs-triage`
* `needs-info`
* `accepted`
* `duplicate`
* `wontfix`

browser別には次のlabelを使います。

* `browser: chrome`
* `browser: firefox`
* `browser: all`

area別には次のlabelを使います。

* `area: cli`
* `area: search`
* `area: bookmark-tree`
* `area: history`
* `area: tags`
* `area: aliases`
* `area: popup`
* `area: hotkey`
* `area: release`
* `area: docs`

優先度は次のlabelを使います。

* `priority: p0`
* `priority: p1`
* `priority: p2`
* `priority: p3`

## 優先度

`priority: p0` は、データ消失、セキュリティ、公開済みpackageの致命的な起動不能に使います。

`priority: p1` は、主要commandが使えない、FirefoxまたはChromeで起動できない、申請・releaseが止まる問題に使います。

`priority: p2` は、回避策があるが利用体験を大きく落とす問題に使います。

`priority: p3` は、軽微なUI違和感、docs改善、将来検討の要望に使います。

## 対応判断

対応するIssueは、次のいずれかの状態にします。

* `accepted`: 方針が決まり、対応する
* `needs-info`: 再現条件、version、期待値などが不足している
* `duplicate`: 既存Issueへ統合する
* `wontfix`: product scope外、または別手段で扱う

`needs-info` は、質問後しばらく追加情報がない場合に閉じてもよいです。

ただし自動close botは導入せず、手動で判断します。

## docs SSOT

仕様やコマンド挙動が変わるIssueでは、必ずdocsの更新要否を確認します。

次の変更はdocs更新を必須にします。

* command syntaxやoptionの追加・変更
* 検索順位、補完、keyboard操作の変更
* Chrome / Firefoxの権限、manifest、store申請の変更
* 保存データ構造、migration、cleanupの変更
* privacy policyやデータ取り扱いの変更

実装PRでは、Issueに紐づくdocs変更を同じPRに含めることを基本とします。

## リリース・ストアIssue

Release or store submission issueは、公開Issue Formとしては用意しません。

GitHub Release、Chrome Web Store、AMO、validator、署名の問題は、maintainerが必要に応じて `chore`、`area: release`、`priority` labelで管理します。

対応時は、対象version、対象channel、artifact名、workflow run、validator出力を確認します。

AMO validatorのbundle警告は、まず `store-assets/amo-review-notes.md` と照合します。

GitHub Releaseのasset不足は、release workflowと `docs/src/content/docs/development/release.md` の運用方針を確認します。

Store reviewerからの指摘は、原文をIssueに貼り、必要ならreview notesまたはprivacy policyを更新します。
