import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative py-2">
      {/* Progress bar background */}
      <div className="absolute top-7 left-[calc(10%)] right-[calc(10%)] h-1 bg-muted/50 rounded-full" />
      
      {/* Progress bar fill with gradient */}
      <div
        className="absolute top-7 left-[calc(10%)] h-1 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(((currentStep - 1) / (steps.length - 1)) * 80, 80)}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = step.id === steps.length;

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center group transition-all duration-300",
                isCurrent && "scale-105"
              )}
            >
              {/* Step circle */}
              <div className="relative">
                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse" />
                )}
                
                <div
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : isCurrent
                      ? "border-primary bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-xl shadow-primary/40"
                      : "border-border/60 bg-card text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : isLast ? (
                    <Sparkles className={cn("h-5 w-5", isCurrent && "animate-bounce-subtle")} />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>
              </div>

              {/* Step label */}
              <div className="mt-4 text-center max-w-[100px] sm:max-w-none">
                <p
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className={cn(
                  "text-xs mt-0.5 hidden sm:block transition-colors",
                  isCurrent ? "text-muted-foreground" : "text-muted-foreground/60"
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
