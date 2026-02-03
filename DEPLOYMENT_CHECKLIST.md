# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment

### Code Preparation
- [x] Removed all demo/dummy data from Dashboard
- [x] Removed demo data from DecisionResult
- [x] All TypeScript errors resolved
- [x] Build passes successfully
- [x] No console errors in production build

### Environment Variables
- [ ] Create production `.env` file
- [ ] Set `VITE_SUPABASE_URL` to production Supabase URL
- [ ] Set `VITE_SUPABASE_PUBLISHABLE_KEY` to production key
- [ ] Set `VITE_GROQ_API_KEY` for AI provider
- [ ] Set `VITE_OPENROUTER_API_KEY` (optional)
- [ ] Set `VITE_PRIMARY_AI_PROVIDER` (groq/openrouter/openai)
- [ ] Set `VITE_AI_MODEL` to desired model
- [ ] **IMPORTANT**: Set `VITE_APP_URL` to your production domain (e.g., https://yourdomain.com)

### Supabase Setup
- [ ] Create production Supabase project
- [ ] Run `supabase/schema.sql` in SQL Editor
- [ ] Run `supabase/SETUP_DELETE_ACCOUNT.sql` in SQL Editor
- [ ] Enable Email authentication provider
- [ ] Configure production redirect URLs
- [ ] Verify RLS policies are enabled
- [ ] Test database connection

### Authentication Configuration
- [ ] Add production site URL in Supabase
- [ ] Add production redirect URLs:
  - `https://yourdomain.com/login`
  - `https://yourdomain.com/reset-password`
- [ ] Customize email templates (optional)
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test password reset
- [ ] Test account deletion

### Optional: Email Notifications
- [ ] Choose email service (Resend recommended)
- [ ] Set up Supabase Edge Function or backend API
- [ ] Configure email templates
- [ ] Test notification delivery
- [ ] See `EMAIL_NOTIFICATIONS_SETUP.md`

## 🏗️ Build & Deploy

### Build Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

### Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 3: Custom Server
```bash
# Build
npm run build

# Upload dist/ folder to your server
# Configure nginx/apache to serve static files
# Set up SSL certificate
```

## ✅ Post-Deployment

### Testing
- [ ] Test signup with real email
- [ ] Verify email confirmation works
- [ ] Test login/logout
- [ ] Create a test decision
- [ ] Test AI analysis
- [ ] Test PDF export
- [ ] Test account deletion
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Security
- [ ] Verify HTTPS is enabled
- [ ] Test RLS policies
- [ ] Verify users can only see their own data
- [ ] Test authentication redirects
- [ ] Check for exposed API keys
- [ ] Enable CORS if needed

### Performance
- [ ] Check page load times
- [ ] Verify images are optimized
- [ ] Test with slow network
- [ ] Check bundle size
- [ ] Enable caching headers

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor Supabase usage
- [ ] Monitor AI API usage
- [ ] Set up uptime monitoring
- [ ] Configure alerts

## 📋 Environment Variables Reference

### Required
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_GROQ_API_KEY=your_groq_key
```

### Optional
```env
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_PRIMARY_AI_PROVIDER=groq
VITE_AI_MODEL=llama-3.1-70b-versatile
```

### Production (Important!)
```env
# Set this to your production domain for correct share URLs
VITE_APP_URL=https://yourdomain.com
```

**Why VITE_APP_URL is important:**
- Share URLs will use this domain instead of localhost
- Email notifications will link to correct domain
- PDF exports will show correct URL
- Ensures professional appearance in production

## 🔧 Troubleshooting

### Build Fails
- Check Node.js version (v18+)
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

### Authentication Not Working
- Verify Supabase URL and keys
- Check redirect URLs in Supabase
- Verify email provider is enabled
- Check browser console for errors

### Database Errors
- Verify RLS policies are set up
- Check if tables exist
- Verify user_id columns exist
- Check Supabase logs

### AI Analysis Fails
- Verify AI API keys are set
- Check API rate limits
- Verify model name is correct
- Check network connectivity

## 📊 Production Monitoring

### Key Metrics to Monitor
- User signups per day
- Active users
- Decisions created
- AI analysis success rate
- PDF exports
- Error rates
- Page load times
- API response times

### Supabase Monitoring
- Database size
- API requests
- Auth users
- Storage usage
- Edge function invocations

### AI Provider Monitoring
- API calls per day
- Token usage
- Cost per analysis
- Error rates
- Response times

## 🔐 Security Best Practices

### Before Launch
- [ ] All API keys in environment variables
- [ ] No sensitive data in code
- [ ] RLS enabled on all tables
- [ ] HTTPS enforced
- [ ] CORS configured properly
- [ ] Rate limiting considered
- [ ] Input validation in place
- [ ] XSS protection enabled

### After Launch
- [ ] Regular security audits
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Review Supabase logs
- [ ] Monitor failed login attempts
- [ ] Backup database regularly

## 📝 Documentation

### User Documentation
- [ ] Create user guide
- [ ] Add FAQ section
- [ ] Create video tutorials
- [ ] Document common issues
- [ ] Add contact information

### Developer Documentation
- [ ] API documentation
- [ ] Database schema docs
- [ ] Deployment guide
- [ ] Contributing guidelines
- [ ] Code style guide

## 🎯 Launch Checklist

### Final Steps
- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables set
- [ ] Database configured
- [ ] Authentication working
- [ ] Email notifications tested (if enabled)
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Analytics set up
- [ ] Error tracking enabled
- [ ] Backup strategy in place
- [ ] Support email configured
- [ ] Terms of Service added
- [ ] Privacy Policy added
- [ ] GDPR compliance verified

### Go Live!
- [ ] Deploy to production
- [ ] Test all critical flows
- [ ] Monitor for errors
- [ ] Announce launch
- [ ] Gather user feedback
- [ ] Iterate and improve

## 🆘 Support

### If Issues Arise
1. Check browser console for errors
2. Check Supabase logs
3. Check server logs
4. Review recent changes
5. Rollback if necessary
6. Contact support if needed

### Useful Commands
```bash
# Check build
npm run build

# Test locally
npm run preview

# Check for updates
npm outdated

# Update dependencies
npm update

# Clear cache
rm -rf node_modules dist
npm install
```

## 📞 Resources

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Groq Console**: https://console.groq.com
- **Documentation**: See README.md
- **Setup Guides**: See AUTHENTICATION_SETUP.md, EMAIL_NOTIFICATIONS_SETUP.md

---

**Status**: ✅ Ready for Production Deployment
**Last Updated**: 2024
**Version**: 1.0.0
