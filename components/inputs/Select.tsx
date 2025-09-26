import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { ChevronDownIcon } from "../icons";
import type { SelectProps } from "./types";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 appearance-none bg-white text-gray-900",
              {
                "border-gray-300 focus:ring-blue-500 focus:border-blue-500":
                  !error,
                "border-red-500 focus:ring-red-500 focus:border-red-500": error,
              },
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon
              name="chevron-down"
              size="sm"
              className="text-gray-400"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
