-- Verify that RLS is enabled and policies exist
-- Run this to confirm everything is set up correctly

-- Check RLS status
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('decisions', 'options', 'criteria', 'constraints')
ORDER BY tablename;

-- Check policies
SELECT 
  tablename,
  policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('decisions', 'options', 'criteria', 'constraints')
ORDER BY tablename;

-- Expected results:
-- All tables should show rls_enabled = true
-- Each table should have a policy named "Allow authenticated users full access to [tablename]"
