# Maintenance Guide

## Operational ownership

Assign named owners for application, database, storage, security, and user support before production. This guide is a proposed checklist; no deployed system or monitoring stack was found in the repository.

## Routine operations

- Review application/API health, error rates, latency, queue depth (if used), database capacity, and storage usage.
- Review security/dependency advisories and apply updates through tested releases.
- Verify backup completion and periodically perform a restore test against an isolated environment.
- Review privileged role changes and access logs according to an approved privacy/retention policy.
- Monitor attachment capacity and apply approved retention/deletion rules.
- Keep runbooks, service objectives, contacts, and supported-version matrix current.

## Backups and recovery

Before launch, define RPO, RTO, backup frequency, retention, encryption, key ownership, off-site protection, and restore procedure. Back up MySQL and any required file objects consistently; metadata without bytes (or bytes without metadata) may not be a recoverable attachment. Test point-in-time recovery if required. Restrict access to backups and audit restore operations.

## Incident handling

1. Detect and classify impact, including affected users/data and security/privacy implications.
2. Contain safely (for example revoke credentials, disable an affected feature, or limit traffic).
3. Preserve relevant logs/evidence while minimizing personal data exposure.
4. Recover using a reviewed rollback/forward-fix plan and verify critical workflows.
5. Communicate through approved channels and comply with applicable notification obligations.
6. Record root cause, timeline, remediation, and regression tests in a post-incident review.

Suspected vulnerabilities or data exposure must use a private security escalation path, not a public issue.

## Maintenance windows and data changes

Announce planned downtime; deploy only reviewed changes; coordinate application/schema compatibility; verify health after deployment. Destructive maintenance requires an approved backup, data-retention review, and rollback/restore plan.

## Support diagnostics

Request timestamp, environment, build/commit, safe error code, request ID, browser, and reproduction steps. Never ask users to send passwords, tokens, full session cookies, or confidential file contents. Use [bug report template](../06-testing/bug-report-template.md).
