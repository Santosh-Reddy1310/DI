# 🗑️ Delete Account Setup Guide

## Issue

When a user deletes their account, only their data (decisions, options, etc.) is deleted, but the user account in Supabase Auth remains active. This means they can still log in, but with no data.

## Solution

To properly delete user accounts, we need to create a Supabase database function that can delete both the user's data AND their auth account.

## Setup Instructions

### Option 1: Using SQL Function (Recommended)

#### Step 1: Run SQL in Supabase Dashboard

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Create an RPC endpoint for account deletion
CREATE OR REPLACE FUNCTION delete_my_account()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id_to_delete uuid;
  result json;
BEGIN
  -- Get the current user's ID
  user_id_to_delete := auth.uid();
  
  -- Check if user is authenticated
  IF user_id_to_delete IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Delete all user's decisions (cascade will handle related data)
  DELETE FROM decisions WHERE user_id = user_id_to_delete;
  
  -- Delete the user from auth.users
  DELETE FROM auth.users WHERE id = user_id_to_delete;
  
  -- Return success
  result := json_build_object(
    'success', true,
    'message', 'Account deleted successfully'
  );
  
  RETURN result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Return error
    result := json_build_object(
      'success', false,
      'error', SQLERRM
    );
    RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_my_account() TO authenticated;

COMMENT ON FUNCTION delete_my_account() IS 'Allows authenticated users to delete their own account and all associated data';
```

5. Click **Run** to execute the SQL
6. Verify the function was created successfully

#### Step 2: Test the Function

You can test the function in SQL Editor:

```sql
-- This will delete YOUR account, so be careful!
-- Only run this with a test account
SELECT delete_my_account();
```

#### Step 3: Verify in Application

The Settings page is already configured to call this function. When a user clicks "Delete Account":

1. All decisions are deleted
2. The RPC function `delete_my_account()` is called
3. The function deletes the user from `auth.users`
4. User is signed out
5. User cannot log in again (account is gone)

### Option 2: Using Supabase Edge Function

If you prefer using Edge Functions instead of SQL functions:

#### Step 1: Create Edge Function

```bash
# In your project directory
supabase functions new delete-user-account
```

#### Step 2: Implement Edge Function

File: `supabase/functions/delete-user-account/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Get the user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Delete user's decisions
    const { error: decisionsError } = await supabaseAdmin
      .from('decisions')
      .delete()
      .eq('user_id', user.id)

    if (decisionsError) {
      throw decisionsError
    }

    // Delete the user account
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id)

    if (deleteError) {
      throw deleteError
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Account deleted successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

#### Step 3: Deploy Edge Function

```bash
supabase functions deploy delete-user-account
```

#### Step 4: Update Settings.tsx

Replace the RPC call with Edge Function call:

```typescript
const { data, error } = await supabase.functions.invoke('delete-user-account');
```

## Current Implementation

The Settings page (`src/pages/Settings.tsx`) currently:

1. ✅ Deletes all user decisions and related data
2. ✅ Removes user preferences from localStorage
3. ✅ Attempts to call `delete_my_account()` RPC function
4. ✅ Signs out the user
5. ⚠️ If RPC function doesn't exist, only data is deleted (account remains)

## Testing

### Test Account Deletion

1. **Create a test account**
   ```
   Email: test-delete@example.com
   Password: test123456
   ```

2. **Create some test data**
   - Create 1-2 decisions
   - Add options and criteria

3. **Delete the account**
   - Go to Settings
   - Scroll to Danger Zone
   - Click "Delete" button
   - Confirm deletion

4. **Verify deletion**
   - Try to log in with the same credentials
   - Should get "Invalid login credentials" error
   - Account should be completely gone

### Verify in Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Search for the test user
3. User should not exist
4. Go to **Table Editor** → **decisions**
5. No decisions for that user_id should exist

## Troubleshooting

### Error: "function delete_my_account() does not exist"

**Solution**: Run the SQL function creation script in Supabase SQL Editor

### Error: "permission denied for function delete_my_account"

**Solution**: Grant execute permission:
```sql
GRANT EXECUTE ON FUNCTION delete_my_account() TO authenticated;
```

### User can still login after deletion

**Cause**: The SQL function wasn't created or failed to execute

**Solution**: 
1. Check Supabase logs for errors
2. Verify the function exists: `SELECT * FROM pg_proc WHERE proname = 'delete_my_account';`
3. Manually delete the user in Supabase Dashboard → Authentication → Users

### Data deleted but account remains

**Cause**: The RPC call failed but data deletion succeeded

**Solution**: This is the current fallback behavior. To fix:
1. Create the SQL function as described above
2. Or manually delete users from Supabase Dashboard

## Security Considerations

### Why SECURITY DEFINER?

The function uses `SECURITY DEFINER` to run with elevated privileges, allowing it to delete from `auth.users` table which normal users can't access.

### Safety Checks

The function includes safety checks:
- ✅ Verifies user is authenticated (`auth.uid()`)
- ✅ Only deletes the current user's data
- ✅ Cannot delete other users' accounts
- ✅ Requires user to be logged in

### Audit Trail

Consider adding an audit log before deletion:

```sql
-- Create audit table
CREATE TABLE IF NOT EXISTS account_deletions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text,
  deleted_at timestamptz DEFAULT now(),
  reason text
);

-- Update function to log deletions
-- Add before DELETE FROM auth.users:
INSERT INTO account_deletions (user_id, email)
SELECT id, email FROM auth.users WHERE id = user_id_to_delete;
```

## Alternative: Soft Delete

Instead of permanently deleting accounts, you can implement soft delete:

```sql
-- Add deleted column to users metadata
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"deleted": true, "deleted_at": "2024-01-01"}'::jsonb
WHERE id = auth.uid();

-- Then filter out deleted users in your app
```

## Production Checklist

Before deploying to production:

- [ ] SQL function created in Supabase
- [ ] Function permissions granted
- [ ] Tested with test account
- [ ] Verified account is actually deleted
- [ ] Verified user cannot login after deletion
- [ ] Audit logging implemented (optional)
- [ ] Backup strategy in place
- [ ] GDPR compliance verified
- [ ] User confirmation dialog working
- [ ] Error handling tested

## Summary

To properly delete user accounts:

1. **Run the SQL script** in Supabase SQL Editor (see above)
2. **Test with a test account** to verify it works
3. **Deploy to production** once verified

The application code is already set up to call the function - you just need to create it in Supabase!

---

**Status**: ⚠️ Requires SQL function setup in Supabase
**Priority**: High (affects user data privacy)
**Estimated Time**: 5 minutes to set up
