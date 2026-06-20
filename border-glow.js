/* ============================================================
   HOST LEIGH — BorderGlow initializer (vanilla)
   Attaches pointer tracking to every `.border-glow-card` so plain
   HTML (the home page, decks, etc.) gets the gold edge glow with no
   React. New nodes are picked up automatically via MutationObserver.

   Auto-runs on load. Call window.initBorderGlow(root) to re-scan a
   subtree. Add `data-glow-animated` to a card for an intro sweep.
   ============================================================ */
(function () {
  function centerOf(el) {
    const r = el.getBoundingClientRect();
    return [r.width / 2, r.height / 2];
  }

  function attach(card) {
    if (card.__borderGlow) return;
    card.__borderGlow = true;

    card.addEventListener("pointermove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const [cx, cy] = centerOf(card);
      const dx = x - cx;
      const dy = y - cy;

      let kx = Infinity, ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

      let deg = 0;
      if (!(dx === 0 && dy === 0)) {
        deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (deg < 0) deg += 360;
      }

      card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", deg.toFixed(3) + "deg");
    });

    if (card.hasAttribute("data-glow-animated")) sweep(card);
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x) { return x * x * x; }

  function animateValue(o) {
    const start = o.start || 0, end = o.end == null ? 100 : o.end;
    const duration = o.duration || 1000, delay = o.delay || 0;
    const ease = o.ease || easeOutCubic;
    setTimeout(function () {
      const t0 = performance.now();
      (function tick() {
        const t = Math.min((performance.now() - t0) / duration, 1);
        o.onUpdate(start + (end - start) * ease(t));
        if (t < 1) requestAnimationFrame(tick);
        else if (o.onEnd) o.onEnd();
      })();
    }, delay);
  }

  function sweep(card) {
    const a0 = 110, a1 = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", a0 + "deg");
    const ang = v => card.style.setProperty("--cursor-angle", ((a1 - a0) * (v / 100) + a0) + "deg");
    animateValue({ duration: 500, onUpdate: v => card.style.setProperty("--edge-proximity", v) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: ang });
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: ang });
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty("--edge-proximity", v),
      onEnd: () => card.classList.remove("sweep-active") });
  }

  function initAll(root) {
    (root || document).querySelectorAll(".border-glow-card").forEach(attach);
  }
  window.initBorderGlow = initAll;

  function boot() {
    initAll();
    new MutationObserver(function (muts) {
      for (const m of muts) {
        for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.classList && n.classList.contains("border-glow-card")) attach(n);
          if (n.querySelectorAll) n.querySelectorAll(".border-glow-card").forEach(attach);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
