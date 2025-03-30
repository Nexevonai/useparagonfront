'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGmail, SiGooglecalendar, SiShopify, SiSlack } from 'react-icons/si';
import { FaCalendarAlt, FaEnvelope, FaChartLine, FaRobot } from 'react-icons/fa';

// Define message structure
interface Message {
  id: string; // Use string for cycle-based key
  sender: 'user' | 'bot';
  text: string;
  icon?: React.ElementType; // Optional icon for bot messages
  source?: string; // Source application
  color?: string; // Icon color
}

// Example messages simulating a cross-app interaction
const demoMessagesData = [
  {
    sender: 'user' as const,
    text: "What's on my schedule today and are there any urgent emails?",
  },
  {
    sender: 'bot' as const,
    text: 'You have a Client Sync at 10 AM and Team Stand-up at 11:30 AM.',
    icon: FaCalendarAlt,
    source: 'Google Calendar',
    color: '#A855F7',
  },
  {
    sender: 'bot' as const,
    text: 'You have 3 unread emails. One from Sarah about the Q3 report needs your attention.',
    icon: FaEnvelope,
    source: 'Gmail',
    color: '#8B5CF6',
  },
  {
    sender: 'user' as const,
    text: "Summarize the Q3 report email and draft a response saying I'll review it this afternoon.",
  },
  {
    sender: 'bot' as const,
    text: 'Email summarized: Sarah needs your feedback on the Q3 marketing numbers by EOD. Draft response created and ready to send.',
    icon: FaEnvelope,
    source: 'Gmail',
    color: '#8B5CF6',
  },
  {
    sender: 'user' as const,
    text: 'Send it and remind me at 2pm to review the report.',
  },
  {
    sender: 'bot' as const,
    text: 'Email sent to Sarah. Reminder set for 2:00 PM to review the Q3 report.',
    icon: FaChartLine,
    source: 'Slack',
    color: '#A855F7',
  },
];

const HeroChatVisual: React.FC = () => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [cycle, setCycle] = useState(0); // Track animation cycles
  const messageCounterRef = useRef(0); // Counter for truly unique keys across cycles
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    // We'll use the raw data and add unique ID when pushing to state
    const currentCycleMessagesData = demoMessagesData;

    const interval = setInterval(() => {
      if (messageIndex < currentCycleMessagesData.length) {
        // Add messages one by one for the current cycle
        const newMessage = {
          ...currentCycleMessagesData[messageIndex],
          // Generate a key that's guaranteed unique across restarts
          id: `msg-${messageCounterRef.current++}` 
        };
        setVisibleMessages((prev) => [...prev, newMessage]);
        messageIndex++;
      } else {
        clearInterval(interval); // Stop adding messages for this cycle
        // Wait before starting the next cycle
        setTimeout(() => {
          setVisibleMessages([]); // Clear messages *before* triggering the next cycle
          setCycle(c => c + 1); // Increment cycle count to trigger useEffect rerun
        }, 4000); // Pause before reset
      }
    }, 1800); // Adjust timing as needed

    return () => clearInterval(interval);
  }, [cycle]); // Re-run the effect whenever the cycle changes
  
  // Add a glow effect to the chat window periodically
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 5000);
    
    return () => clearInterval(glowInterval);
  }, []);

  const messageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full max-w-3xl mx-auto bg-[#111111] backdrop-blur-lg rounded-xl border-[1.5px] ${isGlowing ? 'border-[#A855F7]/50' : 'border-[#222222] border-t-white/10 border-l-white/10 border-r-transparent border-b-transparent'} overflow-hidden transition-all duration-500 ${isGlowing ? 'shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'shadow-[0_10px_40px_rgba(0,0,0,0.3)]'} after:content-[''] after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-white/5 after:to-transparent after:pointer-events-none`}
      style={{ minWidth: '500px' }}
    >
      {/* Header/Toolbar simulation */}
      <div className="bg-[#0A0A0A] px-4 py-3 border-b border-white/10 flex items-center justify-between relative z-10 bg-gradient-to-r from-[#0A0A0A] via-[#111111] to-[#0A0A0A]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#A855F7] animate-pulse"></div>
          <span className="text-white font-medium">Nexevon AI</span>
        </div>
        <div className="flex space-x-3">
          <div className="text-white/50 text-xs">Connected to 5 tools</div>
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="h-96 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent bg-[#111111]" style={{ minWidth: '500px', width: '100%' }}>
        <AnimatePresence initial={false}>
          {visibleMessages.map((msg) => { // Remove index from map args if not needed elsewhere
            // Add safety check to prevent crash if msg is unexpectedly undefined during transition
            if (!msg) return null; 

            return (
              <motion.div
                key={msg.id} // Use unique message ID as key
                className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] px-4 py-3 rounded-lg text-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)] bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] text-white rounded-br-none relative after:content-[''] after:absolute after:inset-0 after:rounded-lg after:rounded-br-none after:bg-gradient-to-br after:from-white/10 after:to-transparent after:pointer-events-none">
                    {msg.text}
                  </div>
                ) : (
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    {/* Bot Icon */}
                    {msg.icon && (
                      <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-md flex items-center justify-center" style={{ backgroundColor: `${msg.color || '#A855F7'}20` }}>
                        <msg.icon className="text-sm" style={{ color: msg.color || '#A855F7' }} />
                      </div>
                    )}
                    {/* Message Bubble */}
                    <div className="bg-[#0A0A0A] border-[1.5px] border-[#222222] border-t-white/10 border-l-white/10 border-r-transparent border-b-transparent px-4 py-3 rounded-lg text-sm shadow-[0_4px_15px_rgba(0,0,0,0.2)] text-white/90 rounded-bl-none flex-1 relative after:content-[''] after:absolute after:inset-0 after:rounded-lg after:rounded-bl-none after:bg-gradient-to-br after:from-white/5 after:to-transparent after:pointer-events-none">
                      {msg.source && (
                        <div className="text-xs text-white/50 mb-1">{msg.source}</div>
                      )}
                      {msg.text}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Area simulation */}
      <div className="bg-black/60 px-4 py-4 border-t border-white/10">
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-3">
          <input 
            type="text" 
            placeholder="Ask Nexevon anything..." 
            className="flex-grow bg-transparent text-sm text-white/80 placeholder-white/40 focus:outline-none"
            readOnly
          />
          <button className="text-[#A855F7] hover:text-[#8B5CF6] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-3">
          <div className="text-xs text-white/40 flex items-center space-x-1">
            <span className="w-1 h-1 bg-[#A855F7] rounded-full inline-block"></span>
            <span>Connected to Gmail, Calendar, Slack, Shopify & more</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroChatVisual;
