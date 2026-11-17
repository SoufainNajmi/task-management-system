# Project Scope

## In scope (proposed)

1. Account registration/invitation, sign-in, sign-out, and authorization.
2. User profile viewing and editing.
3. Teams and team membership.
4. Projects and project membership within teams.
5. Task creation, editing, filtering, status, priority, deadlines, and assignment.
6. Task comments, labels, and file attachments.
7. A dashboard with task and project summaries.
8. In-app notifications for relevant task activity and deadlines.
9. A versioned REST API, relational data model, automated tests, and deployment guidance.

The detailed feature boundaries and acceptance expectations are in [functional requirements](functional-requirements.md), [user stories](../02-analysis/user-stories.md), and [acceptance criteria](../02-analysis/acceptance-criteria.md).

## Out of scope unless explicitly approved

- Native mobile applications, real-time chat, video meetings, and time tracking.
- Gantt charts, resource/capacity planning, billing, invoicing, and advanced portfolio management.
- Public projects or anonymous task access.
- External identity providers, calendar integrations, email delivery, and webhooks.
- Enterprise single sign-on, multi-region failover, and formal compliance certification.
- Automated task recurrence and custom workflow/status builders.

## System boundary

The React application calls the Laravel API. Laravel enforces authentication, authorization, validation, business rules, and persistence. MySQL stores relational records; a private file store holds attachment bytes. Email, push, analytics, and other external services are not assumed in the first release.

## Proposed release increments

| Increment | Candidate contents |
|---|---|
| Foundation | Environment setup, authentication, user/profile, authorization, API envelope, database baseline. |
| Collaboration | Teams, memberships, projects, project access. |
| Work management | Tasks, assignments, priority, status, due dates, filters. |
| Collaboration detail | Comments, labels, attachments, in-app notifications. |
| Readiness | Dashboard, security review, accessibility, performance, deployment and recovery verification. |

Sequence is a planning suggestion, not a committed schedule. Dependencies and estimates require team review.

## Scope change control

Record a change request with rationale, affected user roles, requirements, data/API impact, security/privacy impact, test impact, and release implications. The product owner should approve scope changes; update all affected documents together.
