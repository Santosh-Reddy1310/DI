-- Migrate from Supabase Auth to Clerk (Fixed Version)
-- Run this in Supabase SQL Editor

-- Step 1: Drop all RLS policies first (before changing column type)
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

-- Step 2: Disable RLS on all tables
ALTER TABLE decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE options DISABLE ROW LEVEL SECURITY;
ALTER TABLE criteria DISABLE ROW LEVEL SECURITY;
ALTER TABLE constraints DISABLE ROW LEVEL SECURITY;

-- Step 3: Drop the foreign key constraint to auth.users
ALTER TABLE decisions DROP CONSTRAINT IF EXISTS decisions_user_id_fkey;

-- Step 4: Change user_id from UUID to TEXT to support Clerk IDs
ALTER TABLE decisions ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Done! Now Clerk can use string user IDs
-- Security is handled at the application level with Clerk