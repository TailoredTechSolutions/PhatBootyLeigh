import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "secondary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md";
  /** Optional leading icon (glyph / emoji / SVG node). */
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/** Gold-forward button for the Host Leigh dark luxury UI. */
export function Button(props: ButtonProps): React.ReactElement;
