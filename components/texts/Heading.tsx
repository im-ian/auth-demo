import { forwardRef } from "react";
import classNames from "classnames";
import { HeadingProps } from "./types";
import { headingSizes, headingColors } from "./theme";

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { children, level = "h1", variant = "default", className = "", ...props },
    ref
  ) => {
    const Component = level;

    return (
      <Component
        ref={ref}
        className={classNames(
          headingSizes[level],
          headingColors[variant],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
