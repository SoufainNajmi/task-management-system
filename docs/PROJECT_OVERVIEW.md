# ManageTask — Project Overview

## Purpose and status

ManageTask is a proposed web application for organizing teams, projects, and tasks. This document set defines a frontend plan before implementation. At inspection time, `frontend/` and `backend/` were empty; no React source, Vite configuration, dependency manifest, or installed application configuration was present. The existing nested requirements/design/API documents describe the wider product and Laravel REST API as proposals. **No frontend code or dependencies have been added in Phase 1.**

The frontend choices below are recommendations, not claims about existing configuration. Confirm them before scaffolding. Existing project requirements and API proposals remain the source of truth for product scope, roles, and API behavior.

## Product goals

- Give users an understandable, permission-aware view of projects and their work.
- Make task owner, status, priority, and due date easy to scan and update.
- Support team collaboration through project membership, comments, labels, and notifications.
- Provide a responsive, accessible SaaS-style experience with clear loading, empty, and error states.
- Keep frontend presentation and interaction separate from Laravel-owned authorization and business rules.

## Users and access

The proposed roles are Admin, Project Manager, and Team Member; access is scoped to authorized teams/projects. The UI should reflect capabilities returned by the API, but the backend must enforce all permissions. The frontend is not a security boundary. Detailed role assumptions remain subject to the existing [user roles](02-analysis/user-roles.md) proposal and open decisions.

## Frontend baseline (proposed)

- React with Vite; TypeScript is recommended for safer component and API contracts.
- React Router DOM for route organization and protected route presentation.
- Axios behind a centralized API client for Laravel REST calls.
- Tailwind CSS for utility styling backed by shared design tokens.
- Lucide React for consistent icons.
- React Hook Form and Zod for form state and client-side schema feedback.
- Laravel Sanctum stateful SPA authentication is the recommended first-party browser approach, subject to backend/deployment confirmation. Prefer secure HttpOnly session cookies and CSRF protection over storing long-lived credentials in local storage.

See [technology stack](TECH_STACK.md) for rationale and trade-offs. These dependencies are not installed.

## Product surfaces

The proposed routes include Dashboard, Login, Register, Projects, Project Details, Tasks, Kanban Board, Calendar, Team Management, User Profile, Settings, and Notifications. Page purpose, suggested routes, primary components, access, and states are described in [pages specification](PAGES_SPECIFICATION.md).

## Architecture principle

Route-level pages assemble layouts and feature modules. Feature modules own domain-specific UI and hooks; shared components contain generic presentation and interaction. A single API client handles transport defaults and common errors; domain services map to Laravel resources; hooks coordinate data with UI. Auth state is kept in a small provider, while server authorization remains on the backend. The full tree and module relationships are in [frontend architecture](FRONTEND_ARCHITECTURE.md).

## Proposed folder and document locations

Application source will live under `frontend/src/`. This Phase 1 documentation is added at the top level of the existing `docs/` folder:

- [Frontend architecture](FRONTEND_ARCHITECTURE.md)
- [Pages specification](PAGES_SPECIFICATION.md)
- [Components specification](COMPONENTS_SPECIFICATION.md)
- [Design system](DESIGN_SYSTEM.md)
- [Technology stack](TECH_STACK.md)

No existing application files were edited or removed.

## Roadmap

1. **Phase 1 — Architecture and decisions:** approve the proposed stack, route map, roles, design tokens, authentication approach, and API assumptions. This is the current phase; stop here for approval.
2. **Phase 2 — Project foundation:** scaffold React + Vite, configure TypeScript, lint/format and Tailwind, add the app shell, route map, and design tokens.
3. **Phase 3 — API and identity foundation:** implement the API client, CSRF/session flow, authentication state, protected-route behavior, error mapping, and profile bootstrap against an agreed Laravel contract.
4. **Phase 4 — Core work management:** build projects, project details, task list/detail, filters, and task creation/editing with loading/empty/error states.
5. **Phase 5 — Workflow and collaboration:** add Kanban, calendar, team management, comments/labels if in scope, and notifications.
6. **Phase 6 — Quality and release readiness:** verify responsive layouts, accessibility, authorization-aware UX, integration behavior, tests, and production build/deployment settings.

The sequence is a proposal, not an implementation commitment. Backend/API dependencies and priorities should be confirmed before estimating.

## Scalability recommendations

- Keep feature modules cohesive and import boundaries explicit; avoid a generic abstraction until repeated behavior is proven.
- Keep API DTOs and UI view models distinguishable when transformations become necessary.
- Use pagination and server-side filtering for growing task/project collections.
- Add a dedicated server-state cache only when caching, invalidation, or request coordination needs justify it.
- Add route-level lazy loading and bundle analysis as the application grows.
- Centralize permission-aware navigation and design tokens, while treating server authorization as authoritative.
- Track architectural decisions and revise this proposal alongside the API contract rather than allowing frontend assumptions to drift.

## Related existing product documentation

- [Requirements overview](01-requirements/project-overview.md)
- [Project scope](01-requirements/project-scope.md)
- [System architecture](03-design/system-architecture.md)
- [API overview](04-api/api-overview.md)
- [API endpoints](04-api/api-endpoints.md)
