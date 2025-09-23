import { forwardRef } from "react";
import { LinkProps } from "./types";
import { sizes } from "./theme";
import { cn } from "../../lib/utils";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, size = "md", underline = true, className = "", ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={cn(
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded hover:brightness-125",
          {
            "underline underline-offset-2": underline,
          },
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
