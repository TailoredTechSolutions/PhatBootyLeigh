import React from "react";

/**
 * Host Leigh — GigCard
 * Signature booking card for an event/gig: title, client, date·venue,
 * fee, and a status pill. Clickable, so it carries the gold BorderGlow
 * edge effect by default (set glow={false} to disable). Lifts on hover.
 */
export function GigCard({ title, client, date, venue, fee, status = "confirmed", thumbnail, onClick, glow = true, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const cardRef = React.useRef(null);

  const handleMove = React.useCallback((e) => {
    const card = cardRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = x - cx, dy = y - cy;
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
  }, [glow]);

  const statusMap = {
    confirmed: { fg: "var(--success-text)", bg: "rgba(34,197,94,0.12)", bd: "rgba(34,197,94,0.3)", label: "Confirmed" },
    pending:   { fg: "var(--warning-text)", bg: "rgba(245,158,11,0.12)", bd: "rgba(245,158,11,0.3)", label: "Pending" },
    inquiry:   { fg: "var(--accent-text)", bg: "rgba(212,175,55,0.12)", bd: "rgba(212,175,55,0.3)", label: "Inquiry" },
    completed: { fg: "var(--ob-200)", bg: "var(--ob-700)", bd: "var(--ob-400)", label: "Completed" },
  };
  const s = statusMap[status] || statusMap.confirmed;

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onPointerMove={handleMove}
      className={glow ? "border-glow-card" : undefined}
      style={{
        background: "var(--surface-card)",
        border: `1px solid ${h ? "var(--border-strong)" : "var(--border-hair)"}`,
        borderRadius: "var(--r-md)",
        boxShadow: h ? "var(--shadow-pop)" : "none",
        transform: h ? "translateY(-2px)" : "none",
        transition: "var(--tr-all)",
        cursor: onClick ? "pointer" : "default",
        "--glow-padding": "26px",
        ...style,
      }}
      {...rest}
    >
      {glow ? <span className="edge-light" /> : null}
      <div
        className={glow ? "border-glow-inner" : undefined}
        style={{ display: "flex", flexDirection: "row", gap: "14px", padding: "14px" }}
      >
        {/* thumbnail / monogram */}
        <div
          style={{
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
            color: "var(--gd-300)",
          }}
        >
          {thumbnail ? null : (title ? title.charAt(0) : "★")}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
            <h4
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h3)",
                fontWeight: 600,
                color: "var(--text-heading)",
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </h4>
            <span
              style={{
                flexShrink: 0,
                padding: "3px 9px",
                borderRadius: "var(--r-pill)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--fs-2xs)",
                fontWeight: 600,
                color: s.fg,
                background: s.bg,
                border: `1px solid ${s.bd}`,
              }}
            >
              {s.label}
            </span>
          </div>

          {client ? (
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: "3px" }}>{client}</div>
          ) : null}

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "10px" }}>
            {date ? (
              <span style={{ fontFamily: "var(--font-mono-alt)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>{date}</span>
            ) : null}
            {venue ? (
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{venue}</span>
            ) : null}
            {fee ? (
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--gd-300)" }}>{fee}</span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
