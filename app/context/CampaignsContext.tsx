'use client'

import React, { createContext, useContext, useState } from 'react';
import { Campaign } from '../types/Campaign';

interface CampaignsContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  
}


const CampaignsContext = createContext<CampaignsContextType|undefined>(undefined);

export function CampaignsProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const addCampaign = (campaign: Campaign) => setCampaigns(prev => [campaign, ...prev]);

  return (
    <CampaignsContext.Provider value={{ campaigns, addCampaign }}>
      {children}
    </CampaignsContext.Provider>
  );
}

export const useCampaigns = () => {
  const context = useContext(CampaignsContext);
  if (!context) throw new Error('useCampaigns must be used within a CampaignsProvider');
  return context;
};
