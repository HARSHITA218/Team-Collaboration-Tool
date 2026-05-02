import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

const Sidebar = () => (
  <nav aria-label="Main Navigation" role="navigation" style={{ 
    width: '260px', 
    height: '100vh', 
    background: 'rgba(15, 17, 21, 0.8)', 
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid var(--border-color)',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'fixed',
    left: 0,
    top: 0
  }}>
    <header style={{ marginBottom: '40px', padding: '0 10px' }}>
      <h2 aria-label="SyncSpace Logo" style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SyncSpace</h2>
    </header>
    
    <Link href="/dashboard" className="sidebar-link" aria-label="Go to Dashboard" tabIndex={0}>📊 Dashboard</Link>
    <Link href="/talk" className="sidebar-link" aria-label="Go to Talk Module" tabIndex={0}>💬 Talk</Link>
    <Link href="/work" className="sidebar-link" aria-label="Go to Work Module" tabIndex={0}>📁 Work</Link>
    <Link href="/dashboard" className="sidebar-link" aria-label="Go to Organize Module" tabIndex={0}>📅 Organize</Link>
    <Link href="/updates" className="sidebar-link" aria-label="Go to Updates" tabIndex={0}>🔔 Updates</Link>
    
    <footer style={{ marginTop: 'auto', padding: '10px' }}>
      <Link href="/login" aria-label="Logout of application" style={{ fontSize: '0.9rem', color: '#9ca3af' }} tabIndex={0}>Logout</Link>
    </footer>
  </nav>
);

export const metadata: Metadata = {
  title: "SyncSpace | Team Coordination Platform",
  description: "A fast, accessible platform for managing team tasks and workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body style={{ 
        display: 'flex', 
        background: 'var(--background)', 
        color: 'var(--foreground)',
        minHeight: '100vh' 
      }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '260px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
