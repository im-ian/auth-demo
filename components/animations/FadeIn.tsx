import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import type { FadeInProps } from "./types";

const FadeIn = ({
  condition = true,
  children,
  className = "",
  duration = 500,
  delay = 0,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenVisibleRef = useRef(false);

  useEffect(() => {
    if (condition && !hasBeenVisibleRef.current) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        hasBeenVisibleRef.current = true;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [condition, delay]);

  if (!hasBeenVisibleRef.current && !condition) {
    return null;
  }

  return (
    <div
      className={cn(
        "transition-all ease-out",
        {
          "opacity-0 translate-y-2": !isVisible,
          "opacity-100 translate-y-0": isVisible,
        },
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
