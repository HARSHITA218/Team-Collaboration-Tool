import { createTask, updateTaskStatus } from '../actions/tasks'
import { logout } from '../actions/auth'
import { cookies } from 'next/headers'
import { createHmac } from 'crypto'
import { supabase } from '@/lib/supabase'
import { mockTasks } from '@/lib/mockDb'

const SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-dev-only'

async function getSessionUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null
  try {
    const [header, body] = token.split('.')
    const expectedSig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url')
    if (expectedSig !== token.split('.')[2]) return null
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.exp < Date.now()) return null
    return payload as { id: string; email: string; name: string }
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  const user = await getSessionUser()

  let tasks: { id: string; title: string; description: string; status: string }[] = []

  if (user) {
    const { data } = await supabase
      .from('Task')
      .select('*')
      .eq('authorId', user.id)
      .order('createdAt', { ascending: false })
    tasks = data ?? []
  } else {
    tasks = mockTasks
  }

  return (
    <main className="animate-fade-in" style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome back{user ? `, ${user.name}` : ''}! 👋
          </h1>
          <p style={{ color: '#9ca3af' }}>Here is your team's task overview.</p>
        </div>
        <form action={logout}>
          <button type="submit" className="btn" style={{ background: 'var(--secondary)', color: 'white' }}>Logout</button>
        </form>
      </div>

      <div className="grid-dashboard">
        <div className="glass-panel">
          <h2 style={{ marginBottom: '1rem' }}>Create New Task</h2>
          <form action={createTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }}
            />
            <textarea
              name="description"
              placeholder="Task Description"
              rows={3}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', resize: 'vertical' }}
            />
            <button type="submit" className="btn btn-primary">Create Task</button>
          </form>
        </div>

        <div className="glass-panel" style={{ gridColumn: 'auto / span 2' }}>
          <h2 style={{ marginBottom: '1rem' }}>My Tasks</h2>
          {tasks.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
              <p style={{ color: '#9ca3af' }}>No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tasks.map(task => (
                <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <div>
                    <h3 style={{ textDecoration: task.status === 'DONE' ? 'line-through' : 'none', color: task.status === 'DONE' ? '#9ca3af' : 'white' }}>{task.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '4px' }}>{task.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: task.status === 'TODO' ? 'var(--secondary)' : 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {task.status}
                    </span>
                    {task.status === 'TODO' && (
                      <form action={updateTaskStatus.bind(null, task.id, 'DONE')}>
                        <button type="submit" className="btn" style={{ background: 'var(--accent)', color: 'white', padding: '6px 12px', fontSize: '0.9rem' }}>
                          Mark Done
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
