# Diagnose Email Redirect Issue

## The Problem
Email confirmations are still redirecting to Lovable instead of https://desy.vercel.app

## Root Cause
The **Site URL** in Supabase is the MASTER setting that controls where email confirmations redirect. If this is wrong, nothing else matters.

## Step-by-Step Diagnosis

### 1. Verify Supabase Site URL (MOST IMPORTANT!)

Go to this EXACT URL:
```
https://supabase.com/dashboard/project/xntipojyvmviucdhscgb/auth/url-configuration
```

**Check these settings:**

#### Site URL
- ❌ WRONG: `http://localhost:3000` or `https://lovable.dev` or anything with "lovable"
- ✅ CORRECT: `https://desy.vercel.app`

#### Redirect URLs (should include ALL of these):
```
https://desy.vercel.app/*
https://desy.vercel.app/dashboard
https://desy.vercel.app/login
https://desy.vercel.app/reset-password
http://localhost:5173/*
```

**If the Site URL is NOT `https://desy.vercel.app`, change it NOW and click Save!**

### 2. Check Vercel Environment Variables

Go to: https://vercel.com/dashboard

1. Select your project
2. Go to Settings → Environment Variables
3. Verify `VITE_APP_URL` is set to: `https://desy.vercel.app`

### 3. Verify Deployment is Complete

Go to: https://vercel.com/dashboard

1. Click on your project
2. Go to "Deployments" tab
3. The latest deployment should show "Ready" status
4. Check the timestamp - it should be recent (within last 10 minutes)

### 4. Test with a BRAND NEW Email

**CRITICAL**: Old confirmation emails have the old URL baked in. You MUST use a completely new email address.

1. Go to: https://desy.vercel.app/signup
2. Use an email you've NEVER used before (e.g., `test123456@gmail.com`)
3. Check your inbox
4. Look at the "Verify Email" button
5. **Before clicking**, hover over it and check the URL in the bottom left of your browser

**What URL do you see?**
- ❌ If it contains `lovable.dev` → Site URL in Supabase is still wrong
- ✅ If it contains `desy.vercel.app` → Correct! Click it to test

### 5. Check Email Template

Go to: https://supabase.com/dashboard/project/xntipojyvmviucdhscgb/auth/templates

1. Click "Confirm signup" template
2. Look at the Body section
3. Find the line with `{{ .ConfirmationURL }}`
4. Make sure it's NOT hardcoded to a Lovable URL

**The template should use the variable:**
```html
<a href="{{ .ConfirmationURL }}">Verify Email</a>
```

**NOT a hardcoded URL like:**
```html
<a href="https://lovable.dev/...">Verify Email</a>
```

## Common Issues and Solutions

### Issue 1: "I updated Site URL but still getting Lovable"
**Solution**: 
- Wait 5 minutes for Supabase to update its cache
- Use a BRAND NEW email address (old emails have cached URLs)
- Clear your browser cache

### Issue 2: "The email still comes from no-reply@md.lovable-app.email"
**This is a DIFFERENT issue** (SMTP configuration). The redirect will still work even if the sender is Lovable's SMTP.

To fix the sender:
1. Go to Authentication → Email Templates → Settings tab
2. Enable "Custom SMTP"
3. Configure Gmail or Resend SMTP

### Issue 3: "Vercel deployment is not updating"
**Solution**:
1. Check if the latest commit is pushed to GitHub
2. Manually trigger a redeploy in Vercel
3. Check build logs for errors

### Issue 4: "Environment variables not working"
**Solution**:
1. Make sure variables are set for "Production" environment in Vercel
2. After adding/changing variables, you MUST redeploy
3. Variables starting with `VITE_` are exposed to the browser

## Testing Checklist

Run through this checklist:

- [ ] Supabase Site URL is `https://desy.vercel.app` (not localhost, not lovable)
- [ ] Supabase Redirect URLs include `https://desy.vercel.app/*`
- [ ] Vercel environment variable `VITE_APP_URL=https://desy.vercel.app` is set
- [ ] Latest deployment on Vercel shows "Ready" status
- [ ] Tested with a BRAND NEW email address (never used before)
- [ ] Waited at least 5 minutes after changing Supabase settings
- [ ] Cleared browser cache or used incognito mode

## Still Not Working?

If you've done ALL of the above and it's still not working:

1. **Take a screenshot** of your Supabase URL Configuration page
2. **Take a screenshot** of the email you received (showing the URL when you hover over the button)
3. **Check the browser console** for any errors when you click the verify button
4. **Share the exact URL** that the verify button is trying to redirect to

## Expected Behavior

✅ **Correct Flow:**
1. Sign up at https://desy.vercel.app/signup
2. Receive email (may still be from Lovable SMTP - that's OK)
3. Click "Verify Email" button
4. Redirected to https://desy.vercel.app/dashboard
5. Automatically logged in

❌ **Wrong Flow:**
1. Sign up at https://desy.vercel.app/signup
2. Receive email
3. Click "Verify Email" button
4. Redirected to lovable.dev (WRONG!)

## Debug Commands

If you want to check what URL the code is using, add this to your signup page temporarily:

```javascript
console.log('VITE_APP_URL:', import.meta.env.VITE_APP_URL);
console.log('window.location.origin:', window.location.origin);
```

This will show you what URL the application thinks it should use.

---

**Last Updated**: February 3, 2026
