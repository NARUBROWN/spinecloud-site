---
title: Operations and recovery
---

# Operations and recovery

## Status and observability

The instance detail view separates agent-reported service status, internal health and public address checks. Stale or untrusted reports do not establish current status or usage. A successful deployment does not guarantee the app is running now.

Recent application logs are collected. Old metrics are deleted when new measurements are saved; if collection stops, deletion also stops. A fixed deletion deadline is not guaranteed.

## Resource policy

Each app receives a baseline memory allocation. A booster provides up to twice that amount for 1 minute. The app restarts if memory use stays above the baseline for 1 consecutive minute.

## Replacement and recovery

The deployment process is designed to restore the previous executable and configuration if internal health or public connection checks fail. Existing app and artifact allowlists remain in place.
