/* @ds-bundle: {"format":3,"namespace":"HostLeighDesignSystem_02e8ee","components":[{"name":"Avatar","sourcePath":"components/Avatar.jsx"},{"name":"Badge","sourcePath":"components/Badge.jsx"},{"name":"BorderGlow","sourcePath":"components/BorderGlow.jsx"},{"name":"Button","sourcePath":"components/Button.jsx"},{"name":"Card","sourcePath":"components/Card.jsx"},{"name":"GigCard","sourcePath":"components/GigCard.jsx"},{"name":"KpiCard","sourcePath":"components/KpiCard.jsx"},{"name":"ProgressBar","sourcePath":"components/ProgressBar.jsx"},{"name":"SectionTitle","sourcePath":"components/SectionTitle.jsx"}],"sourceHashes":{"border-glow.js":"7972577213b3","components/Avatar.jsx":"154b5a577478","components/Badge.jsx":"4e70703ae530","components/BorderGlow.jsx":"32773fb265c3","components/Button.jsx":"0e7925572a7e","components/Card.jsx":"255ff3004f53","components/GigCard.jsx":"f6730fe293d1","components/KpiCard.jsx":"db0a52eb0e4b","components/ProgressBar.jsx":"80c0ed4f9b0a","components/SectionTitle.jsx":"332bf9b90ccd","dashboard/app.jsx":"5c19ac9de623","dashboard/bg-tweaks.jsx":"9b7c7a8c5f1a","dashboard/borderglow.jsx":"53e645b1b5db","dashboard/data.js":"b1135e12eeda","dashboard/domegallery.jsx":"e0ae276d3a4e","dashboard/host-sa.jsx":"d781a47c5c7c","dashboard/host.jsx":"ed684b888e33","dashboard/lightfall.jsx":"14acbce8a723","dashboard/portals.jsx":"21dd2130b33c","dashboard/ui.jsx":"9154ced6fa4d","galaxy-bg.js":"faacc3fb6387"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HostLeighDesignSystem_02e8ee = window.HostLeighDesignSystem_02e8ee || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// border-glow.js
try { (() => {
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
      let kx = Infinity,
        ky = Infinity;
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
  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }
  function easeInCubic(x) {
    return x * x * x;
  }
  function animateValue(o) {
    const start = o.start || 0,
      end = o.end == null ? 100 : o.end;
    const duration = o.duration || 1000,
      delay = o.delay || 0;
    const ease = o.ease || easeOutCubic;
    setTimeout(function () {
      const t0 = performance.now();
      (function tick() {
        const t = Math.min((performance.now() - t0) / duration, 1);
        o.onUpdate(start + (end - start) * ease(t));
        if (t < 1) requestAnimationFrame(tick);else if (o.onEnd) o.onEnd();
      })();
    }, delay);
  }
  function sweep(card) {
    const a0 = 110,
      a1 = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", a0 + "deg");
    const ang = v => card.style.setProperty("--cursor-angle", (a1 - a0) * (v / 100) + a0 + "deg");
    animateValue({
      duration: 500,
      onUpdate: v => card.style.setProperty("--edge-proximity", v)
    });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: ang
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: ang
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: v => card.style.setProperty("--edge-proximity", v),
      onEnd: () => card.classList.remove("sweep-active")
    });
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
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  if (document.readyState !== "loading") boot();else document.addEventListener("DOMContentLoaded", boot);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "border-glow.js", error: String((e && e.message) || e) }); }

// components/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — Avatar
 * Circular avatar with gold ring. Falls back to serif initials.
 * sizes: sm 32 · md 40 · lg 56 · xl 80
 */
function Avatar({
  src,
  name = "",
  size = "md",
  ring = true,
  style,
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80
  };
  const d = dims[size] || dims.md;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    title: name,
    style: {
      width: `${d}px`,
      height: `${d}px`,
      borderRadius: "50%",
      flexShrink: 0,
      background: src ? `center/cover url(${src})` : "var(--ob-800)",
      border: ring ? "2px solid var(--gd-400)" : "1px solid var(--border-soft)",
      boxShadow: ring ? "var(--glow-gold)" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: `${Math.round(d * 0.4)}px`,
      color: "var(--gd-300)",
      overflow: "hidden",
      ...style
    }
  }, rest), src ? null : initials || "★");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — Badge / StatusPill
 * Small rounded label. Tones map to the semantic palette.
 * tone: gold | rose | success | warning | danger | neutral
 * dot:  render a leading status dot (for live/active states)
 */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  solid = false,
  style,
  ...rest
}) {
  const tones = {
    gold: {
      fg: "var(--gd-300)",
      bg: "rgba(212,175,55,0.12)",
      bd: "rgba(212,175,55,0.3)"
    },
    rose: {
      fg: "var(--rose-400)",
      bg: "rgba(201,69,96,0.12)",
      bd: "rgba(201,69,96,0.3)"
    },
    success: {
      fg: "var(--success-text)",
      bg: "rgba(34,197,94,0.12)",
      bd: "rgba(34,197,94,0.3)"
    },
    warning: {
      fg: "var(--warning-text)",
      bg: "rgba(245,158,11,0.12)",
      bd: "rgba(245,158,11,0.3)"
    },
    danger: {
      fg: "var(--danger-text)",
      bg: "rgba(239,68,68,0.12)",
      bd: "rgba(239,68,68,0.3)"
    },
    neutral: {
      fg: "var(--ob-200)",
      bg: "var(--ob-700)",
      bd: "var(--ob-400)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "3px 9px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-2xs)",
      fontWeight: 600,
      letterSpacing: "0.4px",
      lineHeight: 1,
      color: solid ? "var(--ob-950)" : t.fg,
      background: solid ? t.fg : t.bg,
      border: solid ? "none" : `1px solid ${t.bd}`,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: solid ? "var(--ob-950)" : t.fg,
      boxShadow: tone === "success" ? "var(--glow-success)" : "none"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge.jsx", error: String((e && e.message) || e) }); }

// components/BorderGlow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — BorderGlow
 * A directional gold edge-glow that tracks the pointer. Wrap any
 * clickable box that opens or expands. Relies on the global
 * `border-glow-card` CSS (shipped in styles.css), brand-tuned to gold;
 * override the look per-instance via props.
 *
 * Adapted from React Bits "BorderGlow" (JS + CSS variant).
 */
function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor,
  // "H S L" e.g. "46 65 62"; omit to keep brand gold
  backgroundColor,
  // omit to inherit --surface-card
  borderRadius,
  // px; omit to inherit --r-lg
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 28,
  fillOpacity = 0.5,
  animated = false,
  colors,
  // [c1,c2,c3] hex mesh-gradient override
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const handleMove = React.useCallback(e => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity,
      ky = Infinity;
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
  }, []);
  React.useEffect(() => {
    if (!animated || !ref.current) return;
    const card = ref.current;
    const a0 = 110,
      a1 = 465;
    const easeOut = x => 1 - Math.pow(1 - x, 3);
    const easeIn = x => x * x * x;
    const run = o => {
      const s = o.start || 0,
        e = o.end == null ? 100 : o.end;
      const d = o.duration || 1000,
        ease = o.ease || easeOut;
      setTimeout(() => {
        const t0 = performance.now();
        const tick = () => {
          const t = Math.min((performance.now() - t0) / d, 1);
          o.onUpdate(s + (e - s) * ease(t));
          if (t < 1) requestAnimationFrame(tick);else if (o.onEnd) o.onEnd();
        };
        tick();
      }, o.delay || 0);
    };
    const ang = v => card.style.setProperty("--cursor-angle", (a1 - a0) * (v / 100) + a0 + "deg");
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", a0 + "deg");
    run({
      duration: 500,
      onUpdate: v => card.style.setProperty("--edge-proximity", v)
    });
    run({
      ease: easeIn,
      duration: 1500,
      end: 50,
      onUpdate: ang
    });
    run({
      ease: easeOut,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: ang
    });
    run({
      ease: easeIn,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: v => card.style.setProperty("--edge-proximity", v),
      onEnd: () => card.classList.remove("sweep-active")
    });
  }, [animated]);

  // build per-instance overrides only for props that were supplied
  const vars = {
    "--edge-sensitivity": edgeSensitivity,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity
  };
  if (backgroundColor) vars["--card-bg"] = backgroundColor;
  if (borderRadius != null) vars["--border-radius"] = `${borderRadius}px`;
  if (glowColor) {
    const m = glowColor.match(/([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?/);
    if (m) {
      const base = `${m[1]}deg ${m[2]}% ${m[3]}%`;
      const ops = [100, 60, 50, 40, 30, 20, 10];
      const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
      ops.forEach((o, i) => {
        vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(o * glowIntensity, 100)}%)`;
      });
    }
  }
  if (colors && colors.length) {
    const POS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
    const KEYS = ["one", "two", "three", "four", "five", "six", "seven"];
    const MAP = [0, 1, 2, 0, 1, 2, 1];
    KEYS.forEach((k, i) => {
      const c = colors[Math.min(MAP[i], colors.length - 1)];
      vars[`--gradient-${k}`] = `radial-gradient(at ${POS[i]}, ${c} 0px, transparent 50%)`;
    });
    vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onPointerMove: handleMove,
    className: `border-glow-card ${className}`.trim(),
    style: {
      background: "var(--card-bg)",
      border: "1px solid var(--border-hair)",
      boxShadow: "var(--shadow-card)",
      ...vars,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "edge-light"
  }), /*#__PURE__*/React.createElement("div", {
    className: "border-glow-inner"
  }, children));
}
Object.assign(__ds_scope, { BorderGlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/BorderGlow.jsx", error: String((e && e.message) || e) }); }

// components/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — Button
 * Gold-forward buttons for a dark luxury UI.
 * Variants: primary (solid gold) · secondary (gold hairline) · ghost · danger
 * Sizes: sm | md
 */
function Button({
  children,
  variant = "secondary",
  size = "md",
  icon,
  disabled = false,
  fullWidth = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: "5px 10px",
      fontSize: "11px"
    },
    md: {
      padding: "7px 14px",
      fontSize: "12px"
    }
  };
  const palettes = {
    primary: {
      base: {
        background: "var(--gd-400)",
        border: "1px solid var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      },
      hover: {
        background: "var(--gd-300)",
        borderColor: "var(--gd-300)"
      }
    },
    secondary: {
      base: {
        background: "transparent",
        border: "1px solid var(--border-soft)",
        color: "var(--ob-100)",
        fontWeight: 500
      },
      hover: {
        background: "rgba(212,175,55,0.08)",
        borderColor: "var(--gd-400)",
        color: "var(--gd-300)"
      }
    },
    ghost: {
      base: {
        background: "transparent",
        border: "1px solid transparent",
        color: "var(--ob-200)",
        fontWeight: 500
      },
      hover: {
        background: "var(--ob-700)",
        color: "var(--ob-50)"
      }
    },
    danger: {
      base: {
        background: "transparent",
        border: "1px solid rgba(239,68,68,0.4)",
        color: "var(--danger-text)",
        fontWeight: 500
      },
      hover: {
        background: "rgba(239,68,68,0.12)",
        borderColor: "var(--danger)"
      }
    }
  };
  const p = palettes[variant] || palettes.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
      width: fullWidth ? "100%" : "auto",
      borderRadius: "var(--r-sm)",
      fontFamily: "var(--font-body)",
      letterSpacing: "0.3px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "var(--tr-all)",
      whiteSpace: "nowrap",
      ...sizes[size],
      ...p.base,
      ...(hover && !disabled ? p.hover : null),
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: "1.1em"
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button.jsx", error: String((e && e.message) || e) }); }

// components/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — Card
 * The base surface: obsidian fill, gold hairline border, deep shadow.
 * Optional title row with eyebrow + action slot. Set `hover` for lift.
 */
function Card({
  children,
  title,
  eyebrow,
  action,
  padding,
  hover = false,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const pad = padding != null ? padding : "var(--sp-8)";
  return /*#__PURE__*/React.createElement("section", _extends({
    onMouseEnter: () => hover && setH(true),
    onMouseLeave: () => hover && setH(false),
    style: {
      background: "var(--surface-card)",
      border: `1px solid ${h ? "var(--border-strong)" : "var(--border-hair)"}`,
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-card)",
      padding: pad,
      transition: "var(--tr-all)",
      transform: h ? "translateY(-2px)" : "none",
      ...style
    }
  }, rest), (title || eyebrow || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "var(--sp-7)"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-3xs)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: "var(--accent-text)",
      marginBottom: "4px"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h3)",
      fontWeight: 600,
      color: "var(--text-heading)",
      lineHeight: 1.2
    }
  }, title) : null), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, action) : null), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card.jsx", error: String((e && e.message) || e) }); }

// components/GigCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — GigCard
 * Signature booking card for an event/gig: title, client, date·venue,
 * fee, and a status pill. Clickable, so it carries the gold BorderGlow
 * edge effect by default (set glow={false} to disable). Lifts on hover.
 */
function GigCard({
  title,
  client,
  date,
  venue,
  fee,
  status = "confirmed",
  thumbnail,
  onClick,
  glow = true,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const cardRef = React.useRef(null);
  const handleMove = React.useCallback(e => {
    const card = cardRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    const cx = rect.width / 2,
      cy = rect.height / 2;
    const dx = x - cx,
      dy = y - cy;
    let kx = Infinity,
      ky = Infinity;
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
  }, [glow]);
  const statusMap = {
    confirmed: {
      fg: "var(--success-text)",
      bg: "rgba(34,197,94,0.12)",
      bd: "rgba(34,197,94,0.3)",
      label: "Confirmed"
    },
    pending: {
      fg: "var(--warning-text)",
      bg: "rgba(245,158,11,0.12)",
      bd: "rgba(245,158,11,0.3)",
      label: "Pending"
    },
    inquiry: {
      fg: "var(--accent-text)",
      bg: "rgba(212,175,55,0.12)",
      bd: "rgba(212,175,55,0.3)",
      label: "Inquiry"
    },
    completed: {
      fg: "var(--ob-200)",
      bg: "var(--ob-700)",
      bd: "var(--ob-400)",
      label: "Completed"
    }
  };
  const s = statusMap[status] || statusMap.confirmed;
  return /*#__PURE__*/React.createElement("article", _extends({
    ref: cardRef,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onPointerMove: handleMove,
    className: glow ? "border-glow-card" : undefined,
    style: {
      background: "var(--surface-card)",
      border: `1px solid ${h ? "var(--border-strong)" : "var(--border-hair)"}`,
      borderRadius: "var(--r-md)",
      boxShadow: h ? "var(--shadow-pop)" : "none",
      transform: h ? "translateY(-2px)" : "none",
      transition: "var(--tr-all)",
      cursor: onClick ? "pointer" : "default",
      "--glow-padding": "26px",
      ...style
    }
  }, rest), glow ? /*#__PURE__*/React.createElement("span", {
    className: "edge-light"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: glow ? "border-glow-inner" : undefined,
    style: {
      display: "flex",
      flexDirection: "row",
      gap: "14px",
      padding: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: "56px",
      height: "56px",
      borderRadius: "var(--r-sm)",
      overflow: "hidden",
      background: thumbnail ? `center/cover url(${thumbnail})` : "var(--ob-800)",
      border: "1px solid var(--border-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontSize: "22px",
      color: "var(--gd-300)"
    }
  }, thumbnail ? null : title ? title.charAt(0) : "★"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h3)",
      fontWeight: 600,
      color: "var(--text-heading)",
      lineHeight: 1.2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      padding: "3px 9px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-2xs)",
      fontWeight: 600,
      color: s.fg,
      background: s.bg,
      border: `1px solid ${s.bd}`
    }
  }, s.label)), client ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      marginTop: "3px"
    }
  }, client) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginTop: "10px"
    }
  }, date ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-faint)"
    }
  }, date) : null, venue ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-faint)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, venue) : null, fee ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-sm)",
      fontWeight: 600,
      color: "var(--gd-300)"
    }
  }, fee) : null))));
}
Object.assign(__ds_scope, { GigCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/GigCard.jsx", error: String((e && e.message) || e) }); }

// components/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — KpiCard
 * Headline metric card. Mono numeral, uppercase label, optional delta.
 * delta > 0 renders gold/up, < 0 renders rose/down.
 */
function KpiCard({
  label,
  value,
  prefix,
  suffix,
  delta,
  icon,
  accent = "gold",
  style,
  ...rest
}) {
  const accents = {
    gold: "var(--gd-300)",
    rose: "var(--rose-400)",
    success: "var(--success-text)",
    neutral: "var(--ob-50)"
  };
  const valColor = accents[accent] || accents.gold;
  const up = typeof delta === "number" && delta >= 0;
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-card)",
      padding: "var(--sp-8)",
      position: "relative",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: "var(--grad-gold)",
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-3xs)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontSize: "14px"
    }
  }, icon) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "6px"
    }
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "16px",
      color: valColor,
      opacity: 0.7
    }
  }, prefix) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-kpi)",
      fontWeight: 600,
      color: valColor,
      lineHeight: 1
    }
  }, value), suffix ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--text-faint)"
    }
  }, suffix) : null), typeof delta === "number" ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-xs)",
      fontWeight: 500,
      color: up ? "var(--success-text)" : "var(--rose-400)"
    }
  }, up ? "▲" : "▼", " ", Math.abs(delta), "%") : null);
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — ProgressBar
 * Slim gold progress meter. Pass value 0–100. Optional label + percent.
 */
function ProgressBar({
  value = 0,
  label,
  showPercent = false,
  tone = "gold",
  height = 6,
  style,
  ...rest
}) {
  const v = Math.max(0, Math.min(100, value));
  const fills = {
    gold: "var(--grad-gold)",
    rose: "linear-gradient(90deg, var(--rose-500), var(--rose-200))",
    success: "linear-gradient(90deg, var(--success), var(--success-text))"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), (label || showPercent) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "7px"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), showPercent ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-xs)",
      color: "var(--accent-text)",
      fontWeight: 500
    }
  }, Math.round(v), "%") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${height}px`,
      borderRadius: "var(--r-full)",
      background: "var(--ob-700)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v}%`,
      height: "100%",
      borderRadius: "var(--r-full)",
      background: fills[tone] || fills.gold,
      transition: "width var(--dur-slow) var(--ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Host Leigh — SectionTitle
 * Editorial section header: uppercase mono eyebrow over a serif title,
 * with an optional gold rule that extends to fill the row.
 */
function SectionTitle({
  eyebrow,
  title,
  rule = false,
  align = "left",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: align === "center" ? "center" : "flex-start",
      fontFamily: "var(--font-mono-alt)",
      fontSize: "var(--fs-3xs)",
      letterSpacing: "var(--tr-eyebrow)",
      textTransform: "uppercase",
      color: "var(--accent-text)",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "24px",
      height: "1px",
      background: "var(--grad-gold)"
    }
  }), eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--fs-h1)",
      fontWeight: 600,
      color: "var(--text-heading)",
      lineHeight: 1.15,
      letterSpacing: "0.2px"
    }
  }, title), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: "1px",
      background: "var(--border-soft)",
      marginTop: "14px"
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// dashboard/app.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — APP SHELL & ROUTING
   Role switcher (Host / Client / Supplier) demonstrates the
   firewall; sidebar + topbar; page routing; persistence.
   ============================================================ */
