import { cn } from "../../lib/utils";
import { CheckIcon } from "../icons";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const Stepper = ({ currentStep, totalSteps, className = "" }: StepperProps) => {
  return (
    <div className={cn("flex justify-center mb-6", className)}>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 relative z-10",
                  {
                    "bg-blue-600 text-white": isCompleted || isCurrent,
                    "bg-gray-200 text-gray-500": step > currentStep,
                  }
                )}
              >
                {isCompleted ? <CheckIcon name="check" size="sm" /> : step}
              </div>

              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-2 transition-colors duration-200",
                    {
                      "bg-blue-600": step < currentStep,
                      "bg-gray-200": step >= currentStep,
                    }
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
