'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const GradientText: React.FC<GradientTextProps> = ({ text, className = '', delay = 0.1 }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  // Add a subtle hover effect to each word
  const hoverEffect = {
    scale: 1.05,
    textShadow: "0 0 8px rgba(168, 85, 247, 0.6)",
    transition: { duration: 0.3 }
  };
  
  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#8B5CF6]"
          variants={child}
          whileHover={hoverEffect}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default GradientText;
