# API Overview

## Implementation status

The workspace inspection found no Laravel routes or backend source. This document and all endpoint paths are **proposed and not implemented**. Treat them as a draft contract pending product and engineering approval.

## Contract baseline

- Style: REST over HTTPS; JSON request/response bodies, except multipart file upload and streamed download.
- Base path: `/api/v1`.
- Encoding: UTF-8. Dates/timestamps use ISO 8601; timestamps are UTC.
- Authentication: proposed stateful Laravel session for a first-party React SPA (see [architecture](../03-design/system-architecture.md)); browser requests use CSRF protection and secure cookies. Credentials are not sent in query strings.
- Authorization: server-side role and team/project membership checks on every resource operation; deny by default.
- Resource IDs: numeric IDs in this draft; consider opaque UUIDs before contract freeze.
- Versioning: introduce breaking API changes under a new major path; additive compatible response fields may be introduced with care.

## Request conventions

- JSON mutation requests set `Content-Type: application/json` and `Accept: application/json`.
- List filters are query parameters; lists use `page` and `per_page`, default 20 and maximum 100 (proposed).
- Sort keys and filter values are allow-listed per endpoint. Default ordering is deterministic, usually newest first with ID tie-breaker.
- Use `PATCH` for partial updates. Use `PUT` only where the complete target association is replaced (for example task assignees).
- Optional idempotency keys for retry-prone creation operations remain an implementation decision.

## HTTP status baseline

| Status | Meaning |
|---|---|
| 200 | Successful read/update or action with response body |
| 201 | Resource created |
| 204 | Successful action with no body (for example delete/logout) |
| 400 | Malformed request or unsupported query value |
| 401 | Missing/invalid authentication |
| 403 | Authenticated but not permitted; inaccessible-resource policy may use 404 to avoid disclosure |
| 404 | Resource not found or intentionally concealed |
| 409 | Conflict, uniqueness violation, or stale-state conflict if concurrency checks are adopted |
| 422 | Validation failure |
| 429 | Rate limit exceeded |
| 500 | Unexpected server failure with safe generic details |

See [API endpoints](api-endpoints.md) and [response formats](api-response-formats.md). Every route must be labeled in implementation tracking as proposed, implemented, and tested; this documentation does not assert availability.
