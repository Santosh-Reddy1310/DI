import type { DecisionFormData } from "@/types/decision";

export interface DecisionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  template: Partial<DecisionFormData>;
}

export const decisionTemplates: DecisionTemplate[] = [
  {
    id: "job-change",
    name: "Job Change Decision",
    description: "Evaluate job offers and career moves",
    icon: "💼",
    category: "Career",
    template: {
      title: "Should I accept the new job offer?",
      context: "Considering a career move. Current role vs new opportunity.",
      options: [
        { id: crypto.randomUUID(), label: "Stay at current job", notes: "" },
        { id: crypto.randomUUID(), label: "Accept new offer", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "Salary & Benefits", weight: 9, description: "Compensation package" },
        { id: crypto.randomUUID(), name: "Career Growth", weight: 8, description: "Learning and advancement opportunities" },
        { id: crypto.randomUUID(), name: "Work-Life Balance", weight: 7, description: "Hours, flexibility, commute" },
        { id: crypto.randomUUID(), name: "Company Culture", weight: 6, description: "Team dynamics and values" },
        { id: crypto.randomUUID(), name: "Job Security", weight: 5, description: "Stability and company health" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "timeline", value: "2 weeks to decide", priority: 4 },
      ],
    },
  },
  {
    id: "relocation",
    name: "Relocation Decision",
    description: "Decide whether to move to a new city or country",
    icon: "🏠",
    category: "Life",
    template: {
      title: "Should I relocate to [City]?",
      context: "Considering moving to a new location for work/life reasons.",
      options: [
        { id: crypto.randomUUID(), label: "Stay in current location", notes: "" },
        { id: crypto.randomUUID(), label: "Relocate", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "Cost of Living", weight: 9, description: "Housing, expenses, taxes" },
        { id: crypto.randomUUID(), name: "Career Opportunities", weight: 8, description: "Job market and growth" },
        { id: crypto.randomUUID(), name: "Quality of Life", weight: 8, description: "Weather, amenities, lifestyle" },
        { id: crypto.randomUUID(), name: "Social Network", weight: 6, description: "Friends, family proximity" },
        { id: crypto.randomUUID(), name: "Healthcare & Education", weight: 7, description: "Access to services" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "budget", value: "Moving costs", priority: 5 },
      ],
    },
  },
  {
    id: "feature-priority",
    name: "Feature Prioritization",
    description: "Prioritize product features for development",
    icon: "🚀",
    category: "Product",
    template: {
      title: "Which feature should we build next?",
      context: "Limited development resources. Need to prioritize features for maximum impact.",
      options: [
        { id: crypto.randomUUID(), label: "Feature A", notes: "" },
        { id: crypto.randomUUID(), label: "Feature B", notes: "" },
        { id: crypto.randomUUID(), label: "Feature C", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "User Impact", weight: 10, description: "How many users benefit" },
        { id: crypto.randomUUID(), name: "Revenue Potential", weight: 9, description: "Expected revenue increase" },
        { id: crypto.randomUUID(), name: "Development Effort", weight: 8, description: "Time and resources needed" },
        { id: crypto.randomUUID(), name: "Strategic Alignment", weight: 7, description: "Fits company vision" },
        { id: crypto.randomUUID(), name: "Technical Debt", weight: 5, description: "Long-term maintenance" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "timeline", value: "1 quarter", priority: 5 },
        { id: crypto.randomUUID(), type: "budget", value: "2 engineers", priority: 4 },
      ],
    },
  },
  {
    id: "vendor-selection",
    name: "Vendor Selection",
    description: "Choose between service providers or tools",
    icon: "🛠️",
    category: "Business",
    template: {
      title: "Which vendor/tool should we choose?",
      context: "Evaluating different vendors for our business needs.",
      options: [
        { id: crypto.randomUUID(), label: "Vendor A", notes: "" },
        { id: crypto.randomUUID(), label: "Vendor B", notes: "" },
        { id: crypto.randomUUID(), label: "Vendor C", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "Cost", weight: 9, description: "Total cost of ownership" },
        { id: crypto.randomUUID(), name: "Features", weight: 8, description: "Functionality and capabilities" },
        { id: crypto.randomUUID(), name: "Integration", weight: 7, description: "Works with existing tools" },
        { id: crypto.randomUUID(), name: "Support", weight: 6, description: "Customer service quality" },
        { id: crypto.randomUUID(), name: "Scalability", weight: 7, description: "Grows with business" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "budget", value: "Annual budget", priority: 5 },
      ],
    },
  },
  {
    id: "investment",
    name: "Investment Decision",
    description: "Evaluate investment opportunities",
    icon: "💰",
    category: "Finance",
    template: {
      title: "Where should I invest my money?",
      context: "Have savings to invest. Evaluating different investment options.",
      options: [
        { id: crypto.randomUUID(), label: "Stocks/Index Funds", notes: "" },
        { id: crypto.randomUUID(), label: "Real Estate", notes: "" },
        { id: crypto.randomUUID(), label: "Bonds", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "Expected Returns", weight: 9, description: "Potential ROI" },
        { id: crypto.randomUUID(), name: "Risk Level", weight: 8, description: "Volatility and safety" },
        { id: crypto.randomUUID(), name: "Liquidity", weight: 7, description: "Easy to access funds" },
        { id: crypto.randomUUID(), name: "Time Horizon", weight: 6, description: "Investment duration" },
        { id: crypto.randomUUID(), name: "Tax Efficiency", weight: 5, description: "Tax implications" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "budget", value: "Investment amount", priority: 5 },
      ],
    },
  },
  {
    id: "education",
    name: "Education Path",
    description: "Choose educational programs or courses",
    icon: "🎓",
    category: "Education",
    template: {
      title: "Which educational path should I pursue?",
      context: "Considering different educational opportunities for career advancement.",
      options: [
        { id: crypto.randomUUID(), label: "Master's Degree", notes: "" },
        { id: crypto.randomUUID(), label: "Online Certification", notes: "" },
        { id: crypto.randomUUID(), label: "Bootcamp", notes: "" },
      ],
      criteria: [
        { id: crypto.randomUUID(), name: "Career Impact", weight: 9, description: "Job prospects improvement" },
        { id: crypto.randomUUID(), name: "Cost", weight: 8, description: "Tuition and expenses" },
        { id: crypto.randomUUID(), name: "Time Commitment", weight: 7, description: "Duration and flexibility" },
        { id: crypto.randomUUID(), name: "Quality & Reputation", weight: 8, description: "Program recognition" },
        { id: crypto.randomUUID(), name: "Practical Skills", weight: 7, description: "Hands-on learning" },
      ],
      constraints: [
        { id: crypto.randomUUID(), type: "budget", value: "Education budget", priority: 5 },
        { id: crypto.randomUUID(), type: "timeline", value: "Start date", priority: 4 },
      ],
    },
  },
];

export function getTemplateById(id: string): DecisionTemplate | undefined {
  return decisionTemplates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): DecisionTemplate[] {
  return decisionTemplates.filter(t => t.category === category);
}

export const templateCategories = Array.from(
  new Set(decisionTemplates.map(t => t.category))
);
