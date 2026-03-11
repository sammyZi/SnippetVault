# Supabase Database Setup

This directory contains database migrations for SnippetVault.

## How to Apply the Migration

You have two options to apply the initial schema migration:

### Option 1: Using Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `migrations/20260310000000_initial_schema.sql`
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Login to Supabase (if not already logged in)
npx supabase login

# Link your project
npx supabase link --project-ref oeylfcvscoaanhymibiv

# Push the migration
npx supabase db push
```

## What This Migration Creates

- **Tables:**
  - `profiles` - User profile information
  - `snippets` - Code snippets with metadata
  - `tags` - Tag names
  - `snippet_tags` - Many-to-many relationship between snippets and tags
  - `snippet_shares` - User-specific snippet sharing

- **Indexes:** Performance indexes on user_id, is_public, language, and foreign keys

- **Triggers:** Automatic updated_at timestamp for snippets

- **RLS Policies:** Row Level Security policies for secure data access

- **Functions:** Automatic profile creation on user signup

## Verifying the Migration

After running the migration, verify it worked by:

1. Going to **Table Editor** in your Supabase dashboard
2. You should see all 5 tables listed
3. Click on any table to verify the columns match the schema

## TypeScript Types

The TypeScript types for the database have been generated in:
`src/lib/database.types.ts`

These types provide full type safety when querying the database with Supabase.
