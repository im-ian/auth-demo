import { forwardRef } from "react";
import classNames from "classnames";
import type { TextProps } from "./types";
import { sizes } from "./theme";

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ children, className = "", size = "md", ...props }, ref) => {
    return (
      <span ref={ref} className={classNames(sizes[size], className)} {...props}>
        {children}
      </span>
    );
  }
);

Text.displayName = "Text";

export default Text;
