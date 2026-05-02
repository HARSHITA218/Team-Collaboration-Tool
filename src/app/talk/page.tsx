export default function TalkPage() {
  const messages = [
    { id: 1, user: 'John Doe', text: 'Hey team, did you see the new designs?', time: '10:30 AM' },
    { id: 2, user: 'Sarah Smith', text: 'Yes! They look amazing. Loving the glassmorphism.', time: '10:32 AM' },
    { id: 3, user: 'Alex Johnson', text: 'I will start implementing the Talk module today.', time: '10:45 AM' },
  ];

  return (
    <main className="animate-fade-in" style={{ padding: '40px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Talk (Chat + Calls)</h1>
          <p style={{ color: '#9ca3af' }}>General Team Channel</p>
        </div>
        <button className="btn btn-primary">📹 Join Call</button>
      </div>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', marginBottom: '24px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {msg.user[0]}
            </div>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ fontWeight: '600' }}>{msg.user}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{msg.time}</span>
              </div>
              <p style={{ color: '#d1d5db', marginTop: '4px' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '15px' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
        />
      </div>
    </main>
  );
}
