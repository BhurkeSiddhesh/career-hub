# Career Hub - AGENTS.md (Project DNA)

## Tech Stack
- Frontend: Vanilla HTML, CSS, JavaScript (with MathJax for LaTeX rendering)
- Backend: Lightweight Node.js server (`server.js`) for local persistence
- Deployment: GitHub Pages (Static hosting via GitHub Actions)
- Database: Local JSON file (`project_logs.json`)

## Structural Rules
- `index.html` serves as the single-page application interface.
- `assets/main.js` handles navigation and fallback UI state.
- `server.js` must remain zero-dependency (using only built-in Node.js modules like `fs`, `http`, `path`) to maintain simplicity.
- **LaTeX Standard**: Use LaTeX (via MathJax) for all mathematical formulas and equations to ensure professional, academic-grade formatting.
- **Mastery Standard (Ultra-Detailed Format)**: Technical insights must never be just "statements." Every Q&A Mastery Breakdown MUST follow this exact structure:
  1. **Breaking Down the Original Answer & Identifying Gaps**: Explicitly detail "What works" and "The Gap" in standard explanations.
  2. **The Comprehensive, Gap-Filled Version**: Provide "The Stakeholder Explanation" (plain English) and identify "The Biggest Misconception".
  3. **Defining Core Math/Hypotheses**: Explicitly define variables, formulas, or thresholds (e.g., Null Hypothesis, Alpha).
  4. **Scenarios (A & B)**: Provide concrete scenarios showing "The Math" and "The Conclusion" (e.g., Statistically Significant vs Not).
  5. **Project Tie-in**: Anchor the concept in a specific business context (e.g., MARS, Jewel-Osco, Brenntag) with exact metrics, practical vs statistical significance, or engineering bottlenecks.
- **Maniac Teacher Standard**: If any technical concept in the portfolio lacks depth, the agent must proactively expand it using project-specific logic and deep theory. Never settle for a summary; provide a deep-dive.
- **Self-Evolution Principle**: When updating information, prioritize augmentation over deletion. Maintain useful context while layering in new insights. Information should evolve cumulatively rather than being replaced, ensuring the hub acts as a long-term knowledge repository.

## Active Focus
- Evolving the Career Hub into an AI-updatable workspace.
- Utilizing a local logging system to record thoughts, questions, and insights per project.
- Using AI agents to automatically rewrite and improve project pitches in `index.html` based on `project_logs.json`.
- **Mathematical Rigor**: Retrofitting the Core Analytics Q&A with LaTeX formatting for all statistical concepts.

## Change Log
- **2026-05-11**: Enforced the 'Ultra-Detailed Format' constraint for all Q&A Mastery Breakdowns within `AGENTS.md` and `.agents/workflows/project-evolver.md` to ensure deep, scenario-driven mathematical and business logic in technical answers. (Antigravity)
- **2026-05-11**: Fixed a DOM structural bug in `index.html` where an extra `</div>` prematurely closed the `qa-stats` pane, causing subsequent statistics questions (like "t-test vs ANOVA") to improperly render globally across all Q&A tabs. (Antigravity)
- **2026-05-11**: Executed `project-evolver.md` workflow check. All logs in `project_logs.json` were already marked as incorporated. Verified that the systemic 'Mastery Breakdown' updates from the previous turn are correctly reflected in the site DNA. (Antigravity)
- **2026-05-10**: Executed `project-evolver.md` workflow. Synchronized `index.html` with raw insights from `project_logs.json` for Jewel-Osco, Brenntag, and Core Q&A sections. Marked logs as incorporated. Verified UI elements and fixed a layout bug affecting pages without logs; added 'split-layout' class to conditionally apply flex styles. (Gemini CLI)
- **2026-05-06**: Initialized Global Agent Constitution artifacts (`AGENTS.md`, `task.md`, `JULES_LOG.json`, `.agent/skills/`).
- **2026-05-06**: Created `server.js` and updated `main.js` to persist logs to the file system. Added `.github/workflows/deploy.yml` for CI.

## Learned Knowledge (Constraints)
- **Deployment Constraint**: GitHub Pages only supports static hosting. `server.js` cannot run in that environment. 
- **Graceful Degradation**: To prevent crashes on GitHub Pages, the UI must intercept `fetch` failures to `/api/logs` and automatically fall back to `localStorage`. Logs added on GitHub Pages will not persist to the repo.
- **Workflow Pattern**: To permanently save logs for AI ingestion, the user *must* run `node server.js` locally.
