import { generateText } from 'ai';
import { getAIProvider, getFallbackProvider } from './ai-provider';
import type { AnalysisResultType } from './analysis-schema';
import type { DecisionFormData, Decision } from '@/types/decision';

/**
 * Build the analysis prompt from decision data
 */
function buildAnalysisPrompt(decision: DecisionFormData | Decision): string {
  const hasContext = 'context' in decision && decision.context;
  const options = decision.options.filter(o => o.label.trim());
  const criteria = decision.criteria.filter(c => c.name.trim());
  const constraints = decision.constraints || [];

  return `
DECISION: ${decision.title}

${hasContext ? `CONTEXT:\n${decision.context}\n` : ''}

OPTIONS (${options.length} choices to evaluate):
${options.map((opt, i) => 
  `${i + 1}. "${opt.label}" (id: "opt_${i + 1}")${opt.notes ? `\n   Notes: ${opt.notes}` : ''}`
).join('\n')}

EVALUATION CRITERIA (importance-weighted):
${criteria.map((c, i) => 
  `${i + 1}. "${c.name}" (id: "crit_${i + 1}") [Weight: ${c.weight}/10]${c.description ? `\n   → ${c.description}` : ''}`
).join('\n')}

${constraints.length > 0 ? `CONSTRAINTS:
${constraints.map(c => 
  `• ${c.type.toUpperCase()}: ${c.value} [Priority: ${c.priority}/5]`
).join('\n')}` : 'CONSTRAINTS: None specified'}

TASK: Analyze all ${options.length} options against the ${criteria.length} criteria.
Score each option 1-10 on each criterion, calculate weighted totals, and recommend the best choice.

Respond with ONLY this JSON structure (no other text, no markdown):
{
  "recommendation": {
    "optionId": "opt_X",
    "optionLabel": "name of recommended option",
    "confidence": 0.85,
    "summary": "2-3 sentence explanation"
  },
  "scores": [
    {
      "optionId": "opt_1",
      "optionLabel": "option name",
      "totalScore": 75,
      "criteriaScores": [
        {"criterionId": "crit_1", "criterionName": "criterion", "score": 8}
      ]
    }
  ],
  "reasoning": {
    "decomposition": "How you analyzed this",
    "assumptions": ["assumption 1"],
    "tradeoffs": ["tradeoff 1"],
    "risks": ["risk 1"],
    "sensitivity": "How weight changes affect outcome"
  }
}
  `.trim();
}

/**
 * Extract JSON from AI response text
 */
function extractJSON(text: string): any {
  // Try to find JSON in the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }
  
  let jsonStr = jsonMatch[0];
  
  // Clean up common issues
  jsonStr = jsonStr
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')
    .replace(/[\x00-\x1F\x7F]/g, ' ');
  
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON parse error, raw text:', text.substring(0, 500));
    throw new Error('Invalid JSON in AI response');
  }
}

/**
 * Validate and fix the analysis result structure
 */
function validateAndFixResult(raw: any, decision: DecisionFormData | Decision): AnalysisResultType {
  const options = decision.options.filter(o => o.label.trim());
  const criteria = decision.criteria.filter(c => c.name.trim());
  
  const recommendation = raw.recommendation || {};
  let scores = raw.scores || [];
  
  if (!Array.isArray(scores) || scores.length === 0) {
    scores = options.map((opt, i) => ({
      optionId: `opt_${i + 1}`,
      optionLabel: opt.label,
      totalScore: 50,
      criteriaScores: criteria.map((c, j) => ({
        criterionId: `crit_${j + 1}`,
        criterionName: c.name,
        score: 5
      }))
    }));
  }
  
  const reasoning = raw.reasoning || {};
  
  return {
    recommendation: {
      optionId: String(recommendation.optionId || 'opt_1'),
      optionLabel: String(recommendation.optionLabel || options[0]?.label || 'Unknown'),
      confidence: Number(recommendation.confidence) || 0.7,
      summary: String(recommendation.summary || 'Analysis completed.')
    },
    scores: scores.map((s: any, i: number) => ({
      optionId: String(s.optionId || `opt_${i + 1}`),
      optionLabel: String(s.optionLabel || options[i]?.label || `Option ${i + 1}`),
      totalScore: Number(s.totalScore) || 50,
      criteriaScores: Array.isArray(s.criteriaScores) 
        ? s.criteriaScores.map((cs: any, j: number) => ({
            criterionId: String(cs.criterionId || `crit_${j + 1}`),
            criterionName: String(cs.criterionName || criteria[j]?.name || `Criterion ${j + 1}`),
            score: Math.min(10, Math.max(1, Number(cs.score) || 5))
          }))
        : criteria.map((c, j) => ({
            criterionId: `crit_${j + 1}`,
            criterionName: c.name,
            score: 5
          }))
    })),
    reasoning: {
      decomposition: String(reasoning.decomposition || 'Decision analyzed based on provided criteria.'),
      assumptions: Array.isArray(reasoning.assumptions) ? reasoning.assumptions.map(String) : ['Based on provided information'],
      tradeoffs: Array.isArray(reasoning.tradeoffs) ? reasoning.tradeoffs.map(String) : ['Each option has unique advantages'],
      risks: Array.isArray(reasoning.risks) ? reasoning.risks.map(String) : ['Results depend on input accuracy'],
      sensitivity: String(reasoning.sensitivity || 'Recommendation may change if weights are adjusted.')
    }
  };
}

/**
 * Analyze a decision using AI with structured output
 */
export async function analyzeDecision(
  decision: DecisionFormData | Decision,
  onProgress?: (message: string) => void
): Promise<AnalysisResultType> {
  const { model } = getAIProvider();
  
  onProgress?.('Preparing analysis...');
  
  const systemPrompt = `You are an expert decision analyst. Respond with ONLY valid JSON, no markdown code blocks, no explanations. Start with { and end with }`;

  try {
    onProgress?.('Analyzing with AI...');
    
    const result = await generateText({
      model,
      system: systemPrompt,
      prompt: buildAnalysisPrompt(decision),
      temperature: 0.3,
      maxTokens: 2000,
    });

    onProgress?.('Processing results...');
    
    const parsed = extractJSON(result.text);
    const validated = validateAndFixResult(parsed, decision);
    
    onProgress?.('Analysis complete!');
    return validated;
    
  } catch (error) {
    console.error('Primary AI provider failed, trying fallback...', error);
    onProgress?.('Retrying with backup...');
    
    try {
      const { model: fallbackModel } = getFallbackProvider();
      
      const result = await generateText({
        model: fallbackModel,
        system: systemPrompt,
        prompt: buildAnalysisPrompt(decision),
        temperature: 0.3,
        maxTokens: 2000,
      });

      const parsed = extractJSON(result.text);
      const validated = validateAndFixResult(parsed, decision);
      
      onProgress?.('Analysis complete!');
      return validated;
      
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw new Error('AI analysis failed. Please try again.');
    }
  }
}

/**
 * Validate that a decision has minimum required data for analysis
 */
export function validateDecisionForAnalysis(decision: DecisionFormData | Decision): { 
  valid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];

  if (!decision.title?.trim()) {
    errors.push('Decision title is required');
  }

  const validOptions = decision.options.filter(o => o.label.trim());
  if (validOptions.length < 2) {
    errors.push('At least 2 options are required');
  }

  const validCriteria = decision.criteria.filter(c => c.name.trim());
  if (validCriteria.length < 1) {
    errors.push('At least 1 criterion is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
