'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Reuse the ChatMessage interface (or import if moved to a types file)
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionCard?: React.ReactNode; // For action cards
}

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div 
      className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Bot Avatar (only show if sender is bot) */}
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 mt-1 flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Regular Message */}
        {!message.actionCard && (
          <div
            className={isUser ? 'message-bubble-user' : 'message-bubble-bot'}
          >
            <p className="text-sm whitespace-pre-wrap p-3">{message.text}</p>
          </div>
        )}
        
        {/* Action Card (if present) */}
        {message.actionCard && (
          <div className="glass-panel p-1 animate-fade-in-up">
            {message.actionCard}
          </div>
        )}
        
        {/* Timestamp */}
        <span
          className={`text-xs mt-1 ${isUser ? 'text-white/60 mr-1' : 'text-white/60 ml-1'}`}
        >
          {message.timestamp}
        </span>
      </div>

      {/* User Avatar (only show if sender is user) */}
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex-shrink-0 mt-1 flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-bold">AC</span>
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
