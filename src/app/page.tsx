'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSettings, FiInfo, FiSend, FiPlay } from 'react-icons/fi';
import IntegrationList from "@/components/IntegrationList";
import MessageList from "@/components/MessageList";
import ContextualCompanion, { 
  InitialSummaryCard, 
  ProposalContextCard, 
  GmailDraftPreview, 
  TodaysScheduleCard, 
  UrgentEmailsCard,
  ShopifyOrderStatusCard,
  ShopifyDraftEmailCard,
  OutstandingInvoicesCard,
  EmailReminderDraftCard,
  ClientOverviewCard,
  SalesPerformanceReportCard, 
  TimeSlotsCard, 
  MeetingRequestEmailCard, 
  EmailCampaignOverviewCard // Import Scenario 8 card
} from "@/components/ContextualCompanion";
import { 
  JiraCard, SlackCard, ShopifyCard, GmailCard, GoogleDriveCard, 
  SalesforceCard, GoogleCalendarCard, TypingIndicator 
} from "@/components/ActionCards";
import { SiGmail, SiGooglecalendar } from 'react-icons/si';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionCard?: React.ReactNode;
}

type CompanionContext = 
  'initial-summary' 
  | 'proposal-context' 
  | 'draft-preview' 
  | 'jira' 
  | 'shopify' 
  | 'shopify-order' 
  | 'shopify-draft'
  | 'gmail'
  | 'todays-schedule'
  | 'urgent-emails'
  | 'outstanding-invoices'
  | 'email-reminder-draft'
  | 'client-overview' 
  | 'sales-performance-report' 
  | 'suggested-times' 
  | 'meeting-request-email' 
  | 'email-campaign-overview' // Add context state for Scenario 8
  | null;

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeContext, setActiveContext] = useState<CompanionContext>(null);
  const [hasBriefingStarted, setHasBriefingStarted] = useState(false); // Prevent re-triggering briefing
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper function for delays
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper to add message with optional delay and typing indicator management
  const addMessage = useCallback(async (message: Omit<ChatMessage, 'id' | 'timestamp'>, delayMs: number = 0) => {
    if (delayMs > 0) {
      setIsTyping(true);
      await delay(delayMs);
    }
    setMessages(prev => [
      ...prev,
      { 
        ...message, 
        id: Date.now().toString() + Math.random(), // Simple unique ID 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
    // Removed setIsTyping(false) from here to allow manual control in scenarios
  }, []); // Removed setIsTyping dependency

  // Helper function to simulate typing in the input box
  const simulateTyping = useCallback(async (text: string, typingSpeedMs: number = 50) => {
    setInputValue(''); // Clear input first
    for (let i = 0; i < text.length; i++) {
      setInputValue(prev => prev + text.charAt(i));
      await delay(typingSpeedMs);
    }
  }, [setInputValue]); // Added setInputValue dependency

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const resetChat = () => {
    setHasBriefingStarted(true);
    setActiveContext(null);
    setMessages([]);
  };

  // ---- Manually Triggered Morning Briefing Sequence ----
  const startMorningBriefing = async () => {
    if (hasBriefingStarted) return; 
    resetChat();
    setIsTyping(true);

    // 1. Initial Greeting & Summary
    await addMessage({ text: "Good morning, Danny! You have 3 priority emails in Gmail and 2 meetings before lunch.", sender: 'bot' }, 2000); 
    setActiveContext('initial-summary'); 
    await addMessage({ text: '', sender: 'bot', actionCard: <InitialSummaryCard /> }, 1000); 
    setIsTyping(false);
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    // 2. Highlight Key Email
    setIsTyping(true);
    await addMessage({ text: "Looks like John from ClientCorp needs the proposal by EOD tomorrow. The draft 'Proposal_Draft_vLatest.pdf' is ready in Google Drive.", sender: 'bot' }, 3000); 
    setActiveContext('proposal-context'); 
    await addMessage({ text: '', sender: 'bot', actionCard: <ProposalContextCard /> }, 1000); 
    setIsTyping(false);
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    // 3. Suggest Proactive Step
    setIsTyping(true);
    await addMessage({ text: "Shall I draft a quick reply to John confirming you'll send it, and attach that latest draft from Drive?", sender: 'bot' }, 3000); 
    setIsTyping(false);
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    // Simulate User "Clicking" Yes
    setIsTyping(false);
    const userResponse = "Yes, draft reply";
    await simulateTyping(userResponse);
    await delay(500);
    addMessage({ sender: 'user', text: userResponse });
    setInputValue('');
    setIsTyping(true);

    // 4. Show Gmail Draft Card
    await addMessage({
      text: "Okay, here is the draft email to John:",
      sender: 'bot',
      actionCard: <GmailDraftPreview /> 
    }, 3500); 
    setIsTyping(false);
  };

  // ---- Scenario 2: Daily Summary + Priority Inbox ----
  const startScenario2 = useCallback(async () => {
    resetChat(); // Use resetChat to clear messages and context
    setIsTyping(true); // Start with bot thinking

    // Simulate User Typing & Request
    const userRequest = "Give me a quick overview of my day and flag anything urgent.";
    // Show user message immediately as it initiates the flow
    addMessage({ text: userRequest, sender: 'user' }); 
    setInputValue(''); // Clear input right away for this pattern

    // Bot responds
    await addMessage({ text: "Here's your daily overview along with high-priority items I found in your inbox.", sender: 'bot' }, 2500); 

    // Show Today's Schedule Card
    await addMessage({ text: '', sender: 'bot', actionCard: <TodaysScheduleCard /> }, 1500); 

    // Show Urgent Emails Card
    await addMessage({ text: '', sender: 'bot', actionCard: <UrgentEmailsCard /> }, 1500); 

    // AI Follow-up
    await addMessage({ text: "Want me to draft responses or reschedule the sales call?", sender: 'bot' }, 2500); 
    setIsTyping(false);
  }, [addMessage, setIsTyping, setActiveContext, resetChat]); // Add resetChat dep

  // ---- Scenario 3: E-Commerce Order Fulfillment ----
  const startScenario3 = useCallback(async () => {
    resetChat();
    setIsTyping(true);
    await addMessage({ sender: 'user', text: 'Any urgent Shopify orders needing attention?' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    await addMessage({ sender: 'bot', text: "Let me check Shopify for high-priority orders..." });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await addMessage({ sender: 'bot', text: "Yes, there's one order flagged as high priority (Order #SH-1034). Customer requested expedited shipping.", actionCard: <ShopifyOrderStatusCard /> });
    setActiveContext('shopify-order');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await addMessage({ sender: 'bot', text: "What would you like to do? We could flag it for the fulfillment team or draft an email to support." });
    setIsTyping(false); // Wait for user
    
    // Simulate User Typing & Response
    const userResponse = 'Draft an email to support to ensure it ships today.';
    await simulateTyping(userResponse);
    await delay(500); // Pause after typing
    addMessage({ sender: 'user', text: userResponse });
    setInputValue(''); // Clear input after sending
    setIsTyping(true); // Bot starts processing

    await addMessage({ sender: 'bot', text: "Okay, I've drafted the email for the high-priority order to customer support."}, 1500);
    await addMessage({ sender: 'bot', text: "Here is the draft:", actionCard: <ShopifyDraftEmailCard />});
    setActiveContext('shopify-draft');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await addMessage({ sender: 'bot', text: "Let me know if you want to send it or make any changes.",});
    setIsTyping(false);
  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  // ---- Scenario 4: Accountant Unpaid Invoices ----
  const startScenario4 = useCallback(async () => {
    resetChat(); // Use resetChat to clear messages and context
    setIsTyping(true);
    await addMessage({ sender: 'user', text: 'Can you show me unpaid invoices from March and help me chase them?' });
    // Use delay within addMessage or separate await delay for timing
    await addMessage({ sender: 'bot', text: 'Yes, just a moment — I’ll pull up the invoice records from QuickBooks.' }, 1500);
    await addMessage({ sender: 'bot', text: 'Here’s what I found for March. Three invoices are still unpaid.', actionCard: <OutstandingInvoicesCard /> }, 2000);
    setActiveContext('outstanding-invoices');
    await addMessage({ sender: 'bot', text: 'Would you like me to check if any of these clients have responded recently? Or just go ahead and prepare reminders?' }, 1500);
    setIsTyping(false); // Wait for user input simulation
    
    // Simulate User Typing & Response 1
    const userResponse1 = 'Go ahead and prepare the emails.';
    await simulateTyping(userResponse1);
    await delay(500); // Pause after typing
    addMessage({ sender: 'user', text: userResponse1 });
    setInputValue(''); // Clear input after sending
    setIsTyping(true); // Bot starts processing
    
    const emailBody = [
        'Hi,',
        'Just a quick note that Invoice #A-109 for $2,100 is still showing as unpaid on our side. The original due date was March 14.',
        'Please let me know if you need another copy or if payment has already been sent — happy to update the records.',
        'Thanks,',
        'Alex'
    ];
    await addMessage({ sender: 'bot', text: 'Done. Here’s the draft for Acme Corp — I’ve kept it friendly and professional:', 
      actionCard: <EmailReminderDraftCard recipient="finance@acmecorp.com" subject="Friendly Reminder – Invoice #A-109" body={emailBody} clientName="Acme Corp" /> 
    }, 1500);
    setActiveContext('email-reminder-draft');
    // Combine the last two messages into one
    const combinedLastMessage = "Would you like me to send this now? I can also queue up reminders for Nova Tech and Haven Co if you’re ready.\n\nAlso — do you want me to flag any clients that are overdue more than 30 days?";
    await addMessage({ sender: 'bot', text: combinedLastMessage }, 1500);
    setIsTyping(false);
  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  // ---- Scenario 5: Client Call Prep ----
  const startScenario5 = useCallback(async () => {
    resetChat();
    setIsTyping(true); // Start with bot thinking

    // Simulate User Typing & Request
    const userRequest = "Can you get me ready for my 2 PM call with Redline Group?";
    await simulateTyping(userRequest);
    await delay(500);
    addMessage({ sender: 'user', text: userRequest });
    setInputValue('');
    setIsTyping(true);

    // Bot responses
    await addMessage({ sender: 'bot', text: 'Of course. Let me pull up your recent emails, notes, and shared documents with them.' }, 2000);
    await addMessage({ sender: 'bot', text: 'Alright, here’s a quick recap before the call:', actionCard: <ClientOverviewCard /> }, 2500);
    setActiveContext('client-overview');
    
    const followUpQuestion = "They're expecting confirmation on your support SLAs and onboarding process. Want me to open the proposal file now so you can take a quick look?\n\nOr would you like a draft follow-up email prepared post-call?";
    await addMessage({ sender: 'bot', text: followUpQuestion }, 1500);
    setIsTyping(false);

  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  // ---- Scenario 6: Shopify Sales Dip ----
  const startScenario6 = useCallback(async () => {
    resetChat();
    setIsTyping(true);

    // Simulate User Typing & Request
    const userRequest = "Our sales looked low this week — can you check and let me know what’s going on?";
    await simulateTyping(userRequest);
    await delay(500);
    addMessage({ sender: 'user', text: userRequest });
    setInputValue('');
    setIsTyping(true);

    // Bot responses
    await addMessage({ sender: 'bot', text: 'Yes — I pulled your last 7 days of Shopify data compared to the prior week. Here’s a quick breakdown:', actionCard: <SalesPerformanceReportCard /> }, 2500);
    setActiveContext('sales-performance-report');

    const analysisSummary = "Most of the drop came from paid channels — your Facebook Ad CTR dropped to 0.5%, and returning customer sales are down 17%.";
    await addMessage({ sender: 'bot', text: analysisSummary }, 1500);

    const suggestions = "Want me to run a deeper analysis into ad creative performance or A/B test segments?\n\nI can also check Klaviyo to see if email open rates dipped — could be a good time to push a mid-season promo or campaign refresh.\n\nShould I pull together a quick list of campaign ideas that align with your inventory?";
    await addMessage({ sender: 'bot', text: suggestions }, 1500);
    setIsTyping(false);

  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  // ---- Scenario 7: Meeting Setup + Agenda Prep ----
  const startScenario7 = useCallback(async () => {
    resetChat();
    setIsTyping(true);

    // Simulate User Typing & Request
    const userRequest = "Can you set up a catch-up with John next week and prep a short agenda?";
    await simulateTyping(userRequest);
    await delay(500);
    addMessage({ sender: 'user', text: userRequest });
    setInputValue('');
    setIsTyping(true);

    // Bot responses
    await addMessage({ sender: 'bot', text: 'Sure. I checked your calendar — you’re free Tuesday and Thursday afternoons next week.' }, 2000);
    
    await addMessage({ 
      sender: 'bot', 
      text: 'Since we don’t have access to John’s calendar, I’ll suggest those times and send him a quick message to confirm.',
      actionCard: (
        <>
          <TimeSlotsCard />
          <MeetingRequestEmailCard 
            recipient="john@harborlabs.com"
            subject="Catch-Up Next Week?"
            body={[
              'Hi John,',
              'Hope you’re well — just wanted to find a time to reconnect next week.',
              'Would either of the following work for you?',
              '\u2022 Tues, April 9 at 2 PM',
              '\u2022 Thurs, April 11 at 3 PM',
              'Happy to flex if those don’t work. Looking forward to catching up.'
            ]}
            sender="Danny"
          />
        </>
      )
    }, 2500);
    setActiveContext('meeting-request-email'); // Set context to show email draft actions primarily

    const agendaSummary = "I’ve also created a new doc titled \"Catch-Up Agenda – John\" in your Drive. It includes:\n\u2022 Quick recap from last meeting\n\u2022 New opportunities to review\n\u2022 Open questions from sales team";
    await addMessage({ sender: 'bot', text: agendaSummary }, 1500);

    await addMessage({ sender: 'bot', text: 'Want me to drop this in your calendar event once he confirms?' }, 1000);
    setIsTyping(false);

  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  // ---- Scenario 8: Email Campaign Creation ----
  const startScenario8 = useCallback(async () => {
    resetChat();
    setIsTyping(true);

    // Simulate User Typing & Request
    const userRequest = "We just launched our spring collection. Can you generate an email campaign for it — design, copy, and subject line?";
    await simulateTyping(userRequest);
    await delay(500);
    addMessage({ sender: 'user', text: userRequest });
    setInputValue('');
    setIsTyping(true);

    // Bot responses
    const initialResponse = "Absolutely. I noticed you uploaded the creative for the campaign. I also pulled your top 3-performing product categories from Shopify over the last 30 days:\n\u2022 Knitwear\n\u2022 Capsule Jackets\n\u2022 Everyday Dresses";
    await addMessage({ sender: 'bot', text: initialResponse }, 2500);

    const klaviyoInsights = "And based on your recent Klaviyo campaigns, your audience responds best to:\n\u2022 “Limited time” language\n\u2022 Discounts over 15%\n\u2022 Subject lines that feel direct + seasonal";
    await addMessage({ sender: 'bot', text: klaviyoInsights }, 2000);

    await addMessage({ 
      sender: 'bot', 
      text: 'Here’s a full campaign preview:',
      actionCard: (
        <EmailCampaignOverviewCard 
          subjectLineA="New Arrivals Just Landed – Take 20% Off Your First Pick"
          subjectLineB="Fresh Styles for Spring + 20% Off Everything"
          headline="FRESH STYLES FOR THE SEASON"
          subheadline="Update your wardrobe with our latest spring collection — timeless layers, soft textures, and effortless silhouettes."
          ctaText="Shop Now"
          discount="20% OFF – applied automatically at checkout"
          imageUrl="/file.svg" // Use the user's image
          segment={[
            "High-engagement: Last 90-day openers + site visitors",
            "Exclude: Recent purchasers in last 14 days"
          ]}
          sendTime="Tuesday @ 11:00 AM"
        />
      )
    }, 3000);
    setActiveContext('email-campaign-overview');

    const followUpQuestions = "Would you like me to:\n\u2022 Finalize this campaign draft in Klaviyo?\n\u2022 Schedule it for Tuesday?\n\u2022 Set up an A/B test between the two subject lines?";
    await addMessage({ sender: 'bot', text: followUpQuestions }, 1500);

    await addMessage({ sender: 'bot', text: "I can also prep a resend to non-openers in 48 hours.\n\nLet me know if you'd like SMS copy to match this campaign for your Klaviyo flows." }, 1500);
    setIsTyping(false);

  }, [addMessage, setIsTyping, setActiveContext, resetChat, simulateTyping, setInputValue]); // Added dependencies

  const getActionCardForKeyword = (text: string): React.ReactNode | undefined => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('jira') || lowerText.includes('task') || lowerText.includes('ticket')) {
      setActiveContext('jira');
      return <JiraCard />;
    } else if (lowerText.includes('slack') || lowerText.includes('message') || lowerText.includes('channel')) {
      setActiveContext(null);
      return <SlackCard />;
    } else if (lowerText.includes('shopify') || lowerText.includes('sales') || lowerText.includes('orders')) {
      setActiveContext('shopify');
      return <ShopifyCard />;
    } else if (lowerText.includes('gmail') || lowerText.includes('email') || lowerText.includes('draft')) {
      setActiveContext('gmail');
      return <GmailCard />;
    } else if (lowerText.includes('drive') || lowerText.includes('file') || lowerText.includes('document')) {
      setActiveContext(null);
      return <GoogleDriveCard />;
    } else if (lowerText.includes('salesforce') || lowerText.includes('lead') || lowerText.includes('customer')) {
      setActiveContext(null);
      return <SalesforceCard />;
    } else if (lowerText.includes('calendar') || lowerText.includes('meeting') || lowerText.includes('schedule')) {
      setActiveContext(null);
      return <GoogleCalendarCard />;
    } else {
      setActiveContext(null);
    }
    
    return undefined;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const actionCard = getActionCardForKeyword(newUserMessage.text);
      
      if (actionCard) {
        const actionResponse: ChatMessage = {
          id: Date.now().toString() + Math.random().toString(),
          sender: 'bot',
          text: '', 
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          actionCard
        };
        setMessages(prev => [...prev, actionResponse]);
      } else {
        const genericResponse: ChatMessage = {
          id: Date.now().toString() + Math.random().toString(),
          sender: 'bot',
          text: "I understand you're interested in that. How else can I help you with your connected apps?",
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, genericResponse]);
      }
    }, 1500); 
  };

  return (
    <main className="flex h-screen bg-gradient-to-br from-[#0a0a1f] to-[#1a1a3f] text-white">
      {/* Left Sidebar */}
      <aside className="w-72 flex-shrink-0 glass-panel m-3 rounded-xl p-4 flex flex-col">
        {/* Sidebar Header */}
        <div className="h-12 mb-6 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA07A] flex items-center justify-center shadow-[0_0_10px_rgba(255,107,107,0.5)]">
              <span className="text-black font-bold">N</span>
            </div>
            <span className="text-lg font-semibold text-white glow-text">Nexevon Ai</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-6">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg bg-white/10 text-white font-medium border-l-2 border-[#00f5ff]">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>

        {/* Integrations Section */}
        <section className="flex-grow overflow-hidden flex flex-col">
          <h2 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide flex-shrink-0">
            Connected Apps
          </h2>
          <div className="flex-grow overflow-y-auto">
            <IntegrationList 
              onRunScenario1={startMorningBriefing} 
              onRunScenario2={startScenario2} 
              onRunScenario3={startScenario3} 
              onRunScenario4={startScenario4} 
              onRunScenario5={startScenario5} 
              onRunScenario6={startScenario6} 
              onRunScenario7={startScenario7} 
              onRunScenario8={startScenario8} // Pass Scenario 8 handler
            />
          </div>
        </section>

        {/* User Profile */}
        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">AC</span>
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium text-white">Alex Chen</div>
              <div className="text-xs text-white/60">Premium Plan</div>
            </div>
            <button className="text-white/70 hover:text-white transition-colors">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Right Main Chat Area - Reduced to 55% width */}
      <section className="w-[55%] flex flex-col m-3 ml-0">
        {/* Chat Container with Glass Effect */}
        <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden">
          {/* Chat Header */}
          <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-black/20 shadow-inner shadow-black/30">
            <div className="font-semibold text-white flex items-center">Nexevon Assistant<span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span></div>
            {/* Header Icons */}
            <div className="ml-auto flex space-x-4 text-white/70">
              <button className="hover:text-white transition-colors">
                <FiSearch className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <FiInfo className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Message List */}
          <MessageList messages={messages} />
          {/* Add a div at the end to scroll to */}
          <div ref={messagesEndRef} />

          {/* Typing Indicator (conditionally rendered) */}
          {isTyping && (
            <div className="p-6 pt-0">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 mt-1 flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <TypingIndicator />
                </div>
              </motion.div>
            </div>
          )}

          {/* Message Input Area */}
          <footer className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Ask me to create a task, query sales, draft an email..."
                className="futuristic-input flex-1 p-3 px-4"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              />
              <button
                className="futuristic-button p-3 aspect-square flex items-center justify-center"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </footer>
        </div>
      </section>
      
      {/* Contextual Companion Panel */}
      <section className="w-[25%] flex flex-col m-3 ml-0">
        <div className="flex-1 glass-panel rounded-xl overflow-hidden">
          <ContextualCompanion activeContext={activeContext} />
        </div>
      </section>
    </main>
  );
}
