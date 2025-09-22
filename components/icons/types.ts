export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "brand";
}
