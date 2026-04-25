// Keybinds + search filter + help overlay.
//   ?       toggle help overlay
//   /       focus search input
//   gg      scroll to top
//   G       scroll to bottom
//   j / k   scroll down / up
//   1..6    jump to section by number (anchors data-key="1".."6")
//   Esc     close overlay / clear+blur search
(function () {
  const HELP = `+==========================================================================+
|  KEYBINDS                                                                |
+==========================================================================+
|                                                                          |
|   ?         toggle this help                                             |
|   g g       jump to top                                                  |
|   G         jump to bottom                                               |
|   j / k     scroll down / up                                             |
|   1..6      jump to section by number                                    |
|   /         focus search (filter entries)                                |
|   ESC       close overlay / clear search                                 |
|                                                                          |
+==========================================================================+`;

  let overlay = null;

  function showHelp() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'help-overlay';
    const box = document.createElement('pre');
    box.className = 'help-box';
    box.textContent = HELP;
    const close = document.createElement('div');
    close.className = 'help-close';
    close.textContent = '[ click anywhere or press ? to close ]';
    box.appendChild(close);
    overlay.appendChild(box);
    overlay.addEventListener('click', hideHelp);
    document.body.appendChild(overlay);
  }
  function hideHelp() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
  }

  // ── search filter ────────────────────────────────────────────────────────
  const search = document.querySelector('.search-input');

  function applyFilter(q) {
    q = (q || '').trim().toLowerCase();
    const entries = document.querySelectorAll('.entry');
    const sectionCounts = new Map();
    entries.forEach((el) => {
      const blob = (el.dataset.search || el.textContent || '').toLowerCase();
      const match = !q || blob.includes(q);
      el.classList.toggle('is-hidden', !match);
      const sec = el.dataset.section;
      if (sec) {
        if (!sectionCounts.has(sec)) sectionCounts.set(sec, 0);
        if (match) sectionCounts.set(sec, sectionCounts.get(sec) + 1);
      }
    });
    document.querySelectorAll('.empty[data-section]').forEach((el) => {
      const sec = el.dataset.section;
      const visible = sectionCounts.get(sec) || 0;
      el.classList.toggle('is-hidden', visible !== 0);
      const tpl = el.dataset.tplEmpty || '';
      el.textContent = tpl.replace('{q}', q);
    });
  }

  if (search) {
    search.addEventListener('input', (e) => applyFilter(e.target.value));
  }

  // ── keybinds ─────────────────────────────────────────────────────────────
  let lastG = 0;
  document.addEventListener('keydown', (e) => {
    const inInput = document.activeElement && document.activeElement.tagName === 'INPUT';
    if (inInput) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        if (search) { search.value = ''; applyFilter(''); }
      }
      return;
    }
    if (e.key === '?') { e.preventDefault(); overlay ? hideHelp() : showHelp(); return; }
    if (e.key === 'Escape') { hideHelp(); return; }
    if (e.key === '/') { e.preventDefault(); search && search.focus(); return; }
    if (e.key === 'G') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); return; }
    if (e.key === 'g') {
      const now = performance.now();
      if (now - lastG < 600) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastG = 0;
      } else {
        lastG = now;
      }
      return;
    }
    if (e.key === 'j') { window.scrollBy({ top: 200, behavior: 'smooth' }); return; }
    if (e.key === 'k') { window.scrollBy({ top: -200, behavior: 'smooth' }); return; }
    if (/^[1-9]$/.test(e.key)) {
      const target = document.querySelector(`[data-key="${e.key}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
