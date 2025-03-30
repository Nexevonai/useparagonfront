'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShopify, FaJira, FaSlack, FaEnvelope, FaCalendarAlt, FaChartLine, FaTasks, FaLightbulb, FaClock, FaRocket } from 'react-icons/fa';
import { SiGmail, SiGooglecalendar, SiQuickbooks } from 'react-icons/si';

const integrationIcons = [
  { Icon: FaShopify, name: 'Shopify' },
  { Icon: SiGmail, name: 'Gmail' },
  { Icon: FaJira, name: 'Jira' },
  { Icon: FaSlack, name: 'Slack' },
  { Icon: SiGooglecalendar, name: 'Calendar' },
  { Icon: SiQuickbooks, name: 'Quickbooks' },
];

const demoMessages = [
  { sender: 'user', text: 'What were the top selling products on Shopify last week?' },
  { sender: 'bot', text: "Your top sellers were the 'Astro Tee' and 'Quantum Hoodie'. Sales up 15%!" },
  { sender: 'user', text: 'Create a Jira ticket for the design team about the new landing page visuals.' },
  { sender: 'bot', text: "Done! Ticket 'DES-123' created and assigned." },
];

const InteractiveDemoVisual: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<typeof demoMessages>([]);

  useEffect(() => {
    setVisibleMessages([]); // Reset on initial mount or if dependencies change
    setCurrentMessageIndex(0);

    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex > demoMessages.length) {
          // Reset animation after a pause
          setTimeout(() => {
            setVisibleMessages([]);
            setCurrentMessageIndex(0);
          }, 2500); // Pause before restarting
          return demoMessages.length; // Stay at the end temporarily
        } else {
          setVisibleMessages(demoMessages.slice(0, nextIndex));
        }
        return nextIndex;
      });
    }, 2000); // Time between messages appearing

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Integration Icons - Positioned around the chat */}
      <motion.div className="absolute inset-0 flex items-center justify-center">
        {integrationIcons.map((item, index) => {
          const angle = (index / integrationIcons.length) * 2 * Math.PI; // Distribute icons in a circle
          const radius = 180; // Adjust radius as needed
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={item.name}
              className="absolute p-3 bg-white/10 rounded-full border border-white/20 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 100 }}
              style={{ 
                transform: `translate(${x}px, ${y}px)` // Position icons using transform
              }}
            >
              <item.Icon className="text-white/80 text-2xl" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Simulated Chat Window */}
      <motion.div 
        className="relative z-10 w-full max-w-md h-72 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-4 overflow-hidden flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex-grow space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, index) => (
              <motion.div
                key={index} // Using index as key is okay here as the list order is stable for the animation cycle
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                layout // Animate layout changes
              >
                <div 
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-white/90 rounded-bl-none'}`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Optional Input Area Style */}
        <div className="mt-3 h-8 bg-gray-800/50 rounded flex items-center px-2">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-white/50">AI Assistant connected...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDemoVisual;
