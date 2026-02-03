import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
}

export function FileUpload({ onTextExtracted }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile) return;

    // Check file type
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, TXT, or DOC file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const text = await extractTextFromFile(selectedFile);
      
      if (text.trim().length === 0) {
        throw new Error("No text could be extracted from the file");
      }

      onTextExtracted(text);
      
      toast({
        title: "File processed",
        description: `Extracted ${text.length} characters from ${selectedFile.name}`,
      });
    } catch (error) {
      console.error("File processing error:", error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Failed to extract text from file",
        variant: "destructive",
      });
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            "hover:border-primary/50 hover:bg-accent/50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Upload a document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drop your resume, job offer, or any relevant document here
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, TXT, DOC (max 5MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
              className="hidden"
            />
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {isProcessing && (
            <div className="mt-3 text-sm text-muted-foreground">
              Processing file...
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// Helper function to extract text from different file types
async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === 'text/plain') {
    return await file.text();
  }

  if (file.type === 'application/pdf') {
    // For PDF files, we'll use a simple approach
    // In production, you'd want to use pdf-parse or similar
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    
    // Basic PDF text extraction (very simplified)
    // This won't work perfectly for all PDFs
    const matches = text.match(/\(([^)]+)\)/g);
    if (matches) {
      return matches.map(m => m.slice(1, -1)).join(' ');
    }
    
    return "PDF text extraction requires server-side processing. Please copy and paste the text manually.";
  }

  // For DOC/DOCX, we'd need a proper parser
  // For now, return a helpful message
  return "Document text extraction is not yet supported for this file type. Please copy and paste the text manually.";
}
