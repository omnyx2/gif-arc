'use client'
import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  role: string;
  content: string;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch('/chatData.json')
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
      .catch((error) => console.error('Error fetching chat data:', error));
  }, []);

  return (
    <div className="chat-room">
      { messages.map((message, index) => {
    
          return (
            <ChatMessage key={index} message={message} />
          )} )}

    </div>
  );
};

export default ChatRoom;
