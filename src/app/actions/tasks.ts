'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const authorId = formData.get('authorId') as string || "dummy-user-id" // Mock auth for now

  if (!title) {
    throw new Error('Title is required')
  }

  // Ensure mock user exists for testing purposes
  let user = await prisma.user.findUnique({ where: { id: "dummy-user-id" } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: "dummy-user-id",
        email: "test@example.com",
        password: "hashed-mock-password",
        name: "Test User"
      }
    })
  }

  await prisma.task.create({
    data: {
      title,
      description,
      authorId: user.id
    }
  })

  revalidatePath('/dashboard')
}

export async function updateTaskStatus(taskId: string, status: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status }
  })
  revalidatePath('/dashboard')
}
