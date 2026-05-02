export default function WorkPage() {
  const files = [
    { name: 'Product_Requirements.docx', size: '2.4 MB', updated: '2 hours ago' },
    { name: 'Design_System_v1.fig', size: '15.8 MB', updated: 'Yesterday' },
    { name: 'Quarterly_Report.pdf', size: '1.1 MB', updated: '3 days ago' },
  ];

  return (
    <main className="animate-fade-in" style={{ padding: '40px' }}>
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work Together</h1>
          <p style={{ color: '#9ca3af' }}>Shared Files & Assets</p>
        </div>
        <button className="btn" style={{ background: 'var(--accent)', color: 'white' }}>+ Upload File</button>
      </div>

      <div className="grid-dashboard">
        {files.map(file => (
          <div key={file.name} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '2.5rem' }}>📄</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{file.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{file.size} • Updated {file.updated}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
              <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
