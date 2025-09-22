import type { Size } from "../../@types/theme";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  name: string;
  size?: Size;
}
