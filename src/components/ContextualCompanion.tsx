'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, FaJira, FaShopify, FaSlack, 
  FaPlus, FaPaperPlane, FaEnvelope, FaChartLine, FaGoogleDrive, FaUser, 
  FaBriefcase as FaBriefcaseIcon, FaGift as FaGiftIcon, FaEdit, FaRegClock, 
  FaFileInvoiceDollar, FaDollarSign, FaShoppingCart, FaPercentage, FaArrowDown, FaArrowUp, FaBullhorn
 } from 'react-icons/fa';
 import { SiJira, SiGmail, SiGooglecalendar, SiGoogle, SiQuickbooks, SiShopify } from 'react-icons/si';
import { GoClock, GoMail } from "react-icons/go"; // Import GoClock for TimeSlotsCard

// Define the possible context states (matching page.tsx)
type CompanionContext = 
  | 'initial-summary' 
  | 'proposal-context' 
  | 'draft-preview' 
  | 'jira' 
  | 'shopify' 
  | 'shopify-order' 
  | 'shopify-draft' 
  | 'gmail'
  | 'todays-schedule'      // Added from page.tsx
  | 'urgent-emails'        // Added from page.tsx
  | 'outstanding-invoices' // Added previously
  | 'email-reminder-draft' // Added previously
  | 'client-overview' 
  | 'sales-performance-report' // Add new context state
  | 'suggested-times' // Add new context state for Time Slots
  | 'meeting-request-email' // Add new context state for Meeting Email Draft
  | 'email-campaign-overview' // Add context state for Scenario 8
  | null;

// Quick Stats Card Component (modified to accept dynamic value)
const QuickStatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number; // Allow number for potential updates
}> = ({ icon, label, value }) => (
  <div className="glass-panel p-3 rounded-lg flex items-center space-x-3">
    <div className="text-[#00f5ff]">
      {icon}
    </div>
    <div>
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-sm font-medium text-white">{value}</div>
    </div>
  </div>
);

// Action Button Component
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full glass-panel p-3 rounded-lg flex items-center space-x-3 hover:bg-white/5 transition-colors"
  >
    <div className="text-[#00f5ff]">
      {icon}
    </div>
    <div className="text-sm font-medium text-white">{label}</div>
  </button>
);

// --------- New Context Detail Components ---------

// 1. Initial Summary Card
export const InitialSummaryCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Gmail Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><SiGmail className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Priority Emails (3)</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          <li>Re: Proposal Request <span className="text-white/40">(John @ ClientCorp)</span></li>
          <li>Q2 Budget Report <span className="text-white/40">(Finance Team)</span></li>
          <li>Urgent Question <span className="text-white/40">(Sarah Jenkins)</span></li>
        </ul>
      </div>
      {/* Calendar Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#4285F4]/80 rounded-md"><SiGooglecalendar className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Upcoming Meetings (2)</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          <li>10:00 AM: Client Sync</li>
          <li>11:30 AM: Team Stand-up</li>
        </ul>
      </div>
    </motion.div>
  );
};

// 2. Proposal Context Card
export const ProposalContextCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Highlighted Email */}
      <div className="border border-[#00f5ff]/30 rounded-lg p-3 bg-[#00f5ff]/5">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><SiGmail className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/90">Re: Proposal Request</h4>
        </div>
        <p className="text-xs text-white/70">
          From: John Doe <span className="text-white/40">&lt;john@clientcorp.com&gt;</span>
        </p>
        <p className="text-xs text-white/70 mt-1">
          Needs the proposal by EOD tomorrow.
        </p>
      </div>
      {/* Drive File Hint */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10 flex items-center space-x-3">
        <div className="p-1.5 bg-[#4CAF50]/80 rounded-md"><FaGoogleDrive className="text-white text-sm" /></div>
        <div>
          <div className="text-xs text-white/60">Located in Drive</div>
          <div className="text-xs font-medium text-white">Proposal_Draft_vLatest.pdf</div>
        </div>
      </div>
    </motion.div>
  );
};

// 3. Todays Schedule Card
export const TodaysScheduleCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Schedule Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#4285F4]/80 rounded-md"><SiGooglecalendar className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Today's Schedule</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          <li>10:00 AM: Client Sync</li>
          <li>11:30 AM: Team Stand-up</li>
          <li>3:00 PM: Legal Review with Clara</li>
        </ul>
      </div>
    </motion.div>
  );
};

