import React from "react";

/**
 * Host Leigh — Badge / StatusPill
 * Small rounded label. Tones map to the semantic palette.
 * tone: gold | rose | success | warning | danger | neutral
 * dot:  render a leading status dot (for live/active states)
 */
export function Badge({ children, tone = "neutral", dot = false, solid = false, style, ...rest }) {
  const tones = {
    gold:    { fg: "var(--gd-300)", bg: "rgba(212,175,55,0.12)", bd: "rgba(212,175,55,0.3)" },
    rose:    { fg: "var(--rose-400)", bg: "rgba(201,69,96,0.12)", bd: "rgba(201,69,96,0.3)" },
    success: { fg: "var(--success-text)", bg: "rgba(34,197,94,0.12)", bd: "rgba(34,197,94,0.3)" },
    warning: { fg: "var(--warning-text)", bg: "rgba(245,158,11,0.12)", bd: "rgba(245,158,11,0.3)" },
    danger:  { fg: "var(--danger-text)", bg: "rgba(239,68,68,0.12)", bd: "rgba(239,68,68,0.3)" },
    neutral: { fg: "var(--ob-200)", bg: "var(--ob-700)", bd: "var(--ob-400)" },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: solid ? "var(--ob-950)" : t.fg,
            boxShadow: tone === "success" ? "var(--glow-success)" : "none",
          }}
        />
      ) : null}
      {children}
    </span>
  );
}
