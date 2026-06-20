import React from "react";

/**
 * Host Leigh — ProgressBar
 * Slim gold progress meter. Pass value 0–100. Optional label + percent.
 */
export function ProgressBar({ value = 0, label, showPercent = false, tone = "gold", height = 6, style, ...rest }) {
  const v = Math.max(0, Math.min(100, value));
  const fills = {
    gold: "var(--grad-gold)",
    rose: "linear-gradient(90deg, var(--rose-500), var(--rose-200))",
    success: "linear-gradient(90deg, var(--success), var(--success-text))",
  };

  return (
    <div style={{ ...style }} {...rest}>
      {(label || showPercent) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "7px" }}>
          {label ? (
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{label}</span>
          ) : <span />}
          {showPercent ? (
            <span style={{ fontFamily: "var(--font-mono-alt)", fontSize: "var(--fs-xs)", color: "var(--accent-text)", fontWeight: 500 }}>{Math.round(v)}%</span>
          ) : null}
        </div>
      )}
      <div style={{ height: `${height}px`, borderRadius: "var(--r-full)", background: "var(--ob-700)", overflow: "hidden" }}>
        <div
          style={{
            width: `${v}%`,
            height: "100%",
            borderRadius: "var(--r-full)",
            background: fills[tone] || fills.gold,
            transition: "width var(--dur-slow) var(--ease-standard)",
          }}
        />
      </div>
    </div>
  );
}
