import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { IconProps } from "./types";
import type { Size } from "../../@types/theme";

const sizeClasses: Record<Size, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", className = "", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(sizeClasses[size], className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  }
);

ChevronDownIcon.displayName = "ChevronDownIcon";

export default ChevronDownIcon;
