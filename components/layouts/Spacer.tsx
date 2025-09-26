import { cn } from "../../lib/utils";
import type { Size } from "../../@types/theme";

interface SpacerProps {
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-6",
  lg: "h-8",
};

const Spacer = ({ size = "md", className = "" }: SpacerProps) => {
  return (
    <div className={cn(sizeClasses[size], className)} aria-hidden="true" />
  );
};

export default Spacer;
