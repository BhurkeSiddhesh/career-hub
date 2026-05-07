# Career Hub - AGENTS.md (Project DNA)

## Tech Stack
- Frontend: Vanilla HTML, CSS, JavaScript
- Backend: Lightweight Node.js server (`server.js`) for local persistence
- Deployment: GitHub Pages (Static hosting via GitHub Actions)
- Database: Local JSON file (`project_logs.json`)

## Structural Rules
- `index.html` serves as the single-page application interface.
- `assets/main.js` handles navigation and fallback UI state.
- `server.js` must remain zero-dependency (using only built-in Node.js modules like `fs`, `http`, `path`) to maintain simplicity.

## Active Focus
- Evolving the Career Hub into an AI-updatable workspace.
- Utilizing a local logging system to record thoughts, questions, and insights per project.
- Using AI agents to automatically rewrite and improve project pitches in `index.html` based on `project_logs.json`.

## Change Log
- **2026-05-06**: Initialized Global Agent Constitution artifacts (`AGENTS.md`, `task.md`, `JULES_LOG.json`, `.agent/skills/`).
- **2026-05-06**: Created `server.js` and updated `main.js` to persist logs to the file system. Added `.github/workflows/deploy.yml` for CI.

## Learned Knowledge (Constraints)
- **Deployment Constraint**: GitHub Pages only supports static hosting. `server.js` cannot run in that environment. 
- **Graceful Degradation**: To prevent crashes on GitHub Pages, the UI must intercept `fetch` failures to `/api/logs` and automatically fall back to `localStorage`. Logs added on GitHub Pages will not persist to the repo.
- **Workflow Pattern**: To permanently save logs for AI ingestion, the user *must* run `node server.js` locally.
