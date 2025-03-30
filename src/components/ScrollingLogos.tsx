'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define logo data
const logos = [
  { name: 'tldv', src: '/logos/tldv.svg', width: 80 },
  { name: 'PhotoShelter', src: '/logos/photoshelter.svg', width: 120 },
  { name: 'copy.ai', src: '/logos/copyai.svg', width: 100 },
  { name: 'Flatfile', src: '/logos/flatfile.svg', width: 110 },
  { name: 'AI21labs', src: '/logos/ai21labs.svg', width: 100 },
  { name: 'iPhone', src: '/logos/iphone.svg', width: 90 },
  { name: 'sinch', src: '/logos/sinch.svg', width: 85 },
  { name: 'mitto', src: '/logos/mitto.svg', width: 95 },
  { name: 'thinkific', src: '/logos/thinkific.svg', width: 120 },
  { name: 'sosafe', src: '/logos/sosafe.svg', width: 100 },
];

// Duplicate logos for seamless scrolling
const duplicatedLogos = [...logos, ...logos];

export default function ScrollingLogos() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // First row scrolls left to right
    const firstRowAnimation = () => {
      if (firstRowRef.current) {
        if (firstRowRef.current.scrollLeft >= firstRowRef.current.scrollWidth / 2) {
          firstRowRef.current.scrollLeft = 0;
        } else {
          firstRowRef.current.scrollLeft += 1;
        }
      }
      requestAnimationFrame(firstRowAnimation);
    };

    // Second row scrolls right to left
    const secondRowAnimation = () => {
      if (secondRowRef.current) {
        if (secondRowRef.current.scrollLeft <= 0) {
          secondRowRef.current.scrollLeft = secondRowRef.current.scrollWidth / 2;
        } else {
          secondRowRef.current.scrollLeft -= 1;
        }
      }
      requestAnimationFrame(secondRowAnimation);
    };

    const firstRowAnimationId = requestAnimationFrame(firstRowAnimation);
    const secondRowAnimationId = requestAnimationFrame(secondRowAnimation);

    return () => {
      cancelAnimationFrame(firstRowAnimationId);
      cancelAnimationFrame(secondRowAnimationId);
    };
  }, []);

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

      {/* First row - scrolls left to right */}
      <div 
        ref={firstRowRef} 
        className="flex overflow-x-hidden whitespace-nowrap mb-6"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={`logo1-${index}`} 
            className="flex items-center justify-center mx-8 min-w-[120px] opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-full h-8 relative flex items-center justify-center">
              {logo.name}
            </div>
          </div>
        ))}
      </div>

      {/* Second row - scrolls right to left */}
      <div 
        ref={secondRowRef} 
        className="flex overflow-x-hidden whitespace-nowrap"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedLogos.slice().reverse().map((logo, index) => (
          <div 
            key={`logo2-${index}`} 
            className="flex items-center justify-center mx-8 min-w-[120px] opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-full h-8 relative flex items-center justify-center">
              {logo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
