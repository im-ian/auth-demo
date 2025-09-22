import type { Size } from "../../@types/theme";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: Size;
  color?: "default" | "brand";
}
