import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/wizard/FileUpload";
import { Lightbulb, HelpCircle, Target } from "lucide-react";

interface StepContextProps {
  title: string;
  context: string;
  onTitleChange: (title: string) => void;
  onContextChange: (context: string) => void;
}

export function StepContext({ title, context, onTitleChange, onContextChange }: StepContextProps) {
  const handleFileTextExtracted = (extractedText: string) => {
    // Append extracted text to context
    const newContext = context 
      ? `${context}\n\n--- Extracted from document ---\n${extractedText}`
      : extractedText;
    onContextChange(newContext);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 mb-4">
          <Target className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Define Your Decision</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Start by clearly stating what you need to decide. A well-defined question leads to better analysis.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-base font-semibold">
              What decision are you trying to make?
            </Label>
            <span className="text-xs text-muted-foreground">Required</span>
          </div>
          <Input
            id="title"
            placeholder="e.g., Which programming language should I learn next?"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg h-14 bg-background/50 border-border/60 focus:bg-background focus:border-primary/50 transition-all"
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3" />
            Frame your decision as a clear question or choice
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="context" className="text-base font-semibold">
              Add some context
            </Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Textarea
            id="context"
            placeholder="Describe the situation, goals, or any relevant background information that might help with the analysis..."
            value={context}
            onChange={(e) => onContextChange(e.target.value)}
            rows={5}
            className="bg-background/50 border-border/60 focus:bg-background focus:border-primary/50 transition-all resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Or upload a document
          </Label>
          <FileUpload onTextExtracted={handleFileTextExtracted} />
          <p className="text-xs text-muted-foreground">
            Upload a resume, job offer, or any document to auto-fill context
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Tips for a good decision</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                Be specific about what you're choosing between
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                Frame it as a question when possible
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                Include the timeframe and constraints if relevant
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
