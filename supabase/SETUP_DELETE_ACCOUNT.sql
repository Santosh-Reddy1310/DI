-- ============================================
-- SETUP: Account Deletion Function
-- ============================================
-- Run this SQL in Supabase Dashboard → SQL Editor
-- This allows users to delete their own accounts
-- ============================================

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS delete_my_account();

-- Create the account deletion function
CREATE OR REPLACE FUNCTION delete_my_account()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid;
  result json;
BEGIN
  -- Get the authenticated user's ID
  current_user_id := auth.uid();
  
  -- Verify user is authenticated
  IF current_user_id IS NULL THEN
    result := json_build_object(
      'success', false,
      'error', 'User not authenticated'
    );
    RETURN result;
  END IF;
  
  -- Delete all user's decisions (cascade will delete related options, criteria, constraints)
  DELETE FROM public.decisions 
  WHERE user_id = current_user_id;
  
  -- Delete the user from auth.users table
  DELETE FROM auth.users 
  WHERE id = current_user_id;
  
  -- Return success response
  result := json_build_object(
    'success', true,
    'message', 'Account and all data deleted successfully',
    'user_id', current_user_id
  );
  
  RETURN result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Return error response
    result := json_build_object(
      'success', false,
      'error', SQLERRM,
      'detail', SQLSTATE
    );
    RETURN result;
END;
$$;

-- Grant execute permission to authenticated users only
GRANT EXECUTE ON FUNCTION delete_my_account() TO authenticated;

-- Revoke from public for security
REVOKE EXECUTE ON FUNCTION delete_my_account() FROM public;

-- Add helpful comment
COMMENT ON FUNCTION delete_my_account() IS 
'Allows authenticated users to permanently delete their own account and all associated data. This action cannot be undone.';

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the function was created:
-- SELECT routine_name, routine_type 
-- FROM information_schema.routines 
-- WHERE routine_name = 'delete_my_account';
-- ============================================
