import { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';

interface RecordListProps {
  // 여기서는 fileList.json이 단순한 문자열 배열이라고 가정합니다.
  // 만약 객체 배열이라면 아래와 같이 수정하세요.
  // files: { filename: string; uuid: string; created: string; description: string }[];
  files: string[];
}

const RecordList: React.FC<RecordListProps> = ({ files }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">데이터 리스트</h1>
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file}>
            <Link href={`/record/${file}`}>
              {/* Next.js 13 app 디렉토리에서는 <Link>의 자식으로 <a> 태그 대신 바로 사용하세요 */}
              <a className="text-blue-500 hover:underline">{file}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<RecordListProps> = async () => {
  const filePath = path.join(process.cwd(), 'public', 'recodes', 'fileList.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const files: string[] = JSON.parse(jsonData);

  return {
    props: {
      files,
    },
  };
};

export default RecordList;