const {
  useState,
  useEffect
} = React;
const NAV = [{
  sec: "Command"
}, {
  id: "overview",
  label: "Overview",
  icon: "overview"
}, {
  id: "pipeline",
  label: "Gig Pipeline",
  icon: "kanban",
  badge: "11"
}, {
  id: "calendar",
  label: "Calendar",
  icon: "calendar"
}, {
  id: "meet",
  label: "Meet Leigh",
  icon: "user"
}, {
  sec: "Operations"
}, {
  id: "suppliers",
  label: "Supplier Firewall",
  icon: "suppliers"
}, {
  id: "escrow",
  label: "Escrow Tracker",
  icon: "escrow"
}, {
  id: "discount",
  label: "Discount Engine",
  icon: "discount"
}];
const ROLES = [{
  id: "host",
  label: "Host",
  icon: "shield",
  desc: "Full command center"
}, {
  id: "client",
  label: "Client",
  icon: "user",
  desc: "Booking & payment portal"
}, {
  id: "supplier",
  label: "Supplier",
  icon: "card",
  desc: "Isolated engagement view"
}];
function Sidebar({
  page,
  go
}) {
  const H = window.HL.HOST;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "var(--sidebar-w)",
      height: "100vh",
      background: "rgba(18,18,31,0.82)",
      backdropFilter: "var(--blur-glass)",
      WebkitBackdropFilter: "var(--blur-glass)",
      borderRight: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 20px 18px",
      borderBottom: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "1.5px solid var(--gd-400)",
      overflow: "hidden",
      marginBottom: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/leigh-portrait.jpeg",
    alt: "Leigh",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 15%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 15,
      fontWeight: 600,
      color: "var(--ob-50)",
      letterSpacing: "0.3px"
    }
  }, "Host Leigh"), /*#__PURE__*/React.createElement("div", {
    className: "hl-sparkle-gold",
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 9,
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginTop: 3
    }
  }, "Empire Dashboard")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "12px 0",
      overflowY: "auto"
    }
  }, NAV.map((n, i) => n.sec ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 9,
      color: "var(--ob-400)",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      padding: "20px 20px 6px",
      fontFamily: "var(--font-mono-alt)"
    }
  }, n.sec) : /*#__PURE__*/React.createElement("button", {
    key: n.id,
    onClick: () => go(n.id),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "10px 20px",
      cursor: "pointer",
      background: page === n.id ? "rgba(212,175,55,0.08)" : "transparent",
      color: page === n.id ? "var(--gd-300)" : "var(--ob-200)",
      border: "none",
      borderLeft: `2px solid ${page === n.id ? "var(--gd-400)" : "transparent"}`,
      fontFamily: "var(--font-body)",
      fontSize: 12.5,
      textAlign: "left",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      if (page !== n.id) {
        e.currentTarget.style.background = "rgba(212,175,55,0.05)";
        e.currentTarget.style.color = "var(--ob-50)";
      }
    },
    onMouseLeave: e => {
      if (page !== n.id) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--ob-200)";
      }
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 16
  }), n.label, n.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      background: "var(--rose-600)",
      color: "#fff",
      fontSize: 9,
      fontWeight: 600,
      padding: "1px 7px",
      borderRadius: 20
    }
  }, n.badge)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 20px",
      borderTop: "1px solid var(--border-hair)",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--success)",
      boxShadow: "0 0 6px var(--success)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 9.5,
      color: "var(--ob-400)",
      letterSpacing: "0.5px"
    }
  }, "BIR-registered \xB7 2026")));
}
function RoleSwitcher({
  role,
  setRole
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-md)"
    }
  }, ROLES.map(r => {
    const active = role === r.id;
    return /*#__PURE__*/React.createElement("button", {
      key: r.id,
      onClick: () => setRole(r.id),
      title: r.desc,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 12px",
        borderRadius: "var(--r-sm)",
        cursor: "pointer",
        border: "none",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        transition: "var(--tr-all)",
        background: active ? "var(--gd-400)" : "transparent",
        color: active ? "var(--ob-950)" : "var(--ob-200)",
        fontWeight: active ? 600 : 500
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.icon,
      size: 14
    }), r.label);
  }));
}
function Topbar({
  role,
  setRole,
  page
}) {
  const titles = {
    overview: "Overview",
    pipeline: "Gig Pipeline",
    calendar: "Calendar",
    suppliers: "Supplier Firewall",
    escrow: "Escrow Tracker",
    discount: "Discount Engine",
    meet: "Meet Leigh"
  };
  const crumb = {
    host: "Host · Command Center",
    client: "Viewing as Client",
    supplier: "Viewing as Supplier"
  }[role];
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifs, setNotifs] = React.useState([{
    tone: "danger",
    title: "Catering overdue — KIA Launch",
    meta: "Red Ribbon Catering · expected yesterday"
  }, {
    tone: "warning",
    title: "50% balance uncollected — PIEPCO",
    meta: "Due Jul 5 · ₱57,000"
  }, {
    tone: "success",
    title: "AV testing scheduled — KIA Makati",
    meta: "Today 3:00 PM · all suppliers briefed"
  }]);
  const clearNotifs = () => {
    setNotifs([]);
    setNotifOpen(false);
  };
  const dotColor = {
    danger: "var(--danger)",
    warning: "var(--warning)",
    success: "var(--success)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      background: "var(--glass-bg)",
      backdropFilter: "var(--blur-glass)",
      borderBottom: "1px solid var(--border-hair)",
      padding: "13px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--ob-50)",
      lineHeight: 1.1
    }
  }, role === "host" ? titles[page] || "Portfolio" : role === "client" ? "Client Portal" : "Supplier Portal"), /*#__PURE__*/React.createElement("div", {
    className: "hl-sparkle-pink",
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 24,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginTop: 3
    }
  }, crumb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(RoleSwitcher, {
    role: role,
    setRole: setRole
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotifOpen(o => !o),
    style: {
      background: notifOpen ? "rgba(212,175,55,0.08)" : "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-100)",
      width: 34,
      height: 34,
      borderRadius: "var(--r-sm)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 16
  }), notifs.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 6,
      right: 7,
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--rose-500)"
    }
  })), notifOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      width: 320,
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-deep)",
      zIndex: 200,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid var(--border-divider)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 15,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, "Notifications"), notifs.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--rose-400)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "1px"
    }
  }, notifs.length, " NEW")), notifs.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 16px",
      textAlign: "center",
      color: "var(--ob-300)",
      fontSize: 13
    }
  }, "All caught up \u2713"), notifs.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      padding: "13px 16px",
      borderBottom: i < notifs.length - 1 ? "1px solid var(--border-divider)" : "none",
      cursor: "pointer",
      transition: "background 0.15s"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(212,175,55,0.04)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: dotColor[n.tone],
      boxShadow: `0 0 6px ${dotColor[n.tone]}`,
      flexShrink: 0,
      marginTop: 5
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "var(--ob-50)",
      lineHeight: 1.3
    }
  }, n.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)",
      marginTop: 3
    }
  }, n.meta)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      textAlign: "center",
      borderTop: "1px solid var(--border-divider)"
    }
  }, notifs.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: clearNotifs,
    style: {
      background: "none",
      border: "none",
      fontSize: 11,
      color: "var(--gd-300)",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      letterSpacing: "0.3px"
    }
  }, "Mark all as read"), notifs.length === 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotifOpen(false),
    style: {
      background: "none",
      border: "none",
      fontSize: 11,
      color: "var(--ob-300)",
      cursor: "pointer",
      fontFamily: "var(--font-body)"
    }
  }, "Close")))), role === "host" && /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "plus",
    onClick: () => window.hlToast("New gig — opening intake form…")
  }, "New gig")));
}
function App() {
  const [role, setRole] = useState(() => localStorage.getItem("hl_role") || "host");
  const [page, setPage] = useState(() => localStorage.getItem("hl_page") || "overview");
  const [supGig, setSupGig] = useState("kia"); // firewall gig selector
  const [discGig, setDiscGig] = useState("kia"); // discount gig selector
  const [clientGig, setClientGig] = useState("kia");
  const [supplierId, setSupplierId] = useState("kia-av");
  const [drawer, setDrawer] = useState(null);
  useEffect(() => {
    localStorage.setItem("hl_role", role);
  }, [role]);
  useEffect(() => {
    localStorage.setItem("hl_page", page);
  }, [page]);
  const go = (pg, gid) => {
    setPage(pg);
    if (gid && pg === "suppliers") setSupGig(gid);
    if (gid && pg === "discount") setDiscGig(gid);
    window.scrollTo(0, 0);
  };
  const openGig = id => setDrawer(id);
  const openSupplier = id => {
    setSupplierId(id);
    setRole("supplier");
  };
  let body;
  if (role === "client") body = /*#__PURE__*/React.createElement(ClientPortal, {
    gigId: clientGig,
    setGigId: setClientGig
  });else if (role === "supplier") body = /*#__PURE__*/React.createElement(SupplierPortal, {
    supplierId: supplierId,
    setSupplierId: setSupplierId,
    onBack: () => setRole("host")
  });else {
    body = {
      overview: /*#__PURE__*/React.createElement(Overview, {
        go: go
      }),
      pipeline: /*#__PURE__*/React.createElement(Pipeline, {
        openGig: openGig
      }),
      calendar: /*#__PURE__*/React.createElement(CalendarView, {
        openGig: openGig
      }),
      meet: /*#__PURE__*/React.createElement(MeetLeigh, null),
      suppliers: /*#__PURE__*/React.createElement(Suppliers, {
        gigId: supGig,
        setGigId: setSupGig,
        openSupplier: openSupplier
      }),
      escrow: /*#__PURE__*/React.createElement(Escrow, null),
      discount: /*#__PURE__*/React.createElement(DiscountEngine, {
        gigId: discGig,
        setGigId: setDiscGig
      })
    }[page] || /*#__PURE__*/React.createElement(Overview, {
      go: go
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Lightfall, {
    store: window.HL_BG,
    colors: window.HL_BG && window.HL_BG.colors || ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: window.HL_BG && window.HL_BG.backgroundColor || "#1a1a2e",
    speed: 0.6,
    streakCount: 8,
    streakWidth: 1,
    streakLength: 1.3,
    glow: 1,
    density: 1,
    twinkle: 1,
    zoom: 2,
    backgroundGlow: 0.85,
    opacity: 0.72,
    mouseInteraction: false,
    mouseStrength: 0,
    mouseRadius: 0.6
  })), role === "host" && /*#__PURE__*/React.createElement(Sidebar, {
    page: page,
    go: go
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      marginLeft: role === "host" ? "var(--sidebar-w)" : 0,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      transition: "margin 0.3s var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    role: role,
    setRole: setRole,
    page: page
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px",
      flex: 1
    }
  }, body)), role === "host" && /*#__PURE__*/React.createElement(GigDrawer, {
    gigId: drawer,
    onClose: () => setDrawer(null),
    go: go
  }), /*#__PURE__*/React.createElement(ToastHost, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/app.jsx", error: String((e && e.message) || e) }); }

// dashboard/bg-tweaks.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — Background Tweaks (live controls for the
   Lightfall / Galaxy hero). Mutates window.HL_BG in place so the
   shader picks up changes each frame (no rebuild). Persists to
   localStorage. Exposes window.BgTweaksPanel + window.HL_BG.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const KEY = "hl_bg";
  const DEFAULTS = {
    speed: 0.6,
    density: 1,
    glow: 1,
    twinkle: 1,
    streakCount: 8,
    streakWidth: 1,
    streakLength: 1.3,
    zoom: 2,
    backgroundGlow: 0.85,
    opacity: 1,
    mouseInteraction: true,
    colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: "#1a1a2e"
  };
  const PALETTES = [{
    id: "gold",
    name: "Gold",
    bg: "#1a1a2e",
    colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"]
  }, {
    id: "rose",
    name: "Rose",
    bg: "#1a1015",
    colors: ["#c94560", "#d96275", "#f2b0bc", "#e8ca6a"]
  }, {
    id: "aurora",
    name: "Aurora",
    bg: "#0a1029",
    colors: ["#a6c8ff", "#5227ff", "#ff9ffc"]
  }, {
    id: "emerald",
    name: "Emerald",
    bg: "#0a1f16",
    colors: ["#22c55e", "#4ade80", "#d4af37"]
  }];
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s) return Object.assign({}, DEFAULTS, s);
    } catch (e) {}
    return Object.assign({}, DEFAULTS);
  }
  window.HL_BG = window.HL_BG || load();
  const persist = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(window.HL_BG));
    } catch (e) {}
  };
  const e = React.createElement;
  function Row({
    label,
    value,
    min,
    max,
    step,
    fmt,
    onChange
  }) {
    return e("div", {
      style: {
        marginBottom: 12
      }
    }, e("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5
      }
    }, e("span", {
      style: {
        fontSize: 11,
        color: "var(--ob-200)",
        letterSpacing: "0.4px"
      }
    }, label), e("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--gd-300)"
      }
    }, fmt ? fmt(value) : value)), e("input", {
      type: "range",
      min,
      max,
      step,
      value,
      onChange: ev => onChange(parseFloat(ev.target.value)),
      style: {
        width: "100%",
        cursor: "pointer",
        accentColor: "var(--gd-400)"
      }
    }));
  }
  function Toggle({
    label,
    value,
    onChange
  }) {
    return e("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }
    }, e("span", {
      style: {
        fontSize: 11,
        color: "var(--ob-200)",
        letterSpacing: "0.4px"
      }
    }, label), e("button", {
      onClick: () => onChange(!value),
      style: {
        width: 38,
        height: 22,
        borderRadius: 11,
        border: "1px solid var(--border-soft)",
        cursor: "pointer",
        background: value ? "var(--gd-400)" : "var(--ob-700)",
        position: "relative",
        transition: "var(--tr-all)",
        padding: 0
      }
    }, e("span", {
      style: {
        position: "absolute",
        top: 2,
        left: value ? 18 : 2,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: value ? "var(--ob-950)" : "var(--ob-300)",
        transition: "var(--tr-all)"
      }
    })));
  }
  function Label(t) {
    return e("div", {
      style: {
        fontFamily: "var(--font-mono-alt)",
        fontSize: 9,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--gd-300)",
        margin: "18px 0 10px",
        paddingBottom: 6,
        borderBottom: "1px solid var(--border-divider)"
      }
    }, t);
  }
  function BgTweaksPanel() {
    const [open, setOpen] = useState(false);
    const [, force] = useState(0);
    const s = window.HL_BG;
    const set = (k, v) => {
      window.HL_BG[k] = v;
      persist();
      force(x => x + 1);
    };
    const applyPalette = p => {
      window.HL_BG.colors = p.colors.slice();
      window.HL_BG.backgroundColor = p.bg;
      persist();
      force(x => x + 1);
    };
    const reset = () => {
      Object.assign(window.HL_BG, JSON.parse(JSON.stringify(DEFAULTS)));
      persist();
      force(x => x + 1);
    };
    const activeId = (PALETTES.find(p => p.colors.join() === (s.colors || []).join()) || {}).id;
    if (!open) {
      return e("button", {
        onClick: () => setOpen(true),
        title: "Background controls",
        style: {
          position: "fixed",
          left: 20,
          bottom: 20,
          zIndex: 200,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "var(--surface-card)",
          border: "1px solid var(--border-strong)",
          color: "var(--gd-300)",
          cursor: "pointer",
          boxShadow: "var(--shadow-pop), 0 0 14px rgba(212,175,55,0.25)",
          fontSize: 19,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, "✦");
    }
    return e("div", {
      style: {
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 200,
        width: 284,
        maxHeight: "84vh",
        overflowY: "auto",
        background: "var(--glass-bg)",
        backdropFilter: "var(--blur-glass)",
        WebkitBackdropFilter: "var(--blur-glass)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--r-lg)",
        boxShadow: "var(--shadow-deep)",
        padding: 18
      }
    }, e("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, e("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 18,
        fontWeight: 600,
        color: "var(--ob-50)"
      }
    }, "Background"), e("button", {
      onClick: () => setOpen(false),
      style: {
        background: "none",
        border: "none",
        color: "var(--ob-300)",
        fontSize: 20,
        cursor: "pointer",
        lineHeight: 1
      }
    }, "×")), e("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)",
        marginTop: 2
      }
    }, "Live galaxy controls"), Label("Palette"), e("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, PALETTES.map(p => e("button", {
      key: p.id,
      onClick: () => applyPalette(p),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 9px",
        cursor: "pointer",
        borderRadius: "var(--r-sm)",
        background: activeId === p.id ? "rgba(212,175,55,0.12)" : "var(--ob-800)",
        border: "1px solid " + (activeId === p.id ? "var(--gd-400)" : "var(--border-hair)")
      }
    }, e("span", {
      style: {
        display: "flex",
        borderRadius: 3,
        overflow: "hidden",
        flexShrink: 0
      }
    }, p.colors.slice(0, 4).map((c, i) => e("span", {
      key: i,
      style: {
        width: 7,
        height: 16,
        background: c
      }
    }))), e("span", {
      style: {
        fontSize: 11,
        color: activeId === p.id ? "var(--gd-300)" : "var(--ob-100)"
      }
    }, p.name)))), Label("Motion"), e(Row, {
      label: "Speed",
      value: s.speed,
      min: 0,
      max: 2.5,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("speed", v)
    }), e(Row, {
      label: "Streak count",
      value: s.streakCount,
      min: 1,
      max: 16,
      step: 1,
      onChange: v => set("streakCount", v)
    }), e(Row, {
      label: "Streak length",
      value: s.streakLength,
      min: 0.3,
      max: 3,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("streakLength", v)
    }), e(Row, {
      label: "Streak width",
      value: s.streakWidth,
      min: 0.3,
      max: 3,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("streakWidth", v)
    }), Label("Look"), e(Row, {
      label: "Density",
      value: s.density,
      min: 0.2,
      max: 3,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("density", v)
    }), e(Row, {
      label: "Glow",
      value: s.glow,
      min: 0.2,
      max: 2.5,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("glow", v)
    }), e(Row, {
      label: "Twinkle",
      value: s.twinkle,
      min: 0,
      max: 1,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("twinkle", v)
    }), e(Row, {
      label: "Background glow",
      value: s.backgroundGlow,
      min: 0,
      max: 2,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("backgroundGlow", v)
    }), e(Row, {
      label: "Zoom",
      value: s.zoom,
      min: 1,
      max: 5,
      step: 0.1,
      fmt: v => v.toFixed(1),
      onChange: v => set("zoom", v)
    }), e(Row, {
      label: "Opacity",
      value: s.opacity,
      min: 0.2,
      max: 1,
      step: 0.05,
      fmt: v => v.toFixed(2),
      onChange: v => set("opacity", v)
    }), Label("Interaction"), e(Toggle, {
      label: "Mouse interaction",
      value: s.mouseInteraction,
      onChange: v => set("mouseInteraction", v)
    }), e("button", {
      onClick: reset,
      style: {
        width: "100%",
        marginTop: 6,
        padding: "8px 0",
        cursor: "pointer",
        borderRadius: "var(--r-sm)",
        background: "transparent",
        border: "1px solid var(--border-soft)",
        color: "var(--ob-200)",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        letterSpacing: "0.5px"
      }
    }, "Reset to default"));
  }
  window.BgTweaksPanel = BgTweaksPanel;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/bg-tweaks.jsx", error: String((e && e.message) || e) }); }

// dashboard/borderglow.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — BorderGlow (React Bits)
   Adapted for Babel/UMD React (hooks via React.*), exposed as
   window.BorderGlow. Styles live in dashboard/reactbits.css.
   ============================================================ */
(function () {
  function parseHSL(hslStr) {
    const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return {
      h: 40,
      s: 80,
      l: 80
    };
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      l: parseFloat(match[3])
    };
  }
  function buildGlowVars(glowColor, intensity) {
    const {
      h,
      s,
      l
    } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }
  const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
  const GRADIENT_KEYS = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];
  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }
  const easeOutCubic = x => 1 - Math.pow(1 - x, 3);
  const easeInCubic = x => x * x * x;
  function animateValue({
    start = 0,
    end = 100,
    duration = 1000,
    delay = 0,
    ease = easeOutCubic,
    onUpdate,
    onEnd
  }) {
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(tick);else if (onEnd) onEnd();
    }
    const t0 = performance.now() + delay;
    setTimeout(() => requestAnimationFrame(tick), delay);
  }
  function BorderGlow(props) {
    const {
      children,
      className = "",
      edgeSensitivity = 30,
      glowColor = "40 80 80",
      backgroundColor = "#120F17",
      borderRadius = 28,
      glowRadius = 40,
      glowIntensity = 1.0,
      coneSpread = 25,
      animated = false,
      colors = ["#c084fc", "#f472b6", "#38bdf8"],
      fillOpacity = 0.5
    } = props;
    const cardRef = React.useRef(null);
    const getCenterOfElement = React.useCallback(el => {
      const {
        width,
        height
      } = el.getBoundingClientRect();
      return [width / 2, height / 2];
    }, []);
    const getEdgeProximity = React.useCallback((el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx,
        dy = y - cy;
      let kx = Infinity,
        ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    }, [getCenterOfElement]);
    const getCursorAngle = React.useCallback((el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx,
        dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    }, [getCenterOfElement]);
    const handlePointerMove = React.useCallback(e => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);
      card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    }, [getEdgeProximity, getCursorAngle]);
    React.useEffect(() => {
      if (!animated || !cardRef.current) return;
      const card = cardRef.current;
      const angleStart = 110,
        angleEnd = 465;
      card.classList.add("sweep-active");
      card.style.setProperty("--cursor-angle", `${angleStart}deg`);
      animateValue({
        duration: 500,
        onUpdate: v => card.style.setProperty("--edge-proximity", v)
      });
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: v => {
          card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
        }
      });
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: v => {
          card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
        }
      });
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: v => card.style.setProperty("--edge-proximity", v),
        onEnd: () => card.classList.remove("sweep-active")
      });
    }, [animated]);
    const glowVars = buildGlowVars(glowColor, glowIntensity);
    return /*#__PURE__*/React.createElement("div", {
      ref: cardRef,
      onPointerMove: handlePointerMove,
      className: `border-glow-card ${className}`,
      style: {
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors)
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "edge-light"
    }), /*#__PURE__*/React.createElement("div", {
      className: "border-glow-inner"
    }, children));
  }
  window.BorderGlow = BorderGlow;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/borderglow.jsx", error: String((e && e.message) || e) }); }

