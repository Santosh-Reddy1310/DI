-- Migrate from Supabase Auth to Clerk
-- This updates the user_id column to work with Clerk's string IDs

-- Step 1: Drop the foreign key constraint to auth.users
ALTER TABLE decisions DROP CONSTRAINT IF EXISTS decisions_user_id_fkey;

-- Step 2: Change user_id from UUID to TEXT to support Clerk IDs
ALTER TABLE decisions ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Step 3: Update RLS policies to work without auth.uid()
-- Drop old policies
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

-- Create new policies that work with Clerk
-- Note: We'll need to pass the user_id from the application
CREATE POLICY "Users can view their own decisions"
  ON decisions FOR SELECT
  USING (true); -- We'll filter in the application layer

CREATE POLICY "Users can insert their own decisions"
  ON decisions FOR INSERT
  WITH CHECK (true); -- We'll validate in the application layer

CREATE POLICY "Users can update their own decisions"
  ON decisions FOR UPDATE
  USING (true); -- We'll filter in the application layer

CREATE POLICY "Users can delete their own decisions"
  ON decisions FOR DELETE
  USING (true); -- We'll filter in the application layer

-- Alternative: Disable RLS and handle security in application
-- ALTER TABLE decisions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE options DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE criteria DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE constraints DISABLE ROW LEVEL SECURITY;

-- Note: With Clerk, we handle authentication at the application level
-- The Supabase database becomes a simple data store