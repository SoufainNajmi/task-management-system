# Git Workflow

## Repository status

The inspected repository contains Git metadata and a minimal ignore file, but no source branches, remotes, CI configuration, or documented team policy were verified. This is a proposed GitHub workflow.

## Branching and commits

- Protect the default branch; require pull requests and passing checks before merge.
- Use short-lived branches such as `feature/<issue>-task-filters`, `fix/<issue>-session-check`, and `docs/<issue>-api-contract`.
- Keep commits focused and describe the intent in imperative language; include issue references where available.
- Do not commit `.env` files, secrets, generated dependency directories, build outputs, user uploads, or database dumps.

## Pull requests

A pull request should include:

- Problem and solution summary, linked issue/story, and acceptance criteria.
- Test commands/results and authorization cases checked.
- UI screenshots or API contract examples where relevant.
- Data migration, deployment, compatibility, and rollback notes.
- Documentation updates and known risks/open decisions.

At least one qualified review is recommended; security-sensitive authorization, authentication, and upload changes should receive focused review. The exact branch protection policy is an open team decision.

## Releases and tags

Use reviewed, immutable release tags (for example semantic versions) only after versioning policy is agreed. Record release notes, configuration changes, migration order, verification checks, and rollback/forward-fix plan. Never force-push shared protected branches or rewrite published release history.
