import type { Size } from "../../@types/theme";

export type TypographySize = Size;

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: TypographySize;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  size?: TypographySize;
  underline?: boolean;
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  className?: string;
}
