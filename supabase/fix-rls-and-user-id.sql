-- Fix RLS and user_id type issues
-- Run this in your Supabase SQL Editor

-- Step 1: Alter decisions table to use UUID for user_id and reference auth.users
-- First, we need to handle existing data
-- If you have existing data with text user_ids, this will clear them
-- If you don't have important data, you can run this safely

-- Option A: If you have no data or can lose existing data
TRUNCATE TABLE decisions CASCADE;

-- Now alter the column type
ALTER TABLE decisions 
  ALTER COLUMN user_id TYPE uuid USING user_id::uuid,
  ALTER COLUMN user_id SET NOT NULL;

-- Add foreign key constraint to auth.users
ALTER TABLE decisions
  DROP CONSTRAINT IF EXISTS decisions_user_id_fkey;

ALTER TABLE decisions
  ADD CONSTRAINT decisions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Enable Row Level Security on all tables
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop all existing policies (if any)
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

-- Step 4: Create RLS Policies for decisions
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

-- Step 5: Create RLS Policies for options
CREATE POLICY "Users can view options for their decisions"
  ON options FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = options.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert options for their decisions"
  ON options FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = options.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update options for their decisions"
  ON options FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = options.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete options for their decisions"
  ON options FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = options.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

-- Step 6: Create RLS Policies for criteria
CREATE POLICY "Users can view criteria for their decisions"
  ON criteria FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = criteria.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert criteria for their decisions"
  ON criteria FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = criteria.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update criteria for their decisions"
  ON criteria FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = criteria.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete criteria for their decisions"
  ON criteria FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = criteria.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

-- Step 7: Create RLS Policies for constraints
CREATE POLICY "Users can view constraints for their decisions"
  ON constraints FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = constraints.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert constraints for their decisions"
  ON constraints FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = constraints.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update constraints for their decisions"
  ON constraints FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = constraints.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete constraints for their decisions"
  ON constraints FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM decisions 
      WHERE decisions.id = constraints.decision_id 
      AND decisions.user_id = auth.uid()
    )
  );

-- Step 8: Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_decisions_user_id ON decisions(user_id);
CREATE INDEX IF NOT EXISTS idx_decisions_status ON decisions(status);
CREATE INDEX IF NOT EXISTS idx_decisions_updated_at ON decisions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_options_decision_id ON options(decision_id);
CREATE INDEX IF NOT EXISTS idx_criteria_decision_id ON criteria(decision_id);
CREATE INDEX IF NOT EXISTS idx_constraints_decision_id ON constraints(decision_id);

-- Step 9: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_decisions_updated_at ON decisions;
CREATE TRIGGER update_decisions_updated_at 
  BEFORE UPDATE ON decisions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated;
