'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <FaSun className="text-[#A855F7]" /> : <FaMoon className="text-[#A855F7]" />}
    </button>
  );
}
