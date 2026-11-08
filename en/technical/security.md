---
title: Security and data
---

# Security and data

## Accounts and CLI authentication

CLI login uses a browser-approved one-time code valid for five minutes. Only the CLI holding the device secret can receive the result. Web and CLI sessions are separate. Tests rejected unauthenticated approval, another device’s secret, repeated approval and repeated collection. Rate limiting is per API process; shared limits and abuse monitoring are needed before scaling replicas.

## Access and artifacts

The API checks account ownership. Tests of the internal example rejected another account’s access to apps and history and denied private artifact requests. Artifacts are compressed with gzip and encrypted with AES-256-GCM in a private Supabase Storage bucket. The agent verifies their hash and format after decryption. Key rotation, recovery and least-privilege credentials require further operational validation.

## Environment variables and logs

The local implementation encrypts values with AES-256-GCM and binds the app ID and variable name as authenticated data. Owners can list names but cannot retrieve stored values. Changes are captured on the next deployment. This path has not yet been deployed to production. Applications can print secrets in logs; avoid doing so.

## Isolation limits

The example does not prove isolation between arbitrary customer code or prevent access to the host, relay or credentials. Multi-tenant isolation and the operational path must be tested before beta. Independent certification, audit and incident response times are not established. The security reporting channel and response policy remain to be decided.
