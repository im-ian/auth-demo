import { forwardRef } from "react";
import { IconProps } from "./types";
import type { Size } from "../../@types/theme";
import { cn } from "../../lib/utils";

const sizeClasses: Record<Size, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const CheckIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "sm", className = "", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        role="img"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);

CheckIcon.displayName = "CheckIcon";

export default CheckIcon;
