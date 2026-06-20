import * as React from "react";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase mono eyebrow above the title. */
  eyebrow?: React.ReactNode;
  /** Serif section title. */
  title: React.ReactNode;
  /** Render a hairline rule beneath. @default false */
  rule?: boolean;
  /** @default "left" */
  align?: "left" | "center";
}

/** Editorial eyebrow + serif section header. */
export function SectionTitle(props: SectionTitleProps): React.ReactElement;
