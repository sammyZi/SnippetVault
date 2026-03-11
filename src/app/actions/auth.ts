'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const displayName = formData.get('displayName') as string

  // Validate required fields
  if (!email || !password || !username) {
    return { error: 'Email, password, and username are required' }
  }

  // Validate username format
  if (username.length < 3 || username.length > 30) {
    return { error: 'Username must be between 3 and 30 characters' }
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { error: 'Username can only contain letters, numbers, hyphens, and underscores' }
  }

  // Check if username is already taken
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .single()

  if (existingProfile) {
    return { error: 'Username is already taken' }
  }

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name: displayName || email.split('@')[0],
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Check if email confirmation is required
  if (data.user && !data.session) {
    return { success: true, requiresEmailConfirmation: true }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return null
  }

  return data
}
