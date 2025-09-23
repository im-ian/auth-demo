import type { Size } from "../../@types/theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: Size;
  loading?: boolean;
}

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}
