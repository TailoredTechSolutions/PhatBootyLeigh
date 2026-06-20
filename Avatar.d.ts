import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. Omit to show serif initials. */
  src?: string;
  /** Full name — used for initials + tooltip. */
  name?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** Gold ring + glow. @default true */
  ring?: boolean;
}

/** Circular avatar with gold ring and serif-initial fallback. */
export function Avatar(props: AvatarProps): React.ReactElement;
