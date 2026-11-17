# Project Overview

## Purpose

The Full-Stack Task Management System is a proposed web application for organizing teams, projects, and actionable work in one place. It will provide a browser-based React.js user interface backed by a Laravel REST API and a MySQL relational database.

## Current project status

At documentation time, the inspected workspace contains empty `backend/`, `frontend/`, and `docs/` directories and no application source, dependency manifests, migrations, or existing documentation. Therefore, every capability and endpoint in this documentation is a **proposal**, not a claim about implemented software. Validate the assumptions below before development.

## Goals

- Give users a shared, searchable view of project work and ownership.
- Support team-based collaboration, task assignment, comments, labels, and attachments.
- Make deadlines, priorities, and status visible through a dashboard and notifications.
- Establish a secure, maintainable separation between frontend and backend.
- Define testable requirements and contracts before implementation.

## Proposed technology baseline

| Area | Proposed choice | Notes |
|---|---|---|
| Frontend | React.js | Single-page application; build tooling and component library remain undecided. |
| Backend | Laravel / PHP | Version to be selected and pinned during project setup. |
| API | JSON over REST, `/api/v1` | Versioned contract; HTTPS outside local development. |
| Database | MySQL | Supported version and deployment topology remain undecided. |
| Source control | Git and GitHub | Branch protection and review policy to be agreed. |
| File storage | Private object storage or private disk | Provider, limits, and retention are open decisions. |

## Stakeholders and users

Primary users are administrators, project managers, and team members. Product ownership, support ownership, hosting operations, and any external integrations have not yet been assigned.

## Success measures (proposed)

- Users can create and find projects and tasks without conflicting ownership data.
- Permission checks prevent cross-team/project disclosure and unauthorized changes.
- Agreed API and user workflows pass automated tests before release.
- Operational targets for response time, availability, and recovery are defined before production.

## Related documents

See [project scope](project-scope.md), [functional requirements](functional-requirements.md), [system architecture](../03-design/system-architecture.md), and [unresolved decisions](../README.md#open-decisions).
