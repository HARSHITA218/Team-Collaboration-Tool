import Link from 'next/link';
import { signup } from '../actions/auth';

export default function SignupPage() {
  return (
    <main className="animate-fade-in" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      padding: '20px',
      background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent)'
    }}>
      <div className="glass-panel" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '800', 
          marginBottom: '0.5rem', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Join SyncSpace
        </h1>
        <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>
          Create an account to start collaborating
        </p>

        <form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Full Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="John Doe"
              required
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'rgba(0,0,0,0.3)', 
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="name@company.com"
              required
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'rgba(0,0,0,0.3)', 
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••"
              required
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'rgba(0,0,0,0.3)', 
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '14px', background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
            Create Account
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
          Already have an account? <Link href="/login" style={{ color: '#a855f7', fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </main>
  );
}
