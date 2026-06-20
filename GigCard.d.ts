import * as React from "react";

export interface GigCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Event / gig name. */
  title: string;
  /** Client or booker name. */
  client?: string;
  /** Date string, e.g. "Mar 14, 2026". */
  date?: string;
  /** Venue / location. */
  venue?: string;
  /** Fee string, e.g. "$2,500". */
  fee?: string;
  /** Booking status. @default "confirmed" */
  status?: "confirmed" | "pending" | "inquiry" | "completed";
  /** Optional thumbnail image URL; falls back to a serif monogram. */
  thumbnail?: string;
  /** Gold BorderGlow edge effect on hover. @default true */
  glow?: boolean;
  onClick?: () => void;
}

/** Signature event booking card for the Host Leigh empire dashboard. */
export function GigCard(props: GigCardProps): React.ReactElement;
