import React from "react";

/**
 * Host Leigh — Button
 * Gold-forward button system for a dark luxury UI.
 * Variants: primary (solid gold), secondary (gold hairline outline),
 * ghost (no border), danger (red outline). Sizes: sm | md.
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
  const [active, setActive] = React.useState(false);

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
      base: { background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-100)", fontWeight: 500 },
      hover: { background: "rgba(212,175,55,0.08)", borderColor: "var(--gd-400)", color: "var(--gd-300)" },
    },
    ghost: {
      base: { background: "none", border: "1px solid transparent", color: "var(--ob-200)", fontWeight: 500 },
      hover: { background: "rgba(212,175,55,0.06)", color: "var(--ob-50)" },
    },
    danger: {
      base: { background: "none", border: "1px solid var(--danger)", color: "var(--danger-text)", fontWeight: 600 },
      hover: { background: "rgba(239,68,68,0.10)", borderColor: "var(--danger)" },
    },
  };

  const pal = palettes[variant] || palettes.secondary;

  const composed = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "var(--r-sm)",
    fontFamily: "var(--font-body)",
    lineHeight: 1.2,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "var(--tr-all)",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.4 : 1,
    transform: active && !disabled ? "translateY(1px)" : "none",
    ...sizes[size],
    ...pal.base,
    ...(hover && !disabled ? pal.hover : null),
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={composed}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {icon ? <span style={{ fontSize: "1.1em", lineHeight: 1 }}>{icon}</span> : null}
      {children}
    </button>
  );
}
