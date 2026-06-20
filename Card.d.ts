import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Serif card title rendered in the header row. */
  title?: React.ReactNode;
  /** Uppercase gold eyebrow above the title. */
  eyebrow?: React.ReactNode;
  /** Right-aligned action slot in the header (e.g. a Button). */
  action?: React.ReactNode;
  /** Override interior padding (CSS length). @default "var(--sp-8)" */
  padding?: string | number;
  /** Lift + brighten border on hover. @default false */
  hover?: boolean;
  children?: React.ReactNode;
}

/** Base obsidian surface with gold hairline and deep shadow. */
export function Card(props: CardProps): React.ReactElement;