// 4. Urgent Emails Card
export const UrgentEmailsCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Urgent Emails Summary */}
      <div className="border border-[#ff0000]/30 rounded-lg p-3 bg-[#ff0000]/5">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><SiGmail className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/90">Urgent Emails</h4>
        </div>
        <ul className="text-xs text-white/70 list-disc list-inside space-y-1">
          <li>CFO – Final Budget Approval Needed (Reply by 2PM)</li>
          <li>Investor – Request for updated pitch deck (sent yesterday)</li>
        </ul>
      </div>
    </motion.div>
  );
};

// 5. Shopify Order Status Card
export const ShopifyOrderStatusCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Order Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#96BF48]/80 rounded-md"><FaShopify className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Order #1123</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          <li>Customer: Jake Whitman</li>
          <li>Date: 5 days ago</li>
          <li>Status: Unfulfilled</li>
        </ul>
      </div>
    </motion.div>
  );
};

// 6. Shopify Draft Email Card
export const ShopifyDraftEmailCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Email Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><SiGmail className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Customer Update Email</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          <li>To: jake.whitman@email.com</li>
          <li>Subject: Update on Your Order #1123</li>
        </ul>
      </div>
    </motion.div>
  );
};

// 7. Outstanding Invoices Card
export const OutstandingInvoicesCard: React.FC = () => {
  const invoices = [
    { name: 'Acme Corp', amount: '$2,100', due: 'March 14' },
    { name: 'Nova Tech', amount: '$4,500', due: 'March 21' },
    { name: 'Haven Co', amount: '$1,250', due: 'March 25' },
  ];
  const total = '$7,850';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#96BF48]/80 rounded-md"><FaFileInvoiceDollar className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Outstanding Invoices - March</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          {invoices.map((invoice, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span className="font-medium text-white/90">{invoice.name}</span>
              <div className="text-right">
                <span className="text-white/80 mr-2">{invoice.amount}</span>
                <span className="text-xs text-white/60">Due: {invoice.due}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-sm font-semibold">
          <span>Total Outstanding:</span>
          <span>{total}</span>
        </div>
      </div>
    </motion.div>
  );
};

