import "./globals.css";
import Link from "next/link";

const Sidebar = () => (
  <nav style={{ 
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
    <div style={{ marginBottom: '40px', padding: '0 10px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SyncSpace</h2>
    </div>
    
    <Link href="/dashboard" className="sidebar-link">📊 Dashboard</Link>
    <Link href="/talk" className="sidebar-link">💬 Talk</Link>
    <Link href="/work" className="sidebar-link">📁 Work</Link>
    <Link href="/dashboard" className="sidebar-link">📅 Organize</Link>
    <Link href="/updates" className="sidebar-link">🔔 Updates</Link>
    
    <div style={{ marginTop: 'auto', padding: '10px' }}>
      <Link href="/login" style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Logout</Link>
    </div>
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
