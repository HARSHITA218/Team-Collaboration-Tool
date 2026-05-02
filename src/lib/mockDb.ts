export type Task = { id: string; title: string; description: string; status: string; createdAt: Date };

// Use a global variable to persist data across Next.js API reloads in development
const globalForMock = global as unknown as { tasks: Task[] }

export const mockTasks: Task[] = globalForMock.tasks || [
  { id: '1', title: 'Design Landing Page', description: 'Create a premium UI using CSS gradients', status: 'DONE', createdAt: new Date() },
  { id: '2', title: 'Implement Authentication', description: 'Set up JWT based auth', status: 'TODO', createdAt: new Date() },
]

if (process.env.NODE_ENV !== 'production') globalForMock.tasks = mockTasks