// 8. Email Reminder Draft Card
export const EmailReminderDraftCard: React.FC<{ recipient: string; subject: string; body: string[]; clientName: string }> = ({ recipient, subject, body, clientName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><FaEnvelope className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">{`Email Reminder Draft - ${clientName}`}</h4>
        </div>
        <div className="text-xs space-y-1 mb-3">
          <p><span className="text-white/60">To:</span> {recipient}</p>
          <p><span className="text-white/60">Subject:</span> {subject}</p>
        </div>
        <div className="text-sm space-y-2 mb-4">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// New Card: Client Overview Card
export const ClientOverviewCard: React.FC = () => {
  const details = {
    "Last Call": "March 15 (Discovery)",
    "Stakeholders": "Amanda Kelly (Partnerships), James Lin (CTO)",
    "Current Stage": "Contract Review",
    "Pending": "Final pricing confirmation",
    "Documents Sent": ["Proposal_Q2.pdf", "Onboarding_Timeline.pptx"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#4CAF50]/80 rounded-md"><FaUser className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Redline Group – Call Summary</h4>
        </div>
        <div className="space-y-2">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-semibold text-white/70 mr-2">{key}:</span>
              {Array.isArray(value) ? (
                <ul className="list-disc list-inside pl-2 text-xs text-white/90">
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-white/90">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// New Card: Sales Performance Report Card
export const SalesPerformanceReportCard: React.FC = () => {
  const metrics = [
    { label: "Total Sales", value: "$18,420", change: -23, icon: FaDollarSign, color: "text-red-400" },
    { label: "Orders", value: "218", change: null, icon: FaShoppingCart, color: "text-blue-400" },
    { label: "Conversion Rate", value: "1.8%", comparison: "(down from 2.4%)", icon: FaPercentage, color: "text-red-400" },
    { label: "Avg. Order Value", value: "$84.50", change: null, icon: FaDollarSign, color: "text-green-400" }, // Assuming AOV is stable or up slightly, adjust if needed
  ];

  const highlights = {
    "Top Product": "AirLite Hoodie – 72 units",
    "Top Channel": "Direct (42%), Instagram (28%)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-black/20 p-3 rounded-lg text-center shadow-inner shadow-black/30">
            <metric.icon className={`mx-auto mb-1 ${metric.color} text-lg`} />
            <div className="text-xs text-white/70 font-medium mb-0.5">{metric.label}</div>
            <div className="text-base font-semibold text-white flex items-center justify-center space-x-1">
              <span>{metric.value}</span>
              {metric.change !== null && (
                <span className={`text-xs flex items-center ${metric.change < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {typeof metric.change === 'number' && (
                    <>
                      {metric.change < 0 ? <FaArrowDown size={10}/> : <FaArrowUp size={10}/>}
                      {Math.abs(metric.change)}%
                    </>
                  )}
                </span>
              )}
            </div>
            {metric.comparison && <div className="text-[10px] text-white/50 mt-0.5">{metric.comparison}</div>}
          </div>
        ))}
      </div>
      <div className="space-y-1.5 border-t border-white/10 pt-3">
        {Object.entries(highlights).map(([key, value]) => (
          <div key={key} className="text-xs">
            <span className="font-semibold text-white/70 mr-1.5">{key}:</span>
            <span className="text-white/90">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Analyze Ad Performance
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Check Email Open Rates
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Suggest Campaign Ideas
        </button>
      </div>
    </motion.div>
  );
};

// New Card: Suggested Time Slots Card
export const TimeSlotsCard: React.FC = () => {
  const slots = [
    "Tuesday, April 9 – 2:00–2:45 PM",
    "Thursday, April 11 – 3:00–3:45 PM",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Schedule Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#4285F4]/80 rounded-md"><GoClock className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Suggested Times</h4>
        </div>
        <ul className="text-xs text-white/60 list-disc list-inside space-y-1">
          {slots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// New Card: Meeting Request Email Card
interface MeetingRequestEmailCardProps {
  recipient: string;
  subject: string;
  body: string[]; // Array of strings for paragraphs
  sender: string;
}

export const MeetingRequestEmailCard: React.FC<MeetingRequestEmailCardProps> = ({ recipient, subject, body, sender }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Email Summary */}
      <div className="border border-white/5 rounded-lg p-3 bg-black/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-[#D44638]/80 rounded-md"><GoMail className="text-white text-sm" /></div>
          <h4 className="text-xs font-medium text-white/80">Meeting Request Email</h4>
        </div>
        <div className="text-xs space-y-1 mb-3">
          <p><span className="text-white/60">To:</span> {recipient}</p>
          <p><span className="text-white/60">Subject:</span> {subject}</p>
        </div>
        <div className="text-sm space-y-2 mb-4">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// New Card: Email Campaign Overview Card
interface EmailCampaignOverviewCardProps {
  subjectLineA: string;
  subjectLineB: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  discount: string;
  imageUrl: string;
  segment: string[]; // Array for bullet points
  sendTime: string;
}

export const EmailCampaignOverviewCard: React.FC<EmailCampaignOverviewCardProps> = ({ 
  subjectLineA, subjectLineB, headline, subheadline, ctaText, discount, imageUrl, segment, sendTime 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 rounded-lg space-y-4"
    >
      {/* Subject Lines */}
      <div className="border border-white/10 rounded-md p-3 bg-black/5">
        <h5 className="text-xs font-semibold text-white/70 mb-1.5">Subject Lines</h5>
        <p className="text-white/90"><span className="font-medium text-green-300">A:</span> {subjectLineA}</p>
        <p className="text-white/90"><span className="font-medium text-orange-300">B (Test):</span> {subjectLineB}</p>
      </div>

      {/* Copy */}
      <div className="border border-white/10 rounded-md p-3 bg-black/5">
        <h5 className="text-xs font-semibold text-white/70 mb-1.5">Email Body</h5>
        <p className="font-semibold text-white uppercase tracking-wide">{headline}</p>
        <p className="text-white/80 mt-1 mb-3">{subheadline}</p>
        <button className="bg-green-500 text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-green-400 transition-colors">{ctaText}</button>
        <p className="text-xs text-green-300 mt-2">{discount}</p>
      </div>

      {/* Image */}
      <div className="border border-white/10 rounded-md p-3 bg-black/5">
         <h5 className="text-xs font-semibold text-white/70 mb-1.5">Image Block</h5>
         <img src={imageUrl} alt="Campaign Hero" className="rounded-md w-full h-auto" />
      </div>

      {/* Segment & Send Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-white/10 rounded-md p-3 bg-black/5">
          <h5 className="text-xs font-semibold text-white/70 mb-1.5">Segment</h5>
          <ul className="text-xs text-white/80 list-disc list-inside space-y-0.5">
            {segment.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        <div className="border border-white/10 rounded-md p-3 bg-black/5">
          <h5 className="text-xs font-semibold text-white/70 mb-1.5">Send Time (Rec.)</h5>
          <p className="text-xs text-white/90">{sendTime}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Finalize in Klaviyo
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Schedule Send
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          A/B Test Subjects
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Add Resend Logic
        </button>
      </div>
    </motion.div>
  );
};

// --------- Existing Dynamic Content Components ---------

const JiraTaskDetails: React.FC = () => {
  // Loading state simulation
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-panel p-4 rounded-lg overflow-hidden"
    >
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-white/10 animate-pulse"></div>
            <div className="h-5 w-40 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="h-20 bg-white/5 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 flex-1 bg-white/10 rounded animate-pulse"></div>
            <div className="h-8 flex-1 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#0052CC] rounded-md shadow-glow-sm">
                <SiJira className="text-white text-lg" />
              </div>
              <div>
                <div className="text-xs text-white/60">TASK DETAILS</div>
                <div className="text-sm font-medium text-white flex items-center">
                  PROJ-734
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-blue-500/30 text-blue-200 rounded">TO DO</span>
                </div>
              </div>
            </div>
            <div className="bg-black/20 px-2 py-1 rounded text-xs text-white/60">
              Created 2h ago
            </div>
          </div>
          
          {/* Task title */}
          <div className="mb-4 p-3 bg-black/20 rounded-lg border border-white/5">
            <h3 className="text-sm font-medium text-white">Design new landing page mockups</h3>
          </div>
          
          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Assignee</div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold mr-1.5">AC</div>
                <div className="text-xs font-medium text-white">Alex Chen</div>
              </div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Due Date</div>
              <div className="text-xs font-medium text-white flex items-center">
                <svg className="w-3.5 h-3.5 mr-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Tomorrow, 5:00 PM
              </div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Priority</div>
              <div className="text-xs font-medium text-white flex items-center">
                <svg className="w-3.5 h-3.5 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Medium
              </div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Reporter</div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold mr-1.5">JD</div>
                <div className="text-xs font-medium text-white">John Doe</div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <button className="flex-1 py-2 px-3 rounded-lg bg-black/20 border border-white/10 text-xs font-medium text-white/80 hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Add Comment
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg bg-[#0052CC] text-xs font-medium text-white hover:bg-[#0052CC]/80 transition-colors flex items-center justify-center">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12H9m11 11v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Change Status
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ShopifySalesSnapshot: React.FC = () => {
  // Loading state simulation
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mini chart data (fake data points for a line chart)
  const chartData = [25, 28, 32, 30, 35, 40, 38, 45, 50, 48, 52, 55];
  const maxValue = Math.max(...chartData);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-panel p-4 rounded-lg overflow-hidden"
    >
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-white/10 animate-pulse"></div>
            <div className="h-5 w-40 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="h-40 bg-white/5 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-white/10 rounded animate-pulse"></div>
            <div className="h-12 bg-white/10 rounded animate-pulse"></div>
            <div className="h-12 bg-white/10 rounded animate-pulse"></div>
            <div className="h-12 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#96BF48] rounded-md shadow-glow-sm">
                <FaShopify className="text-white text-lg" />
              </div>
              <div>
                <div className="text-xs text-white/60">SALES SNAPSHOT</div>
                <div className="text-sm font-medium text-white">March 29, 2025</div>
              </div>
            </div>
            <div className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-300">
              +12.5% ↑
            </div>
          </div>
          
          {/* Sales Chart */}
          <div className="mb-4 p-3 bg-black/20 rounded-lg border border-white/5 h-[100px]">
            <div className="text-xs text-white/60 mb-1">Last 12 Hours</div>
            <div className="relative h-[60px] w-full flex items-end">
              {/* Line chart */}
              <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${chartData.length} ${maxValue}`} preserveAspectRatio="none">
                {/* Gradient */}
                <defs>
                  <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(150, 191, 72, 0.5)" />
                    <stop offset="100%" stopColor="rgba(150, 191, 72, 0)" />
                  </linearGradient>
                </defs>
                
                {/* Area under the line */}
                <path 
                  d={`M0,${maxValue} ${chartData.map((point, i) => `L${i},${maxValue - point}`).join(' ')} L${chartData.length - 1},${maxValue} Z`}
                  fill="url(#salesGradient)"
                  strokeWidth="0"
                />
                
                {/* Line */}
                <path 
                  d={`M0,${maxValue - chartData[0]} ${chartData.map((point, i) => `L${i},${maxValue - point}`).join(' ')}`}
                  stroke="#96BF48"
                  strokeWidth="1.5"
                  fill="none"
                />
                
                {/* Data points */}
                {chartData.map((point, i) => (
                  <circle 
                    key={i} 
                    cx={i} 
                    cy={maxValue - point} 
                    r="1.5" 
                    fill="#fff" 
                    stroke="#96BF48"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              
              {/* Bar chart representation for visual effect */}
              <div className="flex items-end justify-between w-full h-full z-10 relative">
                {chartData.map((value, index) => {
                  const height = (value / maxValue) * 100;
                  return (
                    <div 
                      key={index}
                      className="w-[4px] mx-[1px] rounded-t bg-gradient-to-t from-[#96BF48]/30 to-[#96BF48]/60"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Today's Sales</div>
              <div className="text-sm font-medium text-white">$1,234.56</div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Orders</div>
              <div className="text-sm font-medium text-white">24</div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Avg. Order Value</div>
              <div className="text-sm font-medium text-white">$35.30</div>
            </div>
            <div className="p-2 bg-black/10 rounded-lg">
              <div className="text-xs text-white/60 mb-1">Conversion Rate</div>
              <div className="text-sm font-medium text-white">2.1%</div>
            </div>
          </div>
          
          {/* Action button */}
          <button className="w-full py-2 px-3 rounded-lg bg-[#96BF48] text-xs font-medium text-white hover:bg-[#96BF48]/80 transition-colors flex items-center justify-center">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            View Full Report
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export const GmailDraftPreview: React.FC = () => {
  // Loading state simulation
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Keep a short delay for the transition
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-panel p-4 rounded-lg overflow-hidden"
    >
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-white/10 animate-pulse"></div>
            <div className="h-5 w-40 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="h-24 bg-white/5 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 flex-1 bg-white/10 rounded animate-pulse"></div>
            <div className="h-8 flex-1 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#D44638] rounded-md shadow-glow-sm">
                <SiGmail className="text-white text-lg" /> {/* Changed to SiGmail */}
              </div>
              <div>
                <div className="text-xs text-white/60">GMAIL DRAFT</div> {/* Updated title */}
                <div className="text-sm font-medium text-white">Ready to Send</div>
              </div>
            </div>
            {/* <div className="bg-black/20 px-2 py-1 rounded text-xs text-white/60">
              Just now
            </div> */}
          </div>
          
          {/* Email details card - Updated Content */}
          <div className="mb-4 p-3 bg-black/20 rounded-lg border border-white/5">
            <div className="space-y-2">
              <div className="flex">
                <div className="text-xs text-white/60 w-16">To:</div>
                <div className="text-xs text-white flex-1 truncate">john@clientcorp.com</div>
              </div>
              <div className="flex">
                <div className="text-xs text-white/60 w-16">Subject:</div>
                <div className="text-xs font-medium text-white flex-1 truncate">Re: Proposal Request</div>
              </div>
              <div className="flex">
                <div className="text-xs text-white/60 w-16">Cc:</div>
                <div className="text-xs text-white flex-1 truncate">(Optional)</div> {/* Optional Cc field */}
              </div>
              <div className="h-px bg-white/10 my-2"></div>
              <div className="text-xs text-white/80">
                <p>Hi John,</p>
                <p className="mt-1.5">Confirming I'll send over the proposal by end of day tomorrow as requested.</p>
                <p className="mt-1.5">The latest draft is attached for your reference.</p>
                <p className="mt-1.5">Best,</p>
                <p>Danny</p> {/* Assuming sender name */}
              </div>
            </div>
          </div>
          
          {/* Attachments - Updated with hover effect */}
          <div className="mb-4 flex space-x-2">
            <div className="p-2 bg-black/10 rounded-lg flex items-center space-x-2 flex-1 border border-white/5 hover:bg-black/20 transition-colors cursor-default">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div className="text-xs text-white truncate">Proposal_Draft_vLatest.pdf</div>
            </div>
          </div>
          
          {/* Action buttons - Slightly adjusted styles */}
          <div className="flex space-x-3"> {/* Increased spacing */}
            <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg bg-[#D44638]/90 border border-[#D44638] text-xs font-medium text-white hover:bg-[#D44638] transition-colors flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Component
interface ContextualCompanionProps {
  activeContext?: CompanionContext; // Updated type
}

const ContextualCompanion: React.FC<ContextualCompanionProps> = ({ 
  activeContext = null 
}) => {
  // State for animation control
  const [showDynamicContent, setShowDynamicContent] = useState(activeContext !== null);
  const [lastActiveContext, setLastActiveContext] = useState<CompanionContext>(null); // Updated type
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Specific state for quick stats to allow modification
  const [quickStats, setQuickStats] = useState<Array<{icon: React.ReactNode; label: string; value: string | number}>>([]);

  // Update quick stats based on context
  useEffect(() => {
    let stats: Array<{icon: React.ReactNode; label: string; value: string | number}> = [];
    switch (activeContext) {
      case 'initial-summary':
        stats = [
          { icon: <SiGmail size={16} />, label: "Priority", value: 3 },
          { icon: <SiGooglecalendar size={16} />, label: "Meetings", value: 2 },
          { icon: <FaEnvelope size={16} />, label: "Unread", value: 7 }, // Start with 7
          { icon: <FaUser size={16} />, label: "Mentions", value: 1 }, // Example stat
        ];
        break;
      case 'proposal-context':
        // Optionally update stats or keep them from initial summary
        stats = quickStats; // Keep previous stats for this step
        break;
      case 'draft-preview': // Same as 'gmail' for stats?
        stats = [
          { icon: <SiGmail size={16} />, label: "Priority", value: 3 },
          { icon: <SiGooglecalendar size={16} />, label: "Meetings", value: 2 },
          { icon: <FaEnvelope size={16} />, label: "Unread", value: 3 }, // Update Unread to 3
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5l7 7-7 7" />
            </svg>, label: "Drafts", value: 1 }, // Update Drafts
        ];
        break;
      case 'jira':
        stats = [
          { icon: <FaJira size={16} />, label: "My Tasks", value: "5" },
          { icon: <FaCalendarAlt size={16} />, label: "Due Today", value: "2" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 0118 0 9 9 0 0118 0z" />
            </svg>, label: "Completed", value: "8" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>, label: "Overdue", value: "1" },
        ];
        break;
      case 'shopify':
        stats = [
          { icon: <FaShopify size={16} />, label: "Sales Today", value: "$1.2k" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>, label: "Orders", value: "24" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>, label: "Avg. Order", value: "$35.30" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l-.867 12.142A2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>, label: "Conversion", value: "2.1%" },
        ];
        break;
      case 'shopify-order':
        stats = [
          { icon: <FaShopify size={16} />, label: "Order #", value: "1123" },
          { icon: <FaCalendarAlt size={16} />, label: "Date", value: "5 days ago" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 0118 0 9 9 0 0118 0z" />
            </svg>, label: "Status", value: "Unfulfilled" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>, label: "Items", value: "2" },
        ];
        break;
      case 'shopify-draft':
        stats = [
          { icon: <SiGmail size={16} />, label: "To", value: "jake.whitman@email.com" },
          { icon: <FaCalendarAlt size={16} />, label: "Subject", value: "Update on Your Order #1123" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 0118 0 9 9 0 0118 0z" />
            </svg>, label: "Body", value: "..." },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>, label: "Attachments", value: "0" },
        ];
        break;
      case 'gmail':
        stats = [
          { icon: <SiGmail size={16} />, label: "Unread", value: 7 },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>, label: "Spam", value: "3" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>, label: "Scheduled", value: "2" },
          { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>, label: "Drafts", value: "4" },
        ];
        break;
      default: // Default stats when no specific context
        stats = [
          { icon: <FaCalendarAlt size={16} />, label: "Today", value: "3 Meetings" },
          { icon: <FaJira size={16} />, label: "Open Tasks", value: "5" },
          { icon: <FaShopify size={16} />, label: "Sales Today", value: "$1.2k" },
          { icon: <FaSlack size={16} />, label: "Unread", value: "2" },
        ];
    }
    setQuickStats(stats);
  }, [activeContext]); // Rerun when activeContext changes

  // Handle context changes and animations for main content
  useEffect(() => {
    if (activeContext !== lastActiveContext) {
      setIsTransitioning(true);
      
      // Short delay to allow exit animations to complete
      const timer = setTimeout(() => {
        setShowDynamicContent(activeContext !== null);
        setLastActiveContext(activeContext);
        setIsTransitioning(false);
      }, 300); // Keep this delay
      
      return () => clearTimeout(timer);
    }
  }, [activeContext, lastActiveContext]);

  // Dynamic suggested actions based on context
  const renderSuggestedActions = () => {
    switch (activeContext) {
      case 'initial-summary':
        return (
          <>
            <ActionButton icon={<SiGmail />} label="Show Priority Emails" onClick={() => {}} />
            <ActionButton icon={<SiGooglecalendar />} label="View Calendar" onClick={() => {}} />
            <ActionButton icon={<FaPlus />} label="Summarize Day" onClick={() => {}} />
          </>
        );
      case 'proposal-context':
        return (
          <>
            <ActionButton icon={<FaPaperPlane />} label="Draft Reply Now" onClick={() => { /* Simulate clicking Yes */ }} />
            <ActionButton icon={<FaGoogleDrive />} label="Open Proposal PDF" onClick={() => {}} />
            <ActionButton icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 0118 0 9 9 0 0118 0z" />
              </svg>} label="Remind Me Later" onClick={() => {}} />
          </>
        );
      case 'draft-preview':
        return (
          <>
            <ActionButton icon={<FaPaperPlane />} label="Send Email" onClick={() => {}} />
            <ActionButton icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>} label="Edit Draft" onClick={() => {}} />
            <ActionButton icon={<FaCalendarAlt />} label="Schedule Send" onClick={() => {}} />
          </>
        );
      case 'jira':
        return (
          <>
            <ActionButton 
              icon={<FaPlus size={14} />}
              label="Create New Task"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
              label="Assign to Team"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>}
              label="Move to In Progress"
              onClick={() => {}}
            />
          </>
        );
      case 'shopify':
        return (
          <>
            <ActionButton 
              icon={<FaChartLine size={14} />}
              label="View Full Report"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>}
              label="Check Inventory"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              label="Update Pricing"
              onClick={() => {}}
            />
          </>
        );
      case 'shopify-order':
        return (
          <>
            <ActionButton 
              icon={<FaEnvelope size={14} />}
              label="Draft Customer Update"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaBriefcaseIcon size={14} />}
              label="Check Inventory Log"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaGiftIcon size={14} />}
              label="Mark as Fulfilled"
              onClick={() => {}}
            />
          </>
        );
      case 'shopify-draft':
        return (
          <>
            <ActionButton 
              icon={<FaPaperPlane size={14} />}
              label="Send Email"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaEdit size={14} />}
              label="Edit Further"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaRegClock size={14} />}
              label="Set Reminder (48h)"
              onClick={() => {}}
            />
          </>
        );
      case 'gmail':
        return (
          <>
            <ActionButton 
              icon={<FaEnvelope size={14} />}
              label="Create New Draft"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              label="Check Inbox"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>}
              label="Schedule Send"
              onClick={() => {}}
            />
          </>
        );
      case 'client-overview':
        return (
          <>
            <ActionButton 
              icon={<FaEnvelope size={14} />}
              label="Draft Follow-up Email"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaBriefcaseIcon size={14} />}
              label="Review Client Notes"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaRegClock size={14} />}
              label="Schedule Next Call"
              onClick={() => {}}
            />
          </>
        );
      case 'sales-performance-report':
        return (
          <>
            <ActionButton 
              icon={<FaChartLine size={14} />}
              label="Analyze Ad Performance"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              label="Check Email Open Rates"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>}
              label="Suggest Campaign Ideas"
              onClick={() => {}}
            />
          </>
        );
      case 'suggested-times':
        return (
          <>
            <ActionButton 
              icon={<GoClock size={14} />}
              label="Use First Slot"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<GoClock size={14} />}
              label="Use Second Slot"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>}
              label="Suggest Other Times"
              onClick={() => {}}
            />
          </>
        );
      case 'meeting-request-email':
        return (
          <>
            <ActionButton 
              icon={<GoMail size={14} />}
              label="Send Email"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaEdit size={14} />}
              label="Edit Draft"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaRegClock size={14} />}
              label="Discard"
              onClick={() => {}}
            />
          </>
        );
      case 'email-campaign-overview':
        return (
          <>
            <ActionButton 
              icon={<FaEnvelope size={14} />}
              label="Finalize in Klaviyo"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              label="Schedule Send"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>}
              label="A/B Test Subjects"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>}
              label="Add Resend Logic"
              onClick={() => {}}
            />
          </>
        );
      default:
        return (
          <>
            <ActionButton 
              icon={<FaPlus size={14} />}
              label="Create Task"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaPaperPlane size={14} />}
              label="Send Update"
              onClick={() => {}}
            />
            <ActionButton 
              icon={<FaEnvelope size={14} />}
              label="Draft Email"
              onClick={() => {}}
            />
          </>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      {/* Quick Stats Section - Dynamic based on context */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
        key={`stats-${activeContext || 'default'}-${quickStats.map(s=>s.value).join('-')}`} // Key change triggers animation
        initial={{ opacity: 0.8, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {quickStats.map((stat, index) => (
          <QuickStatCard 
            key={`stat-${index}-${activeContext || 'default'}-${stat.label}`}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </motion.div>
      
      {/* Suggested Actions - Dynamic based on context */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Suggested Actions
          </h3>
          {activeContext && (
            <div className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60 capitalize">
              {activeContext.replace('-', ' ')} {/* Display context nicely */}
            </div>
          )}
        </div>
        <motion.div 
          className="grid grid-cols-1 gap-2"
          key={`actions-${activeContext || 'default'}`}
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSuggestedActions()}
        </motion.div>
      </div>
      
      {/* Dynamic Content Area with Context Details */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Context Details
          </h3>
          {isTransitioning && (
            <div className="flex items-center space-x-1 text-white/40 text-xs">
              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Updating</span>
            </div>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={`context-${activeContext || 'empty'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {/* --- Render based on NEW context states --- */}
            {activeContext === 'initial-summary' && <InitialSummaryCard />}
            {activeContext === 'proposal-context' && <ProposalContextCard />}
            {activeContext === 'draft-preview' && <GmailDraftPreview />}
            {activeContext === 'outstanding-invoices' && <OutstandingInvoicesCard />}
            {activeContext === 'email-reminder-draft' && <EmailReminderDraftCard recipient="john.doe@example.com" subject="Reminder: Meeting on Friday" body={['Please confirm your availability for the meeting on Friday.', 'Looking forward to hearing back from you.']} clientName="John Doe" />}
            {activeContext === 'client-overview' && <ClientOverviewCard />}
            {activeContext === 'sales-performance-report' && <SalesPerformanceReportCard />}
            {activeContext === 'suggested-times' && <TimeSlotsCard />}
            {activeContext === 'meeting-request-email' && 
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
                  sender="Danny" // Assuming sender name is Danny based on prompt
                />
             } 
            {activeContext === 'email-campaign-overview' && 
              <EmailCampaignOverviewCard 
                subjectLineA="New Arrivals Just Landed – Take 20% Off Your First Pick"
                subjectLineB="Fresh Styles for Spring + 20% Off Everything"
                headline="FRESH STYLES FOR THE SEASON"
                subheadline="Update your wardrobe with our latest spring collection — timeless layers, soft textures, and effortless silhouettes."
                ctaText="Shop Now"
                discount="20% OFF – applied automatically at checkout"
                imageUrl="https://via.placeholder.com/400x200.png?text=Spring+Collection+Hero" // Placeholder image
                segment={[
                  "High-engagement: Last 90-day openers + site visitors",
                  "Exclude: Recent purchasers in last 14 days"
                ]}
                sendTime="Tuesday @ 11:00 AM"
              />
            } 

            {/* --- Existing context states --- */}
            {activeContext === 'jira' && <JiraTaskDetails />}
            {activeContext === 'shopify' && <ShopifySalesSnapshot />}
            {activeContext === 'shopify-order' && <ShopifyOrderStatusCard />}
            {activeContext === 'shopify-draft' && <ShopifyDraftEmailCard />}
            {activeContext === 'gmail' && <GmailDraftPreview />} {/* Can reuse draft preview for general gmail context too? Or create specific one later */} 

            {/* --- Default empty state --- */}
            {!activeContext && (
              <div className="h-full flex items-center justify-center companion-card animate-fade-in-up">
                <div className="text-center text-white/40 p-6">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm">Interact with the assistant to see contextual information</p>
                  <p className="text-xs mt-2 text-white/30">Try asking about tasks, sales data, or drafting an email</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContextualCompanion;
