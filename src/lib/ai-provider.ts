import { createOpenAI } from '@ai-sdk/openai';

// OpenRouter provider configuration
export const openrouter = createOpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
});

// Groq provider configuration
export const groq = createOpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  baseURL: 'https://api.groq.com/openai/v1',
});

// Model selection based on environment or defaults
const PRIMARY_PROVIDER = import.meta.env.VITE_PRIMARY_AI_PROVIDER || 'groq';
const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'llama-3.1-70b-versatile';

// Available models (Updated Feb 2026)
export const MODELS = {
  groq: {
    fast: 'gemma2-9b-it',
    balanced: 'llama-3.3-70b-versatile',
    smart: 'mixtral-8x7b-32768',
  },
  openrouter: {
    fast: 'nousresearch/nous-capybara-7b:free',
    balanced: 'mistralai/mistral-7b-instruct:free',
    smart: 'gryphe/mythomist-7b:free',
  },
};

// Get the active provider and model
export function getAIProvider() {
  const provider = PRIMARY_PROVIDER === 'openrouter' ? openrouter : groq;
  const modelName = AI_MODEL || MODELS[PRIMARY_PROVIDER as 'groq' | 'openrouter'].balanced;
  
  return {
    provider,
    model: provider(modelName),
    modelName,
  };
}

// Fallback provider for error handling
export function getFallbackProvider() {
  const fallbackProviderName = PRIMARY_PROVIDER === 'groq' ? 'openrouter' : 'groq';
  const provider = fallbackProviderName === 'openrouter' ? openrouter : groq;
  const modelName = MODELS[fallbackProviderName as 'groq' | 'openrouter'].balanced;
  
  return {
    provider,
    model: provider(modelName),
    modelName,
  };
}
