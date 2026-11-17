# Acceptance Criteria

These criteria are proposed and should become automated tests where practical. The status of every criterion is **Not implemented / not verified** because the inspected workspace has no application source.

## Authentication and access (FR-01–03)

- Given an active account, when valid credentials are submitted, then a secure authenticated session is established and the user receives only permitted identity fields.
- Given invalid credentials, when sign-in is attempted, then access is denied with a generic response that does not confirm whether an account exists.
- Given an unauthenticated caller, when a protected API route is requested, then the API returns `401`.
- Given a caller without resource permission, when private data is requested or mutated, then access is denied and no private data is returned.

## Profile, teams, and projects (FR-04–07)

- A user can update only approved profile fields; attempts to change role, account state, or another user's profile are denied.
- An Admin can list/review accounts and update allowed account state or system role; non-admins cannot, and a user cannot deactivate or elevate their own account through a profile endpoint.
- Account provisioning and password recovery follow the approved onboarding policy; unapproved flows are not exposed.
- An Admin can manage teams and members; a non-admin cannot invoke system administration actions.
- A Project Manager can manage projects only in authorized scope; an unrelated team/project ID cannot expand access.
- Archiving a project prevents new work according to the agreed policy while historical tasks remain available to authorized readers.

## Tasks and assignment (FR-08–11)

- Valid task creation persists a task under exactly one authorized project.
- Invalid priority/status values are rejected with field-level validation details.
- Assignment to an inactive or ineligible user is rejected atomically; valid assignments are returned in the canonical task representation.
- Team Members can update only fields allowed by the approved role matrix.
- Due-date filtering and timezone behavior match the decision recorded in business rules.
- Pagination enforces a maximum page size and stable sorting.

## Collaboration and files (FR-12–14)

- Comments are visible only to authorized task participants; editing/deletion follows the approved ownership/moderation policy.
- Labels cannot be applied across unauthorized project scope.
- File upload enforces approved size/type limits; download checks current parent-resource access; storage paths are not exposed.
- Failed file persistence leaves no accessible orphan record.

## Dashboard and notifications (FR-15–17)

- Dashboard totals and task lists include only work the caller may access.
- A user can list and mark read only their own notifications.
- Notification content cannot be used to access an otherwise unauthorized task.
- Repeated processing of a notification-triggering event does not create unintended duplicate notifications where idempotency is required.

## API quality (FR-18–20)

- Success and error payloads follow [API response formats](../04-api/api-response-formats.md).
- Validation errors identify input fields without exposing internals.
- Serialization excludes secrets, internal storage paths, and unauthorized relationship data.

## Release gate

Acceptance testing is complete only after criteria have concrete test evidence, open policy decisions are resolved, security/access-control tests pass, and product ownership approves the release.
