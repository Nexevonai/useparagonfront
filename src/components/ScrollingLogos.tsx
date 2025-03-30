'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define logo data
const logos = [
  { name: 'tl:dv', style: 'font-mono font-bold' },
  { name: 'PhotoShelter', style: 'font-sans' },
  { name: 'copy.ai', style: 'font-mono' },
  { name: 'Flatfile', style: 'font-sans font-medium' },
  { name: 'AI21labs', style: 'font-sans font-bold' },
  { name: 'enPhone', style: 'font-mono' },
  { name: 'sinch', style: 'font-sans' },
  { name: 'mitto', style: 'font-sans italic' },
  { name: 'THINKIFIC', style: 'font-sans tracking-wider' },
  { name: 'sosafe', style: 'font-mono font-medium' },
];

// No need to duplicate logos anymore as we're not scrolling

export default function ScrollingLogos() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  // No scrolling animation needed anymore

  return (
    <div className="w-full py-10 overflow-hidden bg-black" ref={scrollerRef}>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium text-white/60 uppercase tracking-wider"
        >
          Trusted by leading B2B & AI SaaS engineering teams globally
        </motion.div>
      </div>

      {/* Static logo display */}
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 max-w-6xl mx-auto">
        {logos.map((logo, index) => (
          <div 
            key={`logo-${index}`} 
            className="flex items-center justify-center px-6 py-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <div className={`w-full h-8 relative flex items-center justify-center text-white ${logo.style}`}>
              {logo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
