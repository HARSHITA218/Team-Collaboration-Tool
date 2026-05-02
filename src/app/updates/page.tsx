export default function UpdatesPage() {
  const notifications = [
    { id: 1, type: 'task', text: 'Alex Johnson moved "Database Setup" to Done', time: '12 minutes ago' },
    { id: 2, type: 'file', text: 'Sarah Smith uploaded "Branding_Guide.pdf"', time: '1 hour ago' },
    { id: 3, type: 'chat', text: '3 new messages in #general channel', time: '2 hours ago' },
    { id: 4, type: 'system', text: 'Your password was successfully updated', time: '5 hours ago' },
  ];

  return (
    <main className="animate-fade-in" style={{ padding: '40px' }}>
      <div className="glass-panel" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Stay Updated</h1>
        <p style={{ color: '#9ca3af' }}>Latest Activity Notifications</p>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {notifications.map((note, index) => (
          <div key={note.id} style={{ 
            padding: '20px', 
            borderBottom: index === notifications.length - 1 ? 'none' : '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
              <p style={{ color: '#d1d5db' }}>{note.text}</p>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{note.time}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
