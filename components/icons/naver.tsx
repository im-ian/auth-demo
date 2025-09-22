import { forwardRef } from "react";
import classNames from "classnames";
import { IconProps } from "./types";
import type { Size } from "../../@types/theme";

const sizeClasses: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", color = "default", className = "", ...props }, ref) => {
    const colorClasses = {
      default: "text-current",
      brand: "text-[#03C75A]",
    };

    return (
      <svg
        ref={ref}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={classNames(
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        {...props}
      >
        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
      </svg>
    );
  }
);

export default Icon;
