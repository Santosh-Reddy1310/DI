# Supabase Database Files

This folder contains SQL scripts for managing the Supabase database.

## 📁 Files

### Core Schema
- **`schema.sql`** - Original complete database schema with Supabase Auth
- **`schema-simple.sql`** - Simplified schema that handles existing tables gracefully

### Clerk Migration
- **`migrate-to-clerk-fixed.sql`** - ⭐ **USE THIS** - Migrates from Supabase Auth to Clerk
  - Drops RLS policies
  - Disables Row Level Security
  - Changes `user_id` from UUID to TEXT for Clerk compatibility

### Optional
- **`fix-decisions-ultra-simple.sql`** - Fixes decisions table structure if needed
- **`config.toml`** - Supabase local development configuration

## 🚀 Quick Start

### For New Setup:
1. Run `schema-simple.sql` to create all tables
2. Run `migrate-to-clerk-fixed.sql` to prepare for Clerk authentication

### For Existing Setup:
1. Run `migrate-to-clerk-fixed.sql` to migrate from Supabase Auth to Clerk

## 📝 What Each Migration Does

### migrate-to-clerk-fixed.sql
```sql
-- Removes all Supabase Auth dependencies
-- Changes user_id to work with Clerk's string IDs
-- Disables RLS (security handled by Clerk)
```

### schema-simple.sql
```sql
-- Creates: decisions, options, criteria, constraints tables
-- Sets up indexes for performance
-- Configures RLS policies (if using Supabase Auth)
```

## ⚠️ Important Notes

- **Clerk Authentication**: We use Clerk for auth, Supabase only for data storage
- **User IDs**: Changed from UUID (Supabase) to TEXT (Clerk)
- **Security**: Handled at application level with Clerk, not database RLS
- **Backup**: Always backup your database before running migrations

## 🗑️ Removed Files

These files were removed during cleanup:
- `check-table-structure.sql` - Diagnostic file
- `fix-decisions-table.sql` - Old version with syntax errors
- `fix-decisions-simple.sql` - Intermediate version
- `migrate-to-clerk.sql` - Old version with RLS errors
- `schema-safe.sql` - Redundant version
- `delete_user_account.sql` - Supabase Auth specific
- `SETUP_DELETE_ACCOUNT.sql` - Supabase Auth specific

---

**Last Updated**: February 3, 2026
**Database**: Supabase (data only)
**Authentication**: Clerk
