# UI/UX Guidelines

## Product principles

- Make ownership, project context, status, priority, and due date visible at a glance.
- Prefer simple, consistent workflows over feature density.
- Preserve user input on recoverable errors and explain how to resolve validation problems.
- Never imply access a user does not have; present empty, loading, error, and permission states distinctly.

## Proposed information architecture

1. **Authentication:** sign-in and account recovery (recovery flow is not yet approved).
2. **Application shell:** team/project navigation, global search (if approved), profile, notifications.
3. **Dashboard:** scoped work summaries, overdue/upcoming tasks, recently updated items.
4. **Projects:** project overview, task list, members, labels, archived state.
5. **Task detail:** description, status/priority/due date, assignees, comments, attachments, labels.
6. **Administration:** users/teams for Admin; project and member management for Project Managers.

## Interaction guidance

- Use consistent names and controlled status/priority values from the API contract.
- Offer task list and detail views with clear filter, sort, and pagination controls.
- Confirm destructive or hard-to-reverse actions; explain archive vs delete.
- Show dates in the user's timezone and indicate timezone where ambiguity matters.
- Use optimistic updates only where rollback and conflict behavior are well-defined.
- Notify users of successful saves and actionable failures without exposing server internals.

## Accessibility

Target WCAG 2.2 AA for primary flows. Use semantic headings/forms, programmatic labels, keyboard-operable controls, visible focus, sufficient contrast, non-color status cues, accessible validation summaries, and announced asynchronous updates. Test screen-reader and keyboard flows.

## Responsive behavior

Support agreed desktop/tablet/mobile breakpoints. On narrow screens, prioritize task title, status, assignee, and deadline; move secondary metadata into accessible detail panels rather than clipping controls.

## Design system and content

Select typography, spacing, colors, icon set, and component library before implementation. Define tokens for status/priority but pair color with text/icon. Use consistent terminology across UI, API, and requirements. Avoid fabricated metrics and display empty states with a clear next action.

## UX validation

Create wireframes for sign-in, project list, task list/detail, team/project management, dashboard, and notifications. Review with representative Admin, Project Manager, and Team Member users; document usability findings and accessibility checks before release.
