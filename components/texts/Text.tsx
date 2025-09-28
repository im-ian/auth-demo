import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { TextProps } from "./types";
import { sizes } from "./theme";

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, className = "", size = "md", ...props }, ref) => {
    return (
      <p ref={ref} className={cn(sizes[size], className)} {...props}>
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export default Text;
