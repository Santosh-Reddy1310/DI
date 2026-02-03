# 🎯 Decision Navigator (DESY)

> Turn complex, real-world decisions into structured, data-driven, and explainable outcomes.

Decision Navigator (DESY) is an AI-powered platform designed to eliminate analysis paralysis. By leveraging advanced multi-step reasoning, it helps you break down complex choices across multiple dimensions (Criteria, Constraints, and Context) to find the optimal path forward with complete transparency.

![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)
![Tech](https://img.shields.io/badge/tech-React%2018%20%7C%20Vite%20%7C%20Supabase-green)
![Build](https://img.shields.io/badge/build-passing-success)

---

## ✨ Key Features

### 🧠 **AI-Powered Analysis**
- **Multi-Step Reasoning Pipeline**: Sophisticated 4-stage analysis (Contextual Analysis → Attribute Matrix → Constraint Validation → Synthesis)
- **Multiple AI Providers**: Groq (500+ tok/s), OpenRouter, and OpenAI support
- **High Confidence Scoring**: Get reliability metrics for every recommendation

### 🎨 **Modern User Interface**
- **Dual Navigation System**: 
  - Landing page with circular tubelight navbar
  - Dashboard with collapsible sidebar
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Glass Morphism**: Beautiful backdrop blur effects and gradient overlays
- **Dark/Light Mode**: System-aware theme switching

### 📊 **Comprehensive Dashboard**
- **Real-Time Statistics**: Dynamic counts for all decision statuses
- **Activity Tracking**: 7-day activity visualization
- **Smart Filtering**: Filter by status with live counts
- **Multiple Views**: Grid and list view modes
- **Search Functionality**: Quick decision lookup
- **Example Decisions**: 3 pre-built sample decisions to explore
- **User Profile**: Avatar with initials in sidebar

### 🔧 **Decision Management**
- **Multi-Step Wizard**: Guided decision creation process
  1. Context - Define your decision background (with file upload support)
  2. Options - List all alternatives
  3. Criteria - Set weighted importance factors
  4. Constraints - Define hard limits
  5. Review - Verify before analysis
- **Decision Templates**: 6 pre-built templates (Job Change, Relocation, Feature Priority, Vendor Selection, Investment, Education)
- **File Upload**: Drag & drop PDF/TXT/DOC files to auto-fill context
- **Edit & Delete**: Full CRUD operations with confirmation dialogs
- **Archive System**: Keep your workspace organized
- **Duplicate Decisions**: Reuse decision templates
- **History View**: Chronological timeline grouped by month
- **Feedback System**: "Was this helpful?" widget on results page

### 📈 **Rich Visualizations & Export**
- **Radar Charts**: Multi-dimensional option comparison
- **Score Charts**: Visual ranking of alternatives
- **Detailed Tables**: Comprehensive score breakdowns
- **Reasoning Accordion**: Expandable AI reasoning explanations
- **PDF Export**: Professional multi-page reports with cover page, executive summary, scores, and AI reasoning
- **What-If Analysis**: Live weight adjustment sliders with real-time ranking recalculation
- **Pipeline Visualization**: Expandable view of all 4 AI reasoning stages

### 🔐 **Authentication & Security**
- **Email Authentication**: Secure signup/login with email verification
- **Password Reset**: Self-service password recovery flow
- **Resend Confirmation**: Easy email confirmation resend
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Management**: Persistent login with secure tokens
- **Account Deletion**: Complete account and data removal
- **Row Level Security (RLS)**: Supabase-powered data isolation
- **Zod Validation**: Strict schema validation for all inputs
- **User-Specific Data**: Each user can only access their own decisions
- **Data Persistence**: All decisions saved to cloud database

### 📧 **Email Notifications** (Optional Setup)
- **Analysis Complete**: Get notified when AI finishes analyzing
- **Weekly Digest**: Receive summary of your decisions
- **Customizable**: Toggle notifications on/off in Settings
- **User Preferences**: Saved per-user notification settings

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) (Lightning-fast HMR)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **File Upload**: Native HTML5 with drag & drop

### Backend & Services
- **Database/Auth**: [Supabase](https://supabase.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **AI Providers**: Groq, OpenRouter, OpenAI

### UI Components
- **Component Library**: shadcn/ui (50+ components)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner Toast

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **bun** package manager
- **Supabase Account** (free tier available)
- **AI API Keys** (Groq and/or OpenRouter)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd decision-navigator

# Install dependencies
npm install
# or
bun install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# AI Provider Keys
VITE_GROQ_API_KEY=your_groq_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# Optional: AI Configuration Defaults
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile
```

### Database Setup

1. Create a new project on [Supabase.com](https://supabase.com)
2. Go to the **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase/schema.sql`
4. Execute the SQL to create all tables and enable RLS
5. Verify tables are created: `decisions`, `options`, `criteria`, `constraints`

### Authentication Setup

1. **Enable Email Provider**
   - Go to **Authentication** → **Providers** in Supabase dashboard
   - Enable **Email** provider
   - Configure email templates (optional)
   - **Optional**: Disable email confirmation for development (see `DISABLE_EMAIL_CONFIRMATION.md`)

2. **Configure Redirect URLs**
   - Go to **Authentication** → **URL Configuration**
   - Add site URL: `http://localhost:8080` (development)
   - Add redirect URLs:
     - `http://localhost:8080/login`
     - `http://localhost:8080/reset-password`
   - Add production URLs when deploying

3. **Setup Account Deletion** (Important!)
   - Go to **SQL Editor** in Supabase dashboard
   - Copy and paste contents of `supabase/SETUP_DELETE_ACCOUNT.sql`
   - Execute the SQL to create account deletion function
   - This allows users to fully delete their accounts
   - See `docs/QUICK_DELETE_SETUP.md` for details

4. **Verify RLS Policies**
   - Ensure all tables have RLS enabled
   - Policies should filter by `user_id = auth.uid()`

For detailed authentication setup instructions, see [docs/AUTHENTICATION_SETUP.md](docs/AUTHENTICATION_SETUP.md)

### Optional: Email Notifications Setup

To enable email notifications when decisions are analyzed:

1. **Choose email service** (Resend recommended)
2. **Set up Supabase Edge Function** or backend API
3. **Configure email templates**
4. See `docs/EMAIL_NOTIFICATIONS_SETUP.md` for complete guide

Email notifications are optional but enhance the user experience.

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:8080`

---

## 📂 Project Structure

```
decision-navigator/
├── src/
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   └── ProtectedRoute.tsx    # Route protection
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── DecisionCard.tsx      # Card with action menu
│   │   │   └── FilterSidebar.tsx     # Dynamic stats & filters
│   │   ├── landing/            # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── CTA.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── DashboardSidebar.tsx  # Collapsible sidebar
│   │   │   ├── LandingHeader.tsx     # Tubelight navbar
│   │   │   └── Footer.tsx
│   │   ├── results/            # Analysis result components
│   │   │   ├── RadarChart.tsx
│   │   │   ├── ScoreChart.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── FeedbackButton.tsx    # Thumbs up/down widget
│   │   │   ├── WhatIfSliders.tsx     # Live weight adjustment
│   │   │   ├── PipelineStages.tsx    # 4-stage visualization
│   │   │   └── ReasoningAccordion.tsx
│   │   ├── wizard/             # Decision creation wizard
│   │   │   ├── StepContext.tsx       # With file upload
│   │   │   ├── StepOptions.tsx
│   │   │   ├── StepCriteria.tsx
│   │   │   ├── TemplateSelector.tsx  # 6 templates
│   │   │   └── FileUpload.tsx        # Drag & drop
│   │   └── ui/                 # shadcn/ui components (50+)
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication state
│   ├── lib/                    # Core services
│   │   ├── ai-provider.ts      # AI integration
│   │   ├── analysis-service.ts # Decision analysis logic
│   │   ├── supabase-service.ts # Database operations
│   │   ├── pdf-export.ts       # Professional PDF generation
│   │   ├── decision-templates.ts # Pre-built templates
│   │   ├── sample-decisions.ts # Example decisions
│   │   ├── notification-service.ts # Email notifications
│   │   └── utils.ts            # Utility functions
│   ├── pages/                  # Route pages
│   │   ├── Index.tsx           # Landing page
│   │   ├── Login.tsx           # Login page
│   │   ├── Signup.tsx          # Registration page
│   │   ├── ForgotPassword.tsx  # Password reset
│   │   ├── Dashboard.tsx       # Main dashboard (protected)
│   │   ├── NewDecision.tsx     # Decision wizard (protected)
│   │   ├── DecisionResult.tsx  # Analysis results (protected)
│   │   ├── History.tsx         # Decision history (protected)
│   │   └── Settings.tsx        # User settings (protected)
│   ├── types/                  # TypeScript definitions
│   │   └── decision.ts
│   └── integrations/           # Third-party integrations
│       └── supabase/
├── docs/                        # Documentation
│   ├── README.md               # Documentation index
│   ├── AUTHENTICATION_SETUP.md # Detailed auth setup guide
│   ├── QUICK_DELETE_SETUP.md   # Account deletion setup (2 min)
│   ├── EMAIL_NOTIFICATIONS_SETUP.md # Email notifications guide
│   ├── SAMPLE_DECISIONS_FEATURE.md # Example decisions documentation
│   ├── ENVIRONMENT_VARIABLES.md # Environment configuration
│   └── TESTING_EXAMPLES.md     # Testing examples
├── supabase/
│   ├── schema.sql              # Database schema
│   ├── SETUP_DELETE_ACCOUNT.sql # Account deletion function
│   └── config.toml             # Supabase configuration
├── DEPLOYMENT_CHECKLIST.md     # Production deployment checklist
└── public/                     # Static assets
```

---

## 📖 Usage Guide

### Getting Started

1. **Sign Up**
   - Navigate to `/signup`
   - Enter your full name, email, and password
   - Check your email for confirmation link
   - Click the link to verify your account

2. **Login**
   - Go to `/login`
   - Enter your email and password
   - Access your personalized dashboard

### Creating a Decision

1. **Start from Template (Optional)**
   - Click "New Decision" from dashboard
   - Choose from 6 pre-built templates or start from scratch
   - Templates include: Job Change, Relocation, Feature Priority, Vendor Selection, Investment, Education

2. **Add Context**
   - Describe your decision background
   - Upload supporting documents (PDF/TXT/DOC) via drag & drop
   - Files are automatically parsed to extract context

3. **Define Options**
   - List all alternatives you're considering
   - Add descriptions for each option

4. **Set Criteria**
   - Define what matters most in your decision
   - Assign importance weights (1-10)
   - Criteria are used to evaluate each option

5. **Add Constraints (Optional)**
   - Set hard limits (budget, timeline, resources)
   - Options violating constraints are flagged

6. **Review & Analyze**
   - Verify all inputs
   - Submit for AI analysis
   - Wait for 4-stage reasoning pipeline to complete

### Analyzing Results

1. **View Recommendation**
   - See top-ranked option with confidence score
   - Read AI-generated summary and reasoning

2. **Explore Visualizations**
   - Radar chart for multi-dimensional comparison
   - Score chart for ranking visualization
   - Detailed tables with criteria breakdowns

3. **What-If Analysis**
   - Adjust criteria weights with sliders
   - See rankings update in real-time
   - Experiment with different priorities

4. **Review AI Pipeline**
   - Expand pipeline stages to see reasoning process
   - Understand how the AI reached its conclusion
   - View assumptions, tradeoffs, and risks

5. **Export & Share**
   - Click "Export PDF" for professional report
   - PDF includes cover page, summary, scores, and insights
   - Share with stakeholders or save for records

6. **Provide Feedback**
   - Use "Was this helpful?" widget
   - Thumbs up/down to improve future analyses

### Managing Decisions

- **Edit**: Update decision details anytime
- **Duplicate**: Create similar decisions quickly
- **Archive**: Keep workspace clean without deleting
- **Delete**: Remove decisions permanently (with confirmation)
- **Search**: Find decisions by title
- **Filter**: View by status (Draft, Analyzing, Complete, Archived)

---

## ⚙️ How It Works

### The 4-Stage Reasoning Pipeline

Decision Navigator uses a sophisticated AI reasoning process:

1. **Contextual Analysis**
   - Analyzes background and constraints
   - Identifies hidden risks and opportunities
   - Considers decision context and motivation

2. **Attribute Matrix**
   - Maps each option against criteria
   - Creates normalized scoring model
   - Applies weighted importance factors

3. **Constraint Validation**
   - Checks options against hard constraints
   - Identifies potential deal-breakers
   - Validates budget, time, and resource limits

4. **Synthesis & Recommendation**
   - Generates natural-language explanation
   - Provides confidence scoring
   - Explains reasoning with full transparency

---

## 🎨 Features Breakdown

### Landing Page
- **Circular Tubelight Navbar**: Animated navigation with glow effects
- **Hero Section**: Gradient backgrounds with animated orbs
- **Details Section**: Feature cards with hover effects
- **Contact Section**: Email and documentation links

### Dashboard
- **Collapsible Sidebar**: Icon-only or full-width modes with user profile
- **Stats Cards**: Total, Completed, In Progress decisions (real-time)
- **Status Filters**: Real-time filtering with dynamic counts
- **Activity Graph**: 7-day visualization with hover tooltips
- **Grid/List Views**: Toggle between display modes
- **Search**: Instant decision filtering
- **Example Decisions**: 3 sample decisions always visible (can be hidden)
- **User Avatar**: Shows initials, links to Settings

### Decision Cards
- **Status Badges**: Color-coded with animations (Draft, Analyzing, Complete, Archived)
- **Confidence Indicators**: High confidence badges
- **Action Menu**: Always-visible three-dot dropdown with Edit, Duplicate, Archive, Delete
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Real-time Updates**: Cards refresh automatically after actions
- **Hover Effects**: Smooth transitions and shadows

### History Page
- **Chronological View**: Grouped by month
- **Time Filters**: All, Week, Month, Year
- **Search**: Filter by decision title
- **Stats Overview**: Monthly and weekly counts

### Settings Page
- **Profile Management**: Update name and view email
- **Notifications**: Configure email alerts and digests
- **AI Configuration**: Choose provider and model
- **Account Deletion**: Permanently delete account and all data
- **User Avatar**: Displays initials in sidebar

### PDF Export
- **Professional Formatting**: Multi-page reports with DESY branding
- **Cover Page**: Title, date, and analysis ID
- **Executive Summary**: Context, recommendation, and confidence level
- **Detailed Scores**: Ranked table with medal emojis (🥇🥈🥉) for top 3
- **Criteria Breakdown**: Per-option analysis with reasoning
- **AI Insights**: Assumptions, tradeoffs, and risk analysis
- **Automatic Pagination**: Smart page breaks and footers
- **Visual Elements**: Colored headers, info boxes, confidence bars
- **File Naming**: Auto-generated with decision title and timestamp

---

## 🔒 Security

### Database Security
- **Row Level Security (RLS)**: Enabled on all tables
- **User Isolation**: Users can only access their own data
- **Secure Queries**: Parameterized queries prevent SQL injection

### Input Validation
- **Zod Schemas**: Strict validation for all inputs
- **Type Safety**: Full TypeScript coverage
- **Sanitization**: XSS prevention on user inputs

### Authentication
- **Supabase Auth**: Industry-standard authentication
- **Email Verification**: Confirm email before access
- **Password Reset**: Self-service recovery flow
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Management**: Secure token handling with auto-refresh
- **Password Security**: Bcrypt hashing (minimum 6 characters)

---

## 🚧 Roadmap

### ✅ Recently Completed
- [x] Full authentication system (signup, login, password reset, resend confirmation)
- [x] Protected routes with automatic redirect
- [x] User-specific data isolation with RLS
- [x] Complete account deletion functionality
- [x] User profile with avatar in sidebar
- [x] Email notification system (ready for setup)
- [x] Example decisions for new users
- [x] Settings page with real user data
- [x] PDF Export with professional formatting
- [x] Decision templates library (6 templates)
- [x] What-if analysis with live sliders
- [x] Pipeline stage visualization
- [x] File upload for context
- [x] Feedback system
- [x] Dynamic statistics and filtering
- [x] Full CRUD operations with confirmations

### Upcoming Features
- [ ] Real-time collaboration on decisions
- [ ] Export to Excel/CSV
- [ ] Mobile app (React Native)
- [ ] Team workspaces
- [ ] Decision comparison tool
- [ ] AI model selection per decision
- [ ] Custom criteria templates
- [ ] Integration with calendar apps
- [ ] Slack/Discord notifications
- [ ] Charts in PDF export

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 Documentation

Complete documentation is available in the [docs/](docs/) folder:

- **[Authentication Setup](docs/AUTHENTICATION_SETUP.md)** - Complete auth configuration
- **[Environment Variables](docs/ENVIRONMENT_VARIABLES.md)** - All environment variables
- **[Email Notifications](docs/EMAIL_NOTIFICATIONS_SETUP.md)** - Email setup guide
- **[Account Deletion](docs/QUICK_DELETE_SETUP.md)** - Account deletion setup
- **[Testing Examples](docs/TESTING_EXAMPLES.md)** - 10 real-world examples
- **[Share Feature](docs/SHARE_FEATURE.md)** - Social sharing documentation
- **[Sample Decisions](docs/SAMPLE_DECISIONS_FEATURE.md)** - Example decisions

See [docs/README.md](docs/README.md) for complete documentation index.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Supabase** for the backend infrastructure
- **Groq** for lightning-fast AI inference
- **Vercel** for the AI SDK
- **Lucide** for the icon set

---

## 📧 Contact & Support

- **Email**: contact@desy.ai
- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](your-repo-url/issues)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and AI**

[⭐ Star this repo](your-repo-url) | [🐛 Report Bug](your-repo-url/issues) | [✨ Request Feature](your-repo-url/issues)

</div>
