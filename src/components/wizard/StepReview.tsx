import { Edit2, CheckCircle2, Sparkles, ListChecks, Scale, AlertTriangle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DecisionFormData } from "@/types/decision";

interface StepReviewProps {
  formData: DecisionFormData;
  onEditStep: (step: number) => void;
}

export function StepReview({ formData, onEditStep }: StepReviewProps) {
  const validOptions = formData.options.filter((o) => o.label.trim());
  const validCriteria = formData.criteria.filter((c) => c.name.trim());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 mb-4">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review & Analyze</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Review your decision details below. Click "Start AI Analysis" when you're ready.
        </p>
      </div>

      {/* Decision Title */}
      <ReviewSection
        title="Decision"
        icon={FileText}
        iconGradient="from-blue-500 to-cyan-500"
        step={1}
        onEdit={() => onEditStep(1)}
      >
        <h3 className="text-xl font-semibold mb-1">{formData.title}</h3>
        {formData.context && (
          <p className="text-muted-foreground leading-relaxed">{formData.context}</p>
        )}
      </ReviewSection>

      {/* Options */}
      <ReviewSection
        title="Options"
        icon={ListChecks}
        iconGradient="from-violet-500 to-purple-500"
        step={2}
        onEdit={() => onEditStep(2)}
        badge={`${validOptions.length} options`}
      >
        <div className="grid gap-3">
          {validOptions.map((option, index) => (
            <div key={option.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold flex-shrink-0 shadow-lg shadow-primary/20">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{option.label}</p>
                {option.notes && (
                  <p className="text-sm text-muted-foreground mt-0.5">{option.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Criteria */}
      <ReviewSection
        title="Criteria"
        icon={Scale}
        iconGradient="from-emerald-500 to-green-500"
        step={3}
        onEdit={() => onEditStep(3)}
        badge={`${validCriteria.length} criteria`}
      >
        <div className="space-y-3">
          {validCriteria.map((criterion) => (
            <div key={criterion.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">{criterion.name}</p>
                {criterion.description && (
                  <p className="text-sm text-muted-foreground">{criterion.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                    style={{ width: `${criterion.weight * 10}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-muted-foreground w-8">{criterion.weight}/10</span>
              </div>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Constraints */}
      <ReviewSection
        title="Constraints"
        icon={AlertTriangle}
        iconGradient="from-amber-500 to-orange-500"
        step={4}
        onEdit={() => onEditStep(4)}
        badge={formData.constraints.length > 0 ? `${formData.constraints.length} constraints` : "None"}
      >
        {formData.constraints.length === 0 ? (
          <p className="text-muted-foreground italic">No constraints specified</p>
        ) : (
          <div className="space-y-2">
            {formData.constraints.map((constraint) => (
              <div key={constraint.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Badge className="capitalize bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20">
                    {constraint.type}
                  </Badge>
                  <span className="font-medium">{constraint.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Priority: {constraint.priority}/5
                </span>
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      {/* Ready message */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Ready for AI Analysis</h4>
            <p className="text-muted-foreground leading-relaxed">
              Your decision is ready to be analyzed. Our AI will evaluate each option against 
              your criteria and constraints to provide a data-driven recommendation with confidence scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  icon: Icon,
  iconGradient,
  step,
  onEdit,
  badge,
  children,
}: {
  title: string;
  icon: React.ElementType;
  iconGradient: string;
  step: number;
  onEdit: () => void;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-9 w-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br shadow-lg",
            iconGradient
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          {badge && (
            <Badge variant="secondary" className="bg-muted/50 font-normal">
              {badge}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit} className="gap-1.5 text-muted-foreground hover:text-foreground">
          <Edit2 className="h-3.5 w-3.5" />
          Edit
        </Button>
      </div>
      {children}
    </div>
  );
}
