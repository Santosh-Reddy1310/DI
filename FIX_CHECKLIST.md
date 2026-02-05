# Fix Checklist for PGRST205 Error

## Current Issue
Error: `Could not find the table 'public.decisions' in the schema cache`

This happens because PostgREST (Supabase's API) can't see tables without proper RLS policies.

## Steps to Fix (Do in Order):

### ✅ Step 1: Run the RLS Script
1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste the contents of `supabase/enable-rls-clerk.sql`
6. Click **Run** (or press Ctrl+Enter)
7. Wait for "Success. No rows returned" message

### ✅ Step 2: Restart PostgREST API
1. In Supabase Dashboard, go to **Settings** → **API**
2. Scroll down to find **"Restart API Server"** or **"Restart PostgREST"** button
3. Click it and wait 1-2 minutes

### ✅ Step 3: Verify Tables Are Visible
1. In Supabase Dashboard, go to **Table Editor**
2. Check that all tables show **"RLS enabled"** badge (not "UNRESTRICTED")
3. Tables should be: `decisions`, `options`, `criteria`, `constraints`

### ✅ Step 4: Test Your Application
1. Hard refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache if needed
3. The dashboard should now load without errors

## Why This Happens

- **Clerk authentication** doesn't integrate with Supabase's `auth.uid()` function
- Without RLS policies, PostgREST hides tables from the API for security
- The `enable-rls-clerk.sql` script creates permissive policies that allow authenticated users to access tables
- Your application code already filters by `user.id`, so data isolation is maintained

## If It Still Doesn't Work

Check the browser console for the exact error message. The improved error handling will show:
- "Database is initializing" - Wait and refresh
- "Authentication error" - Sign out and back in
- Other specific errors - Share them for further debugging

## Current Status
- [x] SQL script created: `supabase/enable-rls-clerk.sql`
- [ ] SQL script executed in Supabase
- [ ] PostgREST API restarted
- [ ] Application tested and working