// dashboard/data.js
try { (() => {
/* ============================================================
   HOST LEIGH — DASHBOARD DATA
   Single source of truth. Gigs own suppliers + escrow + client.
   The firewall, escrow tracker and discount engine all derive
   from this object — nothing is duplicated.
   ============================================================ */
(function () {
  const peso = n => "₱" + Math.round(n).toLocaleString("en-PH");
  const pesoK = n => n >= 1000 ? "₱" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K" : peso(n);

  // ── HOST IDENTITY ──
  const HOST = {
    name: "Leigh Estella",
    handle: "@yourhostleigh",
    monogram: "LE",
    role: "Corporate Event Host",
    years: 14,
    email: "work.leighestella@gmail.com",
    followers: "8.2K"
  };

  // Helper to build a supplier record
  const sup = o => ({
    eta: "T-3h",
    paidPct: 0,
    // % of supplier cost already released
    ...o
  });

  // ── GIGS ──  (each owns its suppliers + client + escrow)
  const GIGS = [{
    id: "kia",
    stage: "confirmed",
    client: "KIA Philippines",
    clientContact: "Marketing Office · Ms. Reyes",
    event: "Year-End Product Launch",
    type: "Product Launch",
    date: "Jul 12, 2025",
    time: "6:00 PM",
    venue: "Makati Shangri-La · Grand Ballroom",
    pax: 300,
    hostingFee: 45000,
    markupPct: 32,
    clientPaidPct: 50,
    // client has paid 50% of contract
    suppliers: [sup({
      id: "kia-av",
      name: "Makati Shangri-La AV",
      cat: "AV",
      scope: "Lights · Sound · LED Wall",
      contact: "0917 123 4567",
      floor: 28000,
      quote: 34000,
      status: "confirmed",
      eta: "T-3h",
      cue: "Load-in 2:00 PM",
      paidPct: 50
    }), sup({
      id: "kia-cat",
      name: "Red Ribbon Catering",
      cat: "Catering",
      scope: "Cocktails + Plated Dinner · 300pax",
      contact: "0918 987 6543",
      floor: 52000,
      quote: 60000,
      status: "late",
      eta: "T-3h",
      cue: "Setup 2:30 PM",
      paidPct: 30
    }), sup({
      id: "kia-dec",
      name: "Ace Flores Events",
      cat: "Décor",
      scope: "Floral + Stage Styling",
      contact: "0920 112 2334",
      floor: 18000,
      quote: 22000,
      status: "confirmed",
      eta: "T-4h",
      cue: "Setup 1:00 PM",
      paidPct: 50
    }), sup({
      id: "kia-med",
      name: "Pixel Perfect PH",
      cat: "Media",
      scope: "Photo + Video Coverage",
      contact: "0915 566 7788",
      floor: 14000,
      quote: 17000,
      status: "pending",
      eta: "T-2h",
      cue: "Call-time 4:00 PM",
      paidPct: 0
    }), sup({
      id: "kia-log",
      name: "Metro Parking Solutions",
      cat: "Logistics",
      scope: "VIP Valet + Guest Parking",
      contact: "0933 344 5566",
      floor: 6000,
      quote: 8000,
      status: "tbd",
      eta: "T-2h",
      cue: "On-site 4:30 PM",
      paidPct: 0
    })]
  }, {
    id: "piepco",
    stage: "confirmed",
    client: "PIEPCO Foundation",
    clientContact: "HR · Mr. Santos",
    event: "2nd Regional Convention",
    type: "Convention",
    date: "Jul 19, 2025",
    time: "9:00 AM",
    venue: "SMX Convention Center · Hall 3",
    pax: 450,
    hostingFee: 38000,
    markupPct: 30,
    clientPaidPct: 0,
    // OVERDUE
    suppliers: [sup({
      id: "pp-av",
      name: "Strong Media Corp",
      cat: "AV",
      scope: "Full Stage + Sound",
      contact: "0917 444 1212",
      floor: 60000,
      quote: 72000,
      status: "confirmed",
      cue: "Load-in 6:00 AM",
      paidPct: 30
    }), sup({
      id: "pp-cat",
      name: "Hizon's Catering",
      cat: "Catering",
      scope: "AM Snack + Buffet Lunch",
      contact: "0918 222 3344",
      floor: 80000,
      quote: 92000,
      status: "confirmed",
      cue: "Setup 6:30 AM",
      paidPct: 30
    }), sup({
      id: "pp-dec",
      name: "Glisten Concepts",
      cat: "Décor",
      scope: "Stage + Registration Styling",
      contact: "0920 555 6677",
      floor: 22000,
      quote: 27000,
      status: "pending",
      cue: "Setup 5:30 AM",
      paidPct: 0
    })]
  }, {
    id: "jollibee",
    stage: "confirmed",
    client: "Jollibee Foods Corp",
    clientContact: "Brand Activation Team",
    event: "YEP II Brand Activation",
    type: "Brand Activation",
    date: "Jul 18, 2025",
    time: "2:00 PM",
    venue: "SM Megamall · Event Center",
    pax: 200,
    hostingFee: 28000,
    markupPct: 28,
    clientPaidPct: 100,
    // paid in full
    suppliers: [sup({
      id: "jb-av",
      name: "XSTATIC Productions",
      cat: "AV",
      scope: "Truss + Sound + Lights",
      contact: "0917 808 9090",
      floor: 34000,
      quote: 40000,
      status: "confirmed",
      cue: "Load-in 10:00 AM",
      paidPct: 100
    }), sup({
      id: "jb-dec",
      name: "Fleur de Lis Events",
      cat: "Décor",
      scope: "Mall Activation Setup",
      contact: "0920 313 4141",
      floor: 16000,
      quote: 20000,
      status: "confirmed",
      cue: "Setup 9:00 AM",
      paidPct: 100
    }), sup({
      id: "jb-med",
      name: "Rockbird Media",
      cat: "Media",
      scope: "Coverage + Reels",
      contact: "0915 717 8181",
      floor: 12000,
      quote: 15000,
      status: "confirmed",
      cue: "Call-time 12:00 PM",
      paidPct: 100
    })]
  }, {
    id: "commonwealth",
    stage: "confirmed",
    client: "Commonwealth Healthcare",
    clientContact: "Admin · Ms. Dela Cruz",
    event: "CORE Doctors Recognition II",
    type: "Awards Night",
    date: "Aug 2, 2025",
    time: "6:30 PM",
    venue: "Dusit Thani Manila · Mayuree Ballroom",
    pax: 250,
    hostingFee: 35000,
    markupPct: 35,
    clientPaidPct: 50,
    suppliers: [sup({
      id: "cw-av",
      name: "Exile Inc.",
      cat: "AV",
      scope: "Awards Stage + LED",
      contact: "0917 626 3030",
      floor: 46000,
      quote: 55000,
      status: "confirmed",
      cue: "Load-in 1:00 PM",
      paidPct: 50
    }), sup({
      id: "cw-cat",
      name: "Bizu Catering",
      cat: "Catering",
      scope: "Gala Plated Dinner",
      contact: "0918 191 2020",
      floor: 70000,
      quote: 82000,
      status: "pending",
      cue: "Setup 2:00 PM",
      paidPct: 0
    }), sup({
      id: "cw-dec",
      name: "Narcissus Events",
      cat: "Décor",
      scope: "Gala Styling + Awards Wall",
      contact: "0920 717 1818",
      floor: 30000,
      quote: 38000,
      status: "confirmed",
      cue: "Setup 12:00 PM",
      paidPct: 50
    }), sup({
      id: "cw-ent",
      name: "Suki Band Collective",
      cat: "Entertainment",
      scope: "6-piece Band + DJ",
      contact: "0915 404 5050",
      floor: 24000,
      quote: 30000,
      status: "confirmed",
      cue: "Soundcheck 4:00 PM",
      paidPct: 50
    })]
  },
  // pipeline-only (no full supplier rosters yet)
  {
    id: "veeam",
    stage: "lead",
    client: "Veeam Philippines",
    event: "Q3 Tech Summit 2025",
    type: "Convention",
    date: "Aug 2025",
    venue: "TBD",
    suppliers: []
  }, {
    id: "andre",
    stage: "lead",
    client: "Andre Norman Global",
    event: "Asia Leadership Forum",
    type: "Forum",
    date: "Sep 2025",
    venue: "TBD",
    suppliers: []
  }, {
    id: "elegance",
    stage: "prep",
    client: "Manila Elegance Society",
    event: "Annual Gala 2025",
    type: "Gala",
    date: "Aug 30",
    venue: "EDSA Shangri-La",
    note: "Script WIP",
    suppliers: []
  }, {
    id: "lifefitness",
    stage: "prep",
    client: "Life Fitness PH",
    event: "Brand Wellness Summit",
    type: "Summit",
    date: "Sep 5",
    venue: "TBD",
    note: "Suppliers TBD",
    suppliers: []
  }, {
    id: "veeam-done",
    stage: "done",
    client: "Veeam",
    event: "Data Platform v13 Launch · Feb 12",
    type: "Launch",
    date: "Feb 12",
    venue: "—",
    paid: true,
    suppliers: []
  }, {
    id: "speakers-done",
    stage: "done",
    client: "SpeakersCon PH",
    event: "Mark Schaefer Forum · Feb 16",
    type: "Forum",
    date: "Feb 16",
    venue: "—",
    paid: true,
    suppliers: []
  }, {
    id: "airsupply-done",
    stage: "done",
    client: "Air Supply",
    event: "50th Anniversary · Jan 2025",
    type: "Concert",
    date: "Jan 2025",
    venue: "—",
    paid: true,
    suppliers: []
  }, {
    id: "pifpo-done",
    stage: "done",
    client: "PiFPO NCR",
    event: "1st Regional Conference · May 6",
    type: "Conference",
    date: "May 6",
    venue: "—",
    paid: true,
    suppliers: []
  }];

  // ── DERIVED HELPERS ──
  const supplierTotal = (g, useFloor) => (g.suppliers || []).reduce((s, x) => s + (useFloor ? x.floor : x.quote), 0);

  // Contract value the client pays = marked-up supplier quotes + hosting fee
  const contractValue = g => Math.round(supplierTotal(g, false) * (1 + (g.markupPct || 0) / 100) + (g.hostingFee || 0));
  const STAGES = [{
    key: "lead",
    label: "Lead",
    glyph: "●",
    color: "var(--ob-200)"
  }, {
    key: "confirmed",
    label: "Confirmed",
    glyph: "◆",
    color: "var(--gd-400)"
  }, {
    key: "prep",
    label: "In Prep",
    glyph: "◐",
    color: "var(--warning)"
  }, {
    key: "done",
    label: "Done",
    glyph: "✓",
    color: "var(--success)"
  }];
  const STATUS = {
    confirmed: {
      label: "Confirmed",
      glyph: "●",
      cls: "confirmed"
    },
    pending: {
      label: "Pending",
      glyph: "◐",
      cls: "pending"
    },
    late: {
      label: "Overdue",
      glyph: "⚠",
      cls: "late"
    },
    tbd: {
      label: "TBD",
      glyph: "○",
      cls: "tbd"
    }
  };

  // Message threads — host<->client and host<->supplier (firewall: never crossed)
  const THREADS = {
    "client:kia": [{
      from: "client",
      t: "Hi Leigh! Excited for the launch. Is the package final?",
      at: "Jun 28"
    }, {
      from: "host",
      t: "Yes po — all-in package locked. Sending the proposal + payment link now.",
      at: "Jun 28"
    }, {
      from: "client",
      t: "Received. Processing the 50% downpayment today.",
      at: "Jun 29"
    }],
    "supplier:kia-av": [{
      from: "host",
      t: "Confirming load-in 2:00 PM, Grand Ballroom. Genset backup ready?",
      at: "Jul 8"
    }, {
      from: "supplier",
      t: "Confirmed po, genset on standby. LED wall 6x3m as agreed.",
      at: "Jul 8"
    }],
    "supplier:kia-cat": [{
      from: "host",
      t: "Pakiconfirm final pax — 300, plated dinner. Setup by 2:30 PM.",
      at: "Jul 9"
    }, {
      from: "host",
      t: "Following up po, need written confirmation by today.",
      at: "Jul 10"
    }]
  };
  window.HL = {
    HOST,
    GIGS,
    STAGES,
    STATUS,
    THREADS,
    peso,
    pesoK,
    supplierTotal,
    contractValue,
    activeGigs: GIGS.filter(g => ["confirmed", "prep"].includes(g.stage)),
    financeGigs: GIGS.filter(g => g.stage === "confirmed"),
    gigById: id => GIGS.find(g => g.id === id)
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/data.js", error: String((e && e.message) || e) }); }

// dashboard/domegallery.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — DomeGallery (React Bits)
   Ported for Babel/UMD React (hooks via React.*), exposed as
   window.DomeGallery. Drag/inertia reimplemented with native
   pointer events (replaces @use-gesture/react) so it uses the
   page's single React instance. CSS in dashboard/domegallery.css.
   ============================================================ */
(function () {
  const {
    useEffect,
    useMemo,
    useRef,
    useCallback
  } = React;
  const DEFAULTS = {
    maxVerticalRotationDeg: 5,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 35
  };
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const normalizeAngle = d => (d % 360 + 360) % 360;
  const wrapAngleSigned = deg => {
    const a = ((deg + 180) % 360 + 360) % 360;
    return a - 180;
  };
  const getDataNumber = (el, name, fallback) => {
    const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
    const n = attr == null ? NaN : parseFloat(attr);
    return Number.isFinite(n) ? n : fallback;
  };
  function buildItems(pool, seg) {
    const xCols = Array.from({
      length: seg
    }, (_, i) => -37 + i * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];
    const coords = xCols.flatMap((x, c) => {
      const ys = c % 2 === 0 ? evenYs : oddYs;
      return ys.map(y => ({
        x,
        y,
        sizeX: 2,
        sizeY: 2
      }));
    });
    const totalSlots = coords.length;
    if (pool.length === 0) return coords.map(c => ({
      ...c,
      src: "",
      alt: ""
    }));
    const normalizedImages = pool.map(image => typeof image === "string" ? {
      src: image,
      alt: ""
    } : {
      src: image.src || "",
      alt: image.alt || ""
    });
    const usedImages = Array.from({
      length: totalSlots
    }, (_, i) => normalizedImages[i % normalizedImages.length]);
    for (let i = 1; i < usedImages.length; i++) {
      if (usedImages[i].src === usedImages[i - 1].src) {
        for (let j = i + 1; j < usedImages.length; j++) {
          if (usedImages[j].src !== usedImages[i].src) {
            const t = usedImages[i];
            usedImages[i] = usedImages[j];
            usedImages[j] = t;
            break;
          }
        }
      }
    }
    return coords.map((c, i) => ({
      ...c,
      src: usedImages[i].src,
      alt: usedImages[i].alt
    }));
  }
  function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
    const unit = 360 / segments / 2;
    return {
      rotateX: unit * (offsetY - (sizeY - 1) / 2),
      rotateY: unit * (offsetX + (sizeX - 1) / 2)
    };
  }
  function DomeGallery(props) {
    const {
      images,
      fit = 0.5,
      fitBasis = "auto",
      minRadius = 600,
      maxRadius = Infinity,
      padFactor = 0.25,
      overlayBlurColor = "#0a0a14",
      maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
      dragSensitivity = DEFAULTS.dragSensitivity,
      enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
      segments = DEFAULTS.segments,
      dragDampening = 2,
      openedImageWidth = "300px",
      openedImageHeight = "400px",
      imageBorderRadius = "20px",
      openedImageBorderRadius = "20px",
      grayscale = false,
      autoRotateSpeed = 0.018,
      // deg per frame; set 0 to disable
      randomReveal = true // periodically highlight a random tile
    } = props;
    const imgs = images && images.length ? images : [];
    const rootRef = useRef(null),
      mainRef = useRef(null),
      sphereRef = useRef(null);
    const frameRef = useRef(null),
      viewerRef = useRef(null),
      scrimRef = useRef(null);
    const focusedElRef = useRef(null),
      originalTilePositionRef = useRef(null);
    const rotationRef = useRef({
      x: 0,
      y: 0
    });
    const startRotRef = useRef({
      x: 0,
      y: 0
    });
    const startPosRef = useRef(null);
    const draggingRef = useRef(false),
      movedRef = useRef(false);
    const inertiaRAF = useRef(null),
      openingRef = useRef(false);
    const openStartedAtRef = useRef(0),
      lastDragEndAt = useRef(0);
    const lastMoveRef = useRef({
      t: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    });
    const scrollLockedRef = useRef(false);
    const lockScroll = useCallback(() => {
      if (scrollLockedRef.current) return;
      scrollLockedRef.current = true;
      document.body.classList.add("dg-scroll-lock");
    }, []);
    const unlockScroll = useCallback(() => {
      if (!scrollLockedRef.current) return;
      if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
      scrollLockedRef.current = false;
      document.body.classList.remove("dg-scroll-lock");
    }, []);
    const items = useMemo(() => buildItems(imgs, segments), [imgs, segments]);
    const applyTransform = (xDeg, yDeg) => {
      const el = sphereRef.current;
      if (el) el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    };
    const lockedRadiusRef = useRef(null);
    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const ro = new ResizeObserver(entries => {
        const cr = entries[0].contentRect;
        const w = Math.max(1, cr.width),
          h = Math.max(1, cr.height);
        const minDim = Math.min(w, h),
          maxDim = Math.max(w, h),
          aspect = w / h;
        let basis;
        switch (fitBasis) {
          case "min":
            basis = minDim;
            break;
          case "max":
            basis = maxDim;
            break;
          case "width":
            basis = w;
            break;
          case "height":
            basis = h;
            break;
          default:
            basis = aspect >= 1.3 ? w : minDim;
        }
        let radius = basis * fit;
        radius = Math.min(radius, h * 1.35);
        radius = clamp(radius, minRadius, maxRadius);
        lockedRadiusRef.current = Math.round(radius);
        const viewerPad = Math.max(8, Math.round(minDim * padFactor));
        root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
        root.style.setProperty("--viewer-pad", `${viewerPad}px`);
        root.style.setProperty("--overlay-blur-color", overlayBlurColor);
        root.style.setProperty("--tile-radius", imageBorderRadius);
        root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
        root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      });
      ro.observe(root);
      return () => ro.disconnect();
    }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius]);
    useEffect(() => {
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    }, []);
    const stopInertia = useCallback(() => {
      if (inertiaRAF.current) {
        cancelAnimationFrame(inertiaRAF.current);
        inertiaRAF.current = null;
      }
    }, []);
    const startInertia = useCallback((vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80,
        vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = {
          x: nextX,
          y: nextY
        };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

    // ── native pointer drag (replaces useGesture) ──
    useEffect(() => {
      const main = mainRef.current;
      if (!main) return;
      const onDown = e => {
        if (focusedElRef.current) return;
        stopInertia();
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = {
          ...rotationRef.current
        };
        startPosRef.current = {
          x: e.clientX,
          y: e.clientY
        };
        lastMoveRef.current = {
          t: performance.now(),
          x: e.clientX,
          y: e.clientY,
          vx: 0,
          vy: 0
        };
        try {
          main.setPointerCapture(e.pointerId);
        } catch (_) {}
      };
      const onMove = e => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const dxTotal = e.clientX - startPosRef.current.x;
        const dyTotal = e.clientY - startPosRef.current.y;
        if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true;
        const now = performance.now();
        const dt = Math.max(1, now - lastMoveRef.current.t);
        lastMoveRef.current = {
          t: now,
          x: e.clientX,
          y: e.clientY,
          vx: (e.clientX - lastMoveRef.current.x) / dt,
          vy: (e.clientY - lastMoveRef.current.y) / dt
        };
        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = {
            x: nextX,
            y: nextY
          };
          applyTransform(nextX, nextY);
        }
      };
      const onUp = () => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        const {
          vx,
          vy
        } = lastMoveRef.current;
        if (Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02) startInertia(vx, vy);
        if (movedRef.current) lastDragEndAt.current = performance.now();
        movedRef.current = false;
      };
      main.addEventListener("pointerdown", onDown);
      main.addEventListener("pointermove", onMove);
      main.addEventListener("pointerup", onUp);
      main.addEventListener("pointercancel", onUp);
      return () => {
        main.removeEventListener("pointerdown", onDown);
        main.removeEventListener("pointermove", onMove);
        main.removeEventListener("pointerup", onUp);
        main.removeEventListener("pointercancel", onUp);
      };
    }, [dragSensitivity, maxVerticalRotationDeg, startInertia, stopInertia]);
    useEffect(() => {
      const scrim = scrimRef.current;
      if (!scrim) return;
      const close = () => {
        if (performance.now() - openStartedAtRef.current < 250) return;
        const el = focusedElRef.current;
        if (!el) return;
        const parent = el.parentElement;
        const overlay = viewerRef.current?.querySelector(".enlarge");
        if (!overlay) return;
        const refDiv = parent.querySelector(".item__image--reference");
        const originalPos = originalTilePositionRef.current;
        if (!originalPos) {
          overlay.remove();
          if (refDiv) refDiv.remove();
          parent.style.setProperty("--rot-y-delta", "0deg");
          parent.style.setProperty("--rot-x-delta", "0deg");
          el.style.visibility = "";
          el.style.zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute("data-enlarging");
          openingRef.current = false;
          unlockScroll();
          return;
        }
        const currentRect = overlay.getBoundingClientRect();
        const rootRect = rootRef.current.getBoundingClientRect();
        const originalPosRel = {
          left: originalPos.left - rootRect.left,
          top: originalPos.top - rootRect.top,
          width: originalPos.width,
          height: originalPos.height
        };
        const overlayRel = {
          left: currentRect.left - rootRect.left,
          top: currentRect.top - rootRect.top,
          width: currentRect.width,
          height: currentRect.height
        };
        const anim = document.createElement("div");
        anim.className = "enlarge-closing";
        anim.style.cssText = `position:absolute;left:${overlayRel.left}px;top:${overlayRel.top}px;width:${overlayRel.width}px;height:${overlayRel.height}px;z-index:9999;border-radius:var(--enlarge-radius,32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
        const originalImg = overlay.querySelector("img");
        if (originalImg) {
          const img = originalImg.cloneNode();
          img.style.cssText = "width:100%;height:100%;object-fit:cover;";
          anim.appendChild(img);
        }
        overlay.remove();
        rootRef.current.appendChild(anim);
        void anim.getBoundingClientRect();
        requestAnimationFrame(() => {
          anim.style.left = originalPosRel.left + "px";
          anim.style.top = originalPosRel.top + "px";
          anim.style.width = originalPosRel.width + "px";
          anim.style.height = originalPosRel.height + "px";
          anim.style.opacity = "0";
        });
        const cleanup = () => {
          anim.remove();
          originalTilePositionRef.current = null;
          if (refDiv) refDiv.remove();
          parent.style.transition = "none";
          el.style.transition = "none";
          parent.style.setProperty("--rot-y-delta", "0deg");
          parent.style.setProperty("--rot-x-delta", "0deg");
          requestAnimationFrame(() => {
            el.style.visibility = "";
            el.style.opacity = "0";
            el.style.zIndex = 0;
            focusedElRef.current = null;
            rootRef.current?.removeAttribute("data-enlarging");
            requestAnimationFrame(() => {
              parent.style.transition = "";
              el.style.transition = "opacity 300ms ease-out";
              requestAnimationFrame(() => {
                el.style.opacity = "1";
                setTimeout(() => {
                  el.style.transition = "";
                  el.style.opacity = "";
                  openingRef.current = false;
                  if (!draggingRef.current && rootRef.current?.getAttribute("data-enlarging") !== "true") document.body.classList.remove("dg-scroll-lock");
                }, 300);
              });
            });
          });
        };
        anim.addEventListener("transitionend", cleanup, {
          once: true
        });
      };
      scrim.addEventListener("click", close);
      const onKey = e => {
        if (e.key === "Escape") close();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        scrim.removeEventListener("click", close);
        window.removeEventListener("keydown", onKey);
      };
    }, [enlargeTransitionMs, unlockScroll]);
    const openItemFromElement = useCallback(el => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = el.parentElement;
      focusedElRef.current = el;
      el.setAttribute("data-focused", "true");
      const offsetX = getDataNumber(parent, "offsetX", 0),
        offsetY = getDataNumber(parent, "offsetY", 0);
      const sizeX = getDataNumber(parent, "sizeX", 2),
        sizeY = getDataNumber(parent, "sizeY", 2);
      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRot.rotateY),
        globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;
      parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
      parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
      const refDiv = document.createElement("div");
      refDiv.className = "item__image item__image--reference";
      refDiv.style.opacity = "0";
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);
      void refDiv.offsetHeight;
      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect(),
        frameR = frameRef.current?.getBoundingClientRect();
      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }
      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height
      };
      el.style.visibility = "hidden";
      el.style.zIndex = 0;
      const overlay = document.createElement("div");
      overlay.className = "enlarge";
      overlay.style.cssText = `position:absolute;left:${frameR.left - mainR.left}px;top:${frameR.top - mainR.top}px;width:${frameR.width}px;height:${frameR.height}px;opacity:0;z-index:30;will-change:transform,opacity;transform-origin:top left;transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease;`;
      const rawSrc = parent.dataset.src || el.querySelector("img")?.src || "";
      const img = document.createElement("img");
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current.appendChild(overlay);
      const tx0 = tileR.left - frameR.left,
        ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width,
        sy0 = tileR.height / frameR.height;
      const vsx = isFinite(sx0) && sx0 > 0 ? sx0 : 1,
        vsy = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${vsx}, ${vsy})`;
      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
        rootRef.current?.setAttribute("data-enlarging", "true");
      }, 16);
      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = ev => {
          if (ev.propertyName !== "transform") return;
          overlay.removeEventListener("transitionend", onFirstEnd);
          const prevTransition = overlay.style.transition;
          overlay.style.transition = "none";
          const tempWidth = openedImageWidth || `${frameR.width}px`,
            tempHeight = openedImageHeight || `${frameR.height}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          const newRect = overlay.getBoundingClientRect();
          overlay.style.width = frameR.width + "px";
          overlay.style.height = frameR.height + "px";
          void overlay.offsetWidth;
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
          requestAnimationFrame(() => {
            overlay.style.left = `${centeredLeft}px`;
            overlay.style.top = `${centeredTop}px`;
            overlay.style.width = tempWidth;
            overlay.style.height = tempHeight;
          });
          const cleanupSecond = () => {
            overlay.removeEventListener("transitionend", cleanupSecond);
            overlay.style.transition = prevTransition;
          };
          overlay.addEventListener("transitionend", cleanupSecond, {
            once: true
          });
        };
        overlay.addEventListener("transitionend", onFirstEnd);
      }
    }, [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, segments, unlockScroll]);
    const onTileClick = useCallback(e => {
      if (draggingRef.current || movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget);
    }, [openItemFromElement]);
    useEffect(() => () => {
      document.body.classList.remove("dg-scroll-lock");
    }, []);

    // ── Auto-rotate (slow continuous spin) ──
    useEffect(() => {
      if (!autoRotateSpeed) return;
      let raf;
      const spin = () => {
        if (!draggingRef.current && !focusedElRef.current && !inertiaRAF.current) {
          const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
          rotationRef.current = {
            x: rotationRef.current.x,
            y: nextY
          };
          applyTransform(rotationRef.current.x, nextY);
        }
        raf = requestAnimationFrame(spin);
      };
      raf = requestAnimationFrame(spin);
      return () => cancelAnimationFrame(raf);
    }, [autoRotateSpeed]);

    // ── Random photo pop-up (pulse a tile every few seconds) ──
    useEffect(() => {
      if (!randomReveal) return;
      const interval = setInterval(() => {
        if (focusedElRef.current || openingRef.current) return;
        const sphere = sphereRef.current;
        if (!sphere) return;
        const tiles = sphere.querySelectorAll(".item__image img");
        if (!tiles.length) return;
        const tile = tiles[Math.floor(Math.random() * tiles.length)];
        tile.style.transition = "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease";
        tile.style.transform = "scale(1.18)";
        tile.style.boxShadow = "0 0 24px rgba(212,175,55,0.6)";
        tile.style.zIndex = "10";
        setTimeout(() => {
          tile.style.transform = "";
          tile.style.boxShadow = "";
          tile.style.zIndex = "";
        }, 900);
      }, 1800);
      return () => clearInterval(interval);
    }, [randomReveal]);
    return /*#__PURE__*/React.createElement("div", {
      ref: rootRef,
      className: "sphere-root",
      style: {
        ["--segments-x"]: segments,
        ["--segments-y"]: segments,
        ["--overlay-blur-color"]: overlayBlurColor,
        ["--tile-radius"]: imageBorderRadius,
        ["--enlarge-radius"]: openedImageBorderRadius,
        ["--image-filter"]: grayscale ? "grayscale(1)" : "none"
      }
    }, /*#__PURE__*/React.createElement("main", {
      ref: mainRef,
      className: "sphere-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stage"
    }, /*#__PURE__*/React.createElement("div", {
      ref: sphereRef,
      className: "sphere"
    }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: `${it.x},${it.y},${i}`,
      className: "item",
      "data-src": it.src,
      "data-offset-x": it.x,
      "data-offset-y": it.y,
      "data-size-x": it.sizeX,
      "data-size-y": it.sizeY,
      style: {
        ["--offset-x"]: it.x,
        ["--offset-y"]: it.y,
        ["--item-size-x"]: it.sizeX,
        ["--item-size-y"]: it.sizeY
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__image",
      role: "button",
      tabIndex: 0,
      "aria-label": it.alt || "Open image",
      onClick: onTileClick
    }, /*#__PURE__*/React.createElement("img", {
      src: it.src,
      draggable: false,
      alt: it.alt
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "overlay"
    }), /*#__PURE__*/React.createElement("div", {
      className: "overlay overlay--blur"
    }), /*#__PURE__*/React.createElement("div", {
      className: "edge-fade edge-fade--top"
    }), /*#__PURE__*/React.createElement("div", {
      className: "edge-fade edge-fade--bottom"
    }), /*#__PURE__*/React.createElement("div", {
      className: "viewer",
      ref: viewerRef
    }, /*#__PURE__*/React.createElement("div", {
      ref: scrimRef,
      className: "scrim"
    }), /*#__PURE__*/React.createElement("div", {
      ref: frameRef,
      className: "frame"
    }))));
  }
  window.DomeGallery = DomeGallery;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/domegallery.jsx", error: String((e && e.message) || e) }); }

// dashboard/host-sa.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — HOST VIEWS
   Overview · Pipeline · Suppliers(firewall) · Escrow ·
   Discount Engine · Calendar. Exported to window.
   ============================================================ */

// ───────────────────────── OVERVIEW ─────────────────────────
function Overview({
  go
}) {
  const HL = window.HL;
  const active = HL.activeGigs;
  const fin = HL.financeGigs;
  const contracted = fin.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = fin.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  const outstanding = contracted - collected;
  const next = HL.gigById("kia");
  const alerts = [{
    tone: "danger",
    title: "Catering confirmation overdue — KIA Launch",
    meta: "Event in 6 days · Red Ribbon Catering · expected yesterday",
    cta: "Call now",
    act: () => window.hlToast("Calling Red Ribbon Catering…")
  }, {
    tone: "warning",
    title: "50% balance uncollected — PIEPCO Convention",
    meta: "Due Jul 5 · ₱57,000 · PIEPCO Foundation",
    cta: "Send reminder",
    act: () => window.hlToast("Payment reminder sent to PIEPCO ✓")
  }, {
    tone: "success",
    title: "AV testing scheduled — KIA Makati",
    meta: "Today 3:00 PM · Makati Shangri-La · all suppliers briefed",
    cta: null
  }];
  const toneBg = {
    danger: "rgba(239,68,68,0.06)",
    warning: "rgba(245,158,11,0.06)",
    success: "rgba(34,197,94,0.06)"
  };
  const toneBd = {
    danger: "rgba(239,68,68,0.18)",
    warning: "rgba(245,158,11,0.18)",
    success: "rgba(34,197,94,0.15)"
  };
  const toneDot = {
    danger: "var(--danger)",
    warning: "var(--warning)",
    success: "var(--success)"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 196,
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      marginBottom: 24,
      border: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(Lightfall, {
    store: window.HL_BG,
    colors: window.HL_BG && window.HL_BG.colors || ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: window.HL_BG && window.HL_BG.backgroundColor || "#1a1a2e",
    speed: 0.6,
    streakCount: 8,
    streakWidth: 1,
    streakLength: 1.3,
    glow: 1,
    density: 1,
    twinkle: 1,
    zoom: 2,
    backgroundGlow: 0.85,
    opacity: 1,
    mouseInteraction: true,
    mouseStrength: 1,
    mouseRadius: 0.6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(95deg, rgba(22,18,33,0.88) 0%, rgba(22,18,33,0.5) 48%, rgba(22,18,33,0.1) 100%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: "0 36px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 11,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 8
    }
  }, "Welcome back, Boss \u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 700,
      color: "var(--ob-50)",
      lineHeight: 1.05
    }
  }, "The empire, at a glance."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-200)",
      marginTop: 8
    }
  }, active.length, " active gigs \xB7 ", fin.length, " confirmed \xB7 next up ", next.client, ", ", next.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Active Gigs",
    value: active.length,
    sub: {
      text: "↑ +2 this month",
      tone: "up"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Contracted",
    value: HL.pesoK(contracted),
    sub: {
      text: "across active events",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(collected),
    tone: "success",
    sub: {
      text: Math.round(collected / contracted * 100) + "% of contracted",
      tone: "up"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Outstanding",
    value: HL.pesoK(outstanding),
    tone: "warning",
    sub: {
      text: "1 overdue invoice",
      tone: "warn"
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Today's Alerts",
    icon: "bolt",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 12,
      background: toneBg[a.tone],
      border: `1px solid ${toneBd[a.tone]}`,
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: toneDot[a.tone],
      boxShadow: `0 0 6px ${toneDot[a.tone]}`,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)",
      marginTop: 2
    }
  }, a.meta)), a.cta && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: a.tone === "danger" ? "danger" : "secondary",
    onClick: a.act
  }, a.cta)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 38,
    glowColor: "45 65 60",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 29,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 16,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, "Next Confirmed Event")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--gd-400)",
      letterSpacing: "1px",
      marginBottom: 6
    }
  }, next.date.toUpperCase(), " \xB7 ", next.time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ob-50)",
      marginBottom: 4
    }
  }, next.client, " \u2014 ", next.event), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ob-300)",
      marginBottom: 12
    }
  }, next.venue, " \xB7 ~", next.pax, " guests"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "gold"
  }, next.type), /*#__PURE__*/React.createElement(Tag, {
    tone: "green"
  }, "Confirmed"), /*#__PURE__*/React.createElement(Tag, null, HL.pesoK(HL.contractValue(next))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    fullWidth: true,
    onClick: () => go("suppliers")
  }, "View suppliers"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    fullWidth: true,
    onClick: () => go("escrow")
  }, "Payment status")))), /*#__PURE__*/React.createElement(Card, {
    title: "Quick Actions",
    icon: "spark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [["kanban", "View the full gig pipeline", "pipeline"], ["suppliers", "Check supplier firewall & statuses", "suppliers"], ["escrow", "Escrow & payment tracker", "escrow"], ["discount", "Run the discount & margin engine", "discount"]].map(([ic, lbl, pg]) => /*#__PURE__*/React.createElement("button", {
    key: pg,
    onClick: () => go(pg),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textAlign: "left",
      padding: "12px 14px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-md)",
      color: "var(--ob-100)",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--border-strong)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-hair)";
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16
  })), lbl, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--ob-300)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }))))))));
}

// ───────────────────────── PIPELINE ─────────────────────────
function Pipeline({
  openGig
}) {
  const HL = window.HL;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Gig Pipeline",
    title: "Every deal, every stage.",
    sub: "Drag-free kanban of the whole book. Click any card to open its firewall, escrow and run-of-show."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 14
    }
  }, HL.STAGES.map(st => {
    const cards = HL.GIGS.filter(g => g.stage === st.key);
    return /*#__PURE__*/React.createElement("div", {
      key: st.key
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: st.color
      }
    }, st.glyph, " ", st.label), /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--ob-700)",
        color: "var(--ob-200)",
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 20,
        fontFamily: "var(--font-mono)"
      }
    }, cards.length)), cards.map(g => {
      const clickable = g.suppliers.length > 0;
      return /*#__PURE__*/React.createElement("div", {
        key: g.id,
        onClick: () => clickable && openGig(g.id),
        style: {
          background: "var(--surface-raised)",
          border: "1px solid var(--border-hair)",
          borderRadius: "var(--r-md)",
          padding: 14,
          marginBottom: 10,
          cursor: clickable ? "pointer" : "default",
          opacity: g.stage === "done" ? 0.55 : 1,
          transition: "var(--tr-all)"
        },
        onMouseEnter: e => {
          if (clickable) {
            e.currentTarget.style.borderColor = "var(--border-strong)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = "var(--border-hair)";
          e.currentTarget.style.transform = "none";
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ob-50)",
          marginBottom: 4
        }
      }, g.client), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "var(--ob-200)",
          marginBottom: 8
        }
      }, g.event), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, g.stage === "confirmed" && /*#__PURE__*/React.createElement(Tag, {
        tone: "gold"
      }, HL.pesoK(HL.contractValue(g))), g.note && /*#__PURE__*/React.createElement(Tag, {
        tone: "rose"
      }, g.note), g.paid ? /*#__PURE__*/React.createElement(Tag, {
        tone: "green"
      }, "Paid \u2713") : /*#__PURE__*/React.createElement(Tag, null, g.date)));
    }));
  })));
}

// ───────────────────── SUPPLIERS / FIREWALL ─────────────────────
function Suppliers({
  gigId,
  setGigId,
  openSupplier
}) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter(g => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Supplier Firewall",
    title: "They work for you. They never see each other."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16,
      padding: "12px 16px",
      background: "rgba(212,175,55,0.05)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-100)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--gd-300)"
    }
  }, "Firewall active."), " Each supplier has a private channel and sees only their own scope \u2014 never the client's identity, your margin, or the other suppliers. Open a row to view their isolated portal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, gigs.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    onClick: () => setGigId(g.id),
    style: {
      padding: "7px 14px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      cursor: "pointer",
      border: "1px solid",
      transition: "var(--tr-all)",
      ...(g.id === gig.id ? {
        background: "var(--gd-400)",
        borderColor: "var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      } : {
        background: "none",
        borderColor: "var(--border-soft)",
        color: "var(--ob-200)"
      })
    }
  }, g.client))), /*#__PURE__*/React.createElement(Card, {
    title: `${gig.client} — ${gig.event}`,
    icon: "suppliers",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ob-300)"
      }
    }, gig.date, " \xB7 ", gig.suppliers.length, " suppliers")
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Supplier", "Category", "Private channel", "Cue", "Status", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      textAlign: i === 5 ? "right" : "left",
      padding: "0 12px 10px",
      borderBottom: "1px solid var(--border-soft)",
      fontWeight: 600
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, gig.suppliers.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id,
    onClick: () => openSupplier(s.id),
    style: {
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(212,175,55,0.04)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)"
    }
  }, s.scope)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement(Tag, null, s.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--ob-200)"
    }
  }, s.contact), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      fontSize: 11,
      color: "var(--ob-200)"
    }
  }, s.cue), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: s.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: s.status === "late" ? "danger" : "secondary",
    icon: "phone",
    onClick: e => {
      e.stopPropagation();
      window.hlToast(`Calling ${s.name}…`);
    }
  }, s.status === "late" ? "Call now" : "Call"))))))));
}
const tdS = {
  padding: "13px 12px",
  borderBottom: "1px solid var(--border-divider)",
  fontSize: 13,
  color: "var(--ob-100)",
  verticalAlign: "middle"
};

// ───────────────────────── ESCROW ─────────────────────────
function Escrow() {
  const HL = window.HL;
  const gigs = HL.financeGigs;
  const totals = gigs.reduce((a, g) => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    a.contracted += cv;
    a.collected += paid;
    a.supCost += supCost;
    a.released += released;
    if (g.clientPaidPct === 0) a.overdue += cv;
    return a;
  }, {
    contracted: 0,
    collected: 0,
    supCost: 0,
    released: 0,
    overdue: 0
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Escrow Tracker",
    title: "Client pays you. You release suppliers.",
    sub: "Money sits with you between collection and event sign-off \u2014 your leverage, your float, your protection."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Contracted",
    value: HL.pesoK(totals.contracted)
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(totals.collected),
    tone: "success"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Held in escrow",
    value: HL.pesoK(totals.collected - totals.released),
    tone: "default",
    sub: {
      text: "not yet released",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Overdue",
    value: HL.pesoK(totals.overdue),
    tone: "danger",
    sub: {
      text: "1 client",
      tone: "down"
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Per-Event Escrow Flow",
    icon: "escrow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, gigs.map(g => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    const margin = cv - supCost - g.hostingFee;
    const overdue = g.clientPaidPct === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        padding: "16px 0",
        borderBottom: "1px solid var(--border-divider)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--ob-50)"
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)"
      }
    }, g.event, " \xB7 ", g.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        color: "var(--ob-50)"
      }
    }, HL.peso(cv)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: overdue ? "var(--warning-text)" : "var(--ob-300)"
      }
    }, overdue ? "Awaiting downpayment — OVERDUE" : `${g.clientPaidPct}% collected`))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(EscrowStage, {
      label: "Client \u2192 You",
      amt: HL.peso(paid),
      of: HL.peso(cv),
      pct: g.clientPaidPct,
      color: overdue ? "var(--danger)" : "var(--grad-gold)"
    }), /*#__PURE__*/React.createElement(EscrowStage, {
      label: "You \u2192 Suppliers",
      amt: HL.peso(released),
      of: HL.peso(supCost),
      pct: Math.round(released / supCost * 100),
      color: "var(--ob-300)"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--ob-300)",
        marginBottom: 6
      }
    }, "Your margin"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        color: "var(--success-text)",
        marginBottom: 6
      }
    }, HL.peso(margin)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "var(--ob-300)"
      }
    }, "incl. \u20B1", g.hostingFee / 1000, "K hosting fee"))));
  }))));
}
function EscrowStage({
  label,
  amt,
  of,
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      color: "var(--ob-50)"
    }
  }, amt), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--ob-300)"
    }
  }, "/ ", of)), /*#__PURE__*/React.createElement(Bar, {
    pct: pct || 0,
    color: color
  }));
}

// ───────────────────── DISCOUNT / MARGIN ENGINE ─────────────────────
function DiscountEngine({
  gigId,
  setGigId
}) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter(g => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  const floor = HL.supplierTotal(gig, true);
  const quoted = HL.supplierTotal(gig, false);
  const [markup, setMarkup] = React.useState(gig.markupPct);
  const [hosting, setHosting] = React.useState(gig.hostingFee);
  const [discount, setDiscount] = React.useState(0); // % off client price
  React.useEffect(() => {
    setMarkup(gig.markupPct);
    setHosting(gig.hostingFee);
    setDiscount(0);
  }, [gig.id]);
  const baseClient = quoted * (1 + markup / 100) + hosting;
  const clientPrice = baseClient * (1 - discount / 100);
  const margin = clientPrice - quoted; // what you keep after paying supplier quotes
  const marginPct = clientPrice ? margin / clientPrice * 100 : 0;
  const protectedFloor = clientPrice - floor; // cushion above true supplier floor
  const danger = clientPrice < quoted;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Discount & Margin Engine",
    title: "Give the number. Keep the margin.",
    sub: "Discounts come off your markup \u2014 never the supplier floor. Simulate before you commit on the call."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, gigs.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    onClick: () => setGigId(g.id),
    style: {
      padding: "7px 14px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      cursor: "pointer",
      border: "1px solid",
      transition: "var(--tr-all)",
      ...(g.id === gig.id ? {
        background: "var(--gd-400)",
        borderColor: "var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      } : {
        background: "none",
        borderColor: "var(--border-soft)",
        color: "var(--ob-200)"
      })
    }
  }, g.client))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Simulator",
    icon: "discount"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Coordination markup",
    value: markup,
    min: 15,
    max: 45,
    step: 1,
    unit: "%",
    onChange: setMarkup,
    hint: "House rule: 25\u201340% covers follow-ups, day-of stress, contingency."
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Hosting fee",
    value: hosting,
    min: 0,
    max: 120000,
    step: 1000,
    unit: "\u20B1",
    fmt: HL.peso,
    onChange: setHosting,
    hint: "Your on-mic talent fee, separate from supplier coordination."
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Client discount",
    value: discount,
    min: 0,
    max: 25,
    step: 1,
    unit: "%",
    onChange: setDiscount,
    hint: "\u201CSuki na tayo, pwede pa bumaba?\u201D \u2014 give it off the markup.",
    accent: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-divider)",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    onClick: () => setDiscount(d => Math.min(25, d + 5))
  }, "+5% off"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    onClick: () => {
      setDiscount(10);
      window.hlToast("Loyalty scenario: 10% off the markup");
    }
  }, "Repeat-client loyalty"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      setMarkup(gig.markupPct);
      setHosting(gig.hostingFee);
      setDiscount(0);
    }
  }, "Reset"))), /*#__PURE__*/React.createElement(Card, {
    title: "Quote Breakdown",
    icon: "card",
    style: danger ? {
      borderColor: "var(--danger)"
    } : null
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Supplier floor (true cost)",
    v: HL.peso(floor),
    mono: true,
    dim: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Supplier quotes (what you pay)",
    v: HL.peso(quoted),
    mono: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: `+ Coordination markup (${markup}%)`,
    v: HL.peso(quoted * markup / 100),
    mono: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: "+ Hosting fee",
    v: HL.peso(hosting),
    mono: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-divider)",
      margin: "8px 0"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    k: "List package price",
    v: HL.peso(baseClient),
    mono: true
  }), discount > 0 && /*#__PURE__*/React.createElement(Row, {
    k: `− Client discount (${discount}%)`,
    v: "− " + HL.peso(baseClient - clientPrice),
    mono: true,
    tone: "rose"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 16,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-200)",
      marginBottom: 6
    }
  }, "Client pays"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 30,
      fontWeight: 500,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, HL.peso(clientPrice))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Mini, {
    label: "Your margin",
    value: HL.peso(margin),
    pct: `${marginPct.toFixed(0)}% of price`,
    tone: danger ? "danger" : "success"
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Floor cushion",
    value: HL.peso(protectedFloor),
    pct: "above true cost",
    tone: protectedFloor < 0 ? "danger" : "default"
  })), danger && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11.5,
      color: "var(--danger-text)",
      textAlign: "center"
    }
  }, "\u26A0 Below your supplier quotes \u2014 you'd be paying to work. Pull back the discount."))));
}
function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  fmt,
  onChange,
  hint,
  accent
}) {
  const disp = fmt ? fmt(value) : unit === "%" ? value + "%" : value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--ob-100)",
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: accent ? "var(--rose-400)" : "var(--gd-300)"
    }
  }, disp)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    style: {
      width: "100%",
      accentColor: accent ? "var(--rose-500)" : "var(--gd-400)",
      cursor: "pointer"
    }
  }), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--ob-300)",
      marginTop: 5,
      lineHeight: 1.4
    }
  }, hint));
}
function Row({
  k,
  v,
  mono,
  dim,
  tone
}) {
  const c = tone === "rose" ? "var(--rose-400)" : dim ? "var(--ob-300)" : "var(--ob-100)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "5px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: dim ? "var(--ob-300)" : "var(--ob-200)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono ? "var(--font-mono)" : "inherit",
      fontSize: 13,
      color: c
    }
  }, v));
}
function Mini({
  label,
  value,
  pct,
  tone
}) {
  const c = {
    success: "var(--success-text)",
    danger: "var(--danger-text)",
    default: "var(--gd-300)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 18,
      color: c,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "var(--ob-300)",
      marginTop: 4
    }
  }, pct));
}

// ───────────────────────── CALENDAR ─────────────────────────
function CalendarView({
  openGig
}) {
  const HL = window.HL;
  // July 2025 — starts on Tuesday (index 2)
  const events = {
    12: "kia",
    18: "jollibee",
    19: "piepco"
  };
  const first = 2,
    days = 31;
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Event Calendar",
    title: "July 2025",
    sub: "The booked month. Gold marks a confirmed event \u2014 click to open it."
  }), /*#__PURE__*/React.createElement(Card, {
    pad: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 6
    }
  }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      textAlign: "center",
      padding: "4px 0"
    }
  }, d)), cells.map((d, i) => {
    const ev = d && events[d];
    const g = ev && HL.gigById(ev);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => g && openGig(g.id),
      style: {
        minHeight: 78,
        borderRadius: "var(--r-sm)",
        padding: 8,
        border: "1px solid var(--border-divider)",
        background: d ? "var(--surface-raised)" : "transparent",
        cursor: g ? "pointer" : "default",
        opacity: d ? 1 : 0,
        transition: "var(--tr-all)",
        ...(ev ? {
          borderColor: "var(--border-strong)"
        } : null)
      },
      onMouseEnter: e => {
        if (g) e.currentTarget.style.borderColor = "var(--gd-400)";
      },
      onMouseLeave: e => {
        if (g) e.currentTarget.style.borderColor = "var(--border-strong)";
      }
    }, d && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: ev ? "var(--gd-300)" : "var(--ob-300)"
      }
    }, d), g && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        fontWeight: 600,
        color: "var(--ob-50)",
        lineHeight: 1.2
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "var(--gd-400)",
        marginTop: 3,
        fontFamily: "var(--font-mono)"
      }
    }, g.time)));
  }))));
}

// ───────────────────────── PORTFOLIO (DomeGallery) ─────────────────────────
const PORTFOLIO_IMAGES = [{
  src: window.__resources && window.__resources.imgOffice || "assets/photos/leigh-office.jpeg",
  alt: "Corporate portrait"
}, {
  src: window.__resources && window.__resources.imgVeeam || "assets/photos/leigh-veeam.jpeg",
  alt: "Veeam — Safe AI at Scale"
}, {
  src: window.__resources && window.__resources.imgJollibee || "assets/photos/leigh-jollibee.jpeg",
  alt: "Jollibee Joy event"
}, {
  src: window.__resources && window.__resources.imgGala || "assets/photos/leigh-gala.jpeg",
  alt: "Le French Gala"
}, {
  src: window.__resources && window.__resources.imgSpeakers || "assets/photos/leigh-speakerscon.jpeg",
  alt: "SpeakersCon PH"
}, {
  src: window.__resources && window.__resources.imgPifpo || "assets/photos/leigh-pifpo.jpeg",
  alt: "PiFPO NCR Conference"
}, {
  src: window.__resources && window.__resources.imgParis || "assets/photos/leigh-paris.jpeg",
  alt: "Editorial portrait"
}, {
  src: window.__resources && window.__resources.imgPortrait || "assets/photos/leigh-portrait.jpeg",
  alt: "Beauty portrait"
}, {
  src: window.__resources && window.__resources.imgEvent || "assets/photos/leigh-event.jpeg",
  alt: "VIP party host"
}, {
  src: window.__resources && window.__resources.imgWorking || "assets/photos/leigh-working.jpeg",
  alt: "Behind the scenes"
}, {
  src: window.__resources && window.__resources.imgSelfie || "assets/photos/leigh-selfie.jpeg",
  alt: "On-site selfie"
}];
function PortfolioView() {
  const HL = window.HL;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Portfolio",
    title: "Thirteen rooms she's owned.",
    sub: "Drag to rotate the dome \xB7 click any frame to enlarge. Real corporate stages across Metro Manila and beyond."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      paddingBottom: 6
    }
  }, [["8.2K", "Followers"], ["14+", "Years"], ["100%", "Recommend"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 20,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginTop: 5
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "66vh",
      minHeight: 460,
      borderRadius: "var(--r-xl)",
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      background: "var(--ob-950)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement(DomeGallery, {
    images: PORTFOLIO_IMAGES,
    fit: 0.62,
    minRadius: 420,
    grayscale: false,
    overlayBlurColor: "#161221",
    imageBorderRadius: "14px",
    openedImageBorderRadius: "16px",
    openedImageWidth: "340px",
    openedImageHeight: "440px"
  })));
}

// ───────────────────────── MEET LEIGH ─────────────────────────
function MeetLeigh() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
      marginBottom: 20,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)",
      padding: "32px 36px",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1,
      background: "var(--grad-gold)"
    }
  }), "Meet your host"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-alt)",
      fontWeight: 700,
      fontSize: 58,
      lineHeight: 0.96,
      color: "var(--ob-50)",
      marginBottom: 10
    }
  }, "Leigh."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 19,
      fontStyle: "italic",
      color: "var(--gd-300)",
      marginBottom: 20,
      lineHeight: 1.25
    }
  }, "The voice that holds the room."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.75,
      color: "var(--ob-200)",
      margin: "0 0 10px",
      maxWidth: "50ch"
    }
  }, "Leigh is a professional event host and emcee who turns programs into experiences \u2014 galas, product launches, conferences and weddings. She reads a room in seconds and keeps a run sheet on rails."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.75,
      color: "var(--ob-300)",
      margin: "0 0 24px",
      maxWidth: "50ch"
    }
  }, "From the first inquiry to the final encore, she hosts the whole arc: warm, precise, and impossible to look away from."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    onClick: () => window.hlToast("Opening booking form…")
  }, "\u2726 Book Leigh"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    onClick: () => window.hlToast("Scrolling to gallery…")
  }, "See the portfolio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      minHeight: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      minHeight: 380,
      background: "center 22%/cover url('" + (window.__resources && window.__resources.imgPortrait || 'assets/photos/leigh-portrait.jpeg') + "')"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Years Hosting",
    value: "8+",
    sub: {
      text: "Since 2016",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Events Hosted",
    value: "200+",
    sub: {
      text: "Galas · launches · weddings",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Cities on Call",
    value: "4",
    sub: {
      text: "Metro Manila + beyond",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Client Satisfaction",
    value: "100%",
    tone: "success",
    sub: {
      text: "↑ all reviews",
      tone: "up"
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "What She's About",
    icon: "spark",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14
    }
  }, [["01", "Presence", "Calm, magnetic stage presence that anchors a program from the first cue to the last applause."], ["02", "Precision", "Run sheets, cues and timings handled to the second — the night never drifts and nobody waits."], ["03", "Warmth", "Every guest, sponsor and couple treated like the reason the room exists in the first place."]].map(([num, title, desc]) => /*#__PURE__*/React.createElement("div", {
    key: num,
    style: {
      padding: "20px 22px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-divider)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      color: "var(--gd-300)",
      marginBottom: 10,
      lineHeight: 1
    }
  }, num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--ob-50)",
      marginBottom: 7,
      fontFamily: "var(--font-display)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-300)",
      lineHeight: 1.65
    }
  }, desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: "14px 20px",
      background: "rgba(212,175,55,0.04)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-md)",
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: 15.5,
      color: "var(--ob-200)",
      lineHeight: 1.5
    }
  }, "\"She didn't just run the program \u2014 she made it unforgettable.\"")), /*#__PURE__*/React.createElement(Card, {
    title: "On Stage & On the Carpet",
    icon: "portfolio",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "150px",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridRow: "span 2",
      borderRadius: "var(--r-md)",
      background: "center/cover url('" + (window.__resources && window.__resources.imgGala || 'assets/photos/leigh-gala.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 2",
      borderRadius: "var(--r-md)",
      background: "center 30%/cover url('" + (window.__resources && window.__resources.imgVeeam || 'assets/photos/leigh-veeam.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-md)",
      background: "center/cover url('" + (window.__resources && window.__resources.imgSpeakers || 'assets/photos/leigh-speakerscon.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-md)",
      background: "center/cover url('" + (window.__resources && window.__resources.imgPifpo || 'assets/photos/leigh-pifpo.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-md)",
      background: "center/cover url('" + (window.__resources && window.__resources.imgJollibee || 'assets/photos/leigh-jollibee.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-md)",
      background: "center/cover url('" + (window.__resources && window.__resources.imgParis || 'assets/photos/leigh-paris.jpeg') + "')",
      border: "1px solid var(--border-soft)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 32px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-alt)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--ob-50)",
      marginBottom: 10,
      lineHeight: 1.05
    }
  }, "Have a night that deserves a host?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto 22px",
      fontSize: 14,
      color: "var(--ob-300)",
      maxWidth: "44ch",
      lineHeight: 1.6
    }
  }, "Tell Leigh the date, the room and the feeling you're after \u2014 she'll take it from there."), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    onClick: () => window.hlToast("Opening booking inquiry…")
  }, "\u2726 Check her availability")));
}
Object.assign(window, {
  Overview,
  Pipeline,
  Suppliers,
  Escrow,
  DiscountEngine,
  CalendarView,
  PortfolioView,
  MeetLeigh
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/host-sa.jsx", error: String((e && e.message) || e) }); }

// dashboard/host.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — HOST VIEWS
   Overview · Pipeline · Suppliers(firewall) · Escrow ·
   Discount Engine · Calendar. Exported to window.
   ============================================================ */

// ───────────────────────── KPI MODALS ─────────────────────────
function ActiveGigsPanel({
  gigs,
  HL,
  onClose,
  go
}) {
  const stageColor = {
    confirmed: "var(--gd-400)",
    prep: "var(--warning)"
  };
  const stageLabel = {
    confirmed: "Confirmed",
    prep: "In Prep"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 6
    }
  }, "Active Gigs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--ob-50)"
    }
  }, gigs.length, " events on the books")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-200)",
      width: 32,
      height: 32,
      borderRadius: "var(--r-sm)",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14
    }
  }, gigs.map(g => {
    const cv = g.suppliers && g.suppliers.length ? HL.contractValue(g) : null;
    const clickable = g.suppliers && g.suppliers.length > 0;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      onClick: () => {
        if (clickable) {
          onClose();
          go("suppliers", g.id);
        }
      },
      onMouseEnter: e => {
        e.currentTarget.style.borderColor = clickable ? "var(--gd-400)" : "var(--border-hair)";
        e.currentTarget.style.transform = clickable ? "translateY(-2px)" : "none";
      },
      onMouseLeave: e => {
        e.currentTarget.style.borderColor = "var(--border-hair)";
        e.currentTarget.style.transform = "none";
      },
      style: {
        background: "var(--surface-raised)",
        border: "1px solid var(--border-hair)",
        borderRadius: "var(--r-lg)",
        padding: 20,
        cursor: clickable ? "pointer" : "default",
        transition: "var(--tr-all)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: stageColor[g.stage] || "var(--ob-300)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "1px",
        textTransform: "uppercase"
      }
    }, "\u25C6 ", stageLabel[g.stage] || g.stage), /*#__PURE__*/React.createElement(Tag, null, g.type)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 700,
        color: "var(--ob-50)",
        marginBottom: 4,
        lineHeight: 1.2
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "var(--ob-200)",
        marginBottom: 10
      }
    }, g.event), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)",
        marginBottom: 4
      }
    }, g.date, g.time ? ` · ${g.time}` : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)",
        marginBottom: cv ? 14 : 0
      }
    }, g.venue), cv && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 20,
        color: "var(--gd-300)",
        fontWeight: 500
      }
    }, HL.pesoK(cv)));
  })));
}
function CollectedPanel({
  gigs,
  HL,
  onClose
}) {
  const total = gigs.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = gigs.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--success-text)",
      marginBottom: 6
    }
  }, "Collected"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--ob-50)"
    }
  }, HL.pesoK(collected), " received to date")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-200)",
      width: 32,
      height: 32,
      borderRadius: "var(--r-sm)",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Total Contracted",
    value: HL.pesoK(total)
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(collected),
    tone: "success",
    sub: {
      text: Math.round(collected / total * 100) + "% of total",
      tone: "up"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Still Owed",
    value: HL.pesoK(total - collected),
    tone: "warning"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, gigs.map((g, i) => {
    const cv = HL.contractValue(g);
    const paid = cv * g.clientPaidPct / 100;
    const fullyPaid = g.clientPaidPct >= 100;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        padding: "18px 0",
        borderBottom: i < gigs.length - 1 ? "1px solid var(--border-divider)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: "var(--ob-50)",
        marginBottom: 3
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--ob-300)"
      }
    }, g.event, " \xB7 ", g.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 22,
        color: "var(--success-text)",
        lineHeight: 1
      }
    }, HL.peso(paid)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)",
        marginTop: 4
      }
    }, "of ", HL.peso(cv))), fullyPaid && /*#__PURE__*/React.createElement(Tag, {
      tone: "green"
    }, "\u2713 Paid in full")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Bar, {
      pct: g.clientPaidPct,
      color: "var(--success)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--success-text)",
        flexShrink: 0
      }
    }, g.clientPaidPct, "%")));
  })));
}
function OutstandingPanel({
  gigs,
  HL,
  onClose
}) {
  const outstanding = gigs.filter(g => g.clientPaidPct < 100);
  const totalOut = outstanding.reduce((s, g) => s + HL.contractValue(g) * ((100 - g.clientPaidPct) / 100), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--warning-text)",
      marginBottom: 6
    }
  }, "Outstanding"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--ob-50)"
    }
  }, HL.pesoK(totalOut), " uncollected")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-200)",
      width: 32,
      height: 32,
      borderRadius: "var(--r-sm)",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, outstanding.map(g => {
    const cv = HL.contractValue(g);
    const paid = cv * g.clientPaidPct / 100;
    const owed = cv - paid;
    const overdue = g.clientPaidPct === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        background: overdue ? "rgba(239,68,68,0.05)" : "var(--surface-raised)",
        border: `1px solid ${overdue ? "rgba(239,68,68,0.2)" : "var(--border-hair)"}`,
        borderRadius: "var(--r-lg)",
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: "var(--ob-50)"
      }
    }, g.client), overdue && /*#__PURE__*/React.createElement(Tag, {
      tone: "rose"
    }, "\u26A0 Overdue")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--ob-300)"
      }
    }, g.event, " \xB7 ", g.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 24,
        color: overdue ? "var(--danger-text)" : "var(--warning-text)",
        lineHeight: 1
      }
    }, HL.peso(owed)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)",
        marginTop: 4
      }
    }, g.clientPaidPct, "% paid \xB7 ", HL.peso(cv), " total"))), /*#__PURE__*/React.createElement(Bar, {
      pct: g.clientPaidPct,
      color: overdue ? "var(--danger)" : "var(--warning)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      size: "sm",
      variant: overdue ? "danger" : "secondary",
      icon: "message",
      onClick: () => window.hlToast(`Payment reminder sent to ${g.client} ✓`)
    }, "Send reminder"), /*#__PURE__*/React.createElement(Btn, {
      size: "sm",
      variant: "ghost",
      icon: "phone",
      onClick: () => window.open("https://wa.me/63", "_blank")
    }, "Call client")));
  })));
}
function ContractedPanel({
  gigs,
  HL,
  onClose
}) {
  const total = gigs.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = gigs.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 6
    }
  }, "Contracted"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--ob-50)"
    }
  }, HL.pesoK(total), " across ", gigs.length, " gigs")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-200)",
      width: 32,
      height: 32,
      borderRadius: "var(--r-sm)",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Total Contracted",
    value: HL.pesoK(total)
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(collected),
    tone: "success",
    sub: {
      text: Math.round(collected / total * 100) + "% of total",
      tone: "up"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Outstanding",
    value: HL.pesoK(total - collected),
    tone: "warning"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, gigs.map((g, i) => {
    const cv = HL.contractValue(g);
    const paid = cv * g.clientPaidPct / 100;
    const overdue = g.clientPaidPct === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        padding: "18px 0",
        borderBottom: i < gigs.length - 1 ? "1px solid var(--border-divider)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: "var(--ob-50)",
        marginBottom: 3
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--ob-300)"
      }
    }, g.event, " \xB7 ", g.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 22,
        color: "var(--gd-300)",
        lineHeight: 1
      }
    }, HL.peso(cv)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: overdue ? "var(--danger-text)" : "var(--ob-300)",
        marginTop: 4
      }
    }, overdue ? "⚠ Awaiting downpayment" : `${g.clientPaidPct}% paid · ${HL.peso(paid)}`))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(Bar, {
      pct: g.clientPaidPct,
      color: overdue ? "var(--danger)" : "var(--grad-gold)"
    })));
  })));
}

// ───────────────────────── OVERVIEW ─────────────────────────
function Overview({
  go
}) {
  const HL = window.HL;
  const active = HL.activeGigs;
  const fin = HL.financeGigs;
  const contracted = fin.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = fin.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  const outstanding = contracted - collected;
  const next = HL.gigById("kia");
  const [modal, setModal] = React.useState(null);
  const alerts = [{
    tone: "success",
    title: "★ 9th Nation Builders & MosLiv Award — Int'l Female Host for Advocacy",
    meta: "Alongside Gov. Vilma Santos-Recto & Mayor Vico Sotto · Okada Manila Grand Ballroom · Nov 27, 2025",
    cta: null
  }, {
    tone: "warning",
    title: "🌏 New Role: COO for Asia — Andre Norman (Ambassador of Hope)",
    meta: "Appointed May 29, 2026 · Bringing hope & transformation across the Asia region",
    cta: null
  }, {
    tone: "success",
    title: "👑 Historic: First Lady of the Philippines in audience — NWMC 2026",
    meta: "National Women's Month Congress · March 9, 2026 · Highest-profile audience possible in PH",
    cta: null
  }];
  const toneBg = {
    danger: "rgba(239,68,68,0.06)",
    warning: "rgba(245,158,11,0.06)",
    success: "rgba(34,197,94,0.06)"
  };
  const toneBd = {
    danger: "rgba(239,68,68,0.18)",
    warning: "rgba(245,158,11,0.18)",
    success: "rgba(34,197,94,0.15)"
  };
  const toneDot = {
    danger: "var(--danger)",
    warning: "var(--warning)",
    success: "var(--success)"
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1
    }
  }, modal && /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal(null),
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.72)",
      backdropFilter: "blur(8px)",
      zIndex: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 920,
      maxHeight: "82vh",
      overflowY: "auto",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--r-xl)",
      boxShadow: "var(--shadow-deep)"
    }
  }, modal === "active" && /*#__PURE__*/React.createElement(ActiveGigsPanel, {
    gigs: active,
    HL: HL,
    onClose: () => setModal(null),
    go: go
  }), modal === "contracted" && /*#__PURE__*/React.createElement(ContractedPanel, {
    gigs: fin,
    HL: HL,
    onClose: () => setModal(null)
  }), modal === "collected" && /*#__PURE__*/React.createElement(CollectedPanel, {
    gigs: fin,
    HL: HL,
    onClose: () => setModal(null)
  }), modal === "outstanding" && /*#__PURE__*/React.createElement(OutstandingPanel, {
    gigs: fin,
    HL: HL,
    onClose: () => setModal(null)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 196,
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      marginBottom: 24,
      border: "1px solid var(--border-strong)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(95deg, rgba(10,10,20,0.72) 0%, rgba(10,10,20,0.38) 55%, rgba(10,10,20,0.08) 100%)",
      backdropFilter: "blur(0px)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: "0 36px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 11,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 8
    }
  }, "Welcome back, Boss \u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 700,
      color: "var(--ob-50)",
      lineHeight: 1.05
    }
  }, "The empire, at a glance."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-200)",
      marginTop: 8
    }
  }, "14+ years \xB7 100+ events in 2025 \xB7 ", active.length, " active gigs \xB7 next up ", next.client, ", ", next.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 42,
    glowColor: "40 65 55",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 28,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("active"),
    style: {
      cursor: "pointer"
    },
    title: "View all active gigs"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Active Gigs",
    value: active.length,
    sub: {
      text: "↑ +2 this month · tap to expand",
      tone: "up"
    }
  }))), /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 42,
    glowColor: "40 65 55",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 28,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("contracted"),
    style: {
      cursor: "pointer"
    },
    title: "View all contracted gigs"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Contracted",
    value: HL.pesoK(contracted),
    sub: {
      text: "across active events · tap to expand",
      tone: "muted"
    }
  }))), /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 42,
    glowColor: "40 65 55",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 28,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("collected"),
    style: {
      cursor: "pointer"
    },
    title: "View collection breakdown"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(collected),
    tone: "success",
    sub: {
      text: Math.round(collected / contracted * 100) + "% of contracted · tap",
      tone: "up"
    }
  }))), /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 42,
    glowColor: "40 65 55",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 28,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("outstanding"),
    style: {
      cursor: "pointer"
    },
    title: "View outstanding invoices"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Outstanding",
    value: HL.pesoK(outstanding),
    tone: "warning",
    sub: {
      text: "1 overdue · tap to review",
      tone: "warn"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 40,
    glowColor: "30 10 10",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 28,
    glowIntensity: 1.4,
    coneSpread: 32,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Today's Alerts",
    icon: "bolt",
    style: {
      background: "transparent",
      border: "none",
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 12,
      background: toneBg[a.tone],
      border: `1px solid ${toneBd[a.tone]}`,
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: toneDot[a.tone],
      boxShadow: `0 0 6px ${toneDot[a.tone]}`,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)",
      marginTop: 2
    }
  }, a.meta)), a.cta && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: a.tone === "danger" ? "danger" : "secondary",
    onClick: a.act
  }, a.cta)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BorderGlow, {
    animated: true,
    edgeSensitivity: 38,
    glowColor: "45 65 60",
    backgroundColor: "var(--surface-card)",
    borderRadius: 14,
    glowRadius: 26,
    glowIntensity: 1.3,
    coneSpread: 29,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 16,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, "Next Confirmed Event")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--gd-400)",
      letterSpacing: "1px",
      marginBottom: 6
    }
  }, next.date.toUpperCase(), " \xB7 ", next.time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ob-50)",
      marginBottom: 4
    }
  }, next.client, " \u2014 ", next.event), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ob-300)",
      marginBottom: 12
    }
  }, next.venue, " \xB7 ~", next.pax, " guests"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "gold"
  }, next.type), /*#__PURE__*/React.createElement(Tag, {
    tone: "green"
  }, "Confirmed"), /*#__PURE__*/React.createElement(Tag, null, HL.pesoK(HL.contractValue(next))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    fullWidth: true,
    onClick: () => go("suppliers")
  }, "View suppliers"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    fullWidth: true,
    onClick: () => go("escrow")
  }, "Payment status")))), /*#__PURE__*/React.createElement(Card, {
    title: "Quick Actions",
    icon: "spark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [["kanban", "View the full gig pipeline", "pipeline"], ["suppliers", "Check supplier firewall & statuses", "suppliers"], ["escrow", "Escrow & payment tracker", "escrow"], ["discount", "Run the discount & margin engine", "discount"]].map(([ic, lbl, pg]) => /*#__PURE__*/React.createElement(BorderGlow, {
    key: pg,
    animated: true,
    edgeSensitivity: 52,
    glowColor: "45 55 50",
    backgroundColor: "var(--surface-raised)",
    borderRadius: 8,
    glowRadius: 22,
    glowIntensity: 1.25,
    coneSpread: 28,
    colors: ["#d4af37", "#c94560", "#e8ca6a"]
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go(pg),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      textAlign: "left",
      padding: "12px 14px",
      background: "transparent",
      border: "none",
      borderRadius: "var(--r-md)",
      color: "var(--ob-100)",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16
  })), lbl, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--ob-300)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }))))))))));
}

// ───────────────────────── PIPELINE ─────────────────────────
function Pipeline({
  openGig
}) {
  const HL = window.HL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "24px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Gig Pipeline",
    title: "Every deal, every stage.",
    sub: "Drag-free kanban of the whole book. Click any card to open its firewall, escrow and run-of-show."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 14
    }
  }, HL.STAGES.map(st => {
    const cards = HL.GIGS.filter(g => g.stage === st.key);
    return /*#__PURE__*/React.createElement("div", {
      key: st.key
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: st.color
      }
    }, st.glyph, " ", st.label), /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--ob-700)",
        color: "var(--ob-200)",
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 20,
        fontFamily: "var(--font-mono)"
      }
    }, cards.length)), cards.map(g => {
      const clickable = g.suppliers.length > 0;
      return /*#__PURE__*/React.createElement("div", {
        key: g.id,
        onClick: () => clickable && openGig(g.id),
        style: {
          background: "var(--surface-raised)",
          border: "1px solid var(--border-hair)",
          borderRadius: "var(--r-md)",
          padding: 14,
          marginBottom: 10,
          cursor: clickable ? "pointer" : "default",
          opacity: g.stage === "done" ? 0.55 : 1,
          transition: "var(--tr-all)"
        },
        onMouseEnter: e => {
          if (clickable) {
            e.currentTarget.style.borderColor = "var(--border-strong)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = "var(--border-hair)";
          e.currentTarget.style.transform = "none";
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ob-50)",
          marginBottom: 4
        }
      }, g.client), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "var(--ob-200)",
          marginBottom: 8
        }
      }, g.event), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, g.stage === "confirmed" && /*#__PURE__*/React.createElement(Tag, {
        tone: "gold"
      }, HL.pesoK(HL.contractValue(g))), g.note && /*#__PURE__*/React.createElement(Tag, {
        tone: "rose"
      }, g.note), g.paid ? /*#__PURE__*/React.createElement(Tag, {
        tone: "green"
      }, "Paid \u2713") : /*#__PURE__*/React.createElement(Tag, null, g.date)));
    }));
  })));
}

// ───────────────────── SUPPLIERS / FIREWALL ─────────────────────
function Suppliers({
  gigId,
  setGigId,
  openSupplier
}) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter(g => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "24px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Supplier Firewall",
    title: "They work for you. They never see each other."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16,
      padding: "12px 16px",
      background: "rgba(212,175,55,0.05)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-100)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--gd-300)"
    }
  }, "Firewall active."), " Each supplier has a private channel and sees only their own scope \u2014 never the client's identity, your margin, or the other suppliers. Open a row to view their isolated portal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, gigs.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    onClick: () => setGigId(g.id),
    style: {
      padding: "7px 14px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      cursor: "pointer",
      border: "1px solid",
      transition: "var(--tr-all)",
      ...(g.id === gig.id ? {
        background: "var(--gd-400)",
        borderColor: "var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      } : {
        background: "none",
        borderColor: "var(--border-soft)",
        color: "var(--ob-200)"
      })
    }
  }, g.client))), /*#__PURE__*/React.createElement(Card, {
    title: `${gig.client} — ${gig.event}`,
    icon: "suppliers",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--ob-300)"
      }
    }, gig.date, " \xB7 ", gig.suppliers.length, " suppliers")
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Supplier", "Category", "Private channel", "Cue", "Status", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      textAlign: i === 5 ? "right" : "left",
      padding: "0 12px 10px",
      borderBottom: "1px solid var(--border-soft)",
      fontWeight: 600
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, gig.suppliers.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id,
    onClick: () => openSupplier(s.id),
    style: {
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(212,175,55,0.04)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)"
    }
  }, s.scope)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement(Tag, null, s.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--ob-200)"
    }
  }, s.contact), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      fontSize: 11,
      color: "var(--ob-200)"
    }
  }, s.cue), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: s.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: s.status === "late" ? "danger" : "secondary",
    icon: "phone",
    onClick: e => {
      e.stopPropagation();
      const raw = (s.contact || "").replace(/\D/g, "");
      const intl = raw.startsWith("0") ? "63" + raw.slice(1) : raw;
      window.open("https://wa.me/" + intl, "_blank");
    }
  }, s.status === "late" ? "Call now" : "Call")))))))));
}
const tdS = {
  padding: "13px 12px",
  borderBottom: "1px solid var(--border-divider)",
  fontSize: 13,
  color: "var(--ob-100)",
  verticalAlign: "middle"
};

// ───────────────────────── ESCROW ─────────────────────────
function Escrow() {
  const HL = window.HL;
  const gigs = HL.financeGigs;
  const [modal, setModal] = React.useState(null); // "contracted" | "collected" | "escrow" | "overdue"
  const totals = gigs.reduce((a, g) => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    a.contracted += cv;
    a.collected += paid;
    a.supCost += supCost;
    a.released += released;
    if (g.clientPaidPct === 0) a.overdue += cv;
    return a;
  }, {
    contracted: 0,
    collected: 0,
    supCost: 0,
    released: 0,
    overdue: 0
  });
  const MODALS = {
    contracted: {
      title: "Contracted Work",
      sub: "All confirmed event contracts and their full value breakdown.",
      rows: gigs.map(g => {
        const cv = HL.contractValue(g);
        const supCost = HL.supplierTotal(g, false);
        return {
          client: g.client,
          event: g.event,
          date: g.date,
          contract: HL.peso(cv),
          suppliers: HL.peso(supCost),
          fee: HL.peso(g.hostingFee),
          margin: HL.peso(cv - supCost - g.hostingFee)
        };
      }),
      cols: ["Client", "Event", "Date", "Contract Value", "Supplier Cost", "Hosting Fee", "Margin"],
      keys: ["client", "event", "date", "contract", "suppliers", "fee", "margin"]
    },
    collected: {
      title: "Collected Payments",
      sub: "What clients have paid so far versus total contracted.",
      rows: gigs.map(g => {
        const cv = HL.contractValue(g);
        const paid = cv * (g.clientPaidPct / 100);
        return {
          client: g.client,
          event: g.event,
          contract: HL.peso(cv),
          collected: HL.peso(paid),
          pct: g.clientPaidPct + "%",
          balance: HL.peso(cv - paid),
          status: g.clientPaidPct === 0 ? "⚠ Overdue" : g.clientPaidPct === 100 ? "✓ Paid" : "Partial"
        };
      }),
      cols: ["Client", "Event", "Total", "Collected", "% Paid", "Balance", "Status"],
      keys: ["client", "event", "contract", "collected", "pct", "balance", "status"]
    },
    escrow: {
      title: "Held in Escrow",
      sub: "Collected funds not yet released to suppliers — your float.",
      rows: gigs.map(g => {
        const cv = HL.contractValue(g);
        const paid = cv * (g.clientPaidPct / 100);
        const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
        return {
          client: g.client,
          event: g.event,
          collected: HL.peso(paid),
          released: HL.peso(released),
          held: HL.peso(paid - released)
        };
      }),
      cols: ["Client", "Event", "Collected", "Released", "Held"],
      keys: ["client", "event", "collected", "released", "held"]
    },
    overdue: {
      title: "Overdue Balances",
      sub: "Clients with zero or late payment — action required.",
      rows: gigs.filter(g => g.clientPaidPct < 100).map(g => {
        const cv = HL.contractValue(g);
        const paid = cv * (g.clientPaidPct / 100);
        return {
          client: g.client,
          event: g.event,
          date: g.date,
          contract: HL.peso(cv),
          paid: HL.peso(paid),
          outstanding: HL.peso(cv - paid),
          pct: g.clientPaidPct + "% paid"
        };
      }),
      cols: ["Client", "Event", "Date", "Contract", "Paid", "Outstanding", "Progress"],
      keys: ["client", "event", "date", "contract", "paid", "outstanding", "pct"]
    }
  };
  const m = modal && MODALS[modal];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "24px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, m && /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal(null),
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.78)",
      backdropFilter: "blur(10px)",
      zIndex: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 960,
      maxHeight: "86vh",
      overflowY: "auto",
      background: "var(--surface-card)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--r-xl)",
      boxShadow: "var(--shadow-deep)",
      padding: "32px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 10,
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 6
    }
  }, "Escrow \xB7 ", m.title), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: 26,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "var(--ob-300)"
    }
  }, m.sub)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModal(null),
    style: {
      background: "none",
      border: "none",
      color: "var(--ob-300)",
      fontSize: 22,
      cursor: "pointer",
      lineHeight: 1,
      marginTop: 2
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, m.cols.map(c => /*#__PURE__*/React.createElement("th", {
    key: c,
    style: {
      padding: "8px 12px",
      textAlign: "left",
      fontFamily: "var(--font-mono-alt)",
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, m.rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: "1px solid var(--border-divider)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(212,175,55,0.04)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, m.keys.map(k => /*#__PURE__*/React.createElement("td", {
    key: k,
    style: {
      padding: "13px 12px",
      fontSize: 13,
      color: k === "client" ? "var(--ob-50)" : k.includes("margin") || k === "held" ? "var(--success-text)" : k === "outstanding" ? "var(--warning-text)" : "var(--ob-100)",
      fontFamily: k === "contract" || k === "suppliers" || k === "fee" || k === "margin" || k === "collected" || k === "balance" || k === "paid" || k === "released" || k === "held" ? "var(--font-mono)" : "var(--font-body)",
      fontWeight: k === "client" ? 600 : 400
    }
  }, row[k])))))))), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Escrow Tracker",
    title: "Client pays you. You release suppliers.",
    sub: "Money sits with you between collection and event sign-off \u2014 your leverage, your float, your protection."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("contracted"),
    style: {
      cursor: "pointer"
    },
    title: "Click for full breakdown"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Contracted",
    value: HL.pesoK(totals.contracted)
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("collected"),
    style: {
      cursor: "pointer"
    },
    title: "Click for full breakdown"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Collected",
    value: HL.pesoK(totals.collected),
    tone: "success"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("escrow"),
    style: {
      cursor: "pointer"
    },
    title: "Click for full breakdown"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Held in escrow",
    value: HL.pesoK(totals.collected - totals.released),
    tone: "default",
    sub: {
      text: "not yet released · tap to expand",
      tone: "muted"
    }
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setModal("overdue"),
    style: {
      cursor: "pointer"
    },
    title: "Click for full breakdown"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Overdue",
    value: HL.pesoK(totals.overdue),
    tone: "danger",
    sub: {
      text: "1 client · tap to expand",
      tone: "down"
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Per-Event Escrow Flow",
    icon: "escrow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, gigs.map(g => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    const margin = cv - supCost - g.hostingFee;
    const overdue = g.clientPaidPct === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        padding: "16px 0",
        borderBottom: "1px solid var(--border-divider)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--ob-50)"
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--ob-300)"
      }
    }, g.event, " \xB7 ", g.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        color: "var(--ob-50)"
      }
    }, HL.peso(cv)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: overdue ? "var(--warning-text)" : "var(--ob-300)"
      }
    }, overdue ? "Awaiting downpayment — OVERDUE" : `${g.clientPaidPct}% collected`))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(EscrowStage, {
      label: "Client \u2192 You",
      amt: HL.peso(paid),
      of: HL.peso(cv),
      pct: g.clientPaidPct,
      color: overdue ? "var(--danger)" : "var(--grad-gold)"
    }), /*#__PURE__*/React.createElement(EscrowStage, {
      label: "You \u2192 Suppliers",
      amt: HL.peso(released),
      of: HL.peso(supCost),
      pct: Math.round(released / supCost * 100),
      color: "var(--ob-300)"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--ob-300)",
        marginBottom: 6
      }
    }, "Your margin"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        color: "var(--success-text)",
        marginBottom: 6
      }
    }, HL.peso(margin)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "var(--ob-300)"
      }
    }, "incl. \u20B1", g.hostingFee / 1000, "K hosting fee"))));
  }))));
}
function EscrowStage({
  label,
  amt,
  of,
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 15,
      color: "var(--ob-50)"
    }
  }, amt), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--ob-300)"
    }
  }, "/ ", of)), /*#__PURE__*/React.createElement(Bar, {
    pct: pct || 0,
    color: color
  }));
}

// ───────────────────── DISCOUNT / MARGIN ENGINE ─────────────────────
function DiscountEngine({
  gigId,
  setGigId
}) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter(g => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  const floor = HL.supplierTotal(gig, true);
  const quoted = HL.supplierTotal(gig, false);
  const [markup, setMarkup] = React.useState(gig.markupPct);
  const [hosting, setHosting] = React.useState(gig.hostingFee);
  const [discount, setDiscount] = React.useState(0); // % off client price
  React.useEffect(() => {
    setMarkup(gig.markupPct);
    setHosting(gig.hostingFee);
    setDiscount(0);
  }, [gig.id]);
  const baseClient = quoted * (1 + markup / 100) + hosting;
  const clientPrice = baseClient * (1 - discount / 100);
  const margin = clientPrice - quoted; // what you keep after paying supplier quotes
  const marginPct = clientPrice ? margin / clientPrice * 100 : 0;
  const protectedFloor = clientPrice - floor; // cushion above true supplier floor
  const danger = clientPrice < quoted;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "24px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Discount & Margin Engine",
    title: "Give the number. Keep the margin.",
    sub: "Discounts come off your markup \u2014 never the supplier floor. Simulate before you commit on the call."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, gigs.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    onClick: () => setGigId(g.id),
    style: {
      padding: "7px 14px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      cursor: "pointer",
      border: "1px solid",
      transition: "var(--tr-all)",
      ...(g.id === gig.id ? {
        background: "var(--gd-400)",
        borderColor: "var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      } : {
        background: "none",
        borderColor: "var(--border-soft)",
        color: "var(--ob-200)"
      })
    }
  }, g.client))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Simulator",
    icon: "discount"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Coordination markup",
    value: markup,
    min: 15,
    max: 45,
    step: 1,
    unit: "%",
    onChange: setMarkup,
    hint: "House rule: 25\u201340% covers follow-ups, day-of stress, contingency."
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Hosting fee",
    value: hosting,
    min: 0,
    max: 120000,
    step: 1000,
    unit: "\u20B1",
    fmt: HL.peso,
    onChange: setHosting,
    hint: "Your on-mic talent fee, separate from supplier coordination."
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Client discount",
    value: discount,
    min: 0,
    max: 25,
    step: 1,
    unit: "%",
    onChange: setDiscount,
    hint: "\u201CSuki na tayo, pwede pa bumaba?\u201D \u2014 give it off the markup.",
    accent: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-divider)",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    onClick: () => setDiscount(d => Math.min(25, d + 5))
  }, "+5% off"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    onClick: () => {
      setDiscount(10);
      window.hlToast("Loyalty scenario: 10% off the markup");
    }
  }, "Repeat-client loyalty"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      setMarkup(gig.markupPct);
      setHosting(gig.hostingFee);
      setDiscount(0);
    }
  }, "Reset"))), /*#__PURE__*/React.createElement(Card, {
    title: "Quote Breakdown",
    icon: "card",
    style: danger ? {
      borderColor: "var(--danger)"
    } : null
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Supplier floor (true cost)",
    v: HL.peso(floor),
    mono: true,
    dim: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Supplier quotes (what you pay)",
    v: HL.peso(quoted),
    mono: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: `+ Coordination markup (${markup}%)`,
    v: HL.peso(quoted * markup / 100),
    mono: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: "+ Hosting fee",
    v: HL.peso(hosting),
    mono: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-divider)",
      margin: "8px 0"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    k: "List package price",
    v: HL.peso(baseClient),
    mono: true
  }), discount > 0 && /*#__PURE__*/React.createElement(Row, {
    k: `− Client discount (${discount}%)`,
    v: "− " + HL.peso(baseClient - clientPrice),
    mono: true,
    tone: "rose"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 16,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-200)",
      marginBottom: 6
    }
  }, "Client pays"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 30,
      fontWeight: 500,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, HL.peso(clientPrice))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Mini, {
    label: "Your margin",
    value: HL.peso(margin),
    pct: `${marginPct.toFixed(0)}% of price`,
    tone: danger ? "danger" : "success"
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Floor cushion",
    value: HL.peso(protectedFloor),
    pct: "above true cost",
    tone: protectedFloor < 0 ? "danger" : "default"
  })), danger && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11.5,
      color: "var(--danger-text)",
      textAlign: "center"
    }
  }, "\u26A0 Below your supplier quotes \u2014 you'd be paying to work. Pull back the discount."))));
}
function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  fmt,
  onChange,
  hint,
  accent
}) {
  const disp = fmt ? fmt(value) : unit === "%" ? value + "%" : value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--ob-100)",
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: accent ? "var(--rose-400)" : "var(--gd-300)"
    }
  }, disp)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    style: {
      width: "100%",
      accentColor: accent ? "var(--rose-500)" : "var(--gd-400)",
      cursor: "pointer"
    }
  }), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--ob-300)",
      marginTop: 5,
      lineHeight: 1.4
    }
  }, hint));
}
function Row({
  k,
  v,
  mono,
  dim,
  tone
}) {
  const c = tone === "rose" ? "var(--rose-400)" : dim ? "var(--ob-300)" : "var(--ob-100)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "5px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: dim ? "var(--ob-300)" : "var(--ob-200)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono ? "var(--font-mono)" : "inherit",
      fontSize: 13,
      color: c
    }
  }, v));
}
function Mini({
  label,
  value,
  pct,
  tone
}) {
  const c = {
    success: "var(--success-text)",
    danger: "var(--danger-text)",
    default: "var(--gd-300)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-md)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 18,
      color: c,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "var(--ob-300)",
      marginTop: 4
    }
  }, pct));
}

// ───────────────────────── CALENDAR ─────────────────────────
function CalendarView({
  openGig
}) {
  const HL = window.HL;
  // July 2025 — starts on Tuesday (index 2)
  const events = {
    12: "kia",
    18: "jollibee",
    19: "piepco"
  };
  const first = 2,
    days = 31;
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 118px)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "18px 24px",
      border: "1px solid var(--border-hair)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Event Calendar",
    title: "July 2025",
    sub: "The booked month. Gold marks a confirmed event \u2014 click to open it."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const url = "https://calendar.google.com/calendar/r/eventedit?text=Host+Leigh+Events&dates=20250712T100000/20250712T220000&details=Sync+your+Host+Leigh+bookings+with+Google+Calendar.";
      window.open(url, "_blank");
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 18px",
      cursor: "pointer",
      borderRadius: "var(--r-sm)",
      border: "1px solid var(--border-soft)",
      background: "var(--surface-raised)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--ob-100)",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gd-400)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-soft)";
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
  })), "Google Calendar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Host Leigh//EN", "BEGIN:VEVENT", "DTSTART:20250712T100000Z", "DTEND:20250712T220000Z", "SUMMARY:Host Leigh — Empire Events", "DESCRIPTION:Sync your Host Leigh bookings with Apple Calendar.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const blob = new Blob([ics], {
        type: "text/calendar"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "host-leigh-events.ics";
      a.click();
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 18px",
      cursor: "pointer",
      borderRadius: "var(--r-sm)",
      border: "1px solid var(--border-soft)",
      background: "var(--surface-raised)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--ob-100)",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gd-400)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-soft)";
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })), "Apple Calendar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 6,
      marginBottom: 6
    }
  }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "hl-sparkle-gold",
    style: {
      fontSize: 24,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      textAlign: "center",
      padding: "6px 0",
      fontFamily: "var(--font-display)",
      fontWeight: 700
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gridTemplateRows: "repeat(5,1fr)",
      gap: 6
    }
  }, cells.map((d, i) => {
    const ev = d && events[d];
    const g = ev && HL.gigById(ev);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => g && openGig(g.id),
      style: {
        borderRadius: "var(--r-sm)",
        padding: 12,
        border: "1px solid var(--border-divider)",
        background: d ? "var(--surface-raised)" : "transparent",
        cursor: g ? "pointer" : "default",
        opacity: d ? 1 : 0,
        transition: "var(--tr-all)",
        minHeight: 0,
        ...(ev ? {
          borderColor: "var(--border-strong)"
        } : null)
      },
      onMouseEnter: e => {
        if (g) e.currentTarget.style.borderColor = "var(--gd-400)";
      },
      onMouseLeave: e => {
        if (g) e.currentTarget.style.borderColor = "var(--border-strong)";
      }
    }, d && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        color: ev ? "var(--gd-300)" : "var(--ob-300)"
      }
    }, d), g && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--ob-50)",
        lineHeight: 1.3
      }
    }, g.client), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--gd-400)",
        marginTop: 5,
        fontFamily: "var(--font-mono)"
      }
    }, g.time)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 160
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ob-100)",
      marginBottom: 3
    }
  }, "Sync with your calendar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-400)",
      lineHeight: 1.5
    }
  }, "Export your confirmed bookings to Apple or Google Calendar")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const url = "https://calendar.google.com/calendar/r/eventedit?text=Host+Leigh+Events&dates=20250712T100000/20250712T220000&details=Sync+your+Host+Leigh+bookings+with+Google+Calendar.";
      window.open(url, "_blank");
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 18px",
      cursor: "pointer",
      borderRadius: "var(--r-sm)",
      border: "1px solid var(--border-soft)",
      background: "var(--surface-raised)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--ob-100)",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gd-400)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-soft)";
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
  })), "Google Calendar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Host Leigh//EN", "BEGIN:VEVENT", "DTSTART:20250712T100000Z", "DTEND:20250712T220000Z", "SUMMARY:Host Leigh — Empire Events", "DESCRIPTION:Sync your Host Leigh bookings with Apple Calendar.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const blob = new Blob([ics], {
        type: "text/calendar"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "host-leigh-events.ics";
      a.click();
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 18px",
      cursor: "pointer",
      borderRadius: "var(--r-sm)",
      border: "1px solid var(--border-soft)",
      background: "var(--surface-raised)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--ob-100)",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gd-400)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-soft)";
      e.currentTarget.style.color = "var(--ob-100)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })), "Apple Calendar"))));
}

// ───────────────────────── PORTFOLIO (DomeGallery) ─────────────────────────
const PORTFOLIO_IMAGES = [{
  src: "assets/photos/leigh-office.jpeg",
  alt: "Corporate portrait"
}, {
  src: "assets/photos/leigh-veeam.jpeg",
  alt: "Veeam — Safe AI at Scale"
}, {
  src: "assets/photos/leigh-jollibee.jpeg",
  alt: "Jollibee Joy event"
}, {
  src: "assets/photos/leigh-gala.jpeg",
  alt: "Le French Gala"
}, {
  src: "assets/photos/leigh-speakerscon.jpeg",
  alt: "SpeakersCon PH"
}, {
  src: "assets/photos/leigh-pifpo.jpeg",
  alt: "PiFPO NCR Conference"
}, {
  src: "assets/photos/leigh-paris.jpeg",
  alt: "Editorial portrait"
}, {
  src: "assets/photos/leigh-portrait.jpeg",
  alt: "Beauty portrait"
}, {
  src: "assets/photos/leigh-event.jpeg",
  alt: "VIP party host"
}, {
  src: "assets/photos/leigh-working.jpeg",
  alt: "Behind the scenes"
}, {
  src: "assets/photos/leigh-selfie.jpeg",
  alt: "On-site selfie"
}];
function PortfolioView() {
  const HL = window.HL;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Portfolio",
    title: "Thirteen rooms she's owned.",
    sub: "Drag to rotate the dome \xB7 click any frame to enlarge. Real corporate stages across Metro Manila and beyond."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      paddingBottom: 6
    }
  }, [["8.2K", "Followers"], ["14+", "Years"], ["100%", "Recommend"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 20,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginTop: 5
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "66vh",
      minHeight: 460,
      borderRadius: "var(--r-xl)",
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      background: "var(--ob-950)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement(DomeGallery, {
    images: PORTFOLIO_IMAGES,
    fit: 0.62,
    minRadius: 420,
    grayscale: false,
    overlayBlurColor: "#161221",
    imageBorderRadius: "14px",
    openedImageBorderRadius: "16px",
    openedImageWidth: "340px",
    openedImageHeight: "440px"
  })));
}

// ───────────────────────── MEET LEIGH (+ Portfolio dome) ─────────────────────────
function MeetLeigh() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 12,
      background: "rgba(10,10,20,0.32)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "var(--r-lg)",
      padding: "16px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Portfolio",
    title: "Thirteen rooms she's owned.",
    sub: "Drag to rotate the dome \xB7 click any frame to enlarge. Real stages across Metro Manila and beyond."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      paddingBottom: 6
    }
  }, [["8.2K", "Followers"], ["14+", "Years"], ["100%", "Recommend"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 20,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginTop: 5
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "66vh",
      minHeight: 460,
      borderRadius: "var(--r-xl)",
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      background: "var(--ob-950)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement(DomeGallery, {
    images: PORTFOLIO_IMAGES,
    fit: 0.62,
    minRadius: 420,
    grayscale: false,
    overlayBlurColor: "#161221",
    imageBorderRadius: "14px",
    openedImageBorderRadius: "16px",
    openedImageWidth: "340px",
    openedImageHeight: "440px"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(10,10,20,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: "var(--r-xl)",
      padding: "24px 20px",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
      marginBottom: 20,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)",
      padding: "32px 36px",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--gd-300)",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1,
      background: "var(--grad-gold)"
    }
  }), "Meet your host"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-alt)",
      fontWeight: 700,
      fontSize: 58,
      lineHeight: 0.96,
      color: "var(--ob-50)",
      marginBottom: 10
    }
  }, "Leigh."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 19,
      fontStyle: "italic",
      color: "var(--gd-300)",
      marginBottom: 20,
      lineHeight: 1.25
    }
  }, "The voice that holds the room."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.75,
      color: "var(--ob-200)",
      margin: "0 0 10px",
      maxWidth: "50ch"
    }
  }, "Leighza Mir J. Estella \u2014 14+ years on stage since 2012. BA Communications, ABS-CBN trained, and completing a HarvardX Rhetoric certification. Over 100 events hosted in 2025 alone across 14 sectors \u2014 from intimate brand activations to a 12,000-person music festival. In May 2026 she was appointed COO for Asia under Andre Norman (Ambassador of Hope)."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.75,
      color: "var(--ob-300)",
      margin: "0 0 24px",
      maxWidth: "50ch"
    }
  }, "She has hosted at Okada Manila's Grand Ballroom alongside Gov. Vilma Santos-Recto and Mayor Vico Sotto \u2014 and in March 2026, the First Lady of the Philippines was in her audience. Every client who has left a review would book again: 100% recommend rate across 7 verified reviews."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    onClick: () => window.hlToast("Opening booking form…")
  }, "\u2726 Book Leigh"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    onClick: () => window.hlToast("Scrolling to gallery…")
  }, "See the portfolio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      minHeight: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      minHeight: 380,
      background: "center 22%/cover url('assets/photos/leigh-portrait.jpeg')"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Years Hosting",
    value: "14+",
    sub: {
      text: "Active since 2012",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Events in 2025",
    value: "100+",
    sub: {
      text: "Self-confirmed · still counting",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Largest Crowd",
    value: "12,000",
    sub: {
      text: "Neon Music Fest · SM City Fairview",
      tone: "muted"
    }
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Recommend Rate",
    value: "100%",
    tone: "success",
    sub: {
      text: "↑ 7 verified client reviews",
      tone: "up"
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "What She's About",
    icon: "spark",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14
    }
  }, [["01", "Presence", "Calm, magnetic stage presence that anchors a program from the first cue to the last applause."], ["02", "Precision", "Run sheets, cues and timings handled to the second — the night never drifts and nobody waits."], ["03", "Warmth", "Every guest, sponsor and couple treated like the reason the room exists in the first place."]].map(([num, title, desc]) => /*#__PURE__*/React.createElement("div", {
    key: num,
    style: {
      padding: "20px 22px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-divider)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      color: "var(--gd-300)",
      marginBottom: 10,
      lineHeight: 1
    }
  }, num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--ob-50)",
      marginBottom: 7,
      fontFamily: "var(--font-display)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-300)",
      lineHeight: 1.65
    }
  }, desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: "14px 20px",
      background: "rgba(212,175,55,0.04)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-md)",
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: 15.5,
      color: "var(--ob-200)",
      lineHeight: 1.5
    }
  }, "\"She didn't just run the program \u2014 she made it unforgettable.\"")), /*#__PURE__*/React.createElement(Card, {
    title: "On Stage & On the Carpet",
    icon: "portfolio",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gridAutoRows: "200px",
      gap: 8
    }
  }, ["uploads/IMG_1305-6ff24187.JPG", "uploads/IMG_1306-bceef42a.JPG", "uploads/IMG_1307-b068fff7.JPG", "uploads/IMG_1308-78232945.JPG", "uploads/IMG_1309-f5edab79.JPG", "uploads/IMG_1310-e667480c.JPG", "uploads/IMG_1311-6beecea4.JPG", "uploads/IMG_1312-5d84b3f9.JPG", "uploads/IMG_1313-4f6023e0.JPG", "uploads/IMG_1314-d9f431fa.JPG", "uploads/IMG_1315-fd12fd1f.JPG", "uploads/IMG_1316-e59acebb.JPG", "uploads/IMG_1317-7f9ee48e.JPG", "uploads/IMG_1318-53c8fc46.JPG", "uploads/IMG_1319-2679714b.JPG", "uploads/IMG_1320-6d251b17.JPG", "uploads/IMG_1321-90fd8c45.JPG", "uploads/IMG_1322-60f94129.JPG", "uploads/IMG_1323-dda6d0b2.JPG", "uploads/IMG_1324-6ce3dcb9.JPG", "uploads/IMG_1325-cacb9d88.JPG", "uploads/IMG_1326-a9e5d340.JPG", "uploads/IMG_1327-86c630dc.JPG", "uploads/IMG_1328-67adcfa9.JPG", "uploads/IMG_1329-877f67c6.JPG", "uploads/IMG_1330-4f17fc1b.JPG", "uploads/IMG_1331-4289b06d.JPG", "uploads/IMG_1332-3fcc8f12.JPG", "uploads/IMG_1333-7288b39f.JPG", "uploads/IMG_1334-513cb657.JPG", "uploads/IMG_1335-d41270e6.JPG", "uploads/IMG_1336-bc6515e9.JPG", "uploads/IMG_1337-586d72f5.JPG", "uploads/IMG_1338-fbd1904c.JPG", "uploads/IMG_1339-0717a7a6.JPG", "uploads/IMG_1340-a8f3f2b6.JPG", "uploads/IMG_1341-bf09db4a.JPG", "uploads/IMG_1342-87efff6c.JPG", "uploads/IMG_1343-550b7565.JPG", "uploads/IMG_1344-0227615a.JPG", "uploads/IMG_1345-b2aeeadf.JPG", "uploads/IMG_1346-aba8a661.JPG", "uploads/IMG_1347-e24560bd.JPG", "uploads/IMG_1348-cece6270.JPG"].map((src, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRadius: "var(--r-md)",
      background: `center/cover url('${src}')`,
      border: "1px solid var(--border-soft)",
      backgroundSize: "cover"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 32px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-alt)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--ob-50)",
      marginBottom: 10,
      lineHeight: 1.05
    }
  }, "Have a night that deserves a host?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto 22px",
      fontSize: 14,
      color: "var(--ob-300)",
      maxWidth: "44ch",
      lineHeight: 1.6
    }
  }, "Tell Leigh the date, the room and the feeling you're after \u2014 she'll take it from there."), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    onClick: () => window.hlToast("Opening booking inquiry…")
  }, "\u2726 Check her availability"))));
}
Object.assign(window, {
  Overview,
  Pipeline,
  Suppliers,
  Escrow,
  DiscountEngine,
  CalendarView,
  PortfolioView,
  MeetLeigh
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/host.jsx", error: String((e && e.message) || e) }); }

// dashboard/lightfall.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — Lightfall (React Bits, ogl WebGL background)
   Adapted for the project's Babel/UMD React setup:
   - React hooks via React.useEffect/useRef
   - ogl is loaded as an ES module elsewhere and exposed on
     window.ogl; this component waits for it.
   - Exposed as window.Lightfall
   ============================================================ */
(function () {
  const MAX_COLORS = 8;
  const hexToRGB = hex => {
    const c = hex.replace("#", "").padEnd(6, "0");
    return [parseInt(c.slice(0, 2), 16) / 255, parseInt(c.slice(2, 4), 16) / 255, parseInt(c.slice(4, 6), 16) / 255];
  };
  const prepColors = input => {
    const base = (input && input.length ? input : ["#A6C8FF", "#5227FF", "#FF9FFC"]).slice(0, MAX_COLORS);
    const count = base.length;
    const arr = [];
    for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
    const avg = [0, 0, 0];
    for (let i = 0; i < count; i++) {
      avg[0] += arr[i][0];
      avg[1] += arr[i][1];
      avg[2] += arr[i][2];
    }
    avg[0] /= count;
    avg[1] /= count;
    avg[2] /= count;
    return {
      arr,
      count,
      avg
    };
  };
  const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
  const fragment = `
precision highp float;
uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;
uniform vec3  uBgColor;
uniform vec3  uMouseColor;
uniform float uSpeed;
uniform int   uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}
vec3 tanhv(vec3 x) {
  vec3 e = exp(-2.0 * x);
  return (1.0 - e) / (1.0 + e);
}
vec2 sceneC(vec2 frag, vec2 r) {
  vec2 P = (frag + frag - r) / r.x;
  float z = 0.0;
  float d = 1e3;
  vec4 O = vec4(0.0);
  for (int k = 0; k < 39; k++) {
    if (d <= 1e-4) break;
    O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
    d = 1.0 - sqrt(length(O * O));
    z += d;
  }
  return vec2(O.x, atan(O.z, O.y));
}
void mainImage(out vec4 o, vec2 C) {
  vec2 r = iResolution.xy;
  vec2 uv0 = (C + C - r) / r.x;
  float T = 0.1 * iTime * uSpeed + 9.0;
  float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
  vec2 Y = vec2(5e-3, 6.28318530718 / angRings);
  vec2 c0 = sceneC(C, r);
  vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);
  vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);
  vec2 dCx = cdx - c0;
  vec2 dCy = cdy - c0;
  dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);
  dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);
  vec2 fw = abs(dCx) + abs(dCy);
  C = c0;
  vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);
  vec4 O = vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);
  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mN = (iMouse + iMouse - r) / r.x;
    float md = length(uv0 - mN);
    mGlow = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;
    O.rgb += uMouseColor * mGlow * 0.25;
  }
  float zr = 5e-4 * uStreakWidth;
  vec2 rr = vec2(max(length(fw), 1e-5));
  float tail = 19.0 / max(uStreakLength, 0.05);
  for (int m = 0; m < 16; m++) {
    if (m >= uStreakCount) break;
    float jf = float(m) + 1.0;
    float ic = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));
    vec2 Pp = C - (T + T * ic) * vec2(0.0, 1.0);
    Pp -= floor(Pp / Y + 0.5) * Y;
    float h = fract(8663.0 * ic);
    vec3 col = palette(h);
    float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);
    weight *= (1.0 + mGlow * 2.0);
    vec2 inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;
    vec2 sm = vec2(1.0) - smoothstep(-rr, rr, inner);
    O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;
    C.x += Y.x / 8.0;
  }
  vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));
  o = vec4(colr, uOpacity);
}
void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;
  function Lightfall(props) {
    const {
      className,
      dpr,
      paused = false,
      colors = ["#A6C8FF", "#5227FF", "#FF9FFC"],
      backgroundColor = "#0A29FF",
      speed = 0.5,
      streakCount = 2,
      streakWidth = 1,
      streakLength = 1,
      glow = 1,
      density = 0.6,
      twinkle = 1,
      zoom = 3,
      backgroundGlow = 0.5,
      opacity = 1,
      mouseInteraction = true,
      mouseStrength = 0.5,
      mouseRadius = 1,
      mouseDampening = 0.15,
      mixBlendMode
    } = props;
    const containerRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const programRef = React.useRef(null);
    const meshRef = React.useRef(null);
    const geometryRef = React.useRef(null);
    const rendererRef = React.useRef(null);
    const mouseTargetRef = React.useRef([0, 0]);
    const lastTimeRef = React.useRef(0);
    React.useEffect(() => {
      let disposed = false;
      let teardown = null;
      const init = () => {
        const container = containerRef.current;
        const ogl = window.ogl;
        if (!container || !ogl) return null;
        const {
          Renderer,
          Program,
          Mesh,
          Triangle
        } = ogl;
        let renderer;
        try {
          renderer = new Renderer({
            dpr: dpr ?? (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1),
            alpha: true,
            antialias: true
          });
        } catch (e) {
          console.warn("Lightfall: WebGL unavailable", e);
          return null;
        }
        rendererRef.current = renderer;
        const gl = renderer.gl;
        const canvas = gl.canvas;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        container.appendChild(canvas);
        const {
          arr,
          count,
          avg
        } = prepColors(colors);
        const uniforms = {
          iResolution: {
            value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]
          },
          iMouse: {
            value: [0, 0]
          },
          iTime: {
            value: 0
          },
          uColor0: {
            value: arr[0]
          },
          uColor1: {
            value: arr[1]
          },
          uColor2: {
            value: arr[2]
          },
          uColor3: {
            value: arr[3]
          },
          uColor4: {
            value: arr[4]
          },
          uColor5: {
            value: arr[5]
          },
          uColor6: {
            value: arr[6]
          },
          uColor7: {
            value: arr[7]
          },
          uColorCount: {
            value: count
          },
          uBgColor: {
            value: hexToRGB(backgroundColor)
          },
          uMouseColor: {
            value: avg
          },
          uSpeed: {
            value: speed
          },
          uStreakCount: {
            value: Math.max(1, Math.min(16, Math.round(streakCount)))
          },
          uStreakWidth: {
            value: streakWidth
          },
          uStreakLength: {
            value: streakLength
          },
          uGlow: {
            value: glow
          },
          uDensity: {
            value: density
          },
          uTwinkle: {
            value: twinkle
          },
          uZoom: {
            value: zoom
          },
          uBgGlow: {
            value: backgroundGlow
          },
          uOpacity: {
            value: opacity
          },
          uMouseEnabled: {
            value: mouseInteraction ? 1 : 0
          },
          uMouseStrength: {
            value: mouseStrength
          },
          uMouseRadius: {
            value: mouseRadius
          }
        };
        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms
        });
        programRef.current = program;
        const geometry = new Triangle(gl);
        geometryRef.current = geometry;
        const mesh = new Mesh(gl, {
          geometry,
          program
        });
        meshRef.current = mesh;
        const resize = () => {
          const rect = container.getBoundingClientRect();
          renderer.setSize(rect.width, rect.height);
          uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);
        const onPointerMove = e => {
          const rect = canvas.getBoundingClientRect();
          const scale = renderer.dpr || 1;
          const x = (e.clientX - rect.left) * scale;
          const y = (rect.height - (e.clientY - rect.top)) * scale;
          mouseTargetRef.current = [x, y];
          if (mouseDampening <= 0) uniforms.iMouse.value = [x, y];
        };
        if (mouseInteraction) canvas.addEventListener("pointermove", onPointerMove);
        const liveStore = props.store;
        let liveColorsKey = (colors || []).join("|");
        const loop = t => {
          rafRef.current = requestAnimationFrame(loop);
          uniforms.iTime.value = t * 0.001;
          // Live tweak sync — read latest values from a shared store object
          // each frame so the Background panel updates uniforms without a rebuild.
          if (liveStore) {
            const u = uniforms;
            if (typeof liveStore.speed === "number") u.uSpeed.value = liveStore.speed;
            if (typeof liveStore.density === "number") u.uDensity.value = liveStore.density;
            if (typeof liveStore.glow === "number") u.uGlow.value = liveStore.glow;
            if (typeof liveStore.twinkle === "number") u.uTwinkle.value = liveStore.twinkle;
            if (typeof liveStore.streakCount === "number") u.uStreakCount.value = Math.max(1, Math.min(16, Math.round(liveStore.streakCount)));
            if (typeof liveStore.streakWidth === "number") u.uStreakWidth.value = liveStore.streakWidth;
            if (typeof liveStore.streakLength === "number") u.uStreakLength.value = liveStore.streakLength;
            if (typeof liveStore.zoom === "number") u.uZoom.value = liveStore.zoom;
            if (typeof liveStore.backgroundGlow === "number") u.uBgGlow.value = liveStore.backgroundGlow;
            if (typeof liveStore.opacity === "number") u.uOpacity.value = liveStore.opacity;
            if (typeof liveStore.mouseInteraction === "boolean") u.uMouseEnabled.value = liveStore.mouseInteraction ? 1 : 0;
            if (Array.isArray(liveStore.colors)) {
              const key = liveStore.colors.join("|") + "::" + (liveStore.backgroundColor || "");
              if (key !== liveColorsKey) {
                liveColorsKey = key;
                const cc = prepColors(liveStore.colors);
                u.uColor0.value = cc.arr[0];
                u.uColor1.value = cc.arr[1];
                u.uColor2.value = cc.arr[2];
                u.uColor3.value = cc.arr[3];
                u.uColor4.value = cc.arr[4];
                u.uColor5.value = cc.arr[5];
                u.uColor6.value = cc.arr[6];
                u.uColor7.value = cc.arr[7];
                u.uColorCount.value = cc.count;
                u.uMouseColor.value = cc.avg;
                if (liveStore.backgroundColor) u.uBgColor.value = hexToRGB(liveStore.backgroundColor);
              }
            }
          }
          if (mouseDampening > 0) {
            if (!lastTimeRef.current) lastTimeRef.current = t;
            const dt = (t - lastTimeRef.current) / 1000;
            lastTimeRef.current = t;
            const tau = Math.max(1e-4, mouseDampening);
            let factor = 1 - Math.exp(-dt / tau);
            if (factor > 1) factor = 1;
            const target = mouseTargetRef.current;
            const cur = uniforms.iMouse.value;
            cur[0] += (target[0] - cur[0]) * factor;
            cur[1] += (target[1] - cur[1]) * factor;
          } else {
            lastTimeRef.current = t;
          }
          if (!paused && programRef.current && meshRef.current) {
            try {
              renderer.render({
                scene: meshRef.current
              });
            } catch (e) {
              console.error(e);
            }
          }
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          if (mouseInteraction) canvas.removeEventListener("pointermove", onPointerMove);
          ro.disconnect();
          if (canvas.parentElement === container) container.removeChild(canvas);
          const callIfFn = (obj, key) => {
            if (obj && typeof obj[key] === "function") obj[key].call(obj);
          };
          callIfFn(programRef.current, "remove");
          callIfFn(geometryRef.current, "remove");
          callIfFn(meshRef.current, "remove");
          callIfFn(rendererRef.current, "destroy");
          programRef.current = null;
          geometryRef.current = null;
          meshRef.current = null;
          rendererRef.current = null;
        };
      };
      const start = () => {
        if (!disposed && !teardown) teardown = init();
      };
      if (window.ogl) start();else window.addEventListener("ogl-ready", start, {
        once: true
      });
      return () => {
        disposed = true;
        window.removeEventListener("ogl-ready", start);
        if (teardown) teardown();
      };
    }, [dpr, paused, colors, backgroundColor, speed, streakCount, streakWidth, streakLength, glow, density, twinkle, zoom, backgroundGlow, opacity, mouseInteraction, mouseStrength, mouseRadius, mouseDampening]);
    return /*#__PURE__*/React.createElement("div", {
      ref: containerRef,
      className: "lightfall-container " + (className || ""),
      style: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...(mixBlendMode ? {
          mixBlendMode
        } : null)
      }
    });
  }
  window.Lightfall = Lightfall;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/lightfall.jsx", error: String((e && e.message) || e) }); }

