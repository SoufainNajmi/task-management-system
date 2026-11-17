# Deployment Plan

## Status and assumptions

There is no application build, deployment configuration, hosting account, CI/CD workflow, or production environment in the inspected workspace. This plan is a proposal only. Select the hosting provider, regions, compliance requirements, budget, and service objectives before launch.

## Environments

| Environment | Purpose | Data policy |
|---|---|---|
| Local | Individual development | Synthetic data only |
| Test/CI | Automated verification | Ephemeral synthetic data and isolated services |
| Staging | Release rehearsal | Sanitized/synthetic data; production-like config without production secrets |
| Production | Real users | Least privilege, monitored access, backups, approved retention |

## Release pipeline (proposed)

1. Pull request checks: format/lint, static analysis, tests, dependency/security scans, frontend/backend build.
2. Merge to protected default branch; create reviewed release artifact/tag.
3. Deploy immutable frontend and backend artifacts to staging.
4. Apply backward-compatible database changes using reviewed migrations; verify health and smoke tests.
5. Obtain release approval; deploy to production using a controlled rollout.
6. Verify API health, authentication, task flows, storage, queue, logs, and alerts.
7. Monitor agreed metrics; document release and any incident.

## Database and storage changes

- Back up before risky schema changes and verify restore process.
- Prefer expand/migrate/contract changes compatible with old and new application versions during rollout.
- Never run unreviewed destructive data migrations in production.
- Store attachments privately; apply access policy and retention consistently with metadata.
- Define rollback vs forward-fix behavior; a code rollback may not reverse a data migration.

## Security and configuration

- Serve all production traffic over TLS; restrict CORS to approved frontend origins.
- Inject secrets through managed secret storage; do not bake credentials into images or frontend bundles.
- Restrict database/storage network access and credentials to required services.
- Configure secure session cookies, CSRF, rate limits, file size/type policy, logging redaction, and error handling.
- Pin dependencies and record an update/vulnerability response process.

## Go-live gates

Approved service objectives and RPO/RTO; completed threat/access review; acceptance and security tests pass; backup restore verified; monitoring/alert ownership confirmed; privacy/retention policies approved; rollback and support contacts available; open critical defects resolved.

## Rollback and incident response

Use the release-specific runbook: stop/limit rollout, assess data compatibility, restore previous application artifact or apply a forward fix, preserve evidence, notify owners, and verify recovery. Follow [maintenance guide](maintenance-guide.md) for operations. Provider-specific commands must be added after hosting is selected.
