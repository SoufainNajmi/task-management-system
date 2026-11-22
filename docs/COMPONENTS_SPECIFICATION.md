# ManageTask — Reusable Components Specification

## Principles

Build a component for consistent reuse or a clear accessibility/interaction boundary, not merely to increase abstraction. Shared components belong under `src/components/`; domain-specific components remain under `src/features/<feature>/` until multiple features genuinely need them. Components should expose typed, focused props, use semantic HTML, and avoid embedding API calls or permission policy.

## Shared components

| Component | Responsibility | Main behavior / accessibility |
|---|---|---|
| `Sidebar` | Primary navigation for the authenticated application. | Responsive collapse/drawer; active route indication; keyboard-operable links; labels alongside icons; navigation visibility based on capabilities only for UX. |
| `Navbar` | Global top bar for current context and quick access. | Mobile menu trigger; optional breadcrumbs/search; notification shortcut; profile menu; clear focus and button names. |
| `Button` | Consistent action control with variants and sizes. | Native `<button>` semantics; disabled/loading state; focus ring; no clickable `div`; loading label announced to assistive technology. |
| `Input` | Labeled text/email/password and similar form control. | Explicit label and ID; hint/error association; invalid state; supports controlled/uncontrolled usage appropriate to React Hook Form. |
| `Modal` | Focus-contained dialog for focused workflows or confirmations. | Accessible dialog name; focus trap/restore; Escape behavior when safe; prevent background interaction; confirm destructive action wording. |
| `Dropdown` | Compact menu/select interaction. | Prefer native `<select>` for form choices; custom menu only when needed, with arrow/escape/enter behavior and correct ARIA semantics. |
| `TaskCard` | Reusable compact task summary. | Title, project context, status, priority, assignee, due date; status is not color-only; actions are permission-aware presentation, not enforcement. |
| `ProjectCard` | Reusable project summary for discovery and dashboard surfaces. | Project name, team, progress only when supported by data, due date/status, and an accessible link to details. |
| `StatCard` | Display one named dashboard metric. | Clear label, value, optional comparison only when defined; no decorative color-only meaning; skeleton state. |
| `KanbanColumn` | Render one workflow status and its tasks. | Heading/count; task list with stable keys; empty state; keyboard-accessible status movement independent of drag-and-drop. |
| `Loading` | Communicate pending state for a page, region, or action. | Use `aria-busy` where appropriate; avoid unnecessary animation; honor reduced-motion preferences; distinguish initial loading from refresh when useful. |
| `ErrorMessage` | Explain an actionable failure safely. | Plain-language message, optional retry action; never display stack traces or sensitive server details; associate field errors with form controls. |

## Supporting components to consider

- `PageHeader` for consistent page title, description, breadcrumbs, and actions.
- `StatusBadge` and `PriorityBadge` pairing text/icon with color.
- `EmptyState` for no results and first-use guidance.
- `Pagination` and `FilterBar` when list patterns repeat.
- `Avatar`/`AvatarGroup` for members and assignees.
- `ConfirmDialog` as a narrow composition of `Modal` for irreversible actions.

Add supporting components when repeated UI behavior exists; avoid a comprehensive component framework in the initial release.

## Feature components

Examples such as `TaskForm`, `TaskFilters`, `ProjectMembersPanel`, `NotificationItem`, and `CalendarEvent` should live with their feature. They can compose shared controls but may encode domain-specific labels and behavior. `TaskCard` or `ProjectCard` can be shared if their presentation is stable across multiple product areas.

## Component/API boundaries

- Shared UI components receive data and callbacks; they do not call services or own server cache.
- Feature hooks/services load and mutate data; pages coordinate route-level state.
- Form components may use React Hook Form and Zod but should report errors in accessible, field-specific form.
- Components may conditionally show actions based on capability data, while Laravel re-checks authorization on every operation.
- Avoid prop APIs with many boolean flags. Prefer small variants, composition, or a feature-specific wrapper.

## Baseline verification checklist

For each shared component, verify keyboard operation, visible focus, screen-reader label/name, contrast, responsive behavior, loading/error/disabled states, and no reliance on color alone. Test business interactions at the feature/page level rather than coupling generic component tests to API implementation.