// dashboard/portals.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — PORTALS & DRAWERS
   ClientPortal · SupplierPortal (firewall demo) · GigDrawer.
   Exported to window.
   ============================================================ */

// ── shared message thread ──
function Thread({
  messages,
  meSide
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, messages.map((m, i) => {
    const mine = m.from === meSide;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        justifyContent: mine ? "flex-end" : "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "78%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "9px 13px",
        borderRadius: 12,
        fontSize: 12.5,
        lineHeight: 1.45,
        background: mine ? "var(--gd-400)" : "var(--surface-raised)",
        color: mine ? "var(--ob-950)" : "var(--ob-100)",
        border: mine ? "none" : "1px solid var(--border-hair)",
        borderBottomRightRadius: mine ? 3 : 12,
        borderBottomLeftRadius: mine ? 12 : 3
      }
    }, m.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9.5,
        color: "var(--ob-300)",
        marginTop: 3,
        textAlign: mine ? "right" : "left",
        fontFamily: "var(--font-mono)"
      }
    }, m.at)));
  }));
}
function FakeComposer({
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 14,
      paddingTop: 14,
      borderTop: "1px solid var(--border-divider)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "9px 13px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-sm)",
      fontSize: 12.5,
      color: "var(--ob-300)"
    }
  }, placeholder), /*#__PURE__*/React.createElement(Btn, {
    size: "md",
    variant: "primary",
    icon: "message",
    onClick: () => window.hlToast("Message sent")
  }, "Send"));
}

