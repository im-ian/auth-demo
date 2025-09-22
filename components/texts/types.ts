export type TypographySize = "sm" | "md" | "lg";

export type TypographyVariant = "default" | "primary" | "secondary" | "danger";

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: TypographySize;
  variant?: TypographyVariant;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  size?: TypographySize;
  underline?: boolean;
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  variant?: TypographyVariant;
  className?: string;
}
