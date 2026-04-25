// Client-side search filter for the index page.
// Hides .entry elements whose data-search blob doesn't include the query.
// Per-section "no entries match" placeholders are toggled in lockstep.
(function () {
  const search = document.querySelector('.search-input');
  if (!search) return;

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

  search.addEventListener('input', (e) => applyFilter(e.target.value));
})();
