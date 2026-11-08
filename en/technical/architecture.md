---
title: Architecture and providers
---

# Architecture and providers

Spine Cloud accepts deployments from the CLI and uses a management API and execution agent to run applications. This map shows logical connections without credentials or internal addresses.

<ArchitectureMap />

## Components and providers

| Component | Role | Recorded environment |
| --- | --- | --- |
| Spine CLI | Connect an account, build, and request deployment | Preview development CLI on the developer’s machine |
| Dashboard | Account approval, applications and deployment history | React on Vercel |
| Management API | Authentication, ownership, jobs and status | Railway |
| Identity and storage | Account authentication, metadata and private artifacts | Supabase |
| Agent | Poll, verify, run and report | Oracle Cloud Infrastructure VM |
| Portal | Route public HTTPS traffic to the app | Self-hosted relay and tunnel |

These providers describe the verified example environment. Final beta regions, data locations and provider responsibilities have not been established here.

## Deployment and traffic

Approve a one-time code, then run `spine deploy`. The API checks ownership and artifact format, encrypts the artifact and stores it privately. The agent polls over authenticated HTTPS, claims the job, decrypts and verifies its hash and format, and starts the app. Internal health and public HTTPS checks precede the success record and address. A queued request alone does not establish that the app is running.

The complete flow was tested only with the specified internal example. Visitor traffic passes through the Portal relay and tunnel. HTTPS polling avoids an additional inbound management port. Direct SSH timed out in the existing environment; its cause was not established.

## Developer considerations

The example uses `GET /health`; the exact contract for general apps must be finalized before beta. CLI version and platform support, database connectivity and secret rotation must be confirmed. A single VM simplifies initial operations but can affect multiple apps at once. High availability and zero-downtime deployments are not verified guarantees.
