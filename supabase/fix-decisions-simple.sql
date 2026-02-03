-- Fix the decisions table structure (Simple Version)
-- Run this in Supabase SQL Editor

-- First, let's check what columns exist
-- (This is just for information, won't cause errors)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'decisions' 
AND table_schema = 'public';

-- Add missing columns one by one (these will skip if column exists)
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'Untitled Decision';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS context TEXT;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS result_json JSONB;
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE decisions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add constraint for status if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'decisions_status_check'
    ) THEN
        ALTER TABLE decisions ADD CONSTRAINT decisions_status_check 
        CHECK (status IN ('draft', 'analyzing', 'done', 'archived'));
    END IF;
END $$;

-- Update any existing rows to have proper defaults
UPDATE decisions SET 
    status = 'draft' WHERE status IS NULL;
    
UPDATE decisions SET 
    created_at = NOW() WHERE created_at IS NULL;
    
UPDATE decisions SET 
    updated_at = NOW() WHERE updated_at IS NULL;
    
UPDATE decisions SET 
    title = 'Untitled Decision' WHERE title IS NULL OR title = '';

-- Ensure RLS is enabled
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

-- Create policies
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