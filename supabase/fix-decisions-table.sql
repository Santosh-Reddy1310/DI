-- Fix the decisions table structure
-- This will add missing columns if they don't exist

-- Add missing columns to decisions table if they don't exist
DO $$ 
BEGIN
    -- Add user_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'user_id') THEN
        ALTER TABLE decisions ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
    
    -- Add title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'title') THEN
        ALTER TABLE decisions ADD COLUMN title TEXT NOT NULL DEFAULT 'Untitled Decision';
    END IF;
    
    -- Add context column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'context') THEN
        ALTER TABLE decisions ADD COLUMN context TEXT;
    END IF;
    
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'status') THEN
        ALTER TABLE decisions ADD COLUMN status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'done', 'archived'));
    END IF;
    
    -- Add result_json column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'result_json') THEN
        ALTER TABLE decisions ADD COLUMN result_json JSONB;
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'created_at') THEN
        ALTER TABLE decisions ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'updated_at') THEN
        ALTER TABLE decisions ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Ensure the decisions table has an id column with UUID
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'decisions' AND column_name = 'id') THEN
        ALTER TABLE decisions ADD COLUMN id UUID PRIMARY KEY DEFAULT uuid_generate_v4();
    END IF;
END $$;

-- Update any existing rows to have proper defaults
UPDATE decisions SET 
    status = 'draft' WHERE status IS NULL,
    created_at = NOW() WHERE created_at IS NULL,
    updated_at = NOW() WHERE updated_at IS NULL,
    title = 'Untitled Decision' WHERE title IS NULL OR title = '';

-- Ensure RLS is enabled
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

-- Recreate the RLS policies to make sure they work
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

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