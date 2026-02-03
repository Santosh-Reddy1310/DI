import { useState } from "react";
import { decisionTemplates, templateCategories } from "@/lib/decision-templates";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTemplates = selectedCategory
    ? decisionTemplates.filter(t => t.category === selectedCategory)
    : decisionTemplates;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Choose a Template
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start with a pre-built decision framework
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 p-6 border-b overflow-x-auto">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {templateCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <Card
                key={template.id}
                className={cn(
                  "p-5 cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
                  "group relative overflow-hidden"
                )}
                onClick={() => onSelectTemplate(template.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{template.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>• {template.template.options?.length || 0} options</span>
                    <span>• {template.template.criteria?.length || 0} criteria</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Or start from scratch with a blank decision
            </p>
            <Button variant="outline" onClick={onClose}>
              Start Blank
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
