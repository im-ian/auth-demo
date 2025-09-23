import { forwardRef } from "react";
import type { ButtonProps } from "./types";
import { buttonVariants, buttonSizes } from "./theme";
import { cn } from "@/lib/utils";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
          buttonVariants[variant],
          buttonSizes[size],
          {
            "opacity-50 cursor-not-allowed": isDisabled,
          },
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
