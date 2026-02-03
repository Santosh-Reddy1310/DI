-- DESY Database Schema for Supabase (Simple Version)
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create options table if it doesn't exist
CREATE TABLE IF NOT EXISTS options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL,
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create criteria table if it doesn't exist
CREATE TABLE IF NOT EXISTS criteria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  weight INTEGER NOT NULL CHECK (weight >= 1 AND weight <= 10),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create constraints table if it doesn't exist
CREATE TABLE IF NOT EXISTS constraints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  priority INTEGER CHECK (priority >= 1 AND priority <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes (ignore errors if they exist)
CREATE INDEX IF NOT EXISTS idx_decisions_user_id ON decisions(user_id);
CREATE INDEX IF NOT EXISTS idx_decisions_status ON decisions(status);
CREATE INDEX IF NOT EXISTS idx_decisions_updated_at ON decisions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_options_decision_id ON options(decision_id);
CREATE INDEX IF NOT EXISTS idx_criteria_decision_id ON criteria(decision_id);
CREATE INDEX IF NOT EXISTS idx_constraints_decision_id ON constraints(decision_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS 
'BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;'
LANGUAGE plpgsql;

-- Add trigger to decisions table (drop first if exists)
DROP TRIGGER IF EXISTS update_decisions_updated_at ON decisions;
CREATE TRIGGER update_decisions_updated_at 
  BEFORE UPDATE ON decisions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraints ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
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

-- RLS Policies for decisions
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

-- RLS Policies for options
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

-- RLS Policies for criteria
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

-- RLS Policies for constraints
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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated;