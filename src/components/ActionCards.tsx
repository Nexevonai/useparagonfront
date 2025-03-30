'use client';

import React from 'react';
import { 
  FaShopify, FaSlack, FaGoogle, FaCalendar, FaEnvelope, FaFileAlt, FaExternalLinkAlt 
} from 'react-icons/fa';
import { SiJira, SiSalesforce } from 'react-icons/si';

// Action Button Component
const ActionButton: React.FC<{
  text: string;
  icon?: React.ReactNode;
  primary?: boolean;
}> = ({ text, icon, primary = false }) => (
  <button 
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
      primary 
        ? 'bg-gradient-to-r from-[#00f5ff] to-[#0099ff] text-black hover:shadow-[0_0_10px_rgba(0,245,255,0.5)]' 
        : 'bg-black/30 text-white/90 border border-white/10 hover:bg-black/40'
    }`}
  >
    {text}
    {icon && <span className="ml-1">{icon}</span>}
  </button>
);

// Jira Card
export const JiraCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#0052CC] rounded">
        <SiJira className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Jira</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-green-400 text-lg">✓</span>
        <span className="text-white font-medium">Task Created</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="text-xs text-white/60 mb-1">PROJECT-123</div>
        <div className="text-sm text-white/90 font-medium mb-2">Design new landing page mockups</div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span>Assigned to:</span>
          <span className="bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded">Alex Chen</span>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="View Task" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Slack Card
export const SlackCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#4A154B] rounded">
        <FaSlack className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Slack</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-green-400 text-lg">✓</span>
        <span className="text-white font-medium">Message Sent</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="text-xs text-white/60 mb-1">
          <span className="text-[#4A154B] bg-white/20 px-1.5 py-0.5 rounded">#design</span>
        </div>
        <div className="text-sm text-white/90 mb-1">Hey team, check out the latest chatbot UI concepts...</div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="Open in Slack" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Shopify Card
export const ShopifyCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#96BF48] rounded">
        <FaShopify className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Shopify</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-blue-400 text-lg">📊</span>
        <span className="text-white font-medium">Sales Summary (Last 7 days)</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <div className="text-xs text-white/60">Total Sales</div>
            <div className="text-lg font-semibold text-white">$12,450</div>
          </div>
          <div>
            <div className="text-xs text-white/60">Orders</div>
            <div className="text-lg font-semibold text-white">312</div>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <div className="text-xs text-white/60">Top Product</div>
          <div className="text-sm font-medium text-white/90">'Amazing Gadget'</div>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="View Full Report" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Gmail Card
export const GmailCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#D44638] rounded">
        <FaEnvelope className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Gmail</div>
    </div>

    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-blue-400 text-lg">✉️</span>
        <span className="text-white font-medium">Email Draft Ready</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
          <div className="text-xs text-white/60">To:</div>
          <div className="text-xs text-white/90">john@clientcorp.com</div>
          <div className="text-xs text-white/60">Subject:</div>
          <div className="text-xs text-white/90 font-medium">Re: Proposal Request</div>
          <div className="text-xs text-white/60">Attach:</div>
          <div className="text-xs text-white/90 flex items-center gap-1">
            <FaFileAlt className="text-white/60 text-[10px]" /> Proposal_Draft_vLatest.pdf
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/80 line-clamp-3">
          Hi John,<br />
          Got your message about the proposal. Confirming I'll get the latest draft (attached) over to you by EOD tomorrow as requested.<br />
          <br />
          Let me know if you need anything else in the meantime.
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 text-sm font-medium text-white/90">
          Does this look okay to send?
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-2">
      <ActionButton text="Edit" />
      <ActionButton text="Send Now" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Google Drive Card
export const GoogleDriveCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#0F9D58] rounded">
        <FaGoogle className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Google Drive</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-blue-400 text-lg">📄</span>
        <span className="text-white font-medium">File Uploaded</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <FaFileAlt className="text-white/70" />
          <span className="text-sm text-white/90 font-medium">Chatbot_Ad_Script_v3.docx</span>
        </div>
        <div className="text-xs text-white/60">
          Saved to: <span className="text-white/80">Marketing Materials</span>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="Open File" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Salesforce Card
export const SalesforceCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#00A1E0] rounded">
        <SiSalesforce className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Salesforce</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-green-400 text-lg">✓</span>
        <span className="text-white font-medium">Lead Created</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
          <div className="text-xs text-white/60">Name:</div>
          <div className="text-xs text-white/90 font-medium">Michael Scott</div>
          <div className="text-xs text-white/60">Company:</div>
          <div className="text-xs text-white/90">Dunder Mifflin</div>
          <div className="text-xs text-white/60">Status:</div>
          <div className="text-xs text-white/90">
            <span className="bg-yellow-500/30 text-yellow-200 px-1.5 py-0.5 rounded text-[10px]">NEW</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="View Lead" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Google Calendar Card
export const GoogleCalendarCard: React.FC = () => (
  <div className="p-4 min-w-[300px] max-w-md">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 bg-[#4285F4] rounded">
        <FaCalendar className="text-white text-lg" />
      </div>
      <div className="text-white/90 font-medium">Google Calendar</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-blue-400 text-lg">📅</span>
        <span className="text-white font-medium">Event Scheduled</span>
      </div>
      <div className="bg-black/20 rounded-lg p-3 border border-white/10">
        <div className="text-sm text-white/90 font-medium mb-2">Chatbot Demo Meeting</div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
          <div className="text-xs text-white/60">When:</div>
          <div className="text-xs text-white/90">Tomorrow at 2:00 PM</div>
          <div className="text-xs text-white/60">Guests:</div>
          <div className="text-xs text-white/90">client@example.com</div>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end gap-2">
      <ActionButton text="View Event" icon={<FaExternalLinkAlt />} primary />
    </div>
  </div>
);

// Typing Indicator Component
export const TypingIndicator: React.FC = () => (
  <div className="message-bubble-bot p-3 inline-flex items-center">
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);
