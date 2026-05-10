// ─── Navigation ─────────────────────────────────────────────────────────────
function showPage(id, navEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  if (navEl) navEl.classList.add('active');
  else {
    const match = document.querySelector(`.nav-item[data-page="${id}"]`);
    if (match) match.classList.add('active');
  }
  window.scrollTo(0, 0);
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
}

// Wire up nav items and cards
document.querySelectorAll('[data-page]').forEach(item => {
  item.addEventListener('click', () => {
    const isNavItem = item.classList.contains('nav-item');
    showPage(item.dataset.page, isNavItem ? item : null);
  });
});

// ─── Accordion (project cards) ──────────────────────────────────────────────
document.querySelectorAll('.project-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.project-card');
    const isOpen = card.classList.contains('open');
    // Optionally close others: document.querySelectorAll('.project-card.open').forEach(c => c.classList.remove('open'));
    card.classList.toggle('open', !isOpen);
  });
});

// ─── Section tabs within project body ───────────────────────────────────────
document.querySelectorAll('.section-tab-bar').forEach(bar => {
  bar.querySelectorAll('.section-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const paneId = tab.dataset.pane;
      const body   = tab.closest('.project-body');
      bar.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
      body.querySelectorAll('.section-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      body.querySelector(`#${paneId}`)?.classList.add('active');
    });
  });
  // Activate first tab by default
  bar.querySelector('.section-tab')?.click();
});

// ─── Mobile menu ─────────────────────────────────────────────────────────────
document.getElementById('menu-toggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ─── Project Logs (Repo Persistence) ────────────────────────────────────────
let projectLogs = {};

// 1. Transform old notes-area into robust logs UI
document.querySelectorAll('.page').forEach(page => {
  if (page.id === 'home') return;
  const notesArea = page.querySelector('.notes-area');
  if (!notesArea) return;
  const ta = notesArea.querySelector('textarea');
  if (!ta) return;
  const key = ta.dataset.key;
  page.classList.add("split-layout");

  // Group existing content
  const pageContent = document.createElement('div');
  pageContent.className = 'page-content-left';
  
  while (page.firstChild) {
    pageContent.appendChild(page.firstChild);
  }
  page.appendChild(pageContent);

  // Side panel for logs
  const sidePanel = document.createElement('div');
  sidePanel.className = 'logs-area right-panel';
  sidePanel.dataset.key = key;
  sidePanel.innerHTML = `
    <span class="notes-label">Project Logs</span>
    <div class="new-log-entry">
      <textarea placeholder="Enter details, questions, or ideas for this project..."></textarea>
      <button class="save-log-btn">Save Log Entry</button>
    </div>
    <div class="logs-collapsible">
      <button class="logs-toggle-btn">View Previous Logs (<span>0</span>)</button>
      <div class="logs-list" style="display:none;"></div>
    </div>
  `;
  page.appendChild(sidePanel);

  // Toggle logic
  const toggleBtn = sidePanel.querySelector('.logs-toggle-btn');
  const logsList = sidePanel.querySelector('.logs-list');
  toggleBtn.addEventListener('click', () => {
    const isHidden = logsList.style.display === 'none';
    logsList.style.display = isHidden ? 'block' : 'none';
    const count = projectLogs[key] ? projectLogs[key].length : 0;
    toggleBtn.innerHTML = (isHidden ? 'Hide Previous Logs (<span>' : 'View Previous Logs (<span>') + count + '</span>)';
  });
});

// Remove 'My Notes' tabs and empty section panes
document.querySelectorAll('.section-tab').forEach(tab => {
  if (tab.innerText.trim() === 'My Notes') tab.remove();
});
document.querySelectorAll('.section-pane[id$="-notes"]').forEach(pane => pane.remove());

// 2. Fetch logs on load
fetch('/api/logs')
  .then(res => res.json())
  .then(data => {
    projectLogs = data;
    renderAllLogs();
  })
  .catch(err => {
    console.warn("Could not load logs from server. Running in fallback localStorage mode.");
    const saved = localStorage.getItem('project_logs');
    if (saved) projectLogs = JSON.parse(saved);
    renderAllLogs();
  });

function saveLogsToServer() {
  localStorage.setItem('project_logs', JSON.stringify(projectLogs));
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectLogs)
  }).catch(err => console.warn('Could not save to server. Saved locally.', err));
}

function renderAllLogs() {
  document.querySelectorAll('.logs-area').forEach(area => {
    const key = area.dataset.key;
    renderLogsForProject(key, area);
  });
}

function renderLogsForProject(key, area) {
  const list = area.querySelector('.logs-list');
  list.innerHTML = '';
  const logs = projectLogs[key] || [];
  
  const toggleSpan = area.querySelector('.logs-toggle-btn span');
  if (toggleSpan) toggleSpan.textContent = logs.length;
  
  logs.forEach((log, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'log-entry';
    entryDiv.innerHTML = `
      <div class="log-meta">
        <span class="log-date">${new Date(log.date).toLocaleString()}</span>
        <div>
          <button class="log-edit-btn" data-index="${index}">Edit</button>
          <button class="log-delete-btn" data-index="${index}">Delete</button>
        </div>
      </div>
      <div class="log-content">${log.content.replace(/\n/g, '<br>')}</div>
    `;
    list.appendChild(entryDiv);
  });

  // Edit logic
  list.querySelectorAll('.log-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      const content = logs[idx].content;
      const newContent = prompt('Edit your log entry:', content);
      if (newContent !== null && newContent.trim() !== '') {
        projectLogs[key][idx].content = newContent;
        projectLogs[key][idx].date = new Date().toISOString(); // update date on edit
        saveLogsToServer();
        renderLogsForProject(key, area);
      }
    });
  });

  // Delete logic
  list.querySelectorAll('.log-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      if (confirm('Are you sure you want to delete this log?')) {
        projectLogs[key].splice(idx, 1);
        saveLogsToServer();
        renderLogsForProject(key, area);
      }
    });
  });
}

// 3. Add new log
document.querySelectorAll('.save-log-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const area = e.target.closest('.logs-area');
    const key = area.dataset.key;
    const textarea = area.querySelector('textarea');
    const content = textarea.value.trim();
    
    if (content) {
      if (!projectLogs[key]) projectLogs[key] = [];
      projectLogs[key].push({
        date: new Date().toISOString(),
        content: content
      });
      textarea.value = '';
      saveLogsToServer();
      renderLogsForProject(key, area);
    }
  });
});

// ─── Init: show home ─────────────────────────────────────────────────────────
showPage('home');
