
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          
          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isCompleted && "bg-gold border-gold",
                  isCurrent && "border-gold bg-background",
                  !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background",
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-gold" : "text-muted-foreground/50"
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium absolute top-12 whitespace-nowrap",
                  (isCompleted || isCurrent) ? "text-gold" : "text-muted-foreground/50"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
        
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 h-[2px] w-full -z-10">
          <div className="h-full bg-muted-foreground/30">
            <div
              className="h-full bg-gold transition-all duration-200"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
