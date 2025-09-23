import { forwardRef } from "react";
import type { IconProps } from "./types";
import { cn } from "../../lib/utils";
import { sizeClasses } from "./theme";

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = "md", color = "text-[#03C75A]", className = "", ...props },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={cn(sizeClasses[size], color, className)}
        {...props}
      >
        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
      </svg>
    );
  }
);

Icon.displayName = "NaverIcon";

export default Icon;
