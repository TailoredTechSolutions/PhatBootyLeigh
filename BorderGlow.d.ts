import * as React from "react";

export interface BorderGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Pointer distance to edge before the glow appears, 0–100. @default 30 */
  edgeSensitivity?: number;
  /** Glow color as "H S L" (e.g. "46 65 62"). Omit to keep brand gold. */
  glowColor?: string;
  /** Card background. Omit to inherit --surface-card. */
  backgroundColor?: string;
  /** Corner radius in px. Omit to inherit --r-lg. */
  borderRadius?: number;
  /** How far the outer glow extends beyond the card, px. @default 40 */
  glowRadius?: number;
  /** Glow opacity multiplier, 0.1–3.0. @default 1.0 */
  glowIntensity?: number;
  /** Directional cone width as a percent, 5–45. @default 28 */
  coneSpread?: number;
  /** Edge fill opacity, 0–1. @default 0.5 */
  fillOpacity?: number;
  /** Play an intro sweep on mount. @default false */
  animated?: boolean;
  /** 3 hex colors for the mesh-gradient border. Omit to keep gold·rose·ivory. */
  colors?: string[];
}

/** Directional gold edge-glow wrapper for clickable / expandable boxes. */
export function BorderGlow(props: BorderGlowProps): React.ReactElement;
