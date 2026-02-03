# Clerk Authentication Setup Guide

## ✅ What We've Done

1. ✅ Installed `@clerk/clerk-react`
2. ✅ Created new `ClerkAuthContext.tsx`
3. ✅ Updated `App.tsx` to use Clerk
4. ✅ Updated `ProtectedRoute.tsx` to use Clerk
5. ✅ Updated Supabase service to work with Clerk user IDs
6. ✅ Added Clerk configuration to `.env`

## 🚀 Next Steps - You Need to Do These

### Step 1: Create a Clerk Account

1. Go to: https://clerk.com/
2. Click "Start building for free"
3. Sign up with your email or GitHub
4. Create a new application called "Decision Navigator"

### Step 2: Get Your Clerk Publishable Key

1. In your Clerk Dashboard, go to **API Keys**
2. Copy the **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Update your `.env` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
   ```

### Step 3: Configure Clerk Settings

In your Clerk Dashboard:

1. Go to **User & Authentication** → **Email, Phone, Username**
2. Enable **Email address** (required)
3. Enable **Password** authentication
4. Optional: Enable **Google** or other social logins

5. Go to **Paths**
6. Set these paths:
   - Sign-in URL: `/login`
   - Sign-up URL: `/signup`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/dashboard`

### Step 4: Update Database for Clerk

Run this SQL in your Supabase SQL Editor:

```sql
-- Change user_id from UUID to TEXT for Clerk
ALTER TABLE decisions DROP CONSTRAINT IF EXISTS decisions_user_id_fkey;
ALTER TABLE decisions ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Simplify RLS policies (or disable RLS entirely)
ALTER TABLE decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE options DISABLE ROW LEVEL SECURITY;
ALTER TABLE criteria DISABLE ROW LEVEL SECURITY;
ALTER TABLE constraints DISABLE ROW LEVEL SECURITY;
```

Or run the migration file: `supabase/migrate-to-clerk.sql`

### Step 5: Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
5. Redeploy your application

### Step 6: Remove Old Supabase Auth Files (Optional)

These files are no longer needed:
- `src/contexts/AuthContext.tsx` (replaced by `ClerkAuthContext.tsx`)
- `src/pages/Login.tsx` (Clerk provides its own)
- `src/pages/Signup.tsx` (Clerk provides its own)
- `src/pages/ForgotPassword.tsx` (Clerk handles this)

You can delete them or keep them as backup.

### Step 7: Test the New Authentication

1. Start your dev server: `npm run dev`
2. Go to: http://localhost:5173
3. Click "Login" - you should see Clerk's login UI
4. Create a new account
5. You should be redirected to `/dashboard`

## 🎯 Benefits of Clerk

✅ **No more email redirect issues** - Clerk handles all email confirmations
✅ **Professional UI** - Beautiful, customizable auth components
✅ **Social logins** - Easy to add Google, GitHub, etc.
✅ **Session management** - Automatic token refresh
✅ **User management** - Dashboard to manage users
✅ **Security** - Built-in protection against common attacks
✅ **Free tier** - 10,000 monthly active users

## 📝 What Changed

### Before (Supabase Auth):
- Custom login/signup pages
- Manual email confirmation handling
- Complex redirect configuration
- UUID-based user IDs

### After (Clerk):
- Clerk's pre-built auth components
- Automatic email handling
- Simple configuration
- String-based user IDs (Clerk format)

## 🔧 Troubleshooting

### "Missing Clerk Publishable Key" Error
- Make sure `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env`
- Restart your dev server after adding the key

### Login page not showing
- Check that Clerk is properly initialized in `App.tsx`
- Verify the publishable key is correct

### Database errors after migration
- Make sure you ran the migration SQL to change `user_id` to TEXT
- Check that RLS is disabled or policies are updated

### Users can't access their old decisions
- Old decisions have UUID user_ids from Supabase
- New decisions will have Clerk string user_ids
- You may need to migrate existing user data

## 🎨 Customizing Clerk UI

Clerk's components can be customized to match your brand:

1. Go to Clerk Dashboard → **Customization**
2. Upload your logo
3. Set your brand colors
4. Customize button styles

Or use the `appearance` prop in your components:

```tsx
<SignIn 
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-xl"
    }
  }}
/>
```

## 📚 Additional Resources

- Clerk Documentation: https://clerk.com/docs
- React Integration: https://clerk.com/docs/quickstarts/react
- Customization Guide: https://clerk.com/docs/components/customization/overview

---

**Last Updated**: February 3, 2026
**Status**: Code ready, waiting for Clerk configuration