// ════════════════════ CLIENT PORTAL ════════════════════
// ─── Run-of-Show data per gig ───
const ROS_DATA = {
  kia: [{
    time: "17:00",
    activity: "Pre-event phase — AV & lighting final check",
    type: "phase"
  }, {
    time: "17:30",
    activity: "Supplier arrival window closes",
    note: "All caterers, AV, and florist confirmed on-site",
    type: "critical"
  }, {
    time: "18:00",
    activity: "Guest registration opens · cocktail hour begins",
    type: "normal"
  }, {
    time: "18:30",
    activity: "VIP guests arrive — dedicated reception lane",
    type: "vip"
  }, {
    time: "18:50",
    activity: "90-min Metro Manila buffer (EDSA / CBD routes)",
    note: "Auto-applied for all VIP transport",
    type: "buffer"
  }, {
    time: "19:00",
    activity: "Host Leigh opens the program",
    type: "normal"
  }, {
    time: "19:10",
    activity: "KIA brand film screening",
    type: "normal"
  }, {
    time: "19:30",
    activity: "Keynote address — KIA Philippines General Manager",
    type: "vip"
  }, {
    time: "20:00",
    activity: "Main program phase — dinner service begins",
    type: "phase"
  }, {
    time: "20:30",
    activity: "Live entertainment — band set 1",
    type: "normal"
  }, {
    time: "21:00",
    activity: "Main product reveal · KIA EV9",
    type: "vip"
  }, {
    time: "21:30",
    activity: "Photo opportunities · VIP table",
    type: "normal"
  }, {
    time: "21:45",
    activity: "Closing remarks by Host Leigh",
    type: "normal"
  }, {
    time: "22:00",
    activity: "Program ends · guests may continue networking",
    type: "buffer"
  }],
  piepco: [{
    time: "08:00",
    activity: "Pre-event phase — registration setup",
    type: "phase"
  }, {
    time: "08:30",
    activity: "Delegate registration opens",
    type: "normal"
  }, {
    time: "09:00",
    activity: "Opening ceremony — Host Leigh welcomes delegates",
    type: "normal"
  }, {
    time: "09:15",
    activity: "Keynote address — PIEPCO Board Chair",
    type: "vip"
  }, {
    time: "10:00",
    activity: "Morning sessions begin",
    type: "phase"
  }, {
    time: "12:00",
    activity: "Lunch break · networking",
    type: "buffer"
  }, {
    time: "13:00",
    activity: "Afternoon sessions resume",
    type: "phase"
  }, {
    time: "15:30",
    activity: "Panel discussion — industry leaders",
    type: "vip"
  }, {
    time: "16:30",
    activity: "Closing plenary — Host Leigh",
    type: "normal"
  }, {
    time: "17:00",
    activity: "Convention ends · certificate distribution",
    type: "buffer"
  }]
};
const DEFAULT_ROS = [{
  time: "17:30",
  activity: "Venue doors open — supplier final check",
  type: "phase"
}, {
  time: "18:00",
  activity: "Guest registration · cocktail hour",
  type: "normal"
}, {
  time: "18:45",
  activity: "VIP arrivals — dedicated lane",
  type: "vip"
}, {
  time: "19:00",
  activity: "Host Leigh opens the program",
  type: "normal"
}, {
  time: "19:30",
  activity: "Main program begins",
  type: "phase"
}, {
  time: "20:00",
  activity: "Dinner service",
  type: "normal"
}, {
  time: "21:00",
  activity: "Entertainment / awards segment",
  type: "vip"
}, {
  time: "21:45",
  activity: "Closing remarks",
  type: "normal"
}, {
  time: "22:00",
  activity: "Program ends",
  type: "buffer"
}];
function fmtTime(t) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return h12 + ":" + String(m).padStart(2, "0") + " " + ampm;
}

