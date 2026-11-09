---
title: Frequently asked questions
---

# Frequently asked questions

## What is Spine Cloud?

Spine Cloud is a service for deploying Spine apps written in Go from your CLI and managing them in a web dashboard. You can view deployment history and the public address of a successful deployment.

## How do I get started?

Spine Cloud is in open beta. Deployment requires the preview CLI. Install it with Go:

```bash
go install github.com/NARUBROWN/spine-cli/cmd/spine@preview
```

Create an account in the [dashboard](https://spinecloud.dev/) and review the terms of service. Run `spine cloud auth login` in the CLI and approve the one-time code in your browser to connect the same account.

## Which apps can I deploy?

Spine Cloud is intended for Spine apps written in Go. Deployment requires a supported CLI, an eligible account and an available deployment target.

## How do I deploy an app?

Connect your account, then run `spine deploy` from your project directory. The CLI shows deployment progress and the result. An accepted request does not mean the deployment has completed.

## Where can I find my app's address?

After a successful deployment, you can find the public address in the CLI result and in the dashboard's deployment history.

## How much does it cost?

All features are free during the open beta. If paid features are introduced later, pricing and terms will be provided before payment. See the [terms of service](https://spinecloud.dev/terms) for details.

## How is Spine Cloud different from the Spine framework?

The Spine framework is available under the MIT license. Spine Cloud is a separate service for deploying and managing Spine apps.
