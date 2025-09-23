import type { Size } from "../../@types/theme";
import { cn } from "../../lib/utils";

interface SeparatorProps {
  className?: string;
  size?: Size;
}

const separatorSizes: Record<Size, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};

export default function Separator({ className, size = "md" }: SeparatorProps) {
  return (
    <div
      className={cn("bg-gray-200 w-full", className, separatorSizes[size])}
    />
  );
}
