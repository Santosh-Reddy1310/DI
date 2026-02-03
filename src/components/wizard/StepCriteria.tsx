import { Plus, Trash2, Info, Scale, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Criterion } from "@/types/decision";

interface StepCriteriaProps {
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
}

export function StepCriteria({ criteria, onChange }: StepCriteriaProps) {
  const addCriterion = () => {
    onChange([
      ...criteria,
      { id: crypto.randomUUID(), name: "", weight: 5, description: "" },
    ]);
  };

  const removeCriterion = (id: string) => {
    if (criteria.length > 1) {
      onChange(criteria.filter((c) => c.id !== id));
    }
  };

  const updateCriterion = (id: string, field: keyof Criterion, value: string | number) => {
    onChange(
      criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const getWeightConfig = (weight: number) => {
    if (weight <= 2) return { label: "Low", color: "text-slate-500", bg: "bg-slate-500" };
    if (weight <= 4) return { label: "Medium-Low", color: "text-blue-500", bg: "bg-blue-500" };
    if (weight <= 6) return { label: "Medium", color: "text-amber-500", bg: "bg-amber-500" };
    if (weight <= 8) return { label: "High", color: "text-orange-500", bg: "bg-orange-500" };
    return { label: "Critical", color: "text-rose-500", bg: "bg-rose-500" };
  };

  const filledCriteria = criteria.filter(c => c.name.trim()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 mb-4">
          <Scale className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Define Your Criteria</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          What factors matter most in this decision? Assign weights to prioritize them.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filledCriteria} criteria defined
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Higher weights mean the criterion has more influence on the final recommendation.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            filledCriteria >= 1 
              ? "bg-emerald-500/10 text-emerald-500" 
              : "bg-amber-500/10 text-amber-500"
          )}>
            {filledCriteria >= 1 ? "Ready to continue" : "Add at least 1 criterion"}
          </span>
        </div>

        <div className="space-y-4">
          {criteria.map((criterion, index) => {
            const weightConfig = getWeightConfig(criterion.weight);
            return (
              <div
                key={criterion.id}
                className={cn(
                  "group relative p-5 rounded-xl border transition-all duration-200",
                  criterion.name.trim() 
                    ? "border-primary/30 bg-primary/5 shadow-sm" 
                    : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors mt-1",
                    criterion.name.trim()
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>

                  <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Criterion name (e.g., Cost, Quality, Speed)"
                        value={criterion.name}
                        onChange={(e) => updateCriterion(criterion.id, "name", e.target.value)}
                        className="flex-1 h-11 font-medium bg-background/50 border-border/60 focus:bg-background focus:border-primary/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCriterion(criterion.id)}
                        disabled={criteria.length <= 1}
                        className="h-11 w-11 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Input
                      placeholder="Brief description (optional)"
                      value={criterion.description || ""}
                      onChange={(e) => updateCriterion(criterion.id, "description", e.target.value)}
                      className="bg-background/50 border-border/60 focus:bg-background focus:border-primary/50"
                    />

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Importance Weight</span>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-sm font-semibold", weightConfig.color)}>
                            {criterion.weight}/10
                          </span>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            weightConfig.color,
                            weightConfig.bg + "/10"
                          )}>
                            {weightConfig.label}
                          </span>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <Slider
                          value={[criterion.weight]}
                          onValueChange={(value) => updateCriterion(criterion.id, "weight", value[0])}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                        {/* Scale markers */}
                        <div className="flex justify-between mt-1 px-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <span key={n} className={cn(
                              "text-[10px]",
                              criterion.weight === n ? "text-primary font-bold" : "text-muted-foreground/50"
                            )}>
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filled indicator */}
                {criterion.name.trim() && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-4 w-4 text-primary animate-bounce-subtle" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          onClick={addCriterion}
          className="w-full mt-6 h-12 gap-2 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Plus className="h-5 w-5" />
          Add Another Criterion
        </Button>
      </div>
    </div>
  );
}
