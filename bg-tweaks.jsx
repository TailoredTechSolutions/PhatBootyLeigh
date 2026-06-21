/* ============================================================
   HOST LEIGH — Background Tweaks (live controls for the
   Lightfall / Galaxy hero). Mutates window.HL_BG in place so the
   shader picks up changes each frame (no rebuild). Persists to
   localStorage. Exposes window.BgTweaksPanel + window.HL_BG.
   ============================================================ */
(function () {
  const { useState } = React;
  const KEY = "hl_bg";

  const DEFAULTS = {
    speed: 0.6, density: 1, glow: 1, twinkle: 1,
    streakCount: 8, streakWidth: 1, streakLength: 1.3,
    zoom: 2, backgroundGlow: 0.85, opacity: 1,
    mouseInteraction: true,
    colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: "#1a1a2e",
  };

  const PALETTES = [
    { id: "gold",    name: "Gold",    bg: "#1a1a2e", colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"] },
    { id: "rose",    name: "Rose",    bg: "#1a1015", colors: ["#c94560", "#d96275", "#f2b0bc", "#e8ca6a"] },
    { id: "aurora",  name: "Aurora",  bg: "#0a1029", colors: ["#a6c8ff", "#5227ff", "#ff9ffc"] },
    { id: "emerald", name: "Emerald", bg: "#0a1f16", colors: ["#22c55e", "#4ade80", "#d4af37"] },
  ];

  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) return Object.assign({}, DEFAULTS, s); } catch (e) {}
    return Object.assign({}, DEFAULTS);
  }
  window.HL_BG = window.HL_BG || load();
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(window.HL_BG)); } catch (e) {} };

  const e = React.createElement;

  function Row({ label, value, min, max, step, fmt, onChange }) {
    return e("div", { style: { marginBottom: 12 } },
      e("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
        e("span", { style: { fontSize: 11, color: "var(--ob-200)", letterSpacing: "0.4px" } }, label),
        e("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gd-300)" } }, fmt ? fmt(value) : value),
      ),
      e("input", {
        type: "range", min, max, step, value,
        onChange: (ev) => onChange(parseFloat(ev.target.value)),
        style: { width: "100%", cursor: "pointer", accentColor: "var(--gd-400)" },
      }),
    );
  }

  function Toggle({ label, value, onChange }) {
    return e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
      e("span", { style: { fontSize: 11, color: "var(--ob-200)", letterSpacing: "0.4px" } }, label),
      e("button", {
        onClick: () => onChange(!value),
        style: {
          width: 38, height: 22, borderRadius: 11, border: "1px solid var(--border-soft)", cursor: "pointer",
          background: value ? "var(--gd-400)" : "var(--ob-700)", position: "relative", transition: "var(--tr-all)", padding: 0,
        },
      },
        e("span", { style: {
          position: "absolute", top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: "50%",
          background: value ? "var(--ob-950)" : "var(--ob-300)", transition: "var(--tr-all)",
        } }),
      ),
    );
  }

  function Label(t) {
    return e("div", { style: {
      fontFamily: "var(--font-mono-alt)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
      color: "var(--gd-300)", margin: "18px 0 10px", paddingBottom: 6, borderBottom: "1px solid var(--border-divider)",
    } }, t);
  }

  function BgTweaksPanel() {
    const [open, setOpen] = useState(false);
    const [, force] = useState(0);
    const s = window.HL_BG;
    const set = (k, v) => { window.HL_BG[k] = v; persist(); force((x) => x + 1); };
    const applyPalette = (p) => { window.HL_BG.colors = p.colors.slice(); window.HL_BG.backgroundColor = p.bg; persist(); force((x) => x + 1); };
    const reset = () => { Object.assign(window.HL_BG, JSON.parse(JSON.stringify(DEFAULTS))); persist(); force((x) => x + 1); };
    const activeId = (PALETTES.find((p) => p.colors.join() === (s.colors || []).join()) || {}).id;

    if (!open) {
      return e("button", {
        onClick: () => setOpen(true), title: "Background controls",
        style: {
          position: "fixed", left: 20, bottom: 20, zIndex: 200, width: 46, height: 46, borderRadius: "50%",
          background: "var(--surface-card)", border: "1px solid var(--border-strong)", color: "var(--gd-300)",
          cursor: "pointer", boxShadow: "var(--shadow-pop), 0 0 14px rgba(212,175,55,0.25)", fontSize: 19,
          display: "flex", alignItems: "center", justifyContent: "center",
        },
      }, "✦");
    }

    return e("div", {
      style: {
        position: "fixed", left: 20, bottom: 20, zIndex: 200, width: 284, maxHeight: "84vh", overflowY: "auto",
        background: "var(--glass-bg)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-deep)", padding: 18,
      },
    },
      e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        e("div", { style: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ob-50)" } }, "Background"),
        e("button", { onClick: () => setOpen(false), style: { background: "none", border: "none", color: "var(--ob-300)", fontSize: 20, cursor: "pointer", lineHeight: 1 } }, "×"),
      ),
      e("div", { style: { fontSize: 11, color: "var(--ob-300)", marginTop: 2 } }, "Live galaxy controls"),

      Label("Palette"),
      e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
        PALETTES.map((p) => e("button", {
          key: p.id, onClick: () => applyPalette(p),
          style: {
            display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", cursor: "pointer",
            borderRadius: "var(--r-sm)", background: activeId === p.id ? "rgba(212,175,55,0.12)" : "var(--ob-800)",
            border: "1px solid " + (activeId === p.id ? "var(--gd-400)" : "var(--border-hair)"),
          },
        },
          e("span", { style: { display: "flex", borderRadius: 3, overflow: "hidden", flexShrink: 0 } },
            p.colors.slice(0, 4).map((c, i) => e("span", { key: i, style: { width: 7, height: 16, background: c } })),
          ),
          e("span", { style: { fontSize: 11, color: activeId === p.id ? "var(--gd-300)" : "var(--ob-100)" } }, p.name),
        )),
      ),

      Label("Motion"),
      e(Row, { label: "Speed", value: s.speed, min: 0, max: 2.5, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("speed", v) }),
      e(Row, { label: "Streak count", value: s.streakCount, min: 1, max: 16, step: 1, onChange: (v) => set("streakCount", v) }),
      e(Row, { label: "Streak length", value: s.streakLength, min: 0.3, max: 3, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("streakLength", v) }),
      e(Row, { label: "Streak width", value: s.streakWidth, min: 0.3, max: 3, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("streakWidth", v) }),

      Label("Look"),
      e(Row, { label: "Density", value: s.density, min: 0.2, max: 3, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("density", v) }),
      e(Row, { label: "Glow", value: s.glow, min: 0.2, max: 2.5, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("glow", v) }),
      e(Row, { label: "Twinkle", value: s.twinkle, min: 0, max: 1, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("twinkle", v) }),
      e(Row, { label: "Background glow", value: s.backgroundGlow, min: 0, max: 2, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("backgroundGlow", v) }),
      e(Row, { label: "Zoom", value: s.zoom, min: 1, max: 5, step: 0.1, fmt: (v) => v.toFixed(1), onChange: (v) => set("zoom", v) }),
      e(Row, { label: "Opacity", value: s.opacity, min: 0.2, max: 1, step: 0.05, fmt: (v) => v.toFixed(2), onChange: (v) => set("opacity", v) }),

      Label("Interaction"),
      e(Toggle, { label: "Mouse interaction", value: s.mouseInteraction, onChange: (v) => set("mouseInteraction", v) }),

      e("button", {
        onClick: reset,
        style: {
          width: "100%", marginTop: 6, padding: "8px 0", cursor: "pointer", borderRadius: "var(--r-sm)",
          background: "transparent", border: "1px solid var(--border-soft)", color: "var(--ob-200)",
          fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.5px",
        },
      }, "Reset to default"),
    );
  }

  window.BgTweaksPanel = BgTweaksPanel;
})();
