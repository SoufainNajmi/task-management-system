# Environment Setup

## Current state

At inspection time, `backend/` and `frontend/` are empty and no Composer/npm manifests, Laravel application, React build configuration, migrations, or environment examples exist. Consequently, this guide documents prerequisites and a future setup sequence; it cannot provide verified runnable commands yet. No packages or dependencies have been installed.

## Prerequisites to select and pin

- Git and GitHub access.
- PHP version supported by the selected Laravel release, Composer, and required PHP extensions.
- Node.js LTS and the package manager chosen by the frontend project.
- MySQL version and a local development instance.
- Optional: local/private file storage emulator and queue service if adopted.
- Editor extensions and formatter/linter versions documented by the project.

## Setup sequence after application scaffolding

1. Clone the repository and create isolated backend/frontend environment files from committed examples (never commit secrets).
2. Install backend dependencies from the committed Composer lockfile; copy the Laravel environment example, configure app URL, database connection, session/CORS/CSRF settings, and private storage.
3. Create a least-privilege local MySQL database and user. Run migrations only after schema approval and migration files exist.
4. Install frontend dependencies from the committed lockfile; configure the API base URL and development proxy/CORS behavior.
5. Start backend, database, queue (if used), and frontend using project-defined scripts. Those scripts do not yet exist.
6. Run health checks, seed only non-sensitive development fixtures, and execute tests.

## Configuration inventory (future `.env.example`)

| Setting | Purpose | Secret? |
|---|---|---|
| `APP_ENV`, `APP_DEBUG`, `APP_URL` | Laravel environment and URL | No (environment-specific) |
| `DB_HOST`, `DB_PORT`, `DB_DATABASE` | Database connection location/name | No |
| `DB_USERNAME`, `DB_PASSWORD` | Database credentials | Yes |
| `SESSION_DOMAIN`, `SANCTUM_STATEFUL_DOMAINS`, `CORS_ALLOWED_ORIGINS` | SPA session and origin policy | No, but security-sensitive |
| `FILESYSTEM_DISK`, storage credentials | Attachment storage | Credentials are secret |
| `QUEUE_CONNECTION` | Queue driver if adopted | Depends on driver |
| Frontend API base URL | Backend URL for the SPA | Usually no |

Use a secret manager in deployed environments; never copy production data into local development without an approved sanitization process. Exact names may differ with selected versions/configuration.

## Troubleshooting and support

Document chosen version matrix, scripts, database bootstrap, seed behavior, local HTTPS/CSRF setup, and common errors once the project scaffold is implemented. Do not disable authorization, CSRF, or TLS checks as a workaround.
