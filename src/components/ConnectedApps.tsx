'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiGmail, SiSlack, SiGooglecalendar, SiNotion, SiAsana, SiTrello, SiShopify, SiStripe, SiMailchimp, SiQuickbooks, SiFacebook, SiGoogle, SiSalesforce, SiHubspot, SiZendesk } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

// Function to get color for each logo
const getLogoColor = (name: string) => {
  const colorMap: {[key: string]: string} = {
    'Gmail': '#EA4335',
    'Outlook': '#0078D4',
    'Slack': '#4A154B',
    'Google Calendar': '#4285F4',
    'Notion': '#FFFFFF',
    'Asana': '#FC636B',
    'Trello': '#0079BF',
    'Shopify': '#96BF48',
    'Stripe': '#635BFF',
    'Klaviyo': '#25B9EF',
    'QuickBooks': '#2CA01C',
    'Facebook Ads': '#1877F2',
    'Google Ads': '#4285F4',
    'Salesforce': '#00A1E0',
    'HubSpot': '#FF7A59',
  };
  
  return colorMap[name] || '#FFFFFF';
};

const apps = [
  { icon: SiGmail, name: 'Gmail' },
  { icon: FaMicrosoft, name: 'Outlook' },
  { icon: SiSlack, name: 'Slack' },
  { icon: SiGooglecalendar, name: 'Google Calendar' },
  { icon: SiNotion, name: 'Notion' },
  { icon: SiAsana, name: 'Asana' },
  { icon: SiTrello, name: 'Trello' },
  { icon: SiShopify, name: 'Shopify' },
  { icon: SiStripe, name: 'Stripe' },
  { icon: SiMailchimp, name: 'Klaviyo' },
  { icon: SiQuickbooks, name: 'QuickBooks' },
  { icon: SiFacebook, name: 'Facebook Ads' },
  { icon: SiGoogle, name: 'Google Ads' },
  { icon: SiSalesforce, name: 'Salesforce' },
  { icon: SiHubspot, name: 'HubSpot' },
];

// Duplicate the apps to create a seamless scrolling effect
const scrollingApps = [...apps, ...apps];

const ConnectedApps = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    
    let animationId: number;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Very slow scrolling - adjust the division factor to control speed
      const scrollAmount = (elapsed / 100) % scroll.scrollWidth;
      scroll.scrollLeft = scrollAmount;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full relative py-6"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-medium mb-6 text-white/80">
          Connected to the tools you already use
        </h2>
        
        <div 
          ref={scrollRef}
          className="overflow-hidden relative"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex space-x-12 py-6 px-4 min-w-max">
            {scrollingApps.map((app, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <app.icon 
                    className="w-10 h-10" 
                    style={{ color: getLogoColor(app.name) }} 
                  />
                </div>
                <span className="text-xs text-white/70 mt-2">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-4 text-white/70 text-sm font-medium">
          100+ integrations. One assistant.
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectedApps;
