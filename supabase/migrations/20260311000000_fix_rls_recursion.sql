-- Fix infinite recursion in RLS policies
-- This migration fixes the circular dependency between snippets, snippet_tags, and snippet_shares

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read accessible snippet_tags" ON public.snippet_tags;
DROP POLICY IF EXISTS "Users can insert tags for own snippets" ON public.snippet_tags;
DROP POLICY IF EXISTS "Users can delete tags from own snippets" ON public.snippet_tags;
DROP POLICY IF EXISTS "Snippet owners can read shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Users can read their received shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Snippet owners can create shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Snippet owners can delete shares" ON public.snippet_shares;

-- Create security definer functions to break the recursion
CREATE OR REPLACE FUNCTION public.is_snippet_owner(snippet_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.snippets
    WHERE id = snippet_id AND snippets.user_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.can_access_snippet(snippet_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.snippets
    WHERE id = snippet_id 
    AND (
      snippets.user_id = user_id
      OR snippets.is_public = true
      OR EXISTS (
        SELECT 1 FROM public.snippet_shares
        WHERE snippet_shares.snippet_id = snippets.id
        AND snippet_shares.shared_with_user_id = user_id
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recreate snippet_tags policies using security definer functions
CREATE POLICY "Users can read accessible snippet_tags"
  ON public.snippet_tags
  FOR SELECT
  USING (public.can_access_snippet(snippet_id, auth.uid()));

CREATE POLICY "Users can insert tags for own snippets"
  ON public.snippet_tags
  FOR INSERT
  WITH CHECK (public.is_snippet_owner(snippet_id, auth.uid()));

CREATE POLICY "Users can delete tags from own snippets"
  ON public.snippet_tags
  FOR DELETE
  USING (public.is_snippet_owner(snippet_id, auth.uid()));

-- Recreate snippet_shares policies using security definer functions
CREATE POLICY "Snippet owners can read shares"
  ON public.snippet_shares
  FOR SELECT
  USING (public.is_snippet_owner(snippet_id, auth.uid()));

CREATE POLICY "Users can read their received shares"
  ON public.snippet_shares
  FOR SELECT
  USING (shared_with_user_id = auth.uid());

CREATE POLICY "Snippet owners can create shares"
  ON public.snippet_shares
  FOR INSERT
  WITH CHECK (public.is_snippet_owner(snippet_id, auth.uid()));

CREATE POLICY "Snippet owners can delete shares"
  ON public.snippet_shares
  FOR DELETE
  USING (public.is_snippet_owner(snippet_id, auth.uid()));
