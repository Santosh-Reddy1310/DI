import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ScoresTable } from "@/components/results/ScoresTable";
import { ScoreChart } from "@/components/results/ScoreChart";
import { RadarChart } from "@/components/results/RadarChart";
import { ReasoningAccordion } from "@/components/results/ReasoningAccordion";
import { AnalysisLoader } from "@/components/results/AnalysisLoader";
import { FeedbackButton } from "@/components/results/FeedbackButton";
import { WhatIfSliders } from "@/components/results/WhatIfSliders";
import { PipelineStages } from "@/components/results/PipelineStages";
import { ShareDialog } from "@/components/results/ShareDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Share2, RefreshCw, Home, ChevronRight } from "lucide-react";
import { getDecision, updateDecisionStatus } from "@/lib/supabase-service";
import { analyzeDecision } from "@/lib/analysis-service";
import { exportDecisionToPDF } from "@/lib/pdf-export";
import type { AnalysisResult, Decision } from "@/types/decision";

export default function DecisionResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
      return;
    }

    loadDecision();
  }, [id]);

  async function loadDecision() {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if this is a sample decision
      const isSampleDecision = id!.startsWith('sample-');
      setIsSample(isSampleDecision);
      
      const decisionData = await getDecision(id!);
      setDecision(decisionData);

      // Check if analysis is complete
      if (decisionData.analysis_result) {
        setResult(decisionData.analysis_result as AnalysisResult);
      } else if (decisionData.result_json) {
        setResult(decisionData.result_json as AnalysisResult);
      } else if (decisionData.status === "analyzing" && !isSampleDecision) {
        // Poll for result if still analyzing (not for samples)
        pollForResult();
      } else if (!isSampleDecision) {
        setError("This decision hasn't been analyzed yet.");
      }
    } catch (err) {
      console.error("Error loading decision:", err);
      setError(err instanceof Error ? err.message : "Failed to load decision");
      toast({
        title: "Error",
        description: "Failed to load decision. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function pollForResult() {
    const maxAttempts = 60; // 3 minutes max
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const decisionData = await getDecision(id!);

        if (decisionData.result_json) {
          clearInterval(interval);
          setDecision(decisionData);
          setResult(decisionData.result_json as AnalysisResult);
          setIsLoading(false);
        } else if (decisionData.status !== "analyzing" || attempts >= maxAttempts) {
          clearInterval(interval);
          setError("Analysis timed out or failed. Please try again.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Polling error:", err);
        clearInterval(interval);
        setError("Failed to check analysis status");
        setIsLoading(false);
      }
    }, 3000); // Poll every 3 seconds
  }

  async function handleReanalyze() {
    if (!decision) return;

    setIsReanalyzing(true);

    try {
      await updateDecisionStatus(decision.id, "analyzing");

      const analysisResult = await analyzeDecision(decision);

      await updateDecisionStatus(decision.id, "done");

      setResult(analysisResult);

      toast({
        title: "Re-analysis Complete",
        description: "Your decision has been re-analyzed.",
      });

      // Reload to get fresh data
      loadDecision();
    } catch (err) {
      console.error("Re-analysis error:", err);
      toast({
        title: "Re-analysis Failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });

      if (decision) {
        await updateDecisionStatus(decision.id, "draft").catch(console.error);
      }
    } finally {
      setIsReanalyzing(false);
    }
  }

  async function handleExportPDF() {
    if (!decision || !result) return;

    try {
      await exportDecisionToPDF(decision, result);
      toast({
        title: "PDF Exported",
        description: "Your decision analysis has been downloaded.",
      });
    } catch (err) {
      console.error("PDF export error:", err);
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <AnalysisLoader />
        </div>
      </div>
    );
  }

  if (error || !result || !decision) {
    return (
      <div className="min-h-screen flex bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 container py-8">
            <div className="max-w-2xl mx-auto text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Analysis Not Available</h1>
              <p className="text-muted-foreground mb-6">
                {error || "This decision hasn't been analyzed yet."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/dashboard")} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                {decision && (
                  <Button onClick={() => navigate(`/decisions/${id}`)}>
                    Edit Decision
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 container py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            {!isSample && (
              <>
                <Link 
                  to={`/decisions/${id}`} 
                  className="hover:text-foreground transition-colors truncate max-w-xs"
                >
                  {decision?.title || "Decision"}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground font-medium">
              {isSample ? `${decision?.title || "Example"} (Example)` : "Analysis Results"}
            </span>
          </nav>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
              <p className="text-muted-foreground">
                {decision.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isSample && (
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleReanalyze}
                  disabled={isReanalyzing}
                >
                  <RefreshCw className={`h-4 w-4 ${isReanalyzing ? 'animate-spin' : ''}`} />
                  {isReanalyzing ? "Re-analyzing..." : "Re-analyze"}
                </Button>
              )}
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={() => setShowShareDialog(true)}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button className="gap-2 shadow-lg shadow-primary/20" onClick={handleExportPDF}>
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recommendation */}
              <RecommendationCard recommendation={result.recommendation} />

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScoreChart scores={result.scores} />
                <RadarChart scores={result.scores} />
              </div>

              {/* Scores table */}
              <ScoresTable scores={result.scores} />
              
              {/* What-If Analysis */}
              <WhatIfSliders
                criteria={decision.criteria}
                scores={result.scores}
                onWeightsChange={(newCriteria) => {
                  // Update is handled internally by the component
                  console.log("Weights updated:", newCriteria);
                }}
              />
            </div>

            {/* Sidebar - Reasoning */}
            <div className="space-y-6">
              <PipelineStages result={result} />
              <ReasoningAccordion reasoning={result.reasoning} />
              <FeedbackButton decisionId={decision.id} />
            </div>
          </div>
        </main>

        {/* Share Dialog */}
        {decision && result && (
          <ShareDialog
            open={showShareDialog}
            onOpenChange={setShowShareDialog}
            decision={decision}
            result={result}
          />
        )}
      </div>
    </div>
  );
}
