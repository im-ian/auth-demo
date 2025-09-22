import { forwardRef } from "react";
import classNames from "classnames";
import { TextProps } from "./types";
import { sizes, textColors } from "./theme";

const Text = forwardRef<HTMLSpanElement, TextProps>(
  (
    { children, className = "", size = "md", variant = "default", ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={classNames(sizes[size], textColors[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Text.displayName = "Text";

export default Text;
