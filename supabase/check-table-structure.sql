-- Check if decisions table has the correct structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'decisions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if the table exists and has data
SELECT COUNT(*) as total_rows FROM decisions;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'decisions';