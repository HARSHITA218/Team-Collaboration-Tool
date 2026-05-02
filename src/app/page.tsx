import Link from 'next/link';

export default function Home() {
  return (
    <main className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 50%)', zIndex: -1 }}></div>

      <div className="glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1' }}>
          Coordinate your team in SyncSpace.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '2.5rem' }}>
          The fastest way to manage tasks, collaborate securely, and ship products. Built for high-performance teams.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/dashboard" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>
            Enter Workspace
          </Link>
          <a href="https://github.com" target="_blank" className="btn" style={{ padding: '14px 28px', fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            View Documentation
          </a>
        </div>
      </div>

    </main>
  );
}
