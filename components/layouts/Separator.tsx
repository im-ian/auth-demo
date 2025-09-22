import type { Size } from "../../@types/theme";
import classNames from "classnames";

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
    <div className={classNames("w-full", className, separatorSizes[size])} />
  );
}
