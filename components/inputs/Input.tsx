import { forwardRef } from "react";
import classNames from "classnames";
import { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={classNames(
            "w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2",
            {
              "border-gray-300 focus:ring-blue-500 focus:border-blue-500":
                !error,
              "border-red-500 focus:ring-red-500 focus:border-red-500": error,
            },
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
