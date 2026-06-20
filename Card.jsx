import React from "react";

/**
 * Host Leigh — Card
 * The base surface: obsidian fill, gold hairline border, deep shadow.
 * Optional title row with eyebrow + action slot. Set `hover` for lift.
 */
export function Card({ children, title, eyebrow, action, padding, hover = false, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const pad = padding != null ? padding : "var(--sp-8)";

  return (
    <section
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: "var(--surface-card)",
        border: `1px solid ${h ? "var(--border-strong)" : "var(--border-hair)"}`,
        borderRadius: "var(--r-lg)",
        boxShadow: "var(--shadow-card)",
        padding: pad,
        transition: "var(--tr-all)",
        transform: h ? "translateY(-2px)" : "none",
        ...style,
      }}
      {...rest}
    >
      {(title || eyebrow || action) && (
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "var(--sp-7)",
          }}
        >
          <div>
            {eyebrow ? (
              <div
                style={{
                  fontFamily: "var(--font-mono-alt)",
                  fontSize: "var(--fs-3xs)",
                  letterSpacing: "var(--tr-label)",
                  textTransform: "uppercase",
                  color: "var(--accent-text)",
                  marginBottom: "4px",
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: 600,
                  color: "var(--text-heading)",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h3>
            ) : null}
          </div>
          {action ? <div style={{ flexShrink: 0 }}>{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}
