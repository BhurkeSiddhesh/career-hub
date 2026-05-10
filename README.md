# Career Hub — Siddhesh Bhurke

Personal career intelligence hub. Contains:

- **Interview Prep** — 9 work projects with full pitches, STAR format, hard Q&A pre-prepared
- **Portfolio Roadmap** — 5 open-source GitHub projects with datasets, build guides, and career strategy
- **Project Logs** — A self-evolving system to track details, ideas, and questions for each project.

## How to Run Locally (Recommended)

To use the **Project Logs** feature fully (where logs are saved directly to `project_logs.json` in your repository), you must run the hub locally:

1. Open your terminal in the `career-hub` directory.
2. Run the local Node.js server:
   ```bash
   node server.js
   ```
3. Open your browser and go to `http://localhost:3000`.

Any logs you add or edit in the browser will now be saved permanently to your local repo. You can then commit and push `project_logs.json` to GitHub.

## 🤖 Auto-Updating Pitches (Agent Workflow)

Because your logs are saved in a structured JSON file, you can easily have an AI coding agent (like me!) automatically rewrite and improve your portfolio based on your recent notes. 

When you want to process your logs into the actual website, give your agent the following prompt:

> **"Read the `project_logs.json` file and review my recent notes and ideas. Cross-reference these logs with the corresponding project sections in `index.html`. Your task is to update the 'Pitch', 'Impact', and 'Q&A' blocks in `index.html` to intelligently incorporate my new insights. Ensure you maintain the exact HTML structure and CSS classes. Do not delete existing content unless my logs explicitly replace it. Once finished, provide a brief summary of the exact updates you made to each project."**

## GitHub Pages Deployment

A continuous integration (CI) workflow has been added (`.github/workflows/deploy.yml`) to automatically deploy this site to GitHub Pages whenever you push to the `main` branch. 

To enable it:
1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select `GitHub Actions`.

**⚠️ Note on GitHub Pages & Logging:** 
Will log entries work on GitHub Pages? **Partially.**
GitHub Pages only hosts static files, so the Node.js backend (`server.js`) will not run there. If you access your site via GitHub Pages, the logging system will gracefully fall back to using your browser's `localStorage`. You can still add, view, and edit logs in the browser, but **they will not be saved back to the repository**. To persist logs to the repo for your agents to use, you must run it locally.

Your site will be live at: `https://BhurkeSiddhesh.github.io/career-hub/`

(Takes ~2 minutes to deploy the first time)

### 3. Update your links

In `index.html`, search for `siddheshbhurke` and update:
- GitHub link in the sidebar footer
- LinkedIn link in the sidebar footer

---

## How to Update Content

All content lives in `index.html`. It's structured so each section is clearly delimited.

### Adding a new interview Q&A

Find the relevant project's `<div class="section-pane" id="[project]-qa">` block and add:

```html
<div class="qa-item">
  <div class="qa-q">Your new question here</div>
  <div class="qa-a">Your answer here. Use <strong>bold</strong> for emphasis.</div>
</div>
```

### Updating impact numbers

Find the `<div class="impact-grid">` block for the project and update the `impact-val` spans.

### Adding a new project

1. Add a nav item in the sidebar:
```html
<a class="nav-item" data-page="ip-newproject"><span class="dot"></span>New Project Name</a>
```

2. Add a page block (copy an existing `<div id="ip-[name]" class="page">` block and modify)

### Personal notes

Each project has a **My Notes** tab with a textarea that saves automatically to `localStorage` in your browser. Notes persist between sessions on the same device/browser.

---

## Keeping It Private (Optional)

If you want this private:
- Make the repo **private** (GitHub Pages works for private repos on paid plans)
- Or add a simple `htpasswd` via Cloudflare Access / Netlify

---

## File Structure

```text
career-hub/
├── index.html            ← All content lives here
├── server.js             ← Lightweight local server for saving logs
├── project_logs.json     ← Where your logs are permanently saved
├── .github/workflows/    ← GitHub Actions CI for Pages deployment
└── assets/
    ├── style.css         ← All styles
    └── main.js           ← Navigation, accordion, and log persistence logic
```
