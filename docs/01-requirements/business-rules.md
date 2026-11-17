# Business Rules

These are proposed baseline rules. Resolve open policy questions before implementation; apply every rule in the backend regardless of frontend behavior.

| ID | Rule |
|---|---|
| BR-01 | Every project belongs to exactly one team. A task belongs to exactly one project. |
| BR-02 | Only active users with authorized team/project access can view or mutate private resources. Membership removal revokes access immediately, subject to any explicitly approved retention/export process. |
| BR-03 | An Admin has system-wide administrative capability. A Project Manager's authority is limited to assigned/managed project scope; no privilege is implied across unrelated teams. |
| BR-04 | A Team Member can work on projects they are allowed to access and can update tasks/comments only within the permissions defined in the role matrix. |
| BR-05 | A project member and every task assignee must be an active member of the task's owning team; the precise project-membership constraint must be enforced transactionally. |
| BR-06 | Task status is one of `todo`, `in_progress`, `blocked`, or `done`; priority is one of `low`, `medium`, `high`, or `urgent`. Changes outside these values are rejected. Product owner may revise controlled vocabularies before schema/API freeze. |
| BR-07 | A due date is optional. When provided, it is stored consistently in UTC (or as a date-only value if product decides deadlines are date-only); timezone display is localized by the client. The date/time decision remains open. |
| BR-08 | Archiving a project prevents new work by default but preserves historical records. Hard deletion and cascading historical deletion are not the default. |
| BR-09 | Deleting a user must not silently erase task history. Deactivation/anonymization and retention behavior require an approved policy. |
| BR-10 | Comments and attachments are visible only to users authorized for the parent task/project. Attachment access must be checked on every download. |
| BR-11 | Attachment limits, allowed formats, malware scanning, retention, and storage provider must be configured before accepting uploads. Never trust a client-supplied MIME type alone. |
| BR-12 | Notifications belong to a recipient; users may only read/update their own notification state. A notification does not grant resource access. |
| BR-13 | Pagination defaults and maximum page size are enforced server-side. Results have stable ordering, with a unique tie-breaker. |
| BR-14 | All timestamps are stored in UTC; clients display them in the user's selected or browser timezone. Confirm whether date-only deadlines are an exception. |
| BR-15 | Public API errors do not reveal stack traces, SQL details, secrets, or existence of inaccessible private resources. |

Role permissions are detailed in [user roles](../02-analysis/user-roles.md); data ownership is documented in [database design](../03-design/database-design.md).
