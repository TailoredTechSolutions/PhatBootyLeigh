import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color tone. @default "neutral" */
  tone?: "gold" | "rose" | "success" | "warning" | "danger" | "neutral";
  /** Show a leading status dot. @default false */
  dot?: boolean;
  /** Filled (solid background) instead of soft tint. @default false */
  solid?: boolean;
  children?: React.ReactNode;
}

/** Small rounded status pill / label. */
export function Badge(props: BadgeProps): React.ReactElement;
