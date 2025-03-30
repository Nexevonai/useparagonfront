'use client';

import React from 'react';
import { FaShopify, FaSlack, FaGoogle, FaCalendar, FaEnvelope } from 'react-icons/fa';
import { SiJira, SiAsana, SiSalesforce, SiZendesk, SiTrello, SiHubspot } from 'react-icons/si';

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'available';
  color: string;
  icon: React.ReactNode;
  category?: string;
}

interface IntegrationListProps {
  onRunScenario1?: () => void;
  onRunScenario2?: () => void;
  onRunScenario3?: () => void;
  onRunScenario4?: () => void;
  onRunScenario5?: () => void;
  onRunScenario6?: () => void;
  onRunScenario7?: () => void;
  onRunScenario8?: () => void;
}

const integrationsByCategory: Record<string, Integration[]> = {
  "Communication": [
    { 
      id: 'slack', 
      name: 'Slack', 
      status: 'connected', 
      color: '#4A154B', 
      icon: <FaSlack /> 
    },
    { 
      id: 'gmail', 
      name: 'Gmail', 
      status: 'connected', 
      color: '#D44638', 
      icon: <FaEnvelope /> 
    },
  ],
  "Project Management": [
    { 
      id: 'jira', 
      name: 'Jira', 
      status: 'connected', 
      color: '#0052CC', 
      icon: <SiJira /> 
    },
    { 
      id: 'asana', 
      name: 'Asana', 
      status: 'available', 
      color: '#FC636B', 
      icon: <SiAsana /> 
    },
    { 
      id: 'trello', 
      name: 'Trello', 
      status: 'connected', 
      color: '#0079BF', 
      icon: <SiTrello /> 
    },
  ],
  "CRM & E-commerce": [
    { 
      id: 'salesforce', 
      name: 'Salesforce', 
      status: 'available', 
      color: '#00A1E0', 
      icon: <SiSalesforce /> 
    },
    { 
      id: 'shopify', 
      name: 'Shopify', 
      status: 'connected', 
      color: '#96BF48', 
      icon: <FaShopify /> 
    },
    { 
      id: 'hubspot', 
      name: 'HubSpot', 
      status: 'connected', 
      color: '#FF7A59', 
      icon: <SiHubspot /> 
    },
    { 
      id: 'zendesk', 
      name: 'Zendesk', 
      status: 'available', 
      color: '#03363D', 
      icon: <SiZendesk /> 
    },
  ],
  "Cloud & Productivity": [
    { 
      id: 'googledrive', 
      name: 'Google Drive', 
      status: 'connected', 
      color: '#0F9D58', 
      icon: <FaGoogle /> 
    },
    { 
      id: 'googlecalendar', 
      name: 'Google Calendar', 
      status: 'available', 
      color: '#4285F4', 
      icon: <FaCalendar /> 
    },
  ]
};

const IntegrationList: React.FC<IntegrationListProps> = ({ onRunScenario1, onRunScenario2, onRunScenario3, onRunScenario4, onRunScenario5, onRunScenario6, onRunScenario7, onRunScenario8 }) => {
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {Object.entries(integrationsByCategory).map(([category, integrations]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-white/60 mb-3 px-2">{category}</h3>
          <ul className="space-y-1">
            {integrations.map((integration) => (
              <li 
                key={integration.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className={`p-2 rounded-lg`} style={{ backgroundColor: integration.color + '33' }}>
                  <div className="w-5 h-5 flex items-center justify-center" style={{ color: integration.color }}>
                    {integration.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{integration.name}</div>
                </div>
                {/* Status Indicator */}
                <div
                  className={`status-dot ${integration.status === 'connected' ? 'status-connected' : 'status-available'}`}
                  title={integration.status === 'connected' ? 'Connected' : 'Available to Connect'}
                ></div>
              </li>
            ))}
            {/* Add Scenario Buttons specifically after Cloud & Productivity category */}
            {category === "Cloud & Productivity" && (
              <li className="mt-2 px-2 space-y-1"> {/* Added margin-top and spacing */} 
                {onRunScenario1 && (
                   <button 
                    onClick={onRunScenario1}
                    className="w-full text-left py-2 px-3 rounded-lg bg-indigo-600/50 hover:bg-indigo-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 1
                   </button>
                )}
                {onRunScenario2 && ( // Add button for Scenario 2
                   <button 
                    onClick={onRunScenario2}
                    className="w-full text-left py-2 px-3 rounded-lg bg-teal-600/50 hover:bg-teal-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 2
                   </button>
                )}
                {onRunScenario3 && ( // Add button for Scenario 3
                   <button 
                    onClick={onRunScenario3}
                    className="w-full text-left py-2 px-3 rounded-lg bg-green-600/50 hover:bg-green-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 3
                   </button>
                )}
                {onRunScenario4 && ( // Add button for Scenario 4
                   <button
                    onClick={onRunScenario4}
                    className="w-full text-left py-2 px-3 rounded-lg bg-purple-600/50 hover:bg-purple-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 4
                   </button>
                )}
                {onRunScenario5 && ( // Add button for Scenario 5
                   <button 
                    onClick={onRunScenario5}
                    className="w-full text-left py-2 px-3 rounded-lg bg-orange-600/50 hover:bg-orange-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 5
                   </button>
                )}
                {onRunScenario6 && ( // Add button for Scenario 6
                   <button 
                    onClick={onRunScenario6}
                    className="w-full text-left py-2 px-3 rounded-lg bg-purple-600/50 hover:bg-purple-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 6
                   </button>
                )}
                {onRunScenario7 && ( // Add button for Scenario 7
                   <button 
                    onClick={onRunScenario7}
                    className="w-full text-left py-2 px-3 rounded-lg bg-blue-600/50 hover:bg-blue-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 7
                   </button>
                )}
                {onRunScenario8 && ( // Add button for Scenario 8
                   <button 
                    onClick={onRunScenario8}
                    className="w-full text-left py-2 px-3 rounded-lg bg-green-600/50 hover:bg-green-600/70 text-sm font-medium text-white transition-colors"
                   >
                    Run Scenario 8
                   </button>
                )}
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IntegrationList;
