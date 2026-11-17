# Starter Test Cases

All cases are proposed and **not executed**. Add executable tests as the application is implemented. “Expected” behavior is subject to final decisions documented in requirements and roles.

| ID | Area | Scenario | Expected result |
|---|---|---|---|
| TC-01 | Auth | Sign in with valid active account | Session established; safe user profile returned |
| TC-02 | Auth | Invalid credentials | Generic `401`; no account enumeration |
| TC-03 | Auth | Protected request without session | `401`; no resource data |
| TC-04 | Authorization | Team Member requests unrelated project | Denied (`403` or concealed `404` by policy) |
| TC-05 | Authorization | Member submits Admin role in profile update | Role unchanged; request rejected or protected field ignored consistently |
| TC-06 | Teams | Add same user to a team twice | Unique constraint/validation prevents duplicate membership |
| TC-07 | Projects | Project Manager creates project outside authorized team | Denied; no record created |
| TC-08 | Tasks | Create task with valid required fields | `201`; task belongs to requested project |
| TC-09 | Tasks | Submit unknown status or priority | `422`; clear field errors; no mutation |
| TC-10 | Assignment | Assign inactive/non-member user | Rejected atomically; existing assignments remain unchanged |
| TC-11 | Assignment | Replace assignee set with eligible users | Exact set returned; no duplicates |
| TC-12 | Dates | Filter tasks around due date boundary | Results match approved UTC/date-only rule |
| TC-13 | Labels | Attach label from another project | Rejected; no cross-project association |
| TC-14 | Comments | User without task access requests comments | Denied without disclosure |
| TC-15 | Attachments | Upload disallowed/oversized file | Rejected before being accessible; safe error |
| TC-16 | Attachments | Authorized upload then unauthorized download | Authorized metadata/content works; unauthorized download denied |
| TC-17 | Attachments | Storage failure during upload | No orphan accessible metadata/object; failure logged safely |
| TC-18 | Dashboard | User requests summary with guessed project ID | No data outside authorized scope |
| TC-19 | Notifications | User attempts to mark another user's notification read | Denied; other user's record unchanged |
| TC-20 | API | Send invalid pagination/sort field | Deterministic validation error; no unsafe SQL behavior |
| TC-21 | API | Cause unexpected server exception | Generic `500`, correlation ID if available; no stack trace in response |
| TC-22 | Accessibility | Complete task flow using keyboard only | All controls operable with visible focus and understandable labels |
| TC-23 | Reliability | Retry task creation or notification processing | No unintended duplicate side effects under adopted idempotency policy |
| TC-24 | Performance | Load representative paginated task list/dashboard | Meets approved latency and resource targets |

For each test, record environment, build/commit, test data, actual result, evidence, and pass/fail. Never mark a case passed before execution.
