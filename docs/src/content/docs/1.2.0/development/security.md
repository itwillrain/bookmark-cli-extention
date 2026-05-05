---
title: Security運用
description: GitHub security settings、Dependabot、CodeQL、secret scanningの運用方針です。
slug: 1.2.0/development/security
---

# Security運用

このページでは、Bookmark CLI ExtensionのGitHub security settingsと依存関係監視の運用を定義します。

## GitHub設定

リポジトリでは次のGitHub security機能を有効にします。

| Feature | 方針 |
| --- | --- |
| Dependabot alerts | 有効にする |
| Dependabot security updates | 有効にする |
| Secret scanning | 有効にする |
| Secret scanning push protection | 有効にする |
| CodeQL | pull request、main push、週次scheduleで実行する |

Dependabot alertsはdependency graphと合わせて動作し、default branch上の依存関係を対象にします。

## Dependabot更新方針

`.github/dependabot.yml` では、root package、docs package、GitHub Actionsを対象にします。

通常のversion updateは週次で実行します。

minor / patch updateはecosystemごとにgroup化し、PR数を抑えます。

security updateは通常のversion updateとは別に `applies-to: security-updates` のgroupで扱います。

major updateは自動merge対象にしません。

Dependabot PRはCI、test、buildを通過したものだけauto-merge候補にします。

## Alert対応

Dependabot alertが作成されたら、まずseverity、影響範囲、fixed versionの有無を確認します。

`critical` と `high` は優先して対応します。

runtime依存ではなくdevelopment依存でも、buildやrelease artifactに影響する場合は対応対象にします。

malware classificationが付いたalertは、通常の脆弱性より優先して調査します。

## 有効状態の確認

GitHub側の有効状態は、maintainerがGitHub repository settingsまたはGitHub CLIで確認します。

## 参考

* [Configuring Dependabot alerts](https://docs.github.com/en/enterprise-cloud@latest/code-security/dependabot/dependabot-alerts/configuring-dependabot-alerts)
* [Configuring Dependabot security updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates)
* [Dependabot options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference)
* [Enable vulnerability alerts](https://docs.github.com/en/rest/repos/repos#enable-vulnerability-alerts)
