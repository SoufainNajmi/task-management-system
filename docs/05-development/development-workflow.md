# Development Workflow

## Status

The repository currently has no backend/frontend source, dependency manifests, test suites, CI configuration, or contributor instructions beyond this documentation. The workflow below is proposed and should be adapted to the selected toolchain.

## Feature lifecycle

1. Product owner refines a story, business rules, permissions, and measurable acceptance criteria.
2. Team checks API/schema impacts and updates affected documentation before coding.
3. Work is tracked in an issue with scope, test plan, and dependencies.
4. Developer creates a focused branch, implements the feature with tests, and updates API docs where behavior changes.
5. Run formatting, static checks, unit/integration tests, and security-sensitive access tests.
6. Open a pull request with requirements traceability, screenshots for UI changes, migration/deployment notes if applicable, and known limitations.
7. Reviewer verifies behavior, authorization, privacy, accessibility, and rollback implications.
8. Merge only after required checks and approvals pass; deploy using the approved release process.

## Definition of Ready (proposed)

- User story, role, scope, and acceptance criteria are clear.
- Business decisions and API/data changes are identified.
- Dependencies and security/privacy implications are understood.
- Test approach and expected UI states are specified.

## Definition of Done (proposed)

- Acceptance criteria pass and automated tests cover changed behavior.
- Server-side authorization and validation are tested for allowed and denied cases.
- Code is reviewed; lint/format/static checks pass.
- Documentation, API contracts, and operational notes are updated.
- No secrets or sensitive data are committed; accessibility basics are verified.
- Deployment and rollback considerations are recorded.

## Change coordination

A schema/API change requires coordinated updates to database design, endpoint/response docs, acceptance tests, and client behavior. Mark requirement IDs and route implementation status as proposed/implemented/tested based on evidence, not intent.
