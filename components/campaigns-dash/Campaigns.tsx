'use client'
import React from 'react';
import { useCampaigns } from '@/app/context/CampaignsContext';
import { Campaign } from '@/app/types/Campaign';

export default function Campaigns() {
  const { campaigns } = useCampaigns();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Browse Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.length === 0 && (
          <div className="text-white">No campaigns yet. Create one!</div>
        )}
        {campaigns.map((item: Campaign, index: number) => (
          <div key={index} className="bg-[#23232b] rounded-lg p-4 shadow">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded mb-3" />
            <h2 className="text-lg font-bold text-white">{item.title}</h2>
            <p className="text-[#b0b0b0]">{item.description}</p>
            <div className="mt-2 text-sm text-[#1dc071]">Goal: {item.target}</div>
            <div className="text-xs text-[#b0b0b0]">By {item.name} | Ends: {item.deadline}</div>
          </div>
        ))}
      </div>
    </div>
  );
}