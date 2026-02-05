# DESY - AI-Powered Decision Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://desy.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

> **Transform complex decisions into confident choices with AI-powered analysis and structured decision-making frameworks.**

DESY is an intelligent decision-making platform that combines structured decision analysis with advanced AI to help individuals and teams make better, more informed decisions. Unlike traditional chatbots that provide generic advice, DESY offers a systematic approach to decision-making with personalized insights, multi-criteria analysis, and actionable recommendations.

## 🚀 Key Features

### 🧠 **Intelligent Decision Framework**
- **Multi-Criteria Decision Analysis (MCDA)**: Structured evaluation using weighted criteria
- **Options Comparison**: Side-by-side analysis of all available choices
- **Constraint Management**: Define and respect decision boundaries and limitations
- **Risk Assessment**: Identify and evaluate potential risks for each option

### 🤖 **AI-Powered Insights**
- **Contextual Analysis**: AI understands your specific situation and requirements
- **Personalized Recommendations**: Tailored advice based on your criteria and constraints
- **Confidence Scoring**: Quantified confidence levels for each recommendation
- **Reasoning Transparency**: Clear explanations of why specific options are recommended

### 📊 **Advanced Analytics & Visualization**
- **Interactive Radar Charts**: Visual comparison of options across multiple criteria
- **Score Matrices**: Detailed scoring breakdown for informed decision-making
- **What-If Analysis**: Explore how changing criteria weights affects outcomes
- **Decision History**: Track and learn from past decisions

### 🔒 **Enterprise-Grade Security**
- **User Authentication**: Secure login with Clerk authentication
- **Data Privacy**: Personal decisions remain private and secure
- **Row-Level Security**: Database-level access controls
- **GDPR Compliant**: Respects user privacy and data protection regulations

## 🎯 How DESY Differs from Traditional AI Chatbots

| Feature | Traditional AI Chatbots | DESY |
|---------|------------------------|------|
| **Approach** | Conversational advice | Structured decision framework |
| **Analysis Method** | Subjective responses | Multi-criteria quantitative analysis |
| **Personalization** | Generic suggestions | Weighted criteria based on your priorities |
| **Transparency** | Black box reasoning | Clear scoring and explanation |
| **Decision Tracking** | No memory of context | Complete decision history and learning |
| **Collaboration** | Individual conversations | Team decision-making capabilities |
| **Actionability** | Vague recommendations | Specific, ranked options with confidence scores |

## 🛠 Technology Stack

### **Frontend**
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for modern, responsive design
- **Shadcn/ui** for consistent, accessible UI components
- **Recharts** for interactive data visualizations

### **Backend & Database**
- **Supabase** for real-time database and authentication
- **PostgreSQL** with Row-Level Security (RLS)
- **RESTful API** with automatic OpenAPI documentation

### **Authentication & Security**
- **Clerk** for secure user authentication and management
- **JWT tokens** for secure API communication
- **Environment-based configuration** for different deployment stages

### **AI & Analytics**
- **Multiple AI Provider Support** (OpenAI, Groq, OpenRouter)
- **Structured prompt engineering** for consistent analysis
- **Real-time decision processing** with confidence scoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Supabase account
- Clerk account
- AI provider API key (OpenAI, Groq, or OpenRouter)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/desy.git
   cd desy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   
   # AI Provider (choose one)
   VITE_OPENROUTER_API_KEY=your_openrouter_key
   VITE_GROQ_API_KEY=your_groq_key
   VITE_PRIMARY_AI_PROVIDER=groq
   VITE_AI_MODEL=llama-3.3-70b-versatile
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Configure Row-Level Security policies

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Creating Your First Decision

1. **Sign up/Login** using the secure authentication system
2. **Click "New Decision"** to start the decision-making process
3. **Define your decision context** - describe what you're trying to decide
4. **Add options** - list all possible choices you're considering
5. **Set criteria** - define what factors matter most (with weights 1-10)
6. **Add constraints** (optional) - set any limitations or requirements
7. **Get AI analysis** - receive structured recommendations with explanations
8. **Review results** - explore visualizations, scores, and reasoning
9. **Make your decision** - use the insights to choose confidently

### Advanced Features

- **What-If Analysis**: Adjust criteria weights to see how it affects recommendations
- **Export Results**: Download decision analysis as PDF for sharing
- **Decision History**: Review past decisions and outcomes
- **Team Collaboration**: Share decisions with team members (coming soon)

## 🏗 Project Structure

```
desy/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── results/        # Decision results visualization
│   │   ├── ui/             # Base UI components (shadcn/ui)
│   │   └── wizard/         # Decision creation wizard
│   ├── contexts/           # React contexts for state management
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service integrations
│   ├── lib/                # Utility functions and services
│   ├── pages/              # Application pages/routes
│   └── types/              # TypeScript type definitions
├── supabase/               # Database schema and configuration
├── public/                 # Static assets
└── docs/                   # Additional documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service platform
- **Clerk** for seamless authentication solutions
- **Shadcn/ui** for beautiful, accessible UI components
- **Vercel** for reliable deployment and hosting

## 📞 Support & Contact

- **Documentation**: [docs.desy.app](https://docs.desy.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/desy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/desy/discussions)
- **Email**: support@desy.app

---

**Made with ❤️ for better decision-making**