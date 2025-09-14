export interface User {
  userId: string;
  farcasterId?: string;
  connectedWalletAddress?: string;
  preferredValues: string[];
  donationHistory: Donation[];
}

export interface Charity {
  charityId: string;
  name: string;
  description: string;
  website: string;
  impactAreas: string[];
  impactMetrics: ImpactMetric[];
  imageUrl?: string;
  rating?: number;
  totalDonations?: number;
}

export interface Donation {
  donationId: string;
  userId: string;
  charityId: string;
  amount: number;
  timestamp: Date;
  impactUpdate?: string;
  transactionHash?: string;
}

export interface ImpactMetric {
  metric: string;
  value: string;
  description: string;
}

export interface ValueOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface AIRecommendation {
  charity: Charity;
  matchScore: number;
  reasoning: string;
}
