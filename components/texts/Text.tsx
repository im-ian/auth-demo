import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { TextProps } from "./types";
import { sizes } from "./theme";

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ children, className = "", size = "md", ...props }, ref) => {
    return (
      <span ref={ref} className={cn(sizes[size], className)} {...props}>
        {children}
      </span>
    );
  }
);

Text.displayName = "Text";

export default Text;
