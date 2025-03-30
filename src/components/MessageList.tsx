'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

// Updated ChatMessage interface with action cards
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionCard?: React.ReactNode;
}

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array ensures this runs when messages change

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {/* Dummy div to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
