import { uploadFile } from '../actions/work';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
export default function WorkPage() {
  const files = [
    { name: 'Product_Requirements.docx', size: '2.4 MB', updated: '2 hours ago' },
    { name: 'Design_System_v1.fig', size: '15.8 MB', updated: 'Yesterday' },
    { name: 'Quarterly_Report.pdf', size: '1.1 MB', updated: '3 days ago' },
  ];

  return (
    <main className="animate-fade-in" style={{ padding: '40px' }}>
      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #fff, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work Together</h1>
          <p style={{ color: '#9ca3af' }}>Shared Files & Assets (Powered by Google Cloud Storage)</p>
        </div>
        <form action={uploadFile} style={{ display: 'flex', gap: '10px' }}>
          <input type="file" name="file" required style={{ color: 'white' }} />
          <Button type="submit" variant="accent">Upload File</Button>
        </form>
      </Card>

      <div className="grid-dashboard">
        {files.map(file => (
          <Card key={file.name} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '2.5rem' }}>📄</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{file.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{file.size} • Updated {file.updated}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <Button variant="ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Edit</Button>
              <Button variant="ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Download</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
