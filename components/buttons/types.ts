import type { Size } from "../../@types/theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: Size;
  loading?: boolean;
}