// Client sees: their event, ONE package price (never itemized),
// payment milestones, contract status, thread with host. No suppliers.
function ClientPortal({
  gigId,
  setGigId
}) {
  const HL = window.HL;
  const clientGigs = HL.financeGigs;
  const gig = HL.gigById(gigId) || clientGigs[0];
  const cv = HL.contractValue(gig);
  const milestones = [{
    label: "Booking downpayment",
    pct: 50,
    when: "On signing",
    done: gig.clientPaidPct >= 50
  }, {
    label: "Pre-event balance",
    pct: 40,
    when: "14 days before",
    done: gig.clientPaidPct >= 90
  }, {
    label: "Event-day release",
    pct: 10,
    when: "After sign-off",
    done: gig.clientPaidPct >= 100
  }];
  const paid = cv * gig.clientPaidPct / 100;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Lightfall, {
    colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: "#0d0b14",
    speed: 0.35,
    streakCount: 5,
    streakWidth: 0.8,
    streakLength: 1.1,
    glow: 0.9,
    density: 0.7,
    twinkle: 1,
    zoom: 2.5,
    backgroundGlow: 0.55,
    opacity: 0.5,
    mouseInteraction: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: "0 auto",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: `Client Portal · ${gig.client}`,
    title: "Your event with Host Leigh."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, clientGigs.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    onClick: () => setGigId(g.id),
    style: pillBtn(g.id === gig.id)
  }, g.client)))), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 16
    },
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      borderBottom: "1px solid var(--border-divider)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--gd-400)",
      letterSpacing: "1px",
      marginBottom: 8
    }
  }, gig.date.toUpperCase(), " \xB7 ", gig.time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      fontWeight: 600,
      color: "var(--ob-50)",
      marginBottom: 6
    }
  }, gig.event), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--ob-200)"
    }
  }, gig.venue, " \xB7 ~", gig.pax, " guests \xB7 Hosted by Leigh Estella")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      borderRight: "1px solid var(--border-divider)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 10
    }
  }, "All-in package"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 34,
      fontWeight: 500,
      color: "var(--gd-300)",
      lineHeight: 1,
      marginBottom: 8
    }
  }, HL.peso(cv)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ob-300)",
      lineHeight: 1.5
    }
  }, "Hosting, full supplier coordination, venue liaison, run-of-show and day-of production \u2014 one number, one point of contact."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "gold"
  }, gig.type), /*#__PURE__*/React.createElement(Tag, {
    tone: "green"
  }, "Contract signed"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 10
    }
  }, "Paid to date"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 22,
      color: "var(--success-text)",
      marginBottom: 8
    }
  }, HL.peso(paid)), /*#__PURE__*/React.createElement(Bar, {
    pct: gig.clientPaidPct,
    color: "var(--success)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)",
      marginTop: 8
    }
  }, gig.clientPaidPct, "% of ", HL.peso(cv))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Payment Schedule",
    icon: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, milestones.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "13px 0",
      borderBottom: i < 2 ? "1px solid var(--border-divider)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: m.done ? "var(--success)" : "transparent",
      border: m.done ? "none" : "1.5px solid var(--ob-400)",
      color: "var(--ob-950)"
    }
  }, m.done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    stroke: "var(--ob-950)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, m.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)"
    }
  }, m.when, " \xB7 ", m.pct, "% \xB7 ", HL.peso(cv * m.pct / 100))), m.done ? /*#__PURE__*/React.createElement(Tag, {
    tone: "green"
  }, "Paid \u2713") : /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    variant: "primary",
    icon: "card",
    onClick: () => window.hlToast(`Opening GCash / Maya payment link for ${HL.peso(cv * m.pct / 100)}…`)
  }, "Pay now")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 12,
      background: "rgba(212,175,55,0.05)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-md)",
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--ob-200)"
    }
  }, "Secured via GCash Business \xB7 Maya \xB7 BDO. Official receipt issued on every payment."))), /*#__PURE__*/React.createElement(Card, {
    title: "Messages with Leigh",
    icon: "message"
  }, /*#__PURE__*/React.createElement(Thread, {
    messages: HL.THREADS["client:" + gig.id] || HL.THREADS["client:kia"],
    meSide: "client"
  }), /*#__PURE__*/React.createElement(FakeComposer, {
    placeholder: "Message your host\u2026"
  }))), (() => {
    const rosItems = ROS_DATA[gig.id] || DEFAULT_ROS;
    const badgeMap = {
      vip: {
        bg: "rgba(212,175,55,0.12)",
        color: "var(--gd-300)",
        border: "rgba(212,175,55,0.3)",
        text: "VIP"
      },
      critical: {
        bg: "rgba(220,60,60,0.10)",
        color: "#ff8070",
        border: "rgba(220,60,60,0.28)",
        text: "⚠ Critical"
      },
      buffer: {
        bg: "rgba(78,205,196,0.08)",
        color: "#4ECDC4",
        border: "rgba(78,205,196,0.25)",
        text: "Buffer"
      }
    };
    const accentBorder = {
      vip: "rgba(212,175,55,0.55)",
      critical: "#ff6b6b",
      buffer: "rgba(78,205,196,0.4)",
      phase: "var(--gd-400)",
      normal: "var(--border-soft)"
    };
    return /*#__PURE__*/React.createElement(Card, {
      title: "Event Run of Show",
      icon: "calendar",
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        background: "rgba(255,107,107,0.05)",
        border: "1px solid rgba(255,107,107,0.18)",
        borderRadius: "var(--r-md)",
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        flexShrink: 0,
        lineHeight: 1
      }
    }, "\uD83D\uDEA6"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "rgba(255,170,140,0.9)",
        lineHeight: 1.65
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "#ff9a7a"
      }
    }, "Metro Manila Traffic Advisory (Auto-Applied):"), " All supplier arrivals include a 45-min buffer. VIP transport includes a 90-min EDSA / CBD buffer. Evening events (5\u20138 PM) add 30-min contingency.")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        paddingLeft: 52
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 20,
        top: 8,
        bottom: 8,
        width: 2,
        background: "linear-gradient(to bottom, var(--gd-400) 0%, rgba(212,175,55,0.06) 100%)",
        borderRadius: 2
      }
    }), rosItems.map((item, i) => {
      const isPhase = item.type === "phase";
      const badge = badgeMap[item.type];
      const dotFilled = isPhase || item.type === "vip";
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          position: "relative",
          marginBottom: i < rosItems.length - 1 ? isPhase ? 20 : 8 : 0,
          marginTop: isPhase && i > 0 ? 20 : 0,
          padding: isPhase ? "9px 14px" : "12px 16px",
          background: isPhase ? "rgba(212,175,55,0.05)" : "var(--surface-raised)",
          border: "1px solid " + (isPhase ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)"),
          borderLeft: "3px solid " + (accentBorder[item.type] || "var(--border-soft)"),
          borderRadius: "0 var(--r-sm) var(--r-sm) 0"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: -43,
          top: "50%",
          transform: "translateY(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dotFilled ? "var(--gd-400)" : "var(--surface-card)",
          border: "2px solid " + (item.type === "critical" ? "#ff6b6b" : item.type === "buffer" ? "#4ECDC4" : "var(--gd-400)"),
          boxShadow: dotFilled ? "0 0 8px rgba(212,175,55,0.45)" : "none"
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--gd-300)",
          minWidth: 74,
          letterSpacing: "0.3px",
          paddingTop: 1,
          flexShrink: 0
        }
      }, fmtTime(item.time)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: isPhase ? 11 : 13.5,
          fontWeight: isPhase ? 700 : 600,
          color: isPhase ? "var(--gd-400)" : "var(--ob-50)",
          letterSpacing: isPhase ? "0.9px" : 0,
          textTransform: isPhase ? "uppercase" : "none",
          lineHeight: 1.3
        }
      }, item.activity), item.note && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "var(--ob-300)",
          marginTop: 4,
          lineHeight: 1.55
        }
      }, item.note)), badge && /*#__PURE__*/React.createElement("span", {
        style: {
          padding: "2px 9px",
          borderRadius: "var(--r-pill)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          flexShrink: 0,
          marginTop: 2,
          background: badge.bg,
          color: badge.color,
          border: "1px solid " + badge.border
        }
      }, badge.text)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 28,
        paddingTop: 20,
        borderTop: "1px solid var(--border-divider)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      icon: "calendar",
      onClick: () => window.print()
    }, "Print / Save PDF"), /*#__PURE__*/React.createElement(Btn, {
      icon: "message",
      onClick: () => {
        const text = encodeURIComponent("Hi Leigh! Quick question about the run of show for " + gig.event + " on " + gig.date + "...");
        window.open("https://api.whatsapp.com/send?text=" + text, "_blank");
      }
    }, "WhatsApp Leigh"), /*#__PURE__*/React.createElement(Btn, {
      variant: "primary",
      icon: "card",
      onClick: () => window.hlToast("Opening change request thread with Leigh…")
    }, "Request a Change")));
  })()));
}

