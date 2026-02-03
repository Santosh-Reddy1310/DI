-- Fix the decisions table structure (Ultra Simple Version)
-- Run each section separately if you get errors

-- Section 1: Add missing columns
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'Untitled Decision';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS context TEXT;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS result_json JSONB;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Section 2: Update existing rows
UPDATE decisions SET status = 'draft' WHERE status IS NULL;
UPDATE decisions SET created_at = NOW() WHERE created_at IS NULL;
UPDATE decisions SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE decisions SET title = 'Untitled Decision' WHERE title IS NULL OR title = '';

-- Section 3: Enable RLS
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

-- Section 4: Drop old policies
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

-- Section 5: Create new policies
CREATE POLICY "Users can view their own decisions"
  ON decisions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own decisions"
  ON decisions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own decisions"
  ON decisions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own decisions"
  ON decisions FOR DELETE
  USING (auth.uid() = user_id);