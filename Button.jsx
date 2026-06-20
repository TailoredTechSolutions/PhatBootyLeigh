import React from "react";

/**
 * Host Leigh — Button
 * Gold-forward buttons for a dark luxury UI.
 * Variants: primary (solid gold) · secondary (gold hairline) · ghost · danger
 * Sizes: sm | md
 */
export function Button({
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
    sm: { padding: "5px 10px", fontSize: "11px" },
    md: { padding: "7px 14px", fontSize: "12px" },
  };

  const palettes = {
    primary: {
      base: { background: "var(--gd-400)", border: "1px solid var(--gd-400)", color: "var(--ob-950)", fontWeight: 600 },
      hover: { background: "var(--gd-300)", borderColor: "var(--gd-300)" },
    },
    secondary: {
      base: { background: "transparent", border: "1px solid var(--border-soft)", color: "var(--ob-100)", fontWeight: 500 },
      hover: { background: "rgba(212,175,55,0.08)", borderColor: "var(--gd-400)", color: "var(--gd-300)" },
    },
    ghost: {
      base: { background: "transparent", border: "1px solid transparent", color: "var(--ob-200)", fontWeight: 500 },
      hover: { background: "var(--ob-700)", color: "var(--ob-50)" },
    },
    danger: {
      base: { background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "var(--danger-text)", fontWeight: 500 },
      hover: { background: "rgba(239,68,68,0.12)", borderColor: "var(--danger)" },
    },
  };

  const p = palettes[variant] || palettes.secondary;

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex", fontSize: "1.1em" }}>{icon}</span> : null}
      {children}
    </button>
  );
}
