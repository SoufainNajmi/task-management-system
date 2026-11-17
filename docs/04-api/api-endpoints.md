# Proposed API Endpoints

## Status

**Every route in this catalog is proposed and not implemented.** No backend source or route definitions were present during project inspection. Paths and fields are a contract draft; approve before implementation. Prefix every path with `/api/v1`.

## Authentication and profile

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| POST | `/auth/login` | No | Rate-limited | `{ "email": "…", "password": "…" }` | 200 authenticated user/session |
| POST | `/auth/logout` | Yes + CSRF | Current session | Empty body | 204 |
| GET | `/auth/me` | Yes | Current user | — | 200 user summary |
| GET | `/users/me` | Yes | Current user | — | 200 profile |
| PATCH | `/users/me` | Yes + CSRF | Current user | `{ "name": "…", "display_name": "…", "timezone": "…" }` | 200 updated profile |

## Administrative user management

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/admin/users` | Yes | Admin | `q`, `is_active`, `page`, `per_page` | 200 paginated safe user summaries |
| GET | `/admin/users/{userId}` | Yes | Admin | — | 200 safe account/profile details |
| PATCH | `/admin/users/{userId}` | Yes + CSRF | Admin | `{ "system_role": "member", "is_active": true }` (allow-listed fields) | 200 updated safe user summary |

Account creation/invitation and password recovery are intentionally not specified until onboarding and credential policy are approved. Admin APIs must prevent unsafe self-demotion/lockout where required and must never expose password hashes or authentication secrets.

## Teams and membership

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/teams` | Yes | Teams caller may access; Admin may list all | `page`, `per_page` | 200 paginated teams |
| POST | `/teams` | Yes + CSRF | Admin | `{ "name": "…", "description": "…" }` | 201 team |
| GET | `/teams/{teamId}` | Yes | Admin or team member | — | 200 team |
| PATCH | `/teams/{teamId}` | Yes + CSRF | Admin | `{ "name": "…", "description": "…" }` | 200 team |
| DELETE | `/teams/{teamId}` | Yes + CSRF | Admin; archive semantics preferred | — | 204 or 200 archived resource (decision) |
| GET | `/teams/{teamId}/members` | Yes | Admin or team manager | `page`, `per_page` | 200 paginated memberships |
| POST | `/teams/{teamId}/members` | Yes + CSRF | Admin | `{ "user_id": 42, "role": "project_manager" }` | 201 membership |
| DELETE | `/teams/{teamId}/members/{userId}` | Yes + CSRF | Admin | — | 204 |

Membership invitations/email delivery are not included until approved.

## Projects and project membership

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/teams/{teamId}/projects` | Yes | Team/project participant; Admin | `status`, `page`, `per_page`, `sort` | 200 paginated projects |
| POST | `/teams/{teamId}/projects` | Yes + CSRF | Admin or team Project Manager | `{ "name": "…", "description": "…", "due_date": "2026-12-31" }` | 201 project |
| GET | `/projects/{projectId}` | Yes | Project member or Admin | — | 200 project |
| PATCH | `/projects/{projectId}` | Yes + CSRF | Admin or scoped Project Manager | Partial project fields | 200 project |
| DELETE | `/projects/{projectId}` | Yes + CSRF | Admin or scoped Project Manager | — | 204/archived (policy decision) |
| GET | `/projects/{projectId}/members` | Yes | Project member or Admin | `page`, `per_page` | 200 memberships |
| POST | `/projects/{projectId}/members` | Yes + CSRF | Admin or scoped Project Manager | `{ "user_id": 42 }` | 201 membership |
| DELETE | `/projects/{projectId}/members/{userId}` | Yes + CSRF | Admin or scoped Project Manager | — | 204 |

## Tasks and assignments

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/projects/{projectId}/tasks` | Yes | Project member or Admin | `status`, `priority`, `assignee_id`, `label_id`, `due_before`, `due_after`, `q`, `sort`, `page`, `per_page` | 200 paginated tasks |
| POST | `/projects/{projectId}/tasks` | Yes + CSRF | Admin/Project Manager; Team Member if enabled | `{ "title": "…", "description": "…", "status": "todo", "priority": "medium", "due_at": null, "assignee_ids": [42], "label_ids": [] }` | 201 task |
| GET | `/tasks/{taskId}` | Yes | Project member or Admin | — | 200 task detail |
| PATCH | `/tasks/{taskId}` | Yes + CSRF | Role and field-level permission | Partial editable fields | 200 task |
| DELETE | `/tasks/{taskId}` | Yes + CSRF | Admin/Project Manager; archive/soft-delete policy | — | 204 |
| PUT | `/tasks/{taskId}/assignees` | Yes + CSRF | Admin/Project Manager | `{ "assignee_ids": [42, 43] }` replaces complete set | 200 task/assignees |