// ════════════════════ SUPPLIER PORTAL ════════════════════
// Supplier sees ONLY: event date/venue, their scope, their pay
// status, cue time, thread with host. Client masked. No peers.
function SupplierPortal({
  supplierId,
  setSupplierId,
  onBack
}) {
  const HL = window.HL;
  const all = [];
  HL.GIGS.forEach(g => g.suppliers.forEach(s => all.push({
    ...s,
    gig: g
  })));
  const cur = all.find(x => x.id === supplierId) || all[0];
  const g = cur.gig;
  const down = cur.quote * 0.5;
  const paidAmt = cur.quote * cur.paidPct / 100;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Lightfall, {
    colors: ["#d4af37", "#e8ca6a", "#c94560", "#d96275"],
    backgroundColor: "#0d0b14",
    speed: 0.3,
    streakCount: 6,
    streakWidth: 0.7,
    streakLength: 1.1,
    glow: 0.8,
    density: 0.6,
    twinkle: 0.9,
    zoom: 2.8,
    backgroundGlow: 0.5,
    opacity: 0.45,
    mouseInteraction: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 118px)",
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "7px 12px",
      background: "none",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--r-pill)",
      color: "var(--ob-200)",
      fontSize: 12,
      fontFamily: "var(--font-body)",
      cursor: "pointer",
      transition: "var(--tr-all)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--gd-400)";
      e.currentTarget.style.color = "var(--gd-300)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--border-soft)";
      e.currentTarget.style.color = "var(--ob-200)";
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 13,
    style: {
      transform: "rotate(180deg)"
    }
  }), "Back"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--gd-400)",
      marginBottom: 6
    }
  }, `Supplier Portal · ${cur.name}`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 700,
      color: "var(--ob-50)",
      lineHeight: 1.1
    }
  }, "Your engagement.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
      padding: "11px 16px",
      background: "rgba(212,175,55,0.05)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--ob-200)"
    }
  }, "You're booked by ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--gd-300)"
    }
  }, "Host Leigh Productions"), ". The end client and other suppliers are confidential \u2014 all coordination runs through Leigh.")), /*#__PURE__*/React.createElement(Card, {
    title: `${cur.name} — ${cur.cat}`,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Event date",
    value: `${g.date} · ${g.time}`
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Venue",
    value: g.venue
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Your call / cue",
    value: cur.cue
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-divider)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Your scope of work",
    value: cur.scope
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--ob-300)",
      letterSpacing: "1px",
      textTransform: "uppercase"
    }
  }, "Booking status"), /*#__PURE__*/React.createElement(StatusPill, {
    status: cur.status
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Your Payment",
    icon: "escrow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "8px 0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 6
    }
  }, "Agreed fee"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 28,
      color: "var(--gd-300)",
      lineHeight: 1
    }
  }, HL.peso(cur.quote))), /*#__PURE__*/React.createElement(PayLine, {
    label: "50% downpayment",
    amt: HL.peso(down),
    done: cur.paidPct >= 50,
    note: "On booking lock"
  }), /*#__PURE__*/React.createElement(PayLine, {
    label: "50% balance",
    amt: HL.peso(cur.quote - down),
    done: cur.paidPct >= 100,
    note: "NET 5 days post-event"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 11,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ob-300)"
    }
  }, "Released to you"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--success-text)"
    }
  }, HL.peso(paidAmt))), /*#__PURE__*/React.createElement(Bar, {
    pct: cur.paidPct,
    color: "var(--success)"
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Messages with Host Leigh",
    icon: "message"
  }, /*#__PURE__*/React.createElement(Thread, {
    messages: HL.THREADS["supplier:" + cur.id] || [{
      from: "host",
      t: `Hi ${cur.name}, confirming your booking for ${g.date}. Cue: ${cur.cue}.`,
      at: g.date
    }],
    meSide: "supplier"
  }), /*#__PURE__*/React.createElement(FakeComposer, {
    placeholder: "Reply to Host Leigh\u2026"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-soft)",
      paddingTop: 16,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "var(--ob-300)",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Switch supplier"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(all.length, 6)}, 1fr)`,
      gap: 8
    }
  }, all.map(s => {
    const active = s.id === cur.id;
    const statusColors = {
      confirmed: "var(--success)",
      pending: "var(--warning)",
      late: "var(--danger)",
      tbd: "var(--ob-400)"
    };
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => setSupplierId(s.id),
      style: {
        padding: "12px 10px",
        borderRadius: "var(--r-md)",
        cursor: "pointer",
        textAlign: "left",
        background: active ? "rgba(212,175,55,0.10)" : "var(--surface-raised)",
        border: `1px solid ${active ? "var(--gd-400)" : "var(--border-hair)"}`,
        transition: "var(--tr-all)",
        fontFamily: "var(--font-body)"
      },
      onMouseEnter: e => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--border-strong)";
          e.currentTarget.style.background = "rgba(212,175,55,0.04)";
        }
      },
      onMouseLeave: e => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--border-hair)";
          e.currentTarget.style.background = "var(--surface-raised)";
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: statusColors[s.status] || "var(--ob-400)",
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: active ? "var(--gd-300)" : "var(--ob-300)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)"
      }
    }, s.cat)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: active ? "var(--gd-300)" : "var(--ob-50)",
        lineHeight: 1.3,
        marginBottom: 3
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "var(--ob-300)",
        lineHeight: 1.3
      }
    }, s.cue));
  })))));
}
function Field({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ob-50)",
      fontWeight: 500
    }
  }, value));
}
function PayLine({
  label,
  amt,
  done,
  note
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0",
      borderBottom: "1px solid var(--border-divider)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: done ? "var(--success)" : "transparent",
      border: done ? "none" : "1.5px solid var(--ob-400)"
    }
  }, done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 11,
    stroke: "var(--ob-950)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-50)",
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--ob-300)"
    }
  }, note)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: done ? "var(--success-text)" : "var(--ob-200)"
    }
  }, amt));
}

