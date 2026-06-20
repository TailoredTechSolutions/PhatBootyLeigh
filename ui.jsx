/* ============================================================
   HOST LEIGH — UI PRIMITIVES (shared)
   Inline-styled, token-driven. Exported to window at the end.
   ============================================================ */

// ── ICON SET (single-stroke, 20px grid) ──
const HL_ICONS = {
  overview: "M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5",
  gigs: "M4 5h16M4 12h16M4 19h16",            // overwritten below w/ kanban
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
  bolt: "M13 3 5 13h6l-1 8 8-10h-6z",
};

function Icon({ name, size = 18, stroke = "currentColor", style }) {
  const d = HL_ICONS[name] || HL_ICONS.overview;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// ── CARD ──
function Card({ title, icon, action, children, style, pad = 20 }) {
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)", padding: pad, ...style,
    }}>
      {(title || action) && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 8 }}>
          {icon && <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name={icon} size={17} /></span>}
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--ob-50)" }}>{title}</span>
          {action && <span style={{ marginLeft: "auto" }}>{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── KPI CARD ──
function KPI({ label, value, sub, tone = "default" }) {
  const toneColor = { default: "var(--gd-300)", success: "var(--success-text)", warning: "var(--warning-text)", danger: "var(--danger-text)" }[tone];
  const subColor = { up: "var(--success-text)", warn: "var(--warning-text)", down: "var(--danger-text)", muted: "var(--ob-300)" };
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-hair)",
      borderRadius: "var(--r-lg)", padding: "18px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--grad-gold)", opacity: 0.6 }} />
      <div style={{ fontSize: 10, color: "var(--ob-200)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 500, color: toneColor, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, marginTop: 7, color: subColor[sub.tone] || "var(--ob-300)" }}>{sub.text}</div>}
    </div>
  );
}

// ── STATUS PILL ──
function StatusPill({ status }) {
  const s = window.HL.STATUS[status] || window.HL.STATUS.tbd;
  const map = {
    confirmed: { bg: "rgba(34,197,94,0.12)", c: "var(--success-text)" },
    pending:   { bg: "rgba(245,158,11,0.12)", c: "var(--warning-text)" },
    late:      { bg: "rgba(239,68,68,0.12)", c: "var(--danger-text)" },
    tbd:       { bg: "rgba(255,255,255,0.06)", c: "var(--ob-200)" },
  }[s.cls];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px",
      borderRadius: "var(--r-pill)", fontSize: 10, fontWeight: 600, letterSpacing: "0.5px",
      background: map.bg, color: map.c, fontFamily: "var(--font-body)",
    }}>
      <span style={{ fontSize: 9 }}>{s.glyph}</span>{s.label}
    </span>
  );
}

// ── TAG ──
function Tag({ children, tone = "default" }) {
  const tones = {
    default: { bg: "var(--ob-700)", c: "var(--ob-100)" },
    gold: { bg: "rgba(212,175,55,0.15)", c: "var(--gd-300)" },
    rose: { bg: "rgba(201,69,96,0.15)", c: "var(--rose-200)" },
    green: { bg: "rgba(34,197,94,0.12)", c: "var(--success-text)" },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 4, background: t.bg, color: t.c,
      fontFamily: "var(--font-mono)", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

// ── GENERIC BUTTON (mirrors DS Button.jsx, inline) ──
function Btn({ children, variant = "secondary", size = "md", icon, onClick, style, disabled, fullWidth }) {
  const [hover, setHover] = React.useState(false);
  const sizes = { sm: { padding: "5px 10px", fontSize: 11 }, md: { padding: "7px 14px", fontSize: 12 } };
  const pal = {
    primary: { base: { background: "var(--gd-400)", border: "1px solid var(--gd-400)", color: "var(--ob-950)", fontWeight: 600 }, hover: { background: "var(--gd-300)", borderColor: "var(--gd-300)" } },
    secondary: { base: { background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-100)", fontWeight: 500 }, hover: { background: "rgba(212,175,55,0.08)", borderColor: "var(--gd-400)", color: "var(--gd-300)" } },
    ghost: { base: { background: "none", border: "1px solid transparent", color: "var(--ob-200)", fontWeight: 500 }, hover: { background: "rgba(212,175,55,0.06)", color: "var(--ob-50)" } },
    danger: { base: { background: "none", border: "1px solid var(--danger)", color: "var(--danger-text)", fontWeight: 600 }, hover: { background: "rgba(239,68,68,0.10)" } },
  }[variant];
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", lineHeight: 1.2,
        cursor: disabled ? "not-allowed" : "pointer", transition: "var(--tr-all)",
        width: fullWidth ? "100%" : undefined, opacity: disabled ? 0.4 : 1,
        ...sizes[size], ...pal.base, ...(hover && !disabled ? pal.hover : null), ...style,
      }}>
      {icon && <Icon name={icon} size={size === "sm" ? 13 : 14} />}
      {children}
    </button>
  );
}

// ── TOAST (global) ──
function ToastHost() {
  const [msg, setMsg] = React.useState(null);
  React.useEffect(() => {
    window.hlToast = (m) => {
      setMsg(m);
      clearTimeout(window.__hlT);
      window.__hlT = setTimeout(() => setMsg(null), 2600);
    };
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: `translateX(-50%) translateY(${msg ? 0 : 20}px)`,
      opacity: msg ? 1 : 0, transition: "all 0.3s var(--ease-standard)", zIndex: 500,
      pointerEvents: "none",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, background: "var(--ob-800)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--r-md)", padding: "11px 18px",
        boxShadow: "var(--shadow-deep)", fontSize: 13, color: "var(--ob-50)",
      }}>
        <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="check" size={15} /></span>
        {msg}
      </div>
    </div>
  );
}

// ── PAGE HERO (eyebrow + serif headline) ──
function PageHero({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-400)", marginBottom: 6 }}>{eyebrow}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--ob-50)", lineHeight: 1.1 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: "var(--ob-300)", marginTop: 8, maxWidth: 560 }}>{sub}</div>}
    </div>
  );
}

// ── PROGRESS BAR ──
function Bar({ pct, color }) {
  return (
    <div style={{ width: "100%", height: 5, background: "var(--ob-700)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: pct + "%", borderRadius: 3, background: color || "var(--grad-gold)", transition: "width 0.4s var(--ease-standard)" }} />
    </div>
  );
}

Object.assign(window, { Icon, Card, KPI, StatusPill, Tag, Btn, ToastHost, PageHero, Bar });