Allowed task `status` and `priority` values are defined in [business rules](../01-requirements/business-rules.md). Assignment validates project/team eligibility.

## Comments and labels

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/tasks/{taskId}/comments` | Yes | Task access | `page`, `per_page` | 200 paginated comments |
| POST | `/tasks/{taskId}/comments` | Yes + CSRF | Task participant | `{ "body": "…" }` | 201 comment |
| PATCH | `/comments/{commentId}` | Yes + CSRF | Author or moderator per policy | `{ "body": "…" }` | 200 comment |
| DELETE | `/comments/{commentId}` | Yes + CSRF | Author or moderator per policy | — | 204 |
| GET | `/projects/{projectId}/labels` | Yes | Project access | `page`, `per_page` | 200 labels |
| POST | `/projects/{projectId}/labels` | Yes + CSRF | Admin/Project Manager | `{ "name": "…", "color": "#336699" }` | 201 label |
| PATCH | `/labels/{labelId}` | Yes + CSRF | Admin/Project Manager in scope | Partial label fields | 200 label |
| DELETE | `/labels/{labelId}` | Yes + CSRF | Admin/Project Manager in scope | — | 204 |
| PUT | `/tasks/{taskId}/labels` | Yes + CSRF | Admin/Project Manager | `{ "label_ids": [3, 5] }` replaces set | 200 task labels |

## Attachments

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/tasks/{taskId}/attachments` | Yes | Task access | `page`, `per_page` | 200 metadata list |
| POST | `/tasks/{taskId}/attachments` | Yes + CSRF | Task participant; multipart `file` | File-size/type policy applies | 201 attachment metadata |
| GET | `/attachments/{attachmentId}/content` | Yes | Fresh task access check | — | 200 streamed bytes or controlled redirect |
| DELETE | `/attachments/{attachmentId}` | Yes + CSRF | Uploader or moderator per policy | — | 204 |

Do not return private object keys. Set safe content disposition and appropriate anti-sniffing headers. Upload malware scanning and signed URL design require approval.

## Dashboard and notifications

| Method | Path | Auth | Access | Request / query | Success |
|---|---|---|---|---|---|
| GET | `/dashboard` | Yes | Current user's authorized scope | Optional `team_id`, `project_id` | 200 scoped summary |
| GET | `/notifications` | Yes | Current recipient only | `unread`, `page`, `per_page` | 200 paginated notifications |
| PATCH | `/notifications/{notificationId}` | Yes + CSRF | Recipient only | `{ "read": true }` | 200 notification |
| POST | `/notifications/read-all` | Yes + CSRF | Current recipient only | Empty body | 204 |

## General parameters and error behavior

- Resource IDs in path must be validated and authorization checked after resolution.
- Dates use ISO 8601. `due_before` and `due_after` semantics must match the final deadline decision.
- Unknown filters/sort fields should return `400` or `422` consistently; unsupported fields are never silently trusted as SQL identifiers.
- Standard errors and status handling are in [API response formats](api-response-formats.md).
- Endpoint existence must be confirmed from route definitions and tests before any route is labeled implemented.
