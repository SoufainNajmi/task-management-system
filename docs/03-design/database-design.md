# Database Design

## Status and conventions

This is a **proposed logical schema**, not a migration or a report of existing tables. The workspace contains no migrations or database schema. Use InnoDB and `utf8mb4`; use UTC for timestamps. Proposed IDs are `BIGINT UNSIGNED` auto-increment primary keys unless stated otherwise. Column nullability is shown as required/optional. Exact MySQL version and Laravel conventions must be confirmed before implementation.

## Core tables

### `users`

| Column | Type | Constraints / purpose |
|---|---|---|
| `id` | BIGINT UNSIGNED | PK |
| `name` | VARCHAR(120) | NOT NULL |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE; normalized case-insensitively by application policy |
| `password` | VARCHAR(255) | NOT NULL; password hash only |
| `system_role` | VARCHAR(20) | NOT NULL, default `member`; allowed `admin`, `member` |
| `is_active` | BOOLEAN | NOT NULL, default true |
| `email_verified_at` | TIMESTAMP NULL | Verification state |
| `created_at`, `updated_at` | TIMESTAMP | NOT NULL |
| `deleted_at` | TIMESTAMP NULL | Optional soft delete; retention policy TBD |

Map Admin to `system_role=admin`. Other users receive scoped `team_members.role` values.

### `profiles`

| Column | Type | Constraints / purpose |
|---|---|---|
| `user_id` | BIGINT UNSIGNED | PK and FK → `users.id`, ON DELETE CASCADE only if approved |
| `display_name` | VARCHAR(120) NULL | Optional display name |
| `avatar_path` | VARCHAR(1024) NULL | Private or controlled URL/key; no local absolute path |
| `timezone` | VARCHAR(64) NULL | IANA timezone identifier |
| `created_at`, `updated_at` | TIMESTAMP | NOT NULL |

### `teams` and `team_members`

`teams`: `id BIGINT UNSIGNED` PK; `name VARCHAR(160)` NOT NULL; `slug VARCHAR(180)` NOT NULL UNIQUE; `description TEXT NULL`; `created_by BIGINT UNSIGNED` FK → users; `created_at`, `updated_at` TIMESTAMP NOT NULL; `deleted_at TIMESTAMP NULL`.

`team_members`: `id BIGINT UNSIGNED` PK; `team_id BIGINT UNSIGNED` FK → teams; `user_id BIGINT UNSIGNED` FK → users; `role VARCHAR(24)` NOT NULL (`project_manager` or `team_member`); `joined_at TIMESTAMP` NOT NULL; `created_at`, `updated_at` TIMESTAMP NOT NULL; UNIQUE (`team_id`,`user_id`). Remove membership by deleting/deactivating pivot according to history policy. Admin is a system role, not a team membership role.

### `projects` and `project_members`

`projects`: `id BIGINT UNSIGNED` PK; `team_id BIGINT UNSIGNED` FK → teams; `name VARCHAR(180)` NOT NULL; `description TEXT NULL`; `status VARCHAR(20)` NOT NULL default `active` (proposed: `active`, `archived`); `start_date DATE NULL`; `due_date DATE NULL`; `created_by BIGINT UNSIGNED` FK → users; `created_at`, `updated_at` TIMESTAMP NOT NULL; `deleted_at TIMESTAMP NULL`.

`project_members`: `id BIGINT UNSIGNED` PK; `project_id BIGINT UNSIGNED` FK → projects; `user_id BIGINT UNSIGNED` FK → users; `added_by BIGINT UNSIGNED` FK → users; `created_at`, `updated_at` TIMESTAMP NOT NULL; UNIQUE (`project_id`,`user_id`). Membership should be restricted to team members. If the business elects team-wide project access without explicit membership, revise this table and authorization rules consistently.

### `tasks` and `task_assignees`

`tasks`: `id BIGINT UNSIGNED` PK; `project_id BIGINT UNSIGNED` FK → projects; `title VARCHAR(240)` NOT NULL; `description TEXT NULL`; `status VARCHAR(24)` NOT NULL default `todo` (allowed values in business rules); `priority VARCHAR(24)` NOT NULL default `medium`; `due_at TIMESTAMP NULL` (switch to `DATE` if deadline is date-only); `created_by BIGINT UNSIGNED` FK → users; `created_at`, `updated_at` TIMESTAMP NOT NULL; `deleted_at TIMESTAMP NULL`.

