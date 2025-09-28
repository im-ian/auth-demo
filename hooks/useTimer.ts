import { useState, useEffect, useCallback } from "react";

interface UseTimerOptions {
  initialTime?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const useTimer = ({
  initialTime = 5,
  onComplete,
  autoStart = false,
}: UseTimerOptions = {}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, onComplete]);

  return {
    timeLeft,
    isActive,
    start,
    stop,
    reset,
  };
};
