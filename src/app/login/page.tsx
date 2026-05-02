import Link from 'next/link';
import { login } from '../actions/auth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <main className="animate-fade-in" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      padding: '20px',
      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent)'
    }}>
      <Card style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <header>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '800', 
            marginBottom: '0.5rem', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fff, #6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>
            Enter your details to access your workspace
          </p>
        </header>

        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <Input 
            label="Email Address"
            name="email"
            type="email" 
            placeholder="name@company.com"
            required
          />

          <Input 
            label="Password"
            name="password"
            type="password" 
            placeholder="••••••••"
            required
          />

          <Button type="submit" style={{ marginTop: '1rem', padding: '14px' }}>
            Sign In
          </Button>
        </form>

        <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
          <p>Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link></p>
        </footer>
      </Card>
    </main>
  );
}
