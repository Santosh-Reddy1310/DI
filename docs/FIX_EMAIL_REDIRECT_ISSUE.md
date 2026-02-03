# Fix Email Confirmation Redirect Issue

## Problem
Email confirmations are redirecting to `lovable.dev` instead of `https://desy.vercel.app`

## Root Causes
1. Supabase Site URL is not set to production domain
2. Email templates may have hardcoded Lovable references
3. Code needs to explicitly set `emailRedirectTo` parameter

## Solution - Follow These Steps IN ORDER

### ✅ Step 1: Update Supabase Site URL (MOST CRITICAL!)

1. Go to: https://supabase.com/dashboard/project/xntipojyvmviucdhscgb/auth/url-configuration
2. **Site URL**: Change to `https://desy.vercel.app`
3. **Redirect URLs**: Add these (one per line):
   ```
   https://desy.vercel.app/*
   https://desy.vercel.app/dashboard
   https://desy.vercel.app/login
   https://desy.vercel.app/reset-password
   http://localhost:5173/*
   ```
4. Click **Save**

### ✅ Step 2: Verify Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your `desy` project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:
   ```
   VITE_APP_URL=https://desy.vercel.app
   VITE_SUPABASE_URL=https://xntipojyvmviucdhscgb.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudGlwb2p5dm12aXVjZGhzY2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTM1MjAsImV4cCI6MjA4NTUyOTUyMH0.jrK1C2heAygieMOeMbeNdx86anA60sR1Np7ceykdJ-A
   ```

### ✅ Step 3: Wait for Vercel Deployment

The code has been pushed to GitHub. Vercel will automatically deploy:
1. Go to: https://vercel.com/dashboard
2. Check the **Deployments** tab
3. Wait for the latest deployment to complete (usually 1-2 minutes)
4. Status should show "Ready"

### ✅ Step 4: Update Email Templates (Optional but Recommended)

1. Go to: https://supabase.com/dashboard/project/xntipojyvmviucdhscgb/auth/templates
2. Click **Confirm signup** template
3. Update the **Body** to:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #333; text-align: center;">Welcome to Decision Navigator!</h1>
  
  <p>Thanks for signing up! We're excited to help you make better decisions with AI-powered insights.</p>
  
  <p>Please confirm your email address to get started:</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{ .ConfirmationURL }}" style="background-color: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
      Confirm Email Address
    </a>
  </div>
  
  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    If you didn't create this account, you can safely ignore this email.
  </p>
</div>
```

4. Click **Save**

### ✅ Step 5: Test the Fix

1. **Clear your browser cache** or use an incognito window
2. Go to: https://desy.vercel.app/signup
3. Sign up with a **NEW email address** (not one you've used before)
4. Check your email inbox
5. Click the "Verify Email" button
6. **Expected Result**: You should be redirected to `https://desy.vercel.app/dashboard` (NOT Lovable!)

## Verification Checklist

- [ ] Supabase Site URL is set to `https://desy.vercel.app`
- [ ] Supabase Redirect URLs include `https://desy.vercel.app/*`
- [ ] Vercel environment variable `VITE_APP_URL` is set to `https://desy.vercel.app`
- [ ] Latest deployment is complete on Vercel
- [ ] Test signup with new email redirects to your domain

## Troubleshooting

### If still redirecting to Lovable:

1. **Check Supabase Site URL again** - this is the #1 cause
2. **Wait 5 minutes** - Supabase caches configuration
3. **Use a completely new email** - old confirmation emails have cached URLs
4. **Clear browser cache** - old redirects may be cached

### If emails still come from Lovable:

This is a separate issue related to SMTP configuration. The redirect fix will work even if emails come from Lovable's SMTP. To fix the sender email:

1. Configure custom SMTP in Supabase (Gmail, Resend, etc.)
2. Enable "Custom SMTP" toggle in Authentication → Email Templates → Settings

## Code Changes Made

The following files were updated to fix this issue:

1. `src/contexts/AuthContext.tsx`:
   - Added `emailRedirectTo` parameter to `signUp()` function
   - Added `emailRedirectTo` parameter to `resendConfirmation()` function
   - Updated `resetPassword()` to use `VITE_APP_URL` environment variable

2. `.env`:
   - Added `VITE_APP_URL=https://desy.vercel.app`

## Important Notes

- **Old confirmation emails will still redirect to Lovable** - they have the old URL baked in
- **Always test with a NEW email address** after making changes
- **The Site URL in Supabase is the most critical setting** - if this is wrong, nothing else will work
- **Changes may take 5-10 minutes to propagate** due to caching

## Success Criteria

✅ New signups receive confirmation emails
✅ Clicking "Verify Email" redirects to `https://desy.vercel.app/dashboard`
✅ User is automatically logged in after confirmation
✅ No Lovable branding or URLs appear in the flow

---

**Last Updated**: February 3, 2026
**Status**: Code deployed, waiting for Supabase configuration
