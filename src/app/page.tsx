// app/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface RecordItem {
  filename: string;
  uuid: string;
  created: string;
  description: string;
}

export default function RecordListPage() {
  const fileListPath = path.join(process.cwd(), 'public', 'recodes', 'fileList.json');
  const fileListContent = fs.readFileSync(fileListPath, 'utf8');
  const records: RecordItem[] = JSON.parse(fileListContent);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Record List</h1>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 10 }}>
        {records.map((record) => (
          <li key={record.uuid} style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
            <Link href={`/record/${record.filename}`}  style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{fontSize: 20, fontWeight: 600}}>{record.uuid}</h2>
                <p style={{fontSize: 16, fontWeight: 400, fontFamily:'sans-serif'}}>{record.description}</p>
                <small>{record.created}</small>
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
