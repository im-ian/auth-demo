import { forwardRef } from "react";
import classNames from "classnames";
import type { HeadingProps } from "./types";
import { headingSizes } from "./theme";

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, level = "h1", className = "", ...props }, ref) => {
    const Component = level;

    return (
      <Component
        ref={ref}
        className={classNames(headingSizes[level], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