// ════════════════════ GIG DRAWER (host) ════════════════════
function GigDrawer({
  gigId,
  onClose,
  go
}) {
  const HL = window.HL;
  const gig = gigId && HL.gigById(gigId);
  React.useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!gig) return null;
  const cv = HL.contractValue(gig);
  const ros = [{
    t: "6:00 PM",
    a: "Doors open · registration · cocktails"
  }, {
    t: "6:45 PM",
    a: "Opening AVP · host welcome (Leigh)"
  }, {
    t: "7:00 PM",
    a: "Client message · keynote"
  }, {
    t: "7:40 PM",
    a: "Dinner service · band set"
  }, {
    t: "8:30 PM",
    a: "Main program · product reveal"
  }, {
    t: "9:15 PM",
    a: "Photo ops · closing remarks"
  }];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(2px)",
      zIndex: 300,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 480,
      maxWidth: "92vw",
      height: "100%",
      overflowY: "auto",
      background: "var(--surface-card)",
      borderLeft: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-deep)",
      animation: "hlSlideIn 0.3s var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      background: "var(--glass-bg)",
      backdropFilter: "var(--blur-glass)",
      padding: "18px 24px",
      borderBottom: "1px solid var(--border-hair)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--gd-400)",
      letterSpacing: "1px",
      marginBottom: 5
    }
  }, gig.date.toUpperCase(), " \xB7 ", gig.time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 21,
      fontWeight: 600,
      color: "var(--ob-50)",
      lineHeight: 1.1
    }
  }, gig.client), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ob-300)",
      marginTop: 2
    }
  }, gig.event)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid var(--border-soft)",
      color: "var(--ob-200)",
      borderRadius: "var(--r-sm)",
      width: 30,
      height: 30,
      cursor: "pointer",
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Mini, {
    label: "Contract",
    value: HL.pesoK(cv),
    pct: `${gig.clientPaidPct}% paid`,
    tone: "default"
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Suppliers",
    value: gig.suppliers.length,
    pct: gig.venue.split("·")[0],
    tone: "default"
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Guests",
    value: gig.pax,
    pct: gig.type,
    tone: "default"
  })), /*#__PURE__*/React.createElement(SectionLabel, null, "Run of show"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      paddingLeft: 18,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      bottom: 4,
      width: 1.5,
      background: "var(--grad-rail)"
    }
  }), ros.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "relative",
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: -18,
      top: 4,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--gd-400)",
      boxShadow: "var(--glow-gold)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--gd-300)"
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--ob-100)",
      marginTop: 1
    }
  }, r.a)))), /*#__PURE__*/React.createElement(SectionLabel, null, "Suppliers on this gig"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 20
    }
  }, gig.suppliers.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--ob-300)"
    }
  }, s.cat, " \xB7 ", s.scope)), /*#__PURE__*/React.createElement(StatusPill, {
    status: s.status
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    fullWidth: true,
    icon: "suppliers",
    onClick: () => {
      onClose();
      go("suppliers", gig.id);
    }
  }, "Open firewall"), /*#__PURE__*/React.createElement(Btn, {
    fullWidth: true,
    icon: "discount",
    onClick: () => {
      onClose();
      go("discount", gig.id);
    }
  }, "Margin engine")))));
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--ob-300)",
      marginBottom: 12,
      fontWeight: 600
    }
  }, children);
}
function pillBtn(active) {
  return {
    padding: "7px 14px",
    borderRadius: "var(--r-pill)",
    fontFamily: "var(--font-body)",
    fontSize: 12,
    cursor: "pointer",
    border: "1px solid",
    transition: "var(--tr-all)",
    ...(active ? {
      background: "var(--gd-400)",
      borderColor: "var(--gd-400)",
      color: "var(--ob-950)",
      fontWeight: 600
    } : {
      background: "none",
      borderColor: "var(--border-soft)",
      color: "var(--ob-200)"
    })
  };
}
Object.assign(window, {
  ClientPortal,
  SupplierPortal,
  GigDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/portals.jsx", error: String((e && e.message) || e) }); }

// dashboard/ui.jsx
try { (() => {
/* ============================================================
   HOST LEIGH — UI PRIMITIVES (shared)
   Inline-styled, token-driven. Exported to window at the end.
   ============================================================ */

// ── ICON SET (single-stroke, 20px grid) ──
const HL_ICONS = {
  overview: "M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5",
  gigs: "M4 5h16M4 12h16M4 19h16",
  // overwritten below w/ kanban
  kanban: "M4 4h5v16H4zM10.5 4h5v10h-5zM17 4h3v7h-3z",
  suppliers: "M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.5-5 5-5s5 2 5 5M16 8h6M16 12h6M16 16h4",
  escrow: "M3 7h18v11H3zM3 7l4-3h10l4 3M8 13h.01M16 13h.01M12 11v4",
  discount: "M5 5h14v14H5zM8 8h.01M16 16h.01M8 16 16 8",
  calendar: "M4 6h16v15H4zM4 9h16M8 3v4M16 3v4M8 13h2M14 13h2M8 17h2",
  portfolio: "M4 7h16v13H4zM9 7V4h6v3M4 12h16",
  bell: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0",
  phone: "M5 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z",
  message: "M4 5h16v11H9l-4 4V5Z",
  plus: "M12 5v14M5 12h14",
  check: "M5 12l5 5 9-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
  lock: "M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5zM12 14v3",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 4-6 8-6s8 2 8 6",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  bolt: "M13 3 5 13h6l-1 8 8-10h-6z"
};
function Icon({
  name,
  size = 18,
  stroke = "currentColor",
  style
}) {
  const d = HL_ICONS[name] || HL_ICONS.overview;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: stroke,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}

// ── CARD ──
function Card({
  title,
  icon,
  action,
  children,
  style,
  pad = 20
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)",
      padding: pad,
      ...style
    }
  }, (title || action) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 16,
      gap: 8
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ob-50)"
    }
  }, title), action && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, action)), children);
}

// ── KPI CARD ──
function KPI({
  label,
  value,
  sub,
  tone = "default"
}) {
  const toneColor = {
    default: "var(--gd-300)",
    success: "var(--success-text)",
    warning: "var(--warning-text)",
    danger: "var(--danger-text)"
  }[tone];
  const subColor = {
    up: "var(--success-text)",
    warn: "var(--warning-text)",
    down: "var(--danger-text)",
    muted: "var(--ob-300)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)",
      padding: "18px 20px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--ob-300)",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 24,
      fontWeight: 500,
      color: toneColor,
      lineHeight: 1
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 7,
      color: subColor[sub.tone] || "var(--ob-300)"
    }
  }, sub.text));
}

// ── STATUS PILL ──
function StatusPill({
  status
}) {
  const s = window.HL.STATUS[status] || window.HL.STATUS.tbd;
  const map = {
    confirmed: {
      bg: "rgba(34,197,94,0.12)",
      c: "var(--success-text)"
    },
    pending: {
      bg: "rgba(245,158,11,0.12)",
      c: "var(--warning-text)"
    },
    late: {
      bg: "rgba(239,68,68,0.12)",
      c: "var(--danger-text)"
    },
    tbd: {
      bg: "rgba(255,255,255,0.06)",
      c: "var(--ob-200)"
    }
  }[s.cls];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 9px",
      borderRadius: "var(--r-pill)",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.5px",
      background: map.bg,
      color: map.c,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9
    }
  }, s.glyph), s.label);
}

// ── TAG ──
function Tag({
  children,
  tone = "default"
}) {
  const tones = {
    default: {
      bg: "var(--ob-700)",
      c: "var(--ob-100)"
    },
    gold: {
      bg: "rgba(212,175,55,0.15)",
      c: "var(--gd-300)"
    },
    rose: {
      bg: "rgba(201,69,96,0.15)",
      c: "var(--rose-200)"
    },
    green: {
      bg: "rgba(34,197,94,0.12)",
      c: "var(--success-text)"
    }
  };
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      padding: "2px 8px",
      borderRadius: 4,
      background: t.bg,
      color: t.c,
      fontFamily: "var(--font-mono)",
      whiteSpace: "nowrap"
    }
  }, children);
}

// ── GENERIC BUTTON (mirrors DS Button.jsx, inline) ──
function Btn({
  children,
  variant = "secondary",
  size = "md",
  icon,
  onClick,
  style,
  disabled,
  fullWidth
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: "5px 10px",
      fontSize: 11
    },
    md: {
      padding: "7px 14px",
      fontSize: 12
    }
  };
  const pal = {
    primary: {
      base: {
        background: "var(--gd-400)",
        border: "1px solid var(--gd-400)",
        color: "var(--ob-950)",
        fontWeight: 600
      },
      hover: {
        background: "var(--gd-300)",
        borderColor: "var(--gd-300)"
      }
    },
    secondary: {
      base: {
        background: "none",
        border: "1px solid var(--border-soft)",
        color: "var(--ob-100)",
        fontWeight: 500
      },
      hover: {
        background: "rgba(212,175,55,0.08)",
        borderColor: "var(--gd-400)",
        color: "var(--gd-300)"
      }
    },
    ghost: {
      base: {
        background: "none",
        border: "1px solid transparent",
        color: "var(--ob-200)",
        fontWeight: 500
      },
      hover: {
        background: "rgba(212,175,55,0.06)",
        color: "var(--ob-50)"
      }
    },
    danger: {
      base: {
        background: "none",
        border: "1px solid var(--danger)",
        color: "var(--danger-text)",
        fontWeight: 600
      },
      hover: {
        background: "rgba(239,68,68,0.10)"
      }
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      borderRadius: "var(--r-sm)",
      fontFamily: "var(--font-body)",
      lineHeight: 1.2,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--tr-all)",
      width: fullWidth ? "100%" : undefined,
      opacity: disabled ? 0.4 : 1,
      ...sizes[size],
      ...pal.base,
      ...(hover && !disabled ? pal.hover : null),
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === "sm" ? 13 : 14
  }), children);
}

// ── TOAST (global) ──
function ToastHost() {
  const [msg, setMsg] = React.useState(null);
  React.useEffect(() => {
    window.hlToast = m => {
      setMsg(m);
      clearTimeout(window.__hlT);
      window.__hlT = setTimeout(() => setMsg(null), 2600);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: `translateX(-50%) translateY(${msg ? 0 : 20}px)`,
      opacity: msg ? 1 : 0,
      transition: "all 0.3s var(--ease-standard)",
      zIndex: 500,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--ob-800)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--r-md)",
      padding: "11px 18px",
      boxShadow: "var(--shadow-deep)",
      fontSize: 13,
      color: "var(--ob-50)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gd-400)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  })), msg));
}

// ── PAGE HERO (eyebrow + serif headline) ──
function PageHero({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono-alt)",
      fontSize: 10,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--gd-400)",
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 26,
      fontWeight: 700,
      color: "var(--ob-50)",
      lineHeight: 1.1
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--ob-300)",
      marginTop: 8,
      maxWidth: 560
    }
  }, sub));
}

// ── PROGRESS BAR ──
function Bar({
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: 5,
      background: "var(--ob-700)",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: pct + "%",
      borderRadius: 3,
      background: color || "var(--grad-gold)",
      transition: "width 0.4s var(--ease-standard)"
    }
  }));
}
Object.assign(window, {
  Icon,
  Card,
  KPI,
  StatusPill,
  Tag,
  Btn,
  ToastHost,
  PageHero,
  Bar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "dashboard/ui.jsx", error: String((e && e.message) || e) }); }

// galaxy-bg.js
try { (() => {
/* ============================================================
   HOST LEIGH — Galaxy background (vanilla, auto-inject)
   Brand-tuned port of React Bits "Galaxy" (WebGL via ogl).
   Drops a fixed, full-viewport starfield BEHIND all page content
   (z-index:-1, pointer-events:none — never blocks clicks).

   Just include once per page:
     <script type="module" src="<path>/galaxy-bg.js"></script>

   Defaults are gold-hued and deliberately subtle so text stays
   readable. Override per page before this loads:
     window.GALAXY_OPTS = { density: 1.1, glowIntensity: 0.35, ... };
   ============================================================ */
// ogl is loaded at runtime via dynamic import (native browser ESM), so the
// design-system bundler never tries to resolve it as an npm package.
const OGL_URL = "https://esm.sh/ogl@1.0.11";
const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }
`;
const fragment = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) { float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }
float trisn(float x) { float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}
vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star * size * color;
    }
  }
  return col;
}
void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  }
  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }
  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

// Brand defaults — subtle gold starfield. Override via window.GALAXY_OPTS.
const DEFAULTS = {
  focal: [0.5, 0.5],
  rotation: [1.0, 0.0],
  starSpeed: 0.32,
  density: 1.1,
  hueShift: 42,
  // gold
  speed: 0.8,
  glowIntensity: 0.5,
  saturation: 0.5,
  twinkleIntensity: 0.6,
  rotationSpeed: 0.04,
  autoCenterRepulsion: 0,
  transparent: true
};
async function mount() {
  if (document.getElementById("galaxy-bg")) return;
  const opts = Object.assign({}, DEFAULTS, window.GALAXY_OPTS || {});
  let Renderer, Program, Mesh, Color, Triangle;
  try {
    ({
      Renderer,
      Program,
      Mesh,
      Color,
      Triangle
    } = await import(/* @vite-ignore */OGL_URL));
  } catch (e) {
    console.warn("galaxy-bg: failed to load ogl —", e);
    return;
  }
  const ctn = document.createElement("div");
  ctn.id = "galaxy-bg";
  ctn.setAttribute("aria-hidden", "true");
  Object.assign(ctn.style, {
    position: "fixed",
    inset: "0",
    zIndex: "-1",
    pointerEvents: "none",
    width: "100%",
    height: "100%"
  });
  document.body.appendChild(ctn);
  let renderer;
  try {
    renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false
    });
  } catch (e) {
    console.warn("galaxy-bg: WebGL unavailable —", e);
    ctn.remove();
    return;
  }
  const gl = renderer.gl;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  Object.assign(gl.canvas.style, {
    width: "100%",
    height: "100%",
    display: "block"
  });
  let program;
  function resize() {
    renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
    if (program) {
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
  }
  window.addEventListener("resize", resize, false);
  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: {
        value: 0
      },
      uResolution: {
        value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
      },
      uFocal: {
        value: new Float32Array(opts.focal)
      },
      uRotation: {
        value: new Float32Array(opts.rotation)
      },
      uStarSpeed: {
        value: opts.starSpeed
      },
      uDensity: {
        value: opts.density
      },
      uHueShift: {
        value: opts.hueShift
      },
      uSpeed: {
        value: opts.speed
      },
      uGlowIntensity: {
        value: opts.glowIntensity
      },
      uSaturation: {
        value: opts.saturation
      },
      uTwinkleIntensity: {
        value: opts.twinkleIntensity
      },
      uRotationSpeed: {
        value: opts.rotationSpeed
      },
      uAutoCenterRepulsion: {
        value: opts.autoCenterRepulsion
      },
      uTransparent: {
        value: opts.transparent
      }
    }
  });
  resize();
  const mesh = new Mesh(gl, {
    geometry,
    program
  });
  ctn.appendChild(gl.canvas);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf;
  function update(t) {
    raf = requestAnimationFrame(update);
    if (!reduce) {
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uStarSpeed.value = t * 0.001 * opts.starSpeed / 10.0;
    }
    renderer.render({
      scene: mesh
    });
  }
  raf = requestAnimationFrame(update);

  // Pause when tab hidden to save GPU.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);else raf = requestAnimationFrame(update);
  });
}
if (document.readyState !== "loading") mount();else document.addEventListener("DOMContentLoaded", mount);
})(); } catch (e) { __ds_ns.__errors.push({ path: "galaxy-bg.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BorderGlow = __ds_scope.BorderGlow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GigCard = __ds_scope.GigCard;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

})();
