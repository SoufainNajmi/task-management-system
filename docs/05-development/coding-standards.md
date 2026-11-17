# Coding Standards

These are proposed conventions. Adopt tooling and exact versions after the React/Laravel project skeleton exists; do not treat these as existing repository configuration.

## General

- Prefer clear names and small, cohesive modules; avoid hidden business rules in UI components or database controllers.
- Validate input at boundaries and enforce permissions in backend policies/services.
- Keep secrets out of source control and logs; use environment configuration and documented secret management.
- Add tests for behavior, authorization boundaries, failures, and edge cases—not only happy paths.
- Use UTC for stored timestamps and a consistent JSON contract.

## React / JavaScript

- Use functional components and hooks where appropriate; keep components focused on presentation and interaction.
- Centralize API access, error handling, authentication/CSRF behavior, and response types instead of scattering fetch logic.
- Avoid duplicating server state as independently mutable client state; define loading, empty, error, and success states.
- Use semantic HTML, labels, keyboard-accessible controls, and stable list keys.
- Select and configure ESLint/Prettier and a type strategy (JavaScript with checks or TypeScript) before development.

## Laravel / PHP

- Follow the selected Laravel version's conventions and PSR-12; use framework validation, policies/gates, API resources, and dependency injection.
- Keep controllers thin; put multi-step business rules in cohesive actions/services where justified.
- Use transactions for related writes; use explicit eager loading and pagination to avoid N+1 and unbounded queries.
- Use mass-assignment allow-lists; never trust client-supplied ownership or role fields.
- Return consistent API resources/errors and avoid exposing model internals.
- Add database constraints and indexes to support application-level invariants; validate generated SQL with tests.

## Database and API

- Use explicit foreign keys, uniqueness constraints, and deletion policy. Do not silently drop historical data.
- Document breaking contract changes; validate sort/filter identifiers against allow-lists.
- Keep endpoint behavior, request examples, error codes, and acceptance tests in sync.
- Store file metadata separately from bytes and authorize every download.

## Review checklist

Security/authorization, validation, privacy, consistency/transactionality, performance, accessibility, test coverage, documentation, and rollback impact.
