# 🚀 Quick Setup: Account Deletion

## Problem
Users can still login after "deleting" their account because only data is deleted, not the auth account.

## Solution (2 minutes)

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the SQL
1. Click **New Query**
2. Copy the entire contents of `supabase/SETUP_DELETE_ACCOUNT.sql`
3. Paste into the SQL editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify
You should see: `Success. No rows returned`

That's it! The function is now set up.

## What This Does

When a user clicks "Delete Account" in Settings:
1. ✅ Deletes all their decisions
2. ✅ Deletes all related options, criteria, constraints (cascade)
3. ✅ Deletes their auth account from Supabase
4. ✅ Signs them out
5. ✅ They **cannot login again** (account is gone)

## Testing

1. Create a test account: `test-delete@example.com`
2. Login and create a decision
3. Go to Settings → Danger Zone
4. Click "Delete Account" → Confirm
5. Try to login again → Should fail with "Invalid credentials"

## Troubleshooting

### Error: "function delete_my_account() does not exist"
**Fix**: Run the SQL script in Supabase SQL Editor

### Error: "permission denied"
**Fix**: The SQL script includes permission grants. Re-run it.

### Still can login after deletion
**Fix**: 
1. Check Supabase logs for errors
2. Verify function exists: Run in SQL Editor:
   ```sql
   SELECT routine_name FROM information_schema.routines 
   WHERE routine_name = 'delete_my_account';
   ```
3. If no results, re-run the setup SQL

## Files

- `supabase/SETUP_DELETE_ACCOUNT.sql` - **Run this in Supabase**
- `supabase/delete_user_account.sql` - Alternative version
- `DELETE_ACCOUNT_SETUP.md` - Detailed documentation

## Status

- ✅ Application code ready
- ⚠️ **Requires SQL setup in Supabase** (2 minutes)
- ✅ Fallback behavior if SQL not set up (deletes data only)

---

**Next Step**: Run `supabase/SETUP_DELETE_ACCOUNT.sql` in Supabase SQL Editor
