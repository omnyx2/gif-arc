'use client'
import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ShowGifComponent from './ShowGifComponent';

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
      
      {messages.length === 0 && <p>Loading...</p>}
      {messages.length > 0 && <p>Loaded {messages.length} messages</p>}
      { <ShowGifComponent inputString={messages[messages.length]?.content} /> }
      { messages.map((message, index) => {
    
          return (
            <ChatMessage key={index} message={message} />
          )} )}

    </div>
  );
};

export default ChatRoom;
