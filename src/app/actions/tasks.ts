'use server'

import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { createHmac } from 'crypto'
import { revalidatePath } from 'next/cache'

const SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-dev-only'

async function getCurrentUser(): Promise<{ id: string; email: string; name: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null

  try {
    const [header, body] = token.split('.')
    const expectedSig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url')
    const actualSig = token.split('.')[2]
    if (expectedSig !== actualSig) return null

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.exp < Date.now()) return null

    return { id: payload.id, email: payload.email, name: payload.name }
  } catch {
    return null
  }
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title) throw new Error('Title is required')

  const user = await getCurrentUser()

  if (user) {
    // Real DB insert via Supabase
    const { error } = await supabase.from('Task').insert({
      title,
      description,
      status: 'TODO',
      authorId: user.id,
    })
    if (error) console.error('Supabase error:', error.message)
  } else {
    // Fallback to mock store if not authenticated
    const { mockTasks } = await import('@/lib/mockDb')
    mockTasks.unshift({
      id: Math.random().toString(36).substring(7),
      title,
      description,
      status: 'TODO',
      createdAt: new Date()
    })
  }

  revalidatePath('/dashboard')
}

export async function updateTaskStatus(taskId: string, status: string) {
  const user = await getCurrentUser()

  if (user) {
    await supabase.from('Task').update({ status }).eq('id', taskId).eq('authorId', user.id)
  } else {
    const { mockTasks } = await import('@/lib/mockDb')
    const task = mockTasks.find(t => t.id === taskId)
    if (task) task.status = status
  }

  revalidatePath('/dashboard')
}
