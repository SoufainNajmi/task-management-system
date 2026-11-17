# Task Management System Documentation

## Purpose and status

This documentation set defines a proposed product, architecture, schema, API, and delivery approach for a React.js + Laravel + MySQL task management system. It is not evidence that features are implemented. Inspection found the `backend/`, `frontend/`, and original `docs/` directories empty, with no source code, migrations, route definitions, dependency manifests, or existing documentation to preserve. All features, schema objects, endpoints, and deployment practices below are **proposed and unverified** until implemented and tested.

## Reading order

1. [Requirements](01-requirements/project-overview.md) — product goals, boundaries, functional/non-functional requirements, business rules.
2. [Analysis](02-analysis/user-roles.md) — access roles, user stories, use cases, acceptance criteria.
3. [Design](03-design/system-architecture.md) — component boundaries, relational data model, ERD, UX direction.
4. [API](04-api/api-overview.md) — API conventions, proposed endpoint catalog, response/error envelopes.
5. [Development](05-development/development-workflow.md) — feature workflow, coding conventions, Git, environment setup.
6. [Testing](06-testing/testing-strategy.md) — test levels, starter cases, bug report template.
7. [Deployment](07-deployment/deployment-plan.md) — release and maintenance operations.

## Document index

### 01 — Requirements

- [Project overview](01-requirements/project-overview.md)
- [Project scope](01-requirements/project-scope.md)
- [Functional requirements](01-requirements/functional-requirements.md)
- [Non-functional requirements](01-requirements/non-functional-requirements.md)
- [Business rules](01-requirements/business-rules.md)

### 02 — Analysis

- [User roles](02-analysis/user-roles.md)
- [User stories](02-analysis/user-stories.md)
- [Use cases](02-analysis/use-cases.md)
- [Acceptance criteria](02-analysis/acceptance-criteria.md)

### 03 — Design

- [System architecture](03-design/system-architecture.md)
- [Database design](03-design/database-design.md)
- [ERD diagram](03-design/erd-diagram.md)
- [UI/UX guidelines](03-design/ui-ux-guidelines.md)

### 04 — API

- [API overview](04-api/api-overview.md)
- [Proposed API endpoints](04-api/api-endpoints.md)
- [API response formats](04-api/api-response-formats.md)

### 05 — Development

- [Development workflow](05-development/development-workflow.md)
- [Coding standards](05-development/coding-standards.md)
- [Git workflow](05-development/git-workflow.md)
- [Environment setup](05-development/environment-setup.md)

### 06 — Testing

- [Testing strategy](06-testing/testing-strategy.md)
- [Starter test cases](06-testing/test-cases.md)
- [Bug report template](06-testing/bug-report-template.md)

### 07 — Deployment

- [Deployment plan](07-deployment/deployment-plan.md)
- [Maintenance guide](07-deployment/maintenance-guide.md)

## Traceability and maintenance

Requirement IDs (`FR-*`, `NFR-*`, `BR-*`) and story/test IDs link expected behavior to design and verification. When a decision changes, update all affected requirements, role policies, schema, API examples, acceptance criteria, tests, and runbooks together. Mark an endpoint or feature “implemented” only when code exists; mark it “verified” only when tests/evidence pass.

## Open decisions

Before implementation or contract freeze, product and engineering owners should resolve at least:

1. Authentication flow and deployment origin: Sanctum stateful sessions, CSRF/CORS behavior, password recovery, account invitation/registration, and optional non-browser clients.
2. Role scope: whether Project Managers are team- or project-scoped; whether members may create tasks; project membership versus inherited team access; Admin content visibility.
3. Task behavior: allowed status transitions, task editing/deletion/archival, multiple assignees, comment moderation, and activity history/audit requirements.
4. Deadline semantics: date-only versus date-time, timezone display, overdue rules, and reminder schedule.
5. Attachments: provider, maximum size, allowed formats, malware scanning, retention, download authorization, and signed URL strategy.
6. Notifications: events, deduplication, queue/driver, retention, and any email/push delivery.
7. Data policy: user deactivation/deletion, soft-delete rules, retention/legal requirements, and project archival.
8. Technical baseline: framework/runtime versions, frontend build/tooling, ID strategy, API pagination/versioning details, hosting provider/regions, and CI checks.
9. Operational objectives: expected load, availability, p95 latency, RPO/RTO, backup frequency, support ownership, and security/compliance obligations.

These are intentionally marked unresolved rather than silently assumed. See [business rules](01-requirements/business-rules.md), [user roles](02-analysis/user-roles.md), and [database design](03-design/database-design.md) for the corresponding impacts.
