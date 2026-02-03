import type { Decision } from "@/types/decision";

/**
 * Sample decisions to help users get started
 * These are read-only examples that users can view and duplicate
 */
export const sampleDecisions: Omit<Decision, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    title: "Choose a Programming Language to Learn",
    context: "I'm a beginner looking to start my programming journey. I want to learn a language that has good job prospects, is beginner-friendly, and can be used for various types of projects including web development and data science.",
    status: "done",
    options: [
      {
        id: "1",
        label: "Python",
        description: "Versatile, beginner-friendly, great for data science and web development"
      },
      {
        id: "2",
        label: "JavaScript",
        description: "Essential for web development, runs everywhere, huge ecosystem"
      },
      {
        id: "3",
        label: "Java",
        description: "Enterprise-focused, strong typing, Android development"
      }
    ],
    criteria: [
      {
        id: "1",
        name: "Learning Curve",
        description: "How easy is it to learn for beginners",
        weight: 9
      },
      {
        id: "2",
        name: "Job Market",
        description: "Availability of jobs and career opportunities",
        weight: 8
      },
      {
        id: "3",
        name: "Versatility",
        description: "Can be used for multiple types of projects",
        weight: 7
      },
      {
        id: "4",
        name: "Community Support",
        description: "Size and helpfulness of the community",
        weight: 6
      }
    ],
    constraints: [],
    analysis_result: {
      recommendation: {
        optionId: "1",
        optionLabel: "Python",
        confidence: 0.89,
        summary: "Python is the ideal choice for beginners. It has the gentlest learning curve with readable syntax, excellent job prospects especially in data science and AI, and incredible versatility. The massive community ensures you'll always find help when needed."
      },
      scores: [
        {
          optionId: "1",
          optionLabel: "Python",
          criteriaScores: [
            { criterionId: "1", criterionName: "Learning Curve", score: 9 },
            { criterionId: "2", criterionName: "Job Market", score: 9 },
            { criterionId: "3", criterionName: "Versatility", score: 10 },
            { criterionId: "4", criterionName: "Community Support", score: 10 }
          ],
          totalScore: 95
        },
        {
          optionId: "2",
          optionLabel: "JavaScript",
          criteriaScores: [
            { criterionId: "1", criterionName: "Learning Curve", score: 7 },
            { criterionId: "2", criterionName: "Job Market", score: 10 },
            { criterionId: "3", criterionName: "Versatility", score: 9 },
            { criterionId: "4", criterionName: "Community Support", score: 10 }
          ],
          totalScore: 90
        },
        {
          optionId: "3",
          optionLabel: "Java",
          criteriaScores: [
            { criterionId: "1", criterionName: "Learning Curve", score: 5 },
            { criterionId: "2", criterionName: "Job Market", score: 8 },
            { criterionId: "3", criterionName: "Versatility", score: 7 },
            { criterionId: "4", criterionName: "Community Support", score: 8 }
          ],
          totalScore: 70
        }
      ],
      reasoning: {
        assumptions: [
          "You're starting from scratch with no prior programming experience",
          "You want to maximize career opportunities",
          "You prefer a language with extensive learning resources"
        ],
        tradeoffs: [
          "Python: Slower execution speed, but faster development time",
          "JavaScript: Required for web frontend, but can be confusing for beginners",
          "Java: More verbose syntax, but strong typing helps catch errors"
        ],
        risks: [
          "Python: May need to learn JavaScript later for web frontend",
          "JavaScript: Ecosystem changes rapidly, requires constant learning",
          "Java: Steeper learning curve may discourage beginners"
        ]
      }
    }
  },
  {
    title: "Select a Cloud Provider for Startup",
    context: "Our startup is building a SaaS product and needs to choose a cloud provider. We need scalability, good developer experience, reasonable pricing, and strong support for containerized applications.",
    status: "done",
    options: [
      {
        id: "1",
        label: "AWS",
        description: "Market leader, most comprehensive services, largest ecosystem"
      },
      {
        id: "2",
        label: "Google Cloud",
        description: "Strong in AI/ML, Kubernetes-native, competitive pricing"
      },
      {
        id: "3",
        label: "Azure",
        description: "Great for enterprise, Microsoft integration, hybrid cloud"
      }
    ],
    criteria: [
      {
        id: "1",
        name: "Pricing",
        description: "Cost-effectiveness for startup budget",
        weight: 9
      },
      {
        id: "2",
        name: "Developer Experience",
        description: "Ease of use and documentation quality",
        weight: 8
      },
      {
        id: "3",
        name: "Scalability",
        description: "Ability to grow with our needs",
        weight: 8
      },
      {
        id: "4",
        name: "Container Support",
        description: "Quality of Kubernetes and container services",
        weight: 7
      }
    ],
    constraints: [
      {
        id: "1",
        type: "budget",
        description: "Monthly budget under $5000",
        value: "5000"
      }
    ],
    analysis_result: {
      recommendation: {
        optionId: "2",
        optionLabel: "Google Cloud",
        confidence: 0.85,
        summary: "Google Cloud offers the best balance for your startup. It has competitive pricing with generous free tiers, excellent Kubernetes support (they invented it), and a clean developer experience. The AI/ML capabilities will be valuable as you grow."
      },
      scores: [
        {
          optionId: "2",
          optionLabel: "Google Cloud",
          criteriaScores: [
            { criterionId: "1", criterionName: "Pricing", score: 9 },
            { criterionId: "2", criterionName: "Developer Experience", score: 9 },
            { criterionId: "3", criterionName: "Scalability", score: 9 },
            { criterionId: "4", criterionName: "Container Support", score: 10 }
          ],
          totalScore: 92
        },
        {
          optionId: "1",
          optionLabel: "AWS",
          criteriaScores: [
            { criterionId: "1", criterionName: "Pricing", score: 7 },
            { criterionId: "2", criterionName: "Developer Experience", score: 7 },
            { criterionId: "3", criterionName: "Scalability", score: 10 },
            { criterionId: "4", criterionName: "Container Support", score: 8 }
          ],
          totalScore: 80
        },
        {
          optionId: "3",
          optionLabel: "Azure",
          criteriaScores: [
            { criterionId: "1", criterionName: "Pricing", score: 7 },
            { criterionId: "2", criterionName: "Developer Experience", score: 8 },
            { criterionId: "3", criterionName: "Scalability", score: 9 },
            { criterionId: "4", criterionName: "Container Support", score: 8 }
          ],
          totalScore: 80
        }
      ],
      reasoning: {
        assumptions: [
          "You're building a containerized application",
          "Your team is comfortable with modern DevOps practices",
          "You don't have existing Microsoft infrastructure"
        ],
        tradeoffs: [
          "GCP: Smaller ecosystem than AWS, but cleaner APIs",
          "AWS: Most services available, but steeper learning curve",
          "Azure: Best for Microsoft shops, less relevant otherwise"
        ],
        risks: [
          "GCP: Smaller market share means fewer third-party integrations",
          "AWS: Complex pricing can lead to unexpected costs",
          "Azure: May be overkill if not using Microsoft stack"
        ]
      }
    }
  },
  {
    title: "Choose a Project Management Tool",
    context: "Our remote team of 15 people needs a project management tool. We work in sprints, need good collaboration features, and want something that's easy to onboard new team members.",
    status: "done",
    options: [
      {
        id: "1",
        label: "Jira",
        description: "Industry standard, powerful features, Atlassian ecosystem"
      },
      {
        id: "2",
        label: "Linear",
        description: "Modern, fast, keyboard-first, great for engineering teams"
      },
      {
        id: "3",
        label: "Asana",
        description: "User-friendly, flexible, good for cross-functional teams"
      }
    ],
    criteria: [
      {
        id: "1",
        name: "Ease of Use",
        description: "How quickly can new team members get productive",
        weight: 9
      },
      {
        id: "2",
        name: "Features",
        description: "Sprint planning, reporting, integrations",
        weight: 8
      },
      {
        id: "3",
        name: "Performance",
        description: "Speed and responsiveness of the tool",
        weight: 7
      },
      {
        id: "4",
        name: "Pricing",
        description: "Cost per user per month",
        weight: 7
      }
    ],
    constraints: [
      {
        id: "1",
        type: "budget",
        description: "Under $20 per user per month",
        value: "20"
      }
    ],
    analysis_result: {
      recommendation: {
        optionId: "2",
        optionLabel: "Linear",
        confidence: 0.87,
        summary: "Linear is the best fit for your engineering team. It's incredibly fast, has a modern interface that developers love, and includes all essential features for sprint planning. The keyboard shortcuts make power users extremely productive."
      },
      scores: [
        {
          optionId: "2",
          optionLabel: "Linear",
          criteriaScores: [
            { criterionId: "1", criterionName: "Ease of Use", score: 9 },
            { criterionId: "2", criterionName: "Features", score: 9 },
            { criterionId: "3", criterionName: "Performance", score: 10 },
            { criterionId: "4", criterionName: "Pricing", score: 8 }
          ],
          totalScore: 90
        },
        {
          optionId: "3",
          optionLabel: "Asana",
          criteriaScores: [
            { criterionId: "1", criterionName: "Ease of Use", score: 10 },
            { criterionId: "2", criterionName: "Features", score: 8 },
            { criterionId: "3", criterionName: "Performance", score: 7 },
            { criterionId: "4", criterionName: "Pricing", score: 8 }
          ],
          totalScore: 83
        },
        {
          optionId: "1",
          optionLabel: "Jira",
          criteriaScores: [
            { criterionId: "1", criterionName: "Ease of Use", score: 5 },
            { criterionId: "2", criterionName: "Features", score: 10 },
            { criterionId: "3", criterionName: "Performance", score: 6 },
            { criterionId: "4", criterionName: "Pricing", score: 7 }
          ],
          totalScore: 70
        }
      ],
      reasoning: {
        assumptions: [
          "Your team is primarily engineering-focused",
          "You value speed and efficiency",
          "You don't need complex enterprise workflows"
        ],
        tradeoffs: [
          "Linear: Newer tool with smaller ecosystem",
          "Asana: More flexible but less engineering-focused",
          "Jira: Most powerful but steepest learning curve"
        ],
        risks: [
          "Linear: May lack some advanced reporting features",
          "Asana: Can become cluttered with too many features",
          "Jira: Team may resist due to complexity"
        ]
      }
    }
  }
];

/**
 * Get sample decisions for display
 */
export function getSampleDecisions(): typeof sampleDecisions {
  return sampleDecisions;
}

/**
 * Check if a decision is a sample decision
 */
export function isSampleDecision(decisionId: string): boolean {
  return decisionId.startsWith('sample-');
}

/**
 * Get a sample decision by index
 */
export function getSampleDecision(index: number): typeof sampleDecisions[0] | null {
  return sampleDecisions[index] || null;
}
