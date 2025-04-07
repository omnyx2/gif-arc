import React from 'react';
import { Link } from 'react-router-dom';

// require.context를 사용해 src/recodes 폴더의 모든 JSON 파일을 가져옴
const requireRecodes = require.context('../recodes', false, /\.json$/);
const fileNames: string[] = requireRecodes.keys().map((key: string) => key.replace('./', ''));

const RecordList: React.FC = () => {
  return (
    <div className="record-list">
      <h1>데이터 리스트</h1>
      <ul>
        {fileNames.map((file, index) => (
          <li key={index}>
            <Link to={`/record/${file}`}>{file}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
