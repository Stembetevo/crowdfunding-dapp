'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaigns } from '../../context/CampaignsContext';
import { Campaign } from '../../types/Campaign';
import CustomButton from '../../components/CustomButton';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID } from '@/constants/constant';

const CLOCK_OBJECT_ID = "0x6";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { campaigns } = useCampaigns();
  const currentAccount = useCurrentAccount();
  const { mutate: execDonation } = useSignAndExecuteTransaction();
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const campaignId = params.id as string;
    const foundCampaign = campaigns.find(c => c.id === campaignId);
    setCampaign(foundCampaign || null);
  }, [params.id, campaigns]);

  const handleDonate = async () => {
    if (!campaign || !donationAmount || !currentAccount) return;
    
    setIsLoading(true);
    
    try {
      const txb = new Transaction();
      txb.moveCall({
        target: `${PACKAGE_ID}::crowdfunding::donate_to_campaign`,
        arguments: [
          txb.pure.string(campaign.transactionDigest ?? ''), // Use the transaction digest to identify the campaign
          txb.pure.u64(Number(donationAmount)),
          txb.object(CLOCK_OBJECT_ID)
        ],
      });

      execDonation(
        { transaction: txb },
        {
          onError: (err) => {
            console.error('Donation failed:', err);
            alert('Error: ' + err.message);
            setIsLoading(false);
          },
          onSuccess: (result) => {
            alert('Donation successful! Digest: ' + result.digest);
            setDonationAmount('');
            setIsLoading(false);
            // You might want to refresh campaign data here
          },
        }
      );
    } catch (error) {
      console.error('Donation error:', error);
      setIsLoading(false);
    }
  };

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1c1c24]">
        <div className="text-white text-xl">Campaign not found</div>
      </div>
    );
  }

  const daysLeft = Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const progress = campaign.amountRaised ? (Number(campaign.amountRaised) / Number(campaign.target)) * 100 : 0;

  return (
    <div className="bg-[#1c1c24] min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 text-white hover:text-gray-300 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-[#3a3a43] rounded-lg p-6 mb-6">
          {/* Campaign Image */}
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden">
            <img 
              src={campaign.image || '/placeholder-campaign.jpg'} 
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Campaign Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">{campaign.title}</h1>
              <p className="text-gray-300 mb-6">{campaign.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Creator:</span>
                  <span className="text-white">{campaign.name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Transaction:</span>
                  <span className="text-white font-mono text-xs">{campaign.transactionDigest}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Created:</span>
                  <span className="text-white">{campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div>
              {/* Progress Section */}
              <div className="bg-[#2c2f36] p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-[#1dc071] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-white font-semibold">{campaign.amountRaised || '0'}</div>
                    <div className="text-gray-400 text-sm">Raised</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{campaign.target}</div>
                    <div className="text-gray-400 text-sm">Goal</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{daysLeft > 0 ? daysLeft : 0}</div>
                    <div className="text-gray-400 text-sm">Days Left</div>
                  </div>
                </div>
              </div>

              {/* Donation Section */}
              {currentAccount && daysLeft > 0 && (
                <div className="bg-[#2c2f36] p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-4">Make a Donation</h3>
                  <div className="space-y-4">
                    <input
                      type="number"
                      placeholder="Enter amount in SUI"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full p-3 bg-[#1c1c24] text-white rounded-lg border border-gray-600 focus:border-[#1dc071] outline-none"
                    />
                    <CustomButton
                      btnType="button"
                      title={isLoading ? "Processing..." : "Donate Now"}
                      styles="bg-[#1dc071] w-full disabled:opacity-50"
                      handleClick={handleDonate}
                      disabled={isLoading || !donationAmount}
                    />
                  </div>
                </div>
              )}

              {/* Campaign Ended */}
              {daysLeft <= 0 && (
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <div className="text-red-500 font-semibold">Campaign Ended</div>
                  <div className="text-gray-400 text-sm">This campaign has reached its deadline</div>
                </div>
              )}

              {/* Connect Wallet */}
              {!currentAccount && (
                <div className="bg-yellow-900/20 border border-yellow-500 p-4 rounded-lg text-center">
                  <div className="text-yellow-500 font-semibold">Connect Your Wallet</div>
                  <div className="text-gray-400 text-sm">Connect your wallet to donate to this campaign</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}