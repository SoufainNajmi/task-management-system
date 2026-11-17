# Non-Functional Requirements

## Status and targets

The targets below are proposed acceptance goals, not measured properties of an existing system. Product and operations owners must approve measurable service objectives before launch.

| ID | Quality attribute | Proposed requirement / verification |
|---|---|---|
| NFR-01 | Security | Use HTTPS in deployed environments, secure session/cookie settings, CSRF protection as applicable, server-side authorization, validated input, and managed secrets. Verify with code review and security tests. |
| NFR-02 | Privacy | Apply least privilege and data minimization; do not expose private project, user, comment, or file data across access boundaries. Define retention and deletion policy. |
| NFR-03 | Performance | Establish load profiles and p95 latency targets with stakeholders; initial candidate is p95 under 500 ms for common API reads at the agreed test load, excluding file transfer. |
| NFR-04 | Availability | Define a monthly availability objective and maintenance window before production. No availability level is currently committed. |
| NFR-05 | Reliability | Use database transactions for related writes; retry-safe notification processing; graceful handling of dependency failures. Test failure and recovery paths. |
| NFR-06 | Scalability | Paginate collection APIs, index common filters and foreign keys, and avoid unbounded dashboard queries. Validate against expected data volumes. |
| NFR-07 | Accessibility | Target WCAG 2.2 AA for primary flows; verify keyboard operation, focus visibility, semantic structure, and contrast. |
| NFR-08 | Usability | Keep task creation/editing understandable, show validation near the relevant field, and confirm destructive actions. Validate with representative users. |
| NFR-09 | Maintainability | Separate presentation, API, domain rules, and persistence concerns; use automated formatting, static checks, and tests selected during setup. |
| NFR-10 | Compatibility | Agree supported browsers and PHP/Node/MySQL versions before implementation; document and test the chosen matrix. |
| NFR-11 | Observability | Record structured operational logs and health signals without logging passwords, session identifiers, tokens, or sensitive payloads. Define alert ownership. |
| NFR-12 | Recovery | Define and test backup frequency, retention, recovery point objective (RPO), and recovery time objective (RTO) before production. |

## Operational measures to decide

- Expected concurrent users, requests per second, data volume, and attachment limits.
- p95/p99 latency thresholds and availability target.
- RPO/RTO, backup retention, and restore-test cadence.
- Supported browser/PHP/Node/MySQL versions.
- Accessibility verification ownership and supported languages/time zones.
