'use server'

import { mockTasks } from '@/lib/mockDb'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title) {
    throw new Error('Title is required')
  }

  mockTasks.unshift({
    id: Math.random().toString(36).substring(7),
    title,
    description,
    status: 'TODO',
    createdAt: new Date()
  })

  revalidatePath('/dashboard')
}

export async function updateTaskStatus(taskId: string, status: string) {
  const task = mockTasks.find(t => t.id === taskId)
  if (task) {
    task.status = status
  }
  revalidatePath('/dashboard')
}
