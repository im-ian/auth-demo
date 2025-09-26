import type { DefaultVariant, Size } from "../../@types/theme";

type ButtonVariant = DefaultVariant | "ghost" | "outline";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
  secondary:
    "bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 focus:ring-blue-500",
  danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500 shadow-none",
  outline:
    "bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500",
};

export const buttonSizes: Record<Size, string> = {
  xs: "px-3 py-2 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};
