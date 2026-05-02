import Link from 'next/link';
import { signup } from '../actions/auth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
      <Card style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <header>
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
        </header>

        <form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <Input 
            label="Full Name"
            name="name"
            type="text" 
            placeholder="John Doe"
            required
          />

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

          <Button type="submit" variant="accent" style={{ marginTop: '1rem', padding: '14px', background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
            Create Account
          </Button>
        </form>

        <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af' }}>
          <p>Already have an account? <Link href="/login" style={{ color: '#a855f7', fontWeight: '600' }}>Log in</Link></p>
        </footer>
      </Card>
    </main>
  );
}
