'use client'
// components/ChatMessage.tsx
import React from 'react';
import './ChatMessage.css';
import Image from 'next/image'
interface TextPart {
  type: 'text';
  text: string;
}
interface SubIMagePart {
  url: string;
}
interface ImagePart {
  type: 'image_url';
  image_url: SubIMagePart;
}

export type MessageContent = string | (TextPart | ImagePart)[];

export interface ResponseMessage {
  role: string;
  content: MessageContent;
}

interface ChatMessageProps {
  message: ResponseMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }: { message: ResponseMessage }) => {
  const { role, content }: ResponseMessage = message;
  let className = 'chat-message';
  if (role === 'user') {
    className += ' user';
  } else if (role === 'assistant') {
    className += ' assistant';
  } else if (role === 'system') {
    className += ' system';
  }
  const renderContent = () => {
    if (typeof content === 'string') {
      // 줄바꿈(\n)을 기준으로 분리 후 각 줄을 <p>로 감싸기
      return content.split('\n').map((line, index) => <p key={index}>{line}</p>);
    } else if (Array.isArray(content)) {
      return content.map((part, index) => {
        if (part.type === 'text') {
          // 텍스트 파트에서도 줄바꿈을 처리
          return part.text.split('\n').map((line, idx) => (
            <p key={`${index}-${idx}`}>{line}</p>
          ));
        } else if (part.type === 'image_url') {
          return (
            <Image  
              key={index}
              src={part.image_url.url}
              width={200}
              height={200}
              alt="Image content"
              className="message-image"
            />
          );
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div className={className}>
      <strong>{role}:</strong>
      {renderContent()}
    </div>
  );
};

export default ChatMessage;
