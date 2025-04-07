// app/record/[filename]/page.tsx
import fs from 'fs';
import path from 'path';
import ChatMessage from '../../../components/ChatMessage';
import { ResponseMessage } from '../../../components/ChatMessage'
interface RecordData {
  uuid: string;
  created: string;
  description: string;
  response: ResponseMessage[];
}

/* ResponseMessage 타입은 ChatMessage.tsx에 정의되어 있습니다.
   (아래에서 ChatMessage.tsx 코드를 참고하세요.)
*/

export default async function RecordPage({ params }: { params: Promise<{filename: string }>}) {
  const { filename }: {filename: string } = await params;
  const filePath = path.join(process.cwd(), 'public', 'recodes', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const recordData: RecordData = JSON.parse(fileContent);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Record Detail</h1>
      <h2>{recordData.uuid}</h2>
      <p>{recordData.description}</p>
      <small>Created at: {recordData.created}</small>
      <div style={{ marginTop: '20px' }}>
        {recordData.response.map((msg, index) => {
          if(index == 8) return <div key={index} /> 
          return <ChatMessage key={index} message={msg} />
        })}
      </div>
    </div>
  );
}
