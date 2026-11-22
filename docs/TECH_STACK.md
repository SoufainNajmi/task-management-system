# ManageTask — Frontend Technology Stack

## Status

These are recommendations for the future frontend, not installed or configured dependencies. Inspection found the `frontend/` folder empty and no existing frontend manifest or toolchain configuration. Do not install packages or scaffold until Phase 1 receives approval.

## Recommended stack

| Technology | Recommendation | Role and rationale |
|---|---|---|
| React | Use React functional components and hooks. | Composable UI model suitable for route-level pages, feature modules, and reusable controls. Keep domain rules and authorization on Laravel. |
| Vite | Use Vite as the development server and production bundler. | Fast local feedback and a small, straightforward setup for a client-rendered SPA. TypeScript is recommended for the application code and API contracts. |
| React Router DOM | Use for route composition, nested layouts, route parameters, and not-found behavior. | Provides clear page structure and authenticated navigation guards. A frontend guard is UX only; API access must still be authorized server-side. |
| Axios | Use a single configured Axios instance behind `src/api/`. | Centralizes API base URL, cookies/CSRF settings, request defaults, and transport errors. Feature services—not components—call it. |
| Tailwind CSS | Use utility classes with semantic CSS-variable tokens. | Supports consistent responsive layouts and fast iteration while design tokens preserve visual consistency. Avoid scattered arbitrary values as the system matures. |
| Lucide React | Use as the standard icon set. | Consistent, tree-shakeable icons. Add accessible labels for icon-only buttons; decorative icons should be hidden from assistive technology. |
| React Hook Form | Use for multi-field forms. | Reduces unnecessary form state wiring and provides field-level lifecycle/error patterns. Keep forms controlled by clear domain constraints, not widget complexity. |
| Zod | Use schemas for client-side form/input feedback and inferred form types. | Reuses validation shape where helpful and improves TypeScript integration. Client validation improves UX only; Laravel validation is authoritative. |

## Language recommendation

Use TypeScript with strict checks for new frontend source. It helps keep component props and Laravel response assumptions explicit. Keep API response types aligned with the agreed contract; do not claim a type guarantees a server field is present unless the response contract does.

## State and data fetching

Start with local React state and feature hooks for UI state and request lifecycle. Keep server state out of a global Context unless multiple unrelated consumers truly require it. The initial proposed stack does not require a separate query-cache dependency. Reassess caching, deduplication, retries, optimistic updates, and invalidation once workflows and API behavior are known; add a dedicated server-state library only if complexity warrants it.

## Laravel integration assumptions

The wider project documentation proposes a Laravel REST API under `/api/v1` and recommends Laravel Sanctum stateful session authentication for a first-party SPA. Confirm this with backend owners before implementation:

- Configure a public frontend API base URL via environment (not a secret).
- Align deployment origins, Sanctum stateful domains, credentialed CORS, secure HttpOnly cookie attributes, and CSRF bootstrap behavior.
- Avoid long-lived auth tokens in browser local storage. If a separate bearer-token client is later required, document and threat-model it independently.
- Normalize 401/403/404/422/429/5xx and network errors centrally; display safe, actionable messages.
- Make API permissions, validation, and business rules server-authoritative.

Endpoint and response assumptions are documented in the existing [API overview](04-api/api-overview.md), [endpoints](04-api/api-endpoints.md), and [response formats](04-api/api-response-formats.md). They are proposals until implemented and tested.

## Initial dependency boundary

The expected direct frontend runtime/development dependencies after approval are React, React DOM, Vite, React Router DOM, Axios, Tailwind CSS, Lucide React, React Hook Form, Zod, and TypeScript tooling. Exact versions, compatible Tailwind/Vite configuration, testing framework, lint/format tooling, and package manager should be selected and pinned during Phase 2. No package is installed in this phase.

## Testing and quality tooling (select in Phase 2)

Choose a component/unit test runner and DOM testing utilities, plus an end-to-end strategy appropriate to the eventual deployment. Configure linting and formatting consistently. These are setup decisions rather than Phase 1 dependencies; no tool installation is performed here.

## Risks and decisions

- **Auth mode:** Sanctum SPA cookies are preferred by the existing design proposal but require coordinated hosting and CSRF/CORS configuration.
- **API contract:** frontend types and error mapping depend on a settled JSON envelope, pagination, and validation format.
- **Dates/timezones:** agree whether due dates are date-only or timestamps before choosing display and filter behavior.
- **Registration:** public registration vs invitation is unresolved; keep the route in the information architecture but gate implementation on product/backend approval.
- **Package versions:** pin compatible versions during scaffold rather than relying on floating ranges.
