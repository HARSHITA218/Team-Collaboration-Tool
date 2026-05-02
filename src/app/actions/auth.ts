'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createToken, hashPassword, verifyPassword } from '@/lib/auth-helpers'
import { supabase } from '@/lib/supabase'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password || !name) throw new Error('All fields are required')

  // Check if user already exists
  const { data: existing } = await supabase.from('User').select('id').eq('email', email).single()
  if (existing) throw new Error('User already exists with this email')

  // Create user in Supabase
  const { error } = await supabase.from('User').insert({
    email,
    name,
    password: hashPassword(password),
  })
  if (error) throw new Error(error.message)

  // Fetch the created user to get the ID
  const { data: user } = await supabase.from('User').select('id, email, name').eq('email', email).single()

  const token = createToken({ id: user!.id, email: user!.email, name: user!.name || '' })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  })

  redirect('/dashboard')
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) throw new Error('Email and password are required')

  const { data: user } = await supabase.from('User').select('id, email, name, password').eq('email', email).single()
  if (!user) throw new Error('Invalid email or password')

  const valid = verifyPassword(password, user.password)
  if (!valid) throw new Error('Invalid email or password')

  const token = createToken({ id: user.id, email: user.email, name: user.name || '' })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  })

  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}
