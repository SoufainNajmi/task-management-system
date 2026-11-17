# API Response Formats

## Status

The following JSON shapes are proposed conventions. They are not produced by an implemented API in the inspected workspace. Finalize field names and pagination convention before client development.

## Success envelope

Proposed resource response:

```json
{
  "data": {
    "id": 123,
    "title": "Prepare release notes",
    "status": "in_progress",
    "priority": "high",
    "due_at": "2026-12-15T17:00:00Z"
  },
  "meta": {}
}
```

A list response includes pagination metadata:

```json
{
  "data": [],
  "meta": {
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 0,
      "last_page": 1
    }
  }
}
```

The API may omit an empty `meta` object if the contract is updated consistently. Relationship inclusion must be explicit or consistently documented; avoid unbounded nested expansion.

## Error envelope

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The submitted data is invalid.",
    "details": {
      "title": ["The title field is required."]
    },
    "request_id": "01J…"
  }
}
```

- `code`: stable machine-readable identifier.
- `message`: safe, user-presentable summary; do not include stack traces or SQL.
- `details`: optional field-level or actionable information; avoid disclosing protected data.
- `request_id`: optional correlation ID for support/log lookup, not an authorization credential.

## Suggested error codes

| HTTP | Code | Use |
|---:|---|---|
| 400 | `bad_request` | Malformed JSON or invalid query syntax |
| 401 | `unauthenticated` | Missing/invalid session |
| 403 | `forbidden` | Authenticated caller lacks permission when disclosure is safe |
| 404 | `not_found` | Missing or intentionally concealed resource |
| 409 | `conflict` | Unique constraint or concurrency conflict |
| 422 | `validation_failed` | Valid JSON but fields violate rules |
| 429 | `rate_limited` | Rate limit exceeded; optionally include `Retry-After` |
| 500 | `server_error` | Unexpected failure with generic message |

## Field and serialization rules

- Use consistent snake_case JSON keys in this draft; confirm before implementation.
- Return timestamps as UTC ISO 8601 strings; return date-only fields as `YYYY-MM-DD`.
- Do not serialize password hashes, session tokens, CSRF secrets, internal object keys, database internals, or hidden relationships.
- Avoid returning different error detail for inaccessible versus nonexistent private resources when that would enable enumeration.
- For `204 No Content`, return an empty body.
- File upload responses return metadata only; bytes are streamed through the separately authorized content endpoint.

## Status mapping

Common responses are `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, and `500`. See [API overview](api-overview.md) and individual endpoint tables for proposed usage.
