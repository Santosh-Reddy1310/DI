# Clerk Authentication Setup Guide (Core 2+)

## ✅ What We've Done

1. ✅ Installed `@clerk/clerk-react`
2. ✅ Created new `ClerkAuthContext.tsx`
3. ✅ Updated `App.tsx` to use Clerk with environment variables
4. ✅ Updated `ProtectedRoute.tsx` to use Clerk
5. ✅ Updated Supabase service to work with Clerk user IDs
6. ✅ Added Clerk configuration to `.env` (Core 2+ approach)

## 🚀 Setup Steps

### Step 1: Create a Clerk Account

1. Go to: https://clerk.com/
2. Click "Start building for free"
3. Sign up with your email or GitHub
4. Create a new application called "Decision Navigator"

### Step 2: Get Your Clerk Keys

1. In your Clerk Dashboard, go to **API Keys**
2. Copy the **Publishable Key** (starts with `pk_test_`)
3. Copy the **Secret Key** (starts with `sk_test_`)

### Step 3: Environment Variables (Core 2+ Method)

Your `.env` file is already configured with the correct structure:

```env
# Clerk Authentication (Core 2+)
VITE_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"

# Clerk Redirect URLs (Core 2+)
VITE_CLERK_SIGN_IN_URL="/login"
VITE_CLERK_SIGN_UP_URL="/signup"
VITE_CLERK_AFTER_SIGN_IN_URL="/dashboard"
VITE_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

**Important**: In Clerk Core 2+, redirect URLs are configured via environment variables in your code, NOT in the Clerk Dashboard. The dashboard "Paths" section has been removed.

### Step 4: Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bW92ZWQtc3dpbmUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_yCUsloRrdVeWwnkwtSSrp5KupnCBvNiTxwv88cGBcF
VITE_CLERK_SIGN_IN_URL=/login
VITE_CLERK_SIGN_UP_URL=/signup
VITE_CLERK_AFTER_SIGN_IN_URL=/dashboard
VITE_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

5. Redeploy your application

### Step 5: Configure Clerk Authentication Methods

In your Clerk Dashboard:

1. Go to **User & Authentication** → **Email, Phone, Username**
2. Enable **Email address** (required)
3. Enable **Password** authentication
4. Optional: Enable **Google**, **GitHub**, or other social logins

### Step 6: Update Database for Clerk

Run this SQL in your Supabase SQL Editor:

```sql
-- Drop all RLS policies
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

DROP POLICY IF EXISTS "Users can view options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can insert options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can update options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can delete options for their decisions" ON options;

DROP POLICY IF EXISTS "Users can view criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can insert criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can update criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can delete criteria for their decisions" ON criteria;

DROP POLICY IF EXISTS "Users can view constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can insert constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can update constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can delete constraints for their decisions" ON constraints;

-- Disable RLS
ALTER TABLE decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE options DISABLE ROW LEVEL SECURITY;
ALTER TABLE criteria DISABLE ROW LEVEL SECURITY;
ALTER TABLE constraints DISABLE ROW LEVEL SECURITY;

-- Change user_id to TEXT for Clerk
ALTER TABLE decisions DROP CONSTRAINT IF EXISTS decisions_user_id_fkey;
ALTER TABLE decisions ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
```

### Step 7: Test the Setup

1. Start your dev server: `npm run dev`
2. Go to: http://localhost:5173
3. Click "Login" - you should see Clerk's login UI
4. Create a new account
5. You should be redirected to `/dashboard`

## 🎯 Key Differences: Core 2+ vs Legacy

### Legacy Clerk (Deprecated):
- ❌ Configure paths in Clerk Dashboard
- ❌ Dashboard "Paths" section
- ❌ Manual redirect configuration

### Core 2+ (Current):
- ✅ Configure paths via environment variables
- ✅ Paths defined in code (`ClerkProvider` props)
- ✅ Better version control and deployment

## 📝 How It Works

The `ClerkProvider` in `App.tsx` uses environment variables:

```tsx
<ClerkProvider 
  publishableKey={CLERK_PUBLISHABLE_KEY}
  signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL || "/login"}
  signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL || "/signup"}
  afterSignInUrl={import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/dashboard"}
  afterSignUpUrl={import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL || "/dashboard"}
>
```

This approach:
- ✅ Works with Clerk Core 2+
- ✅ Keeps configuration in code
- ✅ Easy to version control
- ✅ Consistent across environments

## 🎨 Customizing Clerk UI

Clerk's components can be customized to match your brand:

### Option 1: Clerk Dashboard
1. Go to **Customization** → **Theme**
2. Upload your logo
3. Set brand colors
4. Customize button styles

### Option 2: Code-based Customization
```tsx
<SignIn 
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-xl border-2 border-primary/20",
      headerTitle: "text-2xl font-bold",
      formButtonPrimary: "bg-primary hover:bg-primary/90"
    },
    variables: {
      colorPrimary: "#000000"
    }
  }}
/>
```

## 🔧 Troubleshooting

### "Missing Clerk Publishable Key" Error
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env`
- Restart dev server after adding the key
- Check for typos in the key

### Redirects Not Working
- Verify environment variables are set correctly
- Check that paths start with `/` (e.g., `/login` not `login`)
- Ensure Vercel has the environment variables set
- Redeploy after adding variables

### Database Errors
- Run the migration SQL to change `user_id` to TEXT
- Verify RLS is disabled on all tables
- Check Supabase logs for specific errors

## 📚 Additional Resources

- Clerk Core 2 Migration Guide: https://clerk.com/docs/upgrade-guides/core-2/overview
- React Integration: https://clerk.com/docs/quickstarts/react
- Environment Variables: https://clerk.com/docs/deployments/clerk-environment-variables

---

**Last Updated**: February 3, 2026
**Clerk Version**: Core 2+
**Status**: Ready for deployment
