import React from "react";

/**
 * Host Leigh — SectionTitle
 * Editorial section header: uppercase mono eyebrow over a serif title,
 * with an optional gold rule that extends to fill the row.
 */
export function SectionTitle({ eyebrow, title, rule = false, align = "left", style, ...rest }) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {eyebrow ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: align === "center" ? "center" : "flex-start",
            fontFamily: "var(--font-mono-alt)",
            fontSize: "var(--fs-3xs)",
            letterSpacing: "var(--tr-eyebrow)",
            textTransform: "uppercase",
            color: "var(--accent-text)",
            marginBottom: "8px",
          }}
        >
          <span style={{ width: "24px", height: "1px", background: "var(--grad-gold)" }} />
          {eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          fontWeight: 600,
          color: "var(--text-heading)",
          lineHeight: 1.15,
          letterSpacing: "0.2px",
        }}
      >
        {title}
      </h2>
      {rule ? (
        <div style={{ height: "1px", background: "var(--border-soft)", marginTop: "14px" }} />
      ) : null}
    </div>
  );
}
