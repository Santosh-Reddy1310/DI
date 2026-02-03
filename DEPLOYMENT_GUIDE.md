# 🚀 Quick Deployment Guide

Get your Decision Navigator app deployed in production in under 30 minutes.

---

## ✅ Pre-Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Groq API key obtained
- [ ] Domain name ready (optional)

---

## 📋 Step-by-Step Deployment

### 1️⃣ Setup Supabase (5 minutes)

**Create Project:**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready

**Run Database Setup:**
1. Go to SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and execute
4. Copy contents of `supabase/SETUP_DELETE_ACCOUNT.sql`
5. Paste and execute

**Get Credentials:**
1. Go to Settings → API
2. Copy "Project URL"
3. Copy "anon/public" key

### 2️⃣ Get AI API Key (2 minutes)

**Groq (Recommended):**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up/Login
3. Go to API Keys
4. Create new key
5. Copy the key

### 3️⃣ Configure Environment Variables (3 minutes)

**Create `.env.production` file:**
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

# AI Provider
VITE_GROQ_API_KEY=your_groq_key
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile

# Production URL (IMPORTANT!)
VITE_APP_URL=https://yourdomain.com
```

### 4️⃣ Deploy to Vercel (5 minutes)

**Option A: Via Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_GROQ_API_KEY`
   - `VITE_APP_URL` (set to your Vercel URL)
5. Click "Deploy"

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add VITE_GROQ_API_KEY production
vercel env add VITE_APP_URL production

# Deploy to production
vercel --prod
```

### 5️⃣ Configure Supabase Auth (3 minutes)

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add Site URL: `https://your-app.vercel.app`
3. Add Redirect URLs:
   - `https://your-app.vercel.app/login`
   - `https://your-app.vercel.app/reset-password`
4. Save changes

### 6️⃣ Test Your Deployment (5 minutes)

**Test Authentication:**
- [ ] Sign up with email
- [ ] Check email for confirmation
- [ ] Confirm email and login
- [ ] Logout and login again

**Test Decision Creation:**
- [ ] Create new decision
- [ ] Add options and criteria
- [ ] Submit for AI analysis
- [ ] View results

**Test Share Feature:**
- [ ] Open decision result
- [ ] Click "Share" button
- [ ] Verify URL shows production domain (not localhost)
- [ ] Copy link and open in new tab
- [ ] Verify it works

**Test PDF Export:**
- [ ] Click "Export PDF"
- [ ] Verify PDF downloads
- [ ] Open and check content

---

## 🎯 Alternative Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Add environment variables via dashboard
# Site Settings → Environment Variables
```

### Custom Server

```bash
# Build
npm run build

# Upload dist/ folder to server
scp -r dist/* user@server:/var/www/html/

# Configure nginx/apache to serve static files
```

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `VITE_APP_URL` to your custom domain
5. Redeploy

**Update Environment Variable:**
```bash
vercel env rm VITE_APP_URL production
vercel env add VITE_APP_URL production
# Enter: https://yourdomain.com
vercel --prod
```

### Email Notifications (Optional)

See [docs/EMAIL_NOTIFICATIONS_SETUP.md](docs/EMAIL_NOTIFICATIONS_SETUP.md)

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Authentication Not Working
- Verify Supabase URL and key are correct
- Check redirect URLs in Supabase dashboard
- Ensure email provider is enabled

### Share URLs Show Localhost
- Verify `VITE_APP_URL` is set in production
- Redeploy after adding environment variable
- Clear browser cache

### AI Analysis Fails
- Verify Groq API key is correct
- Check API key has credits
- Try different AI model

---

## 📊 Monitoring

### Vercel Analytics
1. Go to Project → Analytics
2. Enable Web Analytics
3. Monitor page views and performance

### Supabase Monitoring
1. Go to Project → Database
2. Monitor API requests
3. Check auth users
4. Review logs

---

## 🔒 Security Checklist

- [ ] All API keys in environment variables
- [ ] No sensitive data in code
- [ ] RLS enabled on all Supabase tables
- [ ] HTTPS enforced
- [ ] CORS configured properly
- [ ] Environment variables not committed to Git

---

## 📈 Performance Optimization

### Enable Caching
```typescript
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Enable Compression
Already enabled by default in Vite build.

---

## 🎉 You're Live!

Your Decision Navigator app is now deployed and ready to use!

**Next Steps:**
- Share with users
- Monitor performance
- Gather feedback
- Iterate and improve

**Need Help?**
- Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed checklist
- See [docs/](docs/) for complete documentation
- Review [README.md](README.md) for feature overview

---

**Deployment Time**: ~30 minutes
**Status**: ✅ Production Ready
**Last Updated**: February 3, 2026
