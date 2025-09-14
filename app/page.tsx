'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { AppShell } from '../components/AppShell';
import { ValueSelector } from '../components/ValueSelector';
import { CharityCard } from '../components/CharityCard';
import { DonationButton } from '../components/DonationButton';
import { ImpactProgressBar } from '../components/ImpactProgressBar';
import { getAIRecommendations } from '../lib/ai-service';
import { DONATION_AMOUNTS } from '../lib/constants';
import { AIRecommendation, Charity, Donation } from '../lib/types';
import { Sparkles, TrendingUp, Users, DollarSign } from 'lucide-react';

type AppState = 'onboarding' | 'recommendations' | 'donation' | 'dashboard';

export default function HomePage() {
  const { user } = useMiniKit();
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);

  // Load recommendations when values are selected
  useEffect(() => {
    if (selectedValues.length > 0 && appState === 'onboarding') {
      loadRecommendations();
    }
  }, [selectedValues]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const recs = await getAIRecommendations(selectedValues);
      setRecommendations(recs);
      setAppState('recommendations');
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonateClick = (charity: Charity) => {
    setSelectedCharity(charity);
    setAppState('donation');
  };

  const handleDonationConfirm = async () => {
    if (!selectedCharity || !user) return;

    setIsLoading(true);
    try {
      // Simulate donation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDonation: Donation = {
        donationId: Date.now().toString(),
        userId: user.fid?.toString() || 'anonymous',
        charityId: selectedCharity.charityId,
        amount: selectedAmount,
        timestamp: new Date(),
        transactionHash: '0x' + Math.random().toString(16).substr(2, 8)
      };

      setDonations(prev => [...prev, newDonation]);
      setAppState('dashboard');
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <AppShell>
      {/* Onboarding State */}
      {appState === 'onboarding' && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to ImpactAI
            </h2>
            <p className="text-gray-600">
              Let AI help you find charities that align with your values
            </p>
          </div>

          <ValueSelector
            selectedValues={selectedValues}
            onSelectionChange={setSelectedValues}
          />

          {selectedValues.length > 0 && (
            <div className="text-center">
              <DonationButton
                onClick={loadRecommendations}
                isLoading={isLoading}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Recommendations
              </DonationButton>
            </div>
          )}
        </div>
      )}

      {/* Recommendations State */}
      {appState === 'recommendations' && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recommended for You
              </h2>
              <p className="text-sm text-gray-600">
                AI-powered matches based on your values
              </p>
            </div>
            <button
              onClick={() => setAppState('onboarding')}
              className="text-primary hover:text-blue-600 text-sm font-medium"
            >
              Change Values
            </button>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <CharityCard
                key={rec.charity.charityId}
                charity={rec.charity}
                matchScore={rec.matchScore}
                reasoning={rec.reasoning}
                onDonate={handleDonateClick}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {donations.length > 0 && (
            <div className="text-center">
              <button
                onClick={() => setAppState('dashboard')}
                className="text-primary hover:text-blue-600 font-medium"
              >
                View Impact Dashboard →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Donation State */}
      {appState === 'donation' && selectedCharity && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center space-x-3 mb-6">
            <button
              onClick={() => setAppState('recommendations')}
              className="text-gray-400 hover:text-gray-600"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-gray-900">Make a Donation</h2>
          </div>

          <CharityCard
            charity={selectedCharity}
            variant="small"
          />

          <div className="bg-surface rounded-lg p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Select Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`
                    py-3 px-4 rounded-md border-2 font-medium transition-all duration-200
                    ${selectedAmount === amount
                      ? 'border-primary bg-blue-50 text-primary'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>
            </div>

            <DonationButton
              amount={selectedAmount}
              onClick={handleDonationConfirm}
              isLoading={isLoading}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Dashboard State */}
      {appState === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Impact Dashboard</h2>
            <button
              onClick={() => setAppState('recommendations')}
              className="text-primary hover:text-blue-600 text-sm font-medium"
            >
              Donate More
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Donated</p>
                  <p className="text-lg font-bold text-gray-900">${totalDonated}</p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Charities Supported</p>
                  <p className="text-lg font-bold text-gray-900">{donations.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Progress */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Your Impact</h3>
            
            <ImpactProgressBar
              title="Trees Planted"
              current={Math.floor(totalDonated * 2)}
              target={200}
              unit="trees"
              description="Through environmental donations"
            />

            <ImpactProgressBar
              title="Students Helped"
              current={Math.floor(totalDonated * 0.5)}
              target={50}
              unit="students"
              description="Through education donations"
            />
          </div>

          {/* Recent Donations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Recent Donations</h3>
            {donations.map((donation) => {
              const charity = recommendations.find(r => r.charity.charityId === donation.charityId)?.charity;
              return (
                <div key={donation.donationId} className="bg-surface rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{charity?.name || 'Unknown Charity'}</p>
                      <p className="text-sm text-gray-600">
                        {donation.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${donation.amount}</p>
                      <p className="text-xs text-gray-500">Confirmed</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AppShell>
  );
}
