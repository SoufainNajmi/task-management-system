# Functional Requirements

## Status convention

All requirements below are **proposed** because no application source or executable system was present during inspection. IDs provide traceability; acceptance tests should be added before implementation.

## Authentication and authorization

| ID | Requirement |
|---|---|
| FR-01 | A user can sign in and sign out using a secure authentication mechanism selected for the separated React/Laravel deployment. |
| FR-02 | The system must enforce role and resource-level permissions on the server for every protected operation. Hiding UI controls is not authorization. |
| FR-03 | Unauthenticated requests to protected resources receive an authentication error; unauthorized access to a known resource is denied without exposing private data. |

## Users and teams

| ID | Requirement |
|---|---|
| FR-04 | A user can view and update permitted profile fields. Account identifiers and role assignments are protected from self-escalation. |
| FR-05 | An Admin can create/manage teams and membership. A Project Manager can manage projects and project membership within authorized teams. |
| FR-06 | Team membership controls eligibility to access team projects; removing membership must revoke access to associated private resources. |

## Projects and tasks

| ID | Requirement |
|---|---|
| FR-07 | Authorized users can create, view, update, and archive projects within teams. |
| FR-08 | Authorized users can create, view, update, and archive tasks belonging to a project. |
| FR-09 | A task can have one or more eligible assignees; assignment changes must be authorized and auditable through normal activity records where required. |
| FR-10 | Each task has a defined status and priority from centrally controlled allowed values; clients cannot submit arbitrary values. |
| FR-11 | A task can have an optional due date and list/filter views can use status, priority, assignee, label, and due-date criteria. |

## Collaboration and files

| ID | Requirement |
|---|---|
| FR-12 | Eligible project users can add and read task comments; editing/deletion rules are role- and ownership-aware. |
| FR-13 | Authorized users can create project labels and associate labels with tasks. |
| FR-14 | Eligible users can upload, list, download, and remove task attachments subject to size/type policy and resource authorization. Attachment bytes are not served from a public path. |

## Dashboard and notifications

| ID | Requirement |
|---|---|
| FR-15 | The dashboard presents counts and task summaries scoped to the signed-in user's permissions and selected context. |
| FR-16 | The system records in-app notifications for configured events, including assignment and relevant task updates; users can list and mark their own notifications as read. |
| FR-17 | Notification delivery is idempotent where practical and does not disclose project information to users without access. |

## Cross-cutting behavior

| ID | Requirement |
|---|---|
| FR-18 | List endpoints support documented pagination, filtering, and deterministic sorting. |
| FR-19 | Mutations validate input and return a consistent JSON response/error contract. |
| FR-20 | The API exposes only fields appropriate for the caller and resource; sensitive credentials, internal storage paths, and secrets are never serialized. |
| FR-21 | An Admin can review user accounts and update approved account state or system role; account provisioning, invitation, and password recovery must follow an approved onboarding policy. |

Detailed role access is in [user roles](../02-analysis/user-roles.md); API proposals are in [API endpoints](../04-api/api-endpoints.md).
