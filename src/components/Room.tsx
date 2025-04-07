'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
interface RoomProps {
  data: { uuid: string, created: string, description: string}
}

const Room: React.FC<RoomProps> = ({ data }) => {
  const { uuid, created, description }: { uuid: string, created: string, description: string} = data;
  return (
    <div className="p-6 border rounded shadow bg-white space-y-2">
      <div className="text-sm text-gray-500">Created: {created}</div>
      <div className="text-xs text-gray-400">UUID: {uuid}</div>
      <div className="text-base">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Room;
