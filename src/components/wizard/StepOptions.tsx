import { Plus, Trash2, GripVertical, ListChecks, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Option } from "@/types/decision";

interface StepOptionsProps {
  options: Option[];
  onChange: (options: Option[]) => void;
}

export function StepOptions({ options, onChange }: StepOptionsProps) {
  const addOption = () => {
    onChange([...options, { id: crypto.randomUUID(), label: "", notes: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      onChange(options.filter((o) => o.id !== id));
    }
  };

  const updateOption = (id: string, field: keyof Option, value: string) => {
    onChange(
      options.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  };

  const filledOptions = options.filter(o => o.label.trim()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25 mb-4">
          <ListChecks className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2">List Your Options</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Add the alternatives you're considering. The more detail you provide, the better the analysis.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
          <span className="text-sm text-muted-foreground">
            {filledOptions} of {options.length} options defined
          </span>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            filledOptions >= 2 
              ? "bg-emerald-500/10 text-emerald-500" 
              : "bg-amber-500/10 text-amber-500"
          )}>
            {filledOptions >= 2 ? "Ready to continue" : "Add at least 2 options"}
          </span>
        </div>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className={cn(
                "group relative flex gap-3 p-5 rounded-xl border transition-all duration-200",
                option.label.trim() 
                  ? "border-primary/30 bg-primary/5 shadow-sm" 
                  : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/30"
              )}
            >
              {/* Drag handle */}
              <div className="flex items-start pt-2 text-muted-foreground/50 cursor-move hover:text-muted-foreground transition-colors">
                <GripVertical className="h-5 w-5" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                    option.label.trim()
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>
                  <Input
                    placeholder={`Enter option ${index + 1}...`}
                    value={option.label}
                    onChange={(e) => updateOption(option.id, "label", e.target.value)}
                    className="flex-1 h-11 font-medium bg-background/50 border-border/60 focus:bg-background focus:border-primary/50"
                  />
                </div>
                <Textarea
                  placeholder="Add notes, pros & cons, or additional details about this option..."
                  value={option.notes || ""}
                  onChange={(e) => updateOption(option.id, "notes", e.target.value)}
                  rows={2}
                  className="resize-none bg-background/50 border-border/60 focus:bg-background focus:border-primary/50"
                />
              </div>

              {/* Delete button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(option.id)}
                disabled={options.length <= 2}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {/* Filled indicator */}
              {option.label.trim() && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="h-4 w-4 text-primary animate-bounce-subtle" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addOption}
          className="w-full mt-6 h-12 gap-2 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Plus className="h-5 w-5" />
          Add Another Option
        </Button>
      </div>
    </div>
  );
}
