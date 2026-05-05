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

// Wire up nav items
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => showPage(item.dataset.page, item));
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

// ─── Notes autosave (localStorage) ──────────────────────────────────────────
document.querySelectorAll('.notes-area textarea').forEach(ta => {
  const key = `notes_${ta.dataset.key}`;
  ta.value = localStorage.getItem(key) || '';
  ta.addEventListener('input', () => localStorage.setItem(key, ta.value));
});

// ─── Init: show home ─────────────────────────────────────────────────────────
showPage('home');
