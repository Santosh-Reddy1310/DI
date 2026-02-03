-- Function to delete user account and all associated data
-- This should be run in Supabase SQL Editor

-- Create an RPC endpoint for account deletion
CREATE OR REPLACE FUNCTION delete_my_account()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
  DELETE FROM public.decisions WHERE user_id = user_id_to_delete;
  
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

-- Add comment
COMMENT ON FUNCTION delete_my_account() IS 'Allows authenticated users to delete their own account and all associated data';
