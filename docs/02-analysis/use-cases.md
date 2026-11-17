# Use Cases

## UC-01: Authenticate a user

**Actors:** User, React client, Laravel API. **Preconditions:** Account exists and is active. **Trigger:** User submits sign-in form.

1. Client submits credentials over HTTPS.
2. API validates credentials, rate limits attempts, and establishes the configured secure session.
3. API returns the authenticated user profile and role/context data permitted to the caller.
4. Client loads authorized views.

**Alternate/error paths:** Invalid credentials return a generic authentication error; inactive accounts are denied; validation/rate-limit errors follow the common error envelope. Session renewal and password reset policy are open decisions.

## UC-02: Create a project and task

**Actors:** Project Manager, team member (task-creation permission subject to approval). **Preconditions:** Actor is active and authorized in the team.

1. Actor creates a project with name and optional description.
2. API verifies team scope and creates the project.
3. Actor creates a task in the project with title and optional detail, priority, status, due date, labels, and assignees.
4. API validates controlled values and verifies each assignee is eligible.
5. API persists the task and associations transactionally; relevant notifications may be queued.

**Alternate/error paths:** Invalid team/project scope is denied; ineligible assignees or invalid values yield field-level validation errors; duplicate or retried requests should not produce unintended duplicate side effects.

## UC-03: Update and complete assigned work

**Actors:** Team Member, Project Manager. **Preconditions:** Actor can access the task; a member may update only permitted fields.

1. Actor opens task detail and changes an allowed field (for example status).
2. API re-checks membership and field-level permission.
3. API validates the new value and stores the change.
4. API returns the updated task; configured notifications are generated for relevant recipients.

**Alternate/error paths:** Stale edits may return a conflict if optimistic concurrency is adopted; inaccessible tasks are denied; invalid transitions may be rejected if a workflow policy is approved.

## UC-04: Collaborate with a comment or file

**Actors:** Project participant. **Preconditions:** Actor is authorized for the parent task.

1. Actor adds a comment or selects a file for upload.
2. API validates content/size/type policy, checks authorization, and persists the comment or private file object plus metadata.
3. API returns metadata; downloads are streamed only after a fresh authorization check.

**Alternate/error paths:** Oversized/disallowed files are rejected; storage errors do not leave orphaned metadata; a failed upload returns a safe error.

## UC-05: Review dashboard and notifications

**Actors:** Authenticated user. **Preconditions:** User has accessible work or notifications.

1. Client requests dashboard summaries and the user's notification page.
2. API aggregates only authorized data and paginates results.
3. User opens a notification; client may mark it read.
4. API permits state changes only for the notification recipient.

## Shared postconditions

Successful writes return the canonical persisted representation. Denied/failed requests do not partially mutate related records. Operational logs exclude credentials and sensitive payloads.
