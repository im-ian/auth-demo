import { forwardRef } from "react";
import type { IconButtonProps } from "./types";
import Button from "./Button";
import { cn } from "@/lib/utils";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = "outline", className = "", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn("p-2", className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
