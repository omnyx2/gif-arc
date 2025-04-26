import { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import React from 'react';

interface RecordListProps {
  files: string[];
}

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/">
            <a className="text-blue-500 hover:underline">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/records">
            <a className="text-blue-500 hover:underline">Records</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="text-blue-500 hover:underline">About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const RecordList: React.FC<RecordListProps> = ({ files }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">데이터 리스트</h1>
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file}>
              <Link href={`/record/${file}`}>
                <a className="text-blue-500 hover:underline">{file}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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