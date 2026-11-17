# User Roles and Access Model

## Authorization model

Roles are **proposed**. The API must combine role checks with resource membership checks (role-based + resource-scoped authorization). A role alone does not grant access to every project. Deny by default and verify permissions on every request.

## Role definitions

| Role | Responsibilities | Permissions | Limitations |
|---|---|---|---|
| Admin | Configure and administer the service; manage users and teams; support access issues. | Proposed system-wide user/team administration; view/manage team and project records when needed for administration; assign roles; archive records. | Must not view passwords/secrets; privileged actions should be audited. Admin does not bypass safe file handling or privacy rules. |
| Project Manager | Plan a project, manage its members and work, and monitor delivery. | Within authorized team/project scope: create/update/archive projects; manage project membership; create/update tasks; assign eligible members; manage labels; moderate comments/files per policy; view project dashboard. | Cannot administer unrelated teams or grant system-wide Admin role. Must not assign users outside the eligible team/project. |
| Team Member | Complete assigned work and collaborate with project colleagues. | View accessible projects/tasks; update permitted task fields (including status); comment; upload/list/download own or permitted task attachments; view own dashboard/notifications. | Cannot manage users/teams or project membership; cannot change role/permissions; cannot access resources outside membership; cannot alter protected fields such as ownership or audit data. |

## Proposed permission matrix

Legend: **A** = all/system-wide; **S** = within authorized team/project scope; **M** = own records or assigned work; **R** = read access in scope; **—** = no permission by default.

| Capability | Admin | Project Manager | Team Member |
|---|---:|---:|---:|
| Manage users/roles | A | — | — |
| Manage teams/membership | A | S (membership only if explicitly granted) | — |
| Create/manage projects | A | S | — |
| View project/task | A | S | R |
| Create task | A | S | S (open decision; proposed: only if project allows) |
| Edit task metadata/assignment | A | S | M (limited fields) |
| Change task status | A | S | M |
| Manage labels | A | S | — |
| Add comment | A | S | S |
| Delete/moderate comments/files | A | S (scope and policy) | M (own content, subject to retention) |
| View dashboard | A | S | M/R (own work and authorized summaries) |

## Enforcement and identity lifecycle

- Resolve the authenticated user from the server-side session; never accept a user ID as proof of identity.
- Check role, active state, team membership, project membership, and parent-resource access on every operation.
- Prevent privilege escalation through profile, membership, assignment, or mass-assignment payloads.
- Membership and account deactivation should revoke access promptly; retention of historical attribution is preserved.
- Log sensitive administrative changes without recording secrets or unnecessary personal data.

## Decisions requiring approval

Confirm whether Team Members may create tasks, whether Project Managers can manage team membership or only project membership, comment/file deletion rules, and whether Admins are permitted to view all project content.
