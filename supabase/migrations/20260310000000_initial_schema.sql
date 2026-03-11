-- SnippetVault Initial Database Schema
-- This migration creates all necessary tables, indexes, triggers, and RLS policies

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_-]+$')
);

-- Create snippets table
CREATE TABLE IF NOT EXISTS public.snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT title_length CHECK (char_length(title) > 0 AND char_length(title) <= 200),
  CONSTRAINT code_not_empty CHECK (char_length(code) > 0)
);

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT tag_name_length CHECK (char_length(name) > 0 AND char_length(name) <= 50),
  CONSTRAINT tag_name_format CHECK (name ~ '^[a-zA-Z0-9_-]+$')
);

-- Create snippet_tags junction table
CREATE TABLE IF NOT EXISTS public.snippet_tags (
  snippet_id UUID NOT NULL REFERENCES public.snippets(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (snippet_id, tag_id)
);

-- Create snippet_shares table
CREATE TABLE IF NOT EXISTS public.snippet_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snippet_id UUID NOT NULL REFERENCES public.snippets(id) ON DELETE CASCADE,
  shared_with_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(snippet_id, shared_with_user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_snippets_user_id ON public.snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_snippets_is_public ON public.snippets(is_public);
CREATE INDEX IF NOT EXISTS idx_snippets_language ON public.snippets(language);
CREATE INDEX IF NOT EXISTS idx_snippets_created_at ON public.snippets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_snippet_tags_snippet_id ON public.snippet_tags(snippet_id);
CREATE INDEX IF NOT EXISTS idx_snippet_tags_tag_id ON public.snippet_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_snippet_shares_snippet_id ON public.snippet_shares(snippet_id);
CREATE INDEX IF NOT EXISTS idx_snippet_shares_user_id ON public.snippet_shares(shared_with_user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for snippets updated_at
DROP TRIGGER IF EXISTS update_snippets_updated_at ON public.snippets;
CREATE TRIGGER update_snippets_updated_at
  BEFORE UPDATE ON public.snippets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snippet_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snippet_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Allow users to read all profiles (for public profile pages)
CREATE POLICY "Anyone can view profiles"
  ON public.profiles
  FOR SELECT
  USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for snippets table
-- Users can read their own snippets
CREATE POLICY "Users can read own snippets"
  ON public.snippets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Anyone can read public snippets
CREATE POLICY "Anyone can read public snippets"
  ON public.snippets
  FOR SELECT
  USING (is_public = true);

-- Users can read snippets shared with them
CREATE POLICY "Users can read shared snippets"
  ON public.snippets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.snippet_shares
      WHERE snippet_shares.snippet_id = snippets.id
      AND snippet_shares.shared_with_user_id = auth.uid()
    )
  );

-- Users can insert their own snippets
CREATE POLICY "Users can insert own snippets"
  ON public.snippets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own snippets
CREATE POLICY "Users can update own snippets"
  ON public.snippets
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own snippets
CREATE POLICY "Users can delete own snippets"
  ON public.snippets
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for tags table
-- Anyone can read tags
CREATE POLICY "Anyone can read tags"
  ON public.tags
  FOR SELECT
  USING (true);

-- Authenticated users can create tags
CREATE POLICY "Authenticated users can insert tags"
  ON public.tags
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for snippet_tags table
-- Users can read snippet_tags for snippets they have access to
CREATE POLICY "Users can read accessible snippet_tags"
  ON public.snippet_tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_tags.snippet_id
      AND (
        snippets.user_id = auth.uid()
        OR snippets.is_public = true
        OR EXISTS (
          SELECT 1 FROM public.snippet_shares
          WHERE snippet_shares.snippet_id = snippets.id
          AND snippet_shares.shared_with_user_id = auth.uid()
        )
      )
    )
  );

-- Users can manage tags for their own snippets
CREATE POLICY "Users can insert tags for own snippets"
  ON public.snippet_tags
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_tags.snippet_id
      AND snippets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tags from own snippets"
  ON public.snippet_tags
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_tags.snippet_id
      AND snippets.user_id = auth.uid()
    )
  );

-- RLS Policies for snippet_shares table
-- Users can read shares for their own snippets
CREATE POLICY "Snippet owners can read shares"
  ON public.snippet_shares
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_shares.snippet_id
      AND snippets.user_id = auth.uid()
    )
  );

-- Users can read shares where they are the recipient
CREATE POLICY "Users can read their received shares"
  ON public.snippet_shares
  FOR SELECT
  USING (shared_with_user_id = auth.uid());

-- Snippet owners can create shares
CREATE POLICY "Snippet owners can create shares"
  ON public.snippet_shares
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_shares.snippet_id
      AND snippets.user_id = auth.uid()
    )
  );

-- Snippet owners can delete shares
CREATE POLICY "Snippet owners can delete shares"
  ON public.snippet_shares
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.snippets
      WHERE snippets.id = snippet_shares.snippet_id
      AND snippets.user_id = auth.uid()
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;
