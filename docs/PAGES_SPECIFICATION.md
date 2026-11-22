# ManageTask — Pages Specification

## Status

All pages below are a proposed frontend information architecture. They are not implemented, and access details must be aligned with the Laravel API's final role/membership policies. Pages should provide distinct loading, empty, error, and permission-denied experiences where applicable.

## Page inventory

| Page | Suggested route | Purpose | Main components / content |
|---|---|---|---|
| Dashboard | `/dashboard` | Give a user a permission-scoped overview of current work and activity. | Welcome/context header; `StatCard` summaries; assigned/upcoming/overdue task lists; recent projects/activity; quick actions; date/team/project filters if supported. Never fabricate metrics. |
| Login | `/login` | Authenticate a returning user and continue to a safe internal destination. | Email/password form; validation messages; password visibility toggle; submit/loading/error state; link to Register; recovery link only after backend flow is agreed. |
| Register | `/register` | Onboard a user if public registration is approved. | Name/email/password/confirmation form; Zod-backed feedback; terms/privacy links if applicable; submit/error state; link to Login. The existing API proposal does not yet settle public registration/invitation. |
| Projects | `/projects` | Find and manage projects visible to the current user. | Page heading; search/filter/sort; `ProjectCard` or accessible table/list; create-project action when permitted; pagination; empty and error states. |
| Project Details | `/projects/:projectId` | Show project context and its work in one place. | Project header and metadata; project navigation/tabs; task summary/list; members; labels; activity or comments where approved; edit/manage actions according to capability; not-found/forbidden states. |
| Tasks | `/tasks` | Search and manage tasks across accessible projects. | Task list/table; filter/sort controls for project, status, priority, assignee, and due date; `TaskCard`/row; pagination; create/edit task modal or detail panel; empty/error states. |
| Kanban Board | `/board` or `/projects/:projectId/board` | Visualize workflow by task status and support status updates. | Project/context selector; board filters; `KanbanColumn`; `TaskCard`; accessible move/status controls; loading and empty-column states. Drag-and-drop is optional and should not be the only way to change status. |
| Calendar | `/calendar` | View scheduled work by due date. | Month/week agenda selector; previous/next/today controls; task events with non-color status labels; filters; event/task detail link; empty state. Date and timezone rules must follow the API/product decision. |
| Team Management | `/team` | Review team membership and authorized team/project associations. | Team selector/summary; member list/table; role/status indicators; invite/add/remove actions only if APIs and onboarding policy exist; confirmation dialog; empty/error/permission states. Scope is role-dependent. |
| User Profile | `/profile` | View and edit the signed-in user's personal profile. | Avatar or initials; name/email/timezone fields; edit/save/cancel actions; validation and success/error feedback. Account identity and role fields are not self-editable unless explicitly allowed. |
| Settings | `/settings` | Configure personal preferences and approved account options. | Sections for theme, timezone/date display, notification preferences when supported, and security/session settings only if backend flow exists; save state. Keep system administration settings separate unless product approves. |
| Notifications | `/notifications` | Review personal in-app updates and mark items read. | Read/unread filters; notification list; event/time/context; mark-one/all-read actions where supported; pagination; empty/error states. Render only information authorized for the recipient. |

## Shared application shell

Authenticated pages use an application layout with a persistent or collapsible Sidebar, Navbar, page title/breadcrumb area, main content landmark, and responsive navigation behavior. Public Login/Register use a focused public layout without authenticated navigation. Page-specific feature modules should render within layout slots rather than implementing a second global shell.

## Access and navigation behavior

- Login and Register are public; registration remains contingent on an approved onboarding flow.
- All other listed pages require an authenticated session and resource access as applicable.
- Navigation visibility may reflect server-provided capabilities, but hidden UI is not a security control.
- If a session is unauthenticated, redirect to Login and retain only a validated internal return path.
- Handle inaccessible/removed project membership without leaking resource details; show a safe message or not-found state according to API policy.

## Page-state requirements

Every data-backed page should define:

1. Initial loading and background refresh feedback.
2. Useful empty state with a valid next action (only if user may act).
3. Recoverable error state with retry, preserving filters/form input where practical.
4. Permission-denied and not-found handling that does not expose private information.
5. Responsive layout and keyboard access for primary actions.

## Suggested implementation sequencing

1. Public Login/Register and application shell.
2. Dashboard and Projects/Project Details.
3. Tasks and task detail/edit flows.
4. Kanban and Calendar views over shared task data.
5. Team Management, Profile, Settings, and Notifications.

Sequence depends on API readiness and approved business decisions; no page implementation is part of Phase 1.
