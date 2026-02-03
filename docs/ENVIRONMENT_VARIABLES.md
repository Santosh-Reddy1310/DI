# 🔧 Environment Variables Configuration

Complete guide for configuring environment variables for development and production.

---

## 📋 Overview

The application uses environment variables to configure different services and features. Variables are prefixed with `VITE_` to be accessible in the frontend.

---

## 🔑 Required Variables

### Supabase Configuration

```env
# Supabase Project URL
VITE_SUPABASE_URL=https://your-project.supabase.co

# Supabase Publishable/Anon Key
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon/public" key

---

## 🤖 AI Provider Configuration

### Groq (Recommended for Speed)

```env
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

**Get your key:**
1. Go to [Groq Console](https://console.groq.com)
2. Sign up/Login
3. Go to API Keys
4. Create new key

### OpenRouter (Recommended for Reliability)

```env
VITE_OPENROUTER_API_KEY=sk-or-your_openrouter_key_here
```

**Get your key:**
1. Go to [OpenRouter](https://openrouter.ai)
2. Sign up/Login
3. Go to Keys
4. Create new key

### OpenAI (Optional)

```env
VITE_OPENAI_API_KEY=sk-your_openai_key_here
```

**Get your key:**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys
4. Create new key

---

## ⚙️ Optional Configuration

### Application URL (Important for Production)

```env
# Base URL for the application (used for sharing, emails, etc.)
VITE_APP_URL=https://yourdomain.com
```

**When to use:**
- ✅ **Production deployment** - Set to your production domain
- ✅ **Custom domain** - Set to your custom domain
- ✅ **Staging environment** - Set to staging URL
- ❌ **Development** - Leave empty (uses localhost automatically)

**Examples:**
```env
# Production
VITE_APP_URL=https://desy.app

# Staging
VITE_APP_URL=https://staging.desy.app

# Custom domain
VITE_APP_URL=https://decisions.mycompany.com
```

**What it affects:**
- Share URLs (social media, email)
- Email notification links
- PDF export metadata
- Redirect URLs

### AI Provider Selection

```env
# Primary AI provider (groq, openrouter, or openai)
VITE_PRIMARY_AI_PROVIDER=groq

# AI model to use
VITE_AI_MODEL=llama-3.1-70b-versatile
```

**Available models:**

**Groq:**
- `llama-3.1-70b-versatile` (Recommended - Fast & Accurate)
- `llama-3.1-8b-instant` (Faster, less accurate)
- `mixtral-8x7b-32768` (Good balance)

**OpenRouter:**
- `meta-llama/llama-3.1-70b-instruct`
- `anthropic/claude-3-sonnet`
- `openai/gpt-4-turbo`

**OpenAI:**
- `gpt-4-turbo-preview`
- `gpt-4`
- `gpt-3.5-turbo`

---

## 📁 Environment Files

### Development (.env.local)

Create `.env.local` for local development:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

# AI Provider
VITE_GROQ_API_KEY=your_groq_key
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile

# No need to set VITE_APP_URL in development
# It will automatically use http://localhost:8080
```

### Production (.env.production)

Create `.env.production` for production build:

```env
# Supabase (Production)
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_prod_anon_key

# AI Provider
VITE_GROQ_API_KEY=your_groq_key
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile

# IMPORTANT: Set your production URL
VITE_APP_URL=https://yourdomain.com
```

### Staging (.env.staging)

Create `.env.staging` for staging environment:

```env
# Supabase (Staging)
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_staging_anon_key

# AI Provider
VITE_GROQ_API_KEY=your_groq_key
VITE_PRIMARY_AI_PROVIDER=groq

# Staging URL
VITE_APP_URL=https://staging.yourdomain.com
```

---

## 🚀 Deployment Platforms

### Vercel

**Option 1: Environment Variables UI**
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environment: Production
3. Repeat for all variables
4. Redeploy

**Option 2: Vercel CLI**
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add VITE_GROQ_API_KEY production
vercel env add VITE_APP_URL production
```

**Important for Vercel:**
```env
# Set this to your Vercel deployment URL
VITE_APP_URL=https://your-app.vercel.app
```

### Netlify

**Option 1: Netlify UI**
1. Go to Site Settings → Environment Variables
2. Add each variable
3. Redeploy

**Option 2: netlify.toml**
```toml
[build.environment]
  VITE_SUPABASE_URL = "https://your-project.supabase.co"
  VITE_SUPABASE_PUBLISHABLE_KEY = "your_key"
  VITE_GROQ_API_KEY = "your_key"
  VITE_APP_URL = "https://your-app.netlify.app"
```

### Custom Server (Docker, VPS, etc.)

**Create .env file on server:**
```bash
# SSH into server
ssh user@your-server.com

# Navigate to app directory
cd /var/www/your-app

# Create .env file
nano .env

# Add variables (paste from .env.production)
# Save and exit (Ctrl+X, Y, Enter)

# Build with environment variables
npm run build

# Restart server
pm2 restart your-app
```

---

## 🔒 Security Best Practices

### ✅ DO

- ✅ Use `.env.local` for local development
- ✅ Add `.env*.local` to `.gitignore`
- ✅ Use different keys for dev/staging/prod
- ✅ Rotate API keys regularly
- ✅ Use environment-specific Supabase projects
- ✅ Set `VITE_APP_URL` in production
- ✅ Use deployment platform's secret management

### ❌ DON'T

- ❌ Commit `.env` files to Git
- ❌ Share API keys in public repos
- ❌ Use production keys in development
- ❌ Hardcode secrets in source code
- ❌ Use same Supabase project for dev/prod
- ❌ Forget to set `VITE_APP_URL` in production

---

## 🧪 Testing Configuration

### Verify Environment Variables

Create a test page to verify variables are loaded:

```typescript
// src/pages/EnvTest.tsx (for development only)
export default function EnvTest() {
  return (
    <div className="p-8">
      <h1>Environment Variables Test</h1>
      <ul>
        <li>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✅' : '❌'}</li>
        <li>Supabase Key: {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? '✅' : '❌'}</li>
        <li>Groq Key: {import.meta.env.VITE_GROQ_API_KEY ? '✅' : '❌'}</li>
        <li>App URL: {import.meta.env.VITE_APP_URL || 'Not set (using window.location)'}</li>
      </ul>
    </div>
  );
}
```

### Test Share URLs

1. Deploy to production
2. Open a decision result page
3. Click "Share" button
4. Verify URL shows production domain (not localhost)
5. Copy link and open in new tab
6. Verify it works

---

## 🐛 Troubleshooting

### Issue: Variables not loading

**Solution:**
```bash
# Restart dev server
npm run dev

# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

### Issue: Share URLs show localhost in production

**Solution:**
```env
# Add to production environment
VITE_APP_URL=https://yourdomain.com
```

### Issue: Supabase connection fails

**Solution:**
1. Verify URL format: `https://project-id.supabase.co`
2. Check key is the "anon/public" key (not service role)
3. Verify project is not paused
4. Check RLS policies are enabled

### Issue: AI analysis fails

**Solution:**
1. Verify API key is correct
2. Check API key has credits/quota
3. Try different AI provider
4. Check console for error messages

---

## 📊 Environment Variable Priority

Vite loads environment variables in this order (highest priority first):

1. `.env.[mode].local` (e.g., `.env.production.local`)
2. `.env.[mode]` (e.g., `.env.production`)
3. `.env.local`
4. `.env`

**Example:**
```
.env.production.local  ← Highest priority
.env.production
.env.local
.env                   ← Lowest priority
```

---

## 🔄 Migration Guide

### From Development to Production

1. **Create production Supabase project**
   ```bash
   # Don't use the same project for dev and prod!
   ```

2. **Get production API keys**
   - Supabase production keys
   - AI provider production keys

3. **Set production environment variables**
   ```env
   VITE_SUPABASE_URL=https://prod-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=prod_key
   VITE_GROQ_API_KEY=prod_groq_key
   VITE_APP_URL=https://yourdomain.com  # IMPORTANT!
   ```

4. **Deploy**
   ```bash
   npm run build
   # Deploy dist/ folder
   ```

5. **Verify**
   - Test authentication
   - Test decision creation
   - Test AI analysis
   - Test share URLs (should show production domain)
   - Test PDF export

---

## 📝 Example Configurations

### Minimal (Development)
```env
VITE_SUPABASE_URL=https://dev.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=dev_key
VITE_GROQ_API_KEY=groq_key
```

### Recommended (Production)
```env
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=prod_key
VITE_GROQ_API_KEY=groq_key
VITE_OPENROUTER_API_KEY=openrouter_key
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile
VITE_APP_URL=https://yourdomain.com
```

### Full (All Options)
```env
# Supabase
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=prod_key

# AI Providers
VITE_GROQ_API_KEY=groq_key
VITE_OPENROUTER_API_KEY=openrouter_key
VITE_OPENAI_API_KEY=openai_key

# AI Configuration
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile

# Application
VITE_APP_URL=https://yourdomain.com
```

---

## 🎯 Quick Start Checklist

### Development Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Supabase URL and key
- [ ] Add Groq API key
- [ ] Run `npm run dev`
- [ ] Test authentication
- [ ] Test decision creation

### Production Deployment
- [ ] Create production Supabase project
- [ ] Get production API keys
- [ ] Set `VITE_APP_URL` to production domain
- [ ] Configure environment variables in deployment platform
- [ ] Build and deploy
- [ ] Test share URLs (should show production domain)
- [ ] Verify all features work

---

**Last Updated**: February 3, 2026
**Status**: ✅ Complete
