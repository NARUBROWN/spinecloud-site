---
title: Security and data
---

# Security and data

## Accounts and CLI authentication

CLI login uses a browser-approved one-time code valid for five minutes. Only the CLI holding the device secret can receive the result. Web and CLI sessions are separate. Rate limiting is per API process.

## Access and artifacts

The API checks account ownership. Artifacts are compressed with gzip and encrypted with AES-256-GCM in a private Supabase Storage bucket. The agent verifies their hash and format after decryption.

## Environment variables and logs

Environment variable values are encrypted with AES-256-GCM, using the app ID and variable name as authenticated data. Owners can list names but cannot retrieve stored values. Changes are captured on the next deployment. Applications can print secrets in logs; avoid doing so.

## Execution environment security boundaries

Isolation between applications and restrictions on access to the host, relay, and credentials are not guaranteed.
