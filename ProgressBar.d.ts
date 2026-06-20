import * as React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill amount, 0–100. @default 0 */
  value?: number;
  /** Optional label shown above the track. */
  label?: React.ReactNode;
  /** Show right-aligned percent. @default false */
  showPercent?: boolean;
  /** Fill color. @default "gold" */
  tone?: "gold" | "rose" | "success";
  /** Track height in px. @default 6 */
  height?: number;
}

/** Slim gold progress meter. */
export function ProgressBar(props: ProgressBarProps): React.ReactElement;
