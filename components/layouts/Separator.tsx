import type { Size } from "../../@types/theme";
import { cn } from "../../lib/utils";

interface SeparatorProps {
  className?: string;
  size?: Size;
  text?: string;
}

const separatorSizes: Record<Size, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};

export default function Separator({
  className,
  size = "md",
  text,
}: SeparatorProps) {
  if (text) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
      >
        <div className={cn("bg-gray-200 w-full", separatorSizes[size])} />
        <span className="absolute bg-white px-3 text-sm text-gray-500">
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("bg-gray-200 w-full", className, separatorSizes[size])}
    />
  );
}