`task_assignees`: `id BIGINT UNSIGNED` PK; `task_id BIGINT UNSIGNED` FK → tasks; `user_id BIGINT UNSIGNED` FK → users; `assigned_by BIGINT UNSIGNED` FK → users; `assigned_at TIMESTAMP` NOT NULL; UNIQUE (`task_id`,`user_id`). Validate assignee membership in the task's project/team in the application or via a schema strategy that can enforce the composite scope.

### `comments` and `attachments`

`comments`: `id BIGINT UNSIGNED` PK; `task_id BIGINT UNSIGNED` FK → tasks; `user_id BIGINT UNSIGNED` FK → users; `body TEXT` NOT NULL; `created_at`, `updated_at` TIMESTAMP NOT NULL; `deleted_at TIMESTAMP NULL` for controlled soft deletion.

`attachments`: `id BIGINT UNSIGNED` PK; `task_id BIGINT UNSIGNED` FK → tasks; `uploaded_by BIGINT UNSIGNED` FK → users; `original_name VARCHAR(255)` NOT NULL; `object_key VARCHAR(1024)` NOT NULL UNIQUE; `mime_type VARCHAR(127)` NOT NULL (detected/verified); `size_bytes BIGINT UNSIGNED` NOT NULL; `checksum CHAR(64) NULL`; `created_at`, `updated_at` TIMESTAMP NOT NULL; `deleted_at TIMESTAMP NULL`. Never store file bytes in this row or expose `object_key` to unauthorized clients.

### `labels` and `task_labels`

`labels`: `id BIGINT UNSIGNED` PK; `project_id BIGINT UNSIGNED` FK → projects; `name VARCHAR(64)` NOT NULL; `color CHAR(7) NULL` (validated hex color); `created_by BIGINT UNSIGNED` FK → users; `created_at`, `updated_at` TIMESTAMP NOT NULL; UNIQUE (`project_id`,`name`).

`task_labels`: `task_id BIGINT UNSIGNED` FK → tasks; `label_id BIGINT UNSIGNED` FK → labels; `created_at TIMESTAMP` NOT NULL; composite PK (`task_id`,`label_id`). Ensure label and task belong to the same project.

### `notifications`

`notifications`: `id CHAR(36)` PK (UUID); `user_id BIGINT UNSIGNED` FK → users; `type VARCHAR(120)` NOT NULL; `data JSON` NOT NULL (allow-listed safe notification attributes/resource reference); `read_at TIMESTAMP NULL`; `created_at`, `updated_at` TIMESTAMP NOT NULL. Only recipient may list or update read state. A queue/outbox table is optional and depends on delivery architecture.

## Referential actions and constraints

- Use foreign keys and indexes for every relationship. Prefer `RESTRICT`/soft deletion for projects/tasks to preserve history; do not cascade-delete business records without an approved retention policy.
- Cascade delete only disposable pivots when a parent is intentionally removed and policy permits it.
- Enforce unique email, team slug, team membership, project membership, assignee pair, project label name, and task-label pair.
- Validate controlled strings (`system_role`, membership role, project status, task status, priority) in backend and, where supported consistently, database CHECK constraints.
- Use transactions for task + assignment/label updates and file metadata coordination.

## Index recommendations

| Index | Purpose |
|---|---|
| `users(email)` UNIQUE | Sign-in lookup and uniqueness |
| `team_members(team_id,user_id)` UNIQUE; `team_members(user_id,team_id)` | Membership and reverse lookup |
| `projects(team_id,status)` | Team project listing |
| `project_members(project_id,user_id)` UNIQUE; `project_members(user_id,project_id)` | Access checks and user project listing |
| `tasks(project_id,status,priority,due_at)` | Common project filters (validate query plans) |
| `tasks(created_by,created_at)` | Creator activity views |
| `task_assignees(task_id,user_id)` UNIQUE; `task_assignees(user_id,task_id)` | Assignment filters and access queries |
| `comments(task_id,created_at)` | Chronological task comments |
| `attachments(task_id,created_at)` | Task file listing |
| `labels(project_id,name)` UNIQUE; `task_labels(label_id,task_id)` | Label lookup/filtering |
| `notifications(user_id,read_at,created_at)` | Recipient inbox and unread count |

Do not add indexes blindly; inspect real query plans and write cost after implementation.

## Open schema decisions

Deadline `DATE` vs `TIMESTAMP`; soft-delete and retention behavior; team-wide vs explicit project membership; UUID vs numeric public IDs; notification payload/indexing strategy; avatar/file storage details; email collation/normalization; and audit history requirements.
