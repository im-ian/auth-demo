import { forwardRef } from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

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
        className={classNames(
          "font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
          {
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500":
              variant === "primary",
            "bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 focus:ring-blue-500":
              variant === "secondary",
            "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500":
              variant === "danger",
            "bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500 shadow-none":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
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
