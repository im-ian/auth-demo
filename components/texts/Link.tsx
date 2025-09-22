import { forwardRef } from "react";
import classNames from "classnames";
import { LinkProps } from "./types";
import { sizes, linkColors } from "./theme";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      underline = true,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={classNames(
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded",
          {
            "underline underline-offset-2": underline,
          },
          sizes[size],
          linkColors[variant],
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
