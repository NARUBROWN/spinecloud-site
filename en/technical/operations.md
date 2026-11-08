---
title: Operations and recovery
---

# Operations and recovery

## Status and observability

The local implementation separates agent-reported service status, internal health and public address checks. Stale or untrusted reports do not establish current status or usage. A successful deployment does not guarantee the app is running now.

Recent application logs are collected locally. Old metrics are deleted when new measurements are saved; if collection stops, deletion also stops. A fixed deletion deadline is not guaranteed. Retention and independent expiry remain undecided.

## Resource policy

The local policy uses a 32 MiB baseline, 64 MiB hard limit and a 30-second continuous baseline breach threshold. Ubuntu ARM64 under QEMU was used to test systemd credential delivery and limits. This does not prove the full OCI deployment or concurrent customer workload capacity. The policy is not deployed to production and is not a performance or capacity guarantee.

## Replacement and recovery

Local code restores the previous executable and configuration if internal health or public connection checks fail. Interrupted-work reconciliation was tested in isolation. Actual agent-driven replacement, OCI reboot and recovery through Portal have not been verified end to end. A migration assumes existing deployment IDs match runtime service IDs; verify this before applying it. Existing app and artifact allowlists remain in place.

## Service limits

A single VM failure can affect multiple apps and related components. Backup restoration, tenant isolation, multi-app load, certificate renewal and incident procedures need verification. Service levels, recovery objectives and retention remain undecided.
