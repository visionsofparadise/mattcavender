// ASCII scrollbar — fixed column of monospace chars on the right edge.
// Click anywhere on the track to jump; drag the thumb to scroll proportionally.
(function () {
  const TRACK = ':';
  const THUMB = '\u2588'; // █
  const CAP_TOP = '\u252c'; // ┬
  const CAP_BOT = '\u2534'; // ┴

  const col = document.createElement('pre');
  col.className = 'ascii-scrollbar';
  col.setAttribute('aria-hidden', 'true');
  document.body.appendChild(col);

  let dragging = false;

  function paint() {
    const doc = document.documentElement;
    const scrollH = doc.scrollHeight;
    const clientH = window.innerHeight;
    const scrollY = window.scrollY || doc.scrollTop || 0;
    const maxScroll = Math.max(1, scrollH - clientH);
    const ratio = scrollY / maxScroll;
    const lh = parseFloat(getComputedStyle(document.body).lineHeight) || 18;
    const rows = Math.max(8, Math.floor((clientH - 16) / lh));
    const thumbRows = Math.max(1, Math.round(rows * (clientH / scrollH)));
    const trackRows = rows - 2;
    const thumbStart = Math.round((trackRows - thumbRows) * ratio);
    const lines = [CAP_TOP];
    for (let i = 0; i < trackRows; i++) {
      lines.push(i >= thumbStart && i < thumbStart + thumbRows ? THUMB : TRACK);
    }
    lines.push(CAP_BOT);
    col.textContent = lines.join('\n');
  }

  let raf = null;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; paint(); });
  }

  function jumpToY(clientY) {
    const rect = col.getBoundingClientRect();
    const y = clientY - rect.top;
    const pct = Math.max(0, Math.min(1, y / rect.height));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * max, behavior: 'auto' });
  }

  col.addEventListener('mousedown', (e) => {
    dragging = true;
    jumpToY(e.clientY);
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (dragging) jumpToY(e.clientY);
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(schedule).observe(document.body);
  }

  paint();
})();
