-- Fix ambiguous column reference in is_snippet_owner and can_access_snippet functions
-- The parameter names were conflicting with column names

-- Drop policies first before dropping functions they depend on
DROP POLICY IF EXISTS "Users can read accessible snippet_tags" ON public.snippet_tags;
DROP POLICY IF EXISTS "Users can insert tags for own snippets" ON public.snippet_tags;
DROP POLICY IF EXISTS "Users can delete tags from own snippets" ON public.snippet_tags;
DROP POLICY IF EXISTS "Snippet owners can read shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Users can read their received shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Snippet owners can create shares" ON public.snippet_shares;
DROP POLICY IF EXISTS "Snippet owners can delete shares" ON public.snippet_shares;

-- Now drop and recreate the functions with clearer parameter names
DROP FUNCTION IF EXISTS public.is_snippet_owner(UUID, UUID);

CREATE OR REPLACE FUNCTION public.is_snippet_owner(p_snippet_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.snippets
    WHERE snippets.id = p_snippet_id 
    AND snippets.user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

DROP FUNCTION IF EXISTS public.can_access_snippet(UUID, UUID);

CREATE OR REPLACE FUNCTION public.can_access_snippet(p_snippet_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.snippets
    WHERE snippets.id = p_snippet_id 
    AND (
      snippets.user_id = p_user_id
      OR snippets.is_public = true
      OR EXISTS (
        SELECT 1 FROM public.snippet_shares
        WHERE snippet_shares.snippet_id = snippets.id
        AND snippet_shares.shared_with_user_id = p_user_id
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recreate snippet_tags policies
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

-- Recreate snippet_shares policies
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

COMMENT ON FUNCTION public.is_snippet_owner IS 'Checks if a user owns a snippet (fixed ambiguous column reference)';
COMMENT ON FUNCTION public.can_access_snippet IS 'Checks if a user can access a snippet (fixed ambiguous column reference)';
