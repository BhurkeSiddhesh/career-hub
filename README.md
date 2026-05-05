# Career Hub — Siddhesh Bhurke

Personal career intelligence hub hosted on GitHub Pages. Contains:

- **Interview Prep** — 9 work projects with full pitches, STAR format, hard Q&A pre-prepared
- **Portfolio Roadmap** — 5 open-source GitHub projects with datasets, build guides, and career strategy
- **Meta Advice** — Cross-project patterns, positioning strategy, recurring question themes

## Setup (5 minutes)

### 1. Fork or create a new repo

```bash
# Option A: Upload files to a new repo
gh repo create career-hub --public
cd career-hub
git init
git add .
git commit -m "initial career hub"
git push origin main

# Option B: Use GitHub's web UI to create the repo and upload files
```

### 2. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Select `main` branch, `/ (root)` folder
4. Click **Save**

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

```
career-hub/
├── index.html          ← All content lives here
├── assets/
│   ├── style.css       ← All styles
│   └── main.js         ← Navigation + accordion logic
└── README.md
```

---

*Last updated: May 2026*
