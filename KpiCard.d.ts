import * as React from "react";

export interface KpiCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Uppercase metric label. */
  label: React.ReactNode;
  /** The headline value (string or number). */
  value: React.ReactNode;
  /** Small leading symbol, e.g. "$". */
  prefix?: React.ReactNode;
  /** Small trailing unit, e.g. "hrs". */
  suffix?: React.ReactNode;
  /** Percent change; ≥0 renders up/green, <0 down/rose. */
  delta?: number;
  icon?: React.ReactNode;
  /** Numeral color. @default "gold" */
  accent?: "gold" | "rose" | "success" | "neutral";
}

/** Headline metric card with mono numeral and optional delta. */
export function KpiCard(props: KpiCardProps): React.ReactElement;
