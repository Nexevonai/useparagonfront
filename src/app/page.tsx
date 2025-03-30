'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaCalendarAlt, FaChartLine, FaTasks, FaLightbulb, FaClock, FaRocket, FaPlay, FaCheck, FaFileAlt, FaUsers, FaPaperclip } from 'react-icons/fa';
import ScrollingLogos from '../components/ScrollingLogos';
import BlurText from '../components/BlurText';
import GradientText from '../components/GradientText';
import ConnectedApps from '../components/ConnectedApps';
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
import HeroChatVisual from '../components/HeroChatVisual'; // Import the new Hero visual

export default function LandingPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 } 
    },
  };
  
  const logoVariants = {
    normal: { opacity: 0.8 },
    hover: { opacity: 1, scale: 1.05 }
  };

  return (
    <motion.div 
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: '#000000', // Solid black background
      }}
    >
      
      {/* Sticky Header Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full px-6 sm:px-10 py-4 flex justify-between items-center fixed top-0 left-0 z-50 bg-gray-950/30 backdrop-blur-sm border-b border-white/10"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="text-xl font-bold">Nexevon</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#use-cases" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Use Cases
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/demo" className="text-sm font-medium bg-[#8B5CF6] hover:bg-[#A855F7] text-white transition-colors px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] ml-4">
            Try the Demo
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 sm:pt-40 pb-0 flex flex-col items-center justify-between min-h-[90vh]"
      >
        {/* Tagline above the main content */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="absolute top-24 left-0 right-0 text-center text-white/70 text-sm tracking-wider"
        >
          Your AI assistant for email, calendar, marketing, eCom, and more.
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 mb-8">
          {/* Left Side: Text Content */}
          <motion.div 
            className="max-w-xl lg:max-w-2xl text-center lg:text-left"
            variants={containerVariants}
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <motion.div 
                className="text-white inline-block"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                AI That Actually{" "}
              </motion.div>
              <motion.div 
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#8B5CF6]"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Gets Work Done
              </motion.div>
            </div>
            <div className="text-xl text-white/80 mb-8 leading-relaxed space-y-4">
              <BlurText 
                text="Talk to your AI assistant. It handles everything."
                delay={50}
                animateBy="words"
                direction="top"
                className="inline"
              />
              <div className="block">
                <BlurText 
                  text="From emails and calendar to Shopify, Klaviyo, and Notion — Nexevon connects to 100+ tools and gets the work done, all from one chat box."
                  delay={70}
                  animateBy="words"
                  direction="top"
                  className="inline text-white/70 text-lg"
                />
              </div>
            </div>
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              <Link href="/demo">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(168,85,247,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-[#A855F7] hover:bg-[#8B5CF6] text-white font-semibold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                >
                  <span>Try the Demo</span>
                </motion.button>
              </Link>
              <Link href="#signup">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-transparent border border-[#A855F7] text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/5 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                >
                  <span>Join the Beta</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Hero Chat Visual */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 50 }}
          >
            <div className="relative w-full max-w-3xl">
              <HeroChatVisual />
              <motion.div 
                className="absolute -bottom-8 right-0 left-0 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <button className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm text-white/90 py-2 px-4 rounded-full border border-white/10 hover:bg-black/50 transition-colors">
                  <FaPlay className="text-[#A855F7]" />
                  <span className="text-sm">Hear it in action</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Connected Apps at bottom of hero */}
        <div className="w-full mt-auto">
          <ConnectedApps />
        </div>
      </motion.section>
      
      {/* Scrolling Logos & Trust Row */}
      <ScrollingLogos />

      {/* Integrations Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-black/20 backdrop-blur-sm border-y border-white/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-12 text-white">Connected to the tools you already use</h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side: App icons grid */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-2xl mx-auto">
                {[
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
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center justify-center"
                    initial="normal"
                    whileHover="hover"
                    variants={logoVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: getLogoColor(item.name) }} />
                    <span className="text-xs text-white/50 mt-2">{item.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8 text-white/70 text-lg font-medium">
                100+ integrations. One assistant.
              </div>
            </div>
            
            {/* Right side: Descriptive text */}
            <div className="lg:w-1/2 text-white/80 space-y-6 max-w-xl">
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nexevon connects to over 100 tools — Gmail, Shopify, Slack, Notion, QuickBooks, and more — and lets you control all of them from one place.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your AI doesn't just pull data. It writes, schedules, responds, tracks, follows up, and gets real work done — across your entire stack.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                No switching tabs. No copy-paste. Just one conversation. One assistant. Everything handled.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-white">How Nexevon Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <motion.div 
            className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(139,92,246,0.3)' }}
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#A855F7]/10 blur-xl"></div>
            <div className="text-[#A855F7] text-5xl font-bold mb-4">1</div>
            <h3 className="text-2xl font-bold mb-2 text-white">You Ask. Naturally.</h3>
            <p className="text-white/70 mb-6">Just type what you need — like you would to a real assistant.</p>
            <div className="bg-[#A855F7]/10 rounded-2xl p-4 border border-[#A855F7]/20">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#A855F7] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs text-white">U</span>
                </div>
                <div>
                  <div className="text-white/90 text-sm">
                    <span className="typing-animation">Schedule next week's investor call and attach the new pitch deck.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs text-white/50">
              <FaCheck className="text-green-400 mr-2" /> 
              <span>Natural language, casual command</span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(139,92,246,0.3)' }}
          >
            <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full bg-[#A855F7]/10 blur-xl"></div>
            <div className="text-[#A855F7] text-5xl font-bold mb-4">2</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Nexevon Gets to Work</h3>
            <p className="text-white/70 mb-6">Your AI connects to your tools, pulls the right info, creates drafts, and gets it ready. It checks calendars, finds the file, writes the email — all in seconds.</p>
            <div className="space-y-3">
              <motion.div 
                className="bg-black/30 rounded-lg p-3 border border-white/10 flex items-center space-x-3 relative overflow-hidden"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"></div>
                <FaCalendarAlt className="text-[#A855F7] text-lg" />
                <span className="text-white/90 text-sm">Calendar: Checking Tuesday availability</span>
              </motion.div>
              <motion.div 
                className="bg-black/30 rounded-lg p-3 border border-white/10 flex items-center space-x-3 relative overflow-hidden"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"></div>
                <FaFileAlt className="text-[#A855F7] text-lg" />
                <span className="text-white/90 text-sm">Drive: Attaching pitch_deck_v2.pdf</span>
              </motion.div>
              <motion.div 
                className="bg-black/30 rounded-lg p-3 border border-white/10 flex items-center space-x-3 relative overflow-hidden"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"></div>
                <FaEnvelope className="text-[#A855F7] text-lg" />
                <span className="text-white/90 text-sm">Email: Draft invitation ready for review</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(139,92,246,0.3)' }}
          >
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-[#A855F7]/10 blur-xl"></div>
            <div className="text-[#A855F7] text-5xl font-bold mb-4">3</div>
            <h3 className="text-2xl font-bold mb-2 text-white">You Review or Let It Fly</h3>
            <p className="text-white/70 mb-6">You approve, tweak, or automate it fully. Done in one click — meeting scheduled, email sent, file attached.</p>
            <motion.div 
              className="bg-black/30 rounded-lg p-5 border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FaCheck className="text-green-400 text-sm" />
                  </div>
                  <span className="text-white font-medium">Status: Scheduled</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-white/70">
                  <FaCalendarAlt className="text-[#A855F7] mr-3 text-sm" />
                  <span>Tuesday 10:00 AM</span>
                </div>
                <div className="flex items-center text-white/70">
                  <FaUsers className="text-[#A855F7] mr-3 text-sm" />
                  <span>Participants: 3</span>
                </div>
                <div className="flex items-center text-white/70">
                  <FaPaperclip className="text-[#A855F7] mr-3 text-sm" />
                  <span>Attachment: pitch_deck_v2.pdf</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Blocks Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-[#0A0A0A]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Built for Real Work — Not Just Suggestions</h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">Nexevon connects to your tools and gets things done, not just provides information.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: FaCalendarAlt,
                title: "Schedule meetings & prep docs",
                description: "Set up meetings, prepare agendas, and send invites with all necessary attachments."
              },
              {
                icon: FaEnvelope,
                title: "Summarize & reply to emails",
                description: "Get summaries of important emails and draft contextual responses for your approval."
              },
              {
                icon: FaRocket,
                title: "Fulfill urgent Shopify orders",
                description: "Process orders, update inventory, and manage customer communications automatically."
              },
              {
                icon: FaChartLine,
                title: "Run Klaviyo campaigns",
                description: "Create, schedule, and analyze email marketing campaigns with minimal input."
              },
              {
                icon: FaTasks,
                title: "Pull unpaid invoices from QuickBooks",
                description: "Identify outstanding payments and prepare follow-up communications."
              },
              {
                icon: FaLightbulb,
                title: "Generate ad performance reports",
                description: "Analyze campaign data and create visual reports with actionable insights."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#A855F7]/30 transition-all duration-300 group relative overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(139,92,246,0.2)' }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#A855F7]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 flex items-center justify-center mb-4">
                  <feature.icon className="text-[#A855F7] text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#A855F7] transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[#A855F7] text-sm font-medium">Learn more</span>
                  <FaArrowRight className="text-[#A855F7] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 bg-[#0A0A0A]"
      >
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-white"
          >
            What Our Users Are Saying
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#111111] backdrop-blur-sm rounded-xl p-6 border-[1.5px] border-white/10 relative overflow-hidden group hover:border-[#A855F7]/40 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)] transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-[#A855F7]/10 rounded-full blur-xl group-hover:bg-[#A855F7]/20 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  SW
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Sarah Wilson</h4>
                  <p className="text-white/60 text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">"Nexevon has completely transformed how our marketing team works. We've cut meeting time in half and increased our campaign output by 30%."</p>
              <div className="flex items-center">
                <div className="flex text-[#A855F7]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#111111] backdrop-blur-sm rounded-xl p-6 border-[1.5px] border-white/10 relative overflow-hidden group hover:border-[#A855F7]/40 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)] transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-[#A855F7]/10 rounded-full blur-xl group-hover:bg-[#A855F7]/20 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  JT
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">James Thompson</h4>
                  <p className="text-white/60 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">"As a developer, I was skeptical about AI tools, but Nexevon has become indispensable. It handles the tedious parts of my workflow so I can focus on solving complex problems."</p>
              <div className="flex items-center">
                <div className="flex text-[#A855F7]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#111111] backdrop-blur-sm rounded-xl p-6 border-[1.5px] border-white/10 relative overflow-hidden group hover:border-[#A855F7]/40 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)] transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-[#A855F7]/10 rounded-full blur-xl group-hover:bg-[#A855F7]/20 transition-all duration-500"></div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#A855F7] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  EL
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Elena Lopez</h4>
                  <p className="text-white/60 text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">"Nexevon connects our entire product stack in one place. I can get updates from Jira, check analytics, and communicate with my team without switching contexts."</p>
              <div className="flex items-center">
                <div className="flex text-[#A855F7]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Additional testimonial quote */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 max-w-4xl mx-auto bg-[#111111] backdrop-blur-sm rounded-2xl p-12 border-[1.5px] border-[#222222] border-t-white/10 border-l-white/10 border-r-transparent border-b-transparent relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/5 after:to-transparent after:pointer-events-none"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#A855F7]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl"></div>
            <div className="text-5xl text-[#A855F7] mb-6">❝</div>
            <p className="text-xl md:text-2xl text-white/90 italic mb-8 relative z-10">Nexevon has become the central nervous system of our company. It's not just an AI assistant; it's a fundamental shift in how we operate.</p>
            <div className="flex items-center justify-end">
              <div>
                <h4 className="text-white font-semibold">Michael Chen</h4>
                <p className="text-white/60">CEO, TechForward</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 bg-[#0A0A0A]"
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-white"
          >
            Work Smarter, Not Harder.
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={containerVariants} // Reuse container variants for staggering
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[ 
              { icon: FaClock, title: 'Save Hours Every Week', description: 'Automate repetitive tasks and get information faster.' },
              { icon: FaRocket, title: 'Boost Productivity', description: 'Focus on high-impact work while your AI handles the rest.' },
              { icon: FaLightbulb, title: 'Unlock Actionable Insights', description: 'Connect data across tools for a clearer picture.' }
            ].map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                  <benefit.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Beta Sign-up Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24"
      >
        <div className="container mx-auto px-4 text-center max-w-xl">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
          >
            Be First in Line.
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-white/70 mb-8"
          >
            Get notified when beta access opens and be among the first to experience the future of work.
          </motion.p>
          
          {/* Basic Sign-up Form - Needs backend integration later */}
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            onSubmit={(e) => e.preventDefault()} // Prevent default form submission for now
          >
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Get Notified</span>
              <FaArrowRight />
            </button>
          </motion.form>
          <p className="text-xs text-white/50 mt-4">We respect your privacy. No spam.</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 bg-black/30 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-white/50">
          {new Date().getFullYear()} YourAI. All rights reserved. {/* Placeholder */}
          {/* Add privacy/terms links later */}
        </div>
      </footer>

    </motion.div>
  );
}
