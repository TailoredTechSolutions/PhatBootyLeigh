import React from "react";

/**
 * Host Leigh — KpiCard
 * Headline metric card. Mono numeral, uppercase label, optional delta.
 * delta > 0 renders gold/up, < 0 renders rose/down.
 */
export function KpiCard({ label, value, prefix, suffix, delta, icon, accent = "gold", style, ...rest }) {
  const accents = {
    gold: "var(--gd-300)",
    rose: "var(--rose-400)",
    success: "var(--success-text)",
    neutral: "var(--ob-50)",
  };
  const valColor = accents[accent] || accents.gold;
  const up = typeof delta === "number" && delta >= 0;

  return (
    <section
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-hair)",
        borderRadius: "var(--r-lg)",
        boxShadow: "var(--shadow-card)",
        padding: "var(--sp-8)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* top gold hairline accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--grad-gold)", opacity: 0.5 }} />
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono-alt)",
            fontSize: "var(--fs-3xs)",
            letterSpacing: "var(--tr-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
        {icon ? <span style={{ color: "var(--text-faint)", fontSize: "14px" }}>{icon}</span> : null}
      </header>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        {prefix ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: valColor, opacity: 0.7 }}>{prefix}</span> : null}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kpi)", fontWeight: 600, color: valColor, lineHeight: 1 }}>{value}</span>
        {suffix ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-faint)" }}>{suffix}</span> : null}
      </div>
      {typeof delta === "number" ? (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono-alt)",
            fontSize: "var(--fs-xs)",
            fontWeight: 500,
            color: up ? "var(--success-text)" : "var(--rose-400)",
          }}
        >
          {up ? "▲" : "▼"} {Math.abs(delta)}%
        </div>
      ) : null}
    </section>
  );
}
