# ⚡ Quick Reference Card

Essential commands and information for Decision Navigator.

---

## 🚀 Quick Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:8080)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
```bash
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
netlify deploy       # Deploy to Netlify
```

---

## 📋 Environment Variables

### Required
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_GROQ_API_KEY=your_groq_key
```

### Production
```env
VITE_APP_URL=https://yourdomain.com
```

---

## 🔗 Important URLs

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Groq Console**: https://console.groq.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Netlify Dashboard**: https://app.netlify.com

---

## 📁 Key Files

### Configuration
- `.env.example` - Environment template
- `.env.local` - Local development (create this)
- `package.json` - Dependencies

### Database
- `supabase/schema.sql` - Database schema
- `supabase/SETUP_DELETE_ACCOUNT.sql` - Account deletion

### Documentation
- `README.md` - Main documentation
- `DEPLOYMENT_GUIDE.md` - Quick deployment
- `docs/README.md` - Documentation index

---

## 🎯 Common Tasks

### Setup New Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
npm install
npm run dev
```

### Deploy to Vercel
```bash
vercel
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add VITE_GROQ_API_KEY production
vercel env add VITE_APP_URL production
vercel --prod
```

### Run Database Setup
1. Go to Supabase Dashboard → SQL Editor
2. Copy `supabase/schema.sql` → Execute
3. Copy `supabase/SETUP_DELETE_ACCOUNT.sql` → Execute

---

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Loading
```bash
# Restart dev server
npm run dev
```

### Share URLs Show Localhost
```env
# Add to production environment
VITE_APP_URL=https://yourdomain.com
```

---

## 📚 Documentation Quick Links

- **Overview**: [README.md](README.md)
- **Deploy**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Status**: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- **Testing**: [docs/TESTING_EXAMPLES.md](docs/TESTING_EXAMPLES.md)
- **Auth**: [docs/AUTHENTICATION_SETUP.md](docs/AUTHENTICATION_SETUP.md)
- **Env Vars**: [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md)

---

## ✅ Pre-Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Groq API key obtained
- [ ] Environment variables configured
- [ ] Build passing (`npm run build`)
- [ ] `VITE_APP_URL` set for production

---

## 🎯 Key Features

- ✅ AI-powered decision analysis
- ✅ Multi-step wizard
- ✅ Rich visualizations
- ✅ PDF export
- ✅ Social sharing
- ✅ Authentication
- ✅ Example decisions

---

## 📊 Project Info

- **Status**: Production Ready
- **Build**: Passing
- **Version**: 1.0.0
- **Tech**: React + TypeScript + Supabase

---

**Need more details? See [FINAL_SUMMARY.md](FINAL_SUMMARY.md)**
