import React from "react";

/**
 * Host Leigh — Avatar
 * Circular avatar with gold ring. Falls back to serif initials.
 * sizes: sm 32 · md 40 · lg 56 · xl 80
 */
export function Avatar({ src, name = "", size = "md", ring = true, style, ...rest }) {
  const dims = { sm: 32, md: 40, lg: 56, xl: 80 };
  const d = dims[size] || dims.md;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      title={name}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {src ? null : initials || "★"}
    </div>
  );
}
