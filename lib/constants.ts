import { ValueOption, Charity } from './types';

export const VALUE_OPTIONS: ValueOption[] = [
  {
    id: 'environment',
    label: 'Environment',
    description: 'Climate change, conservation, sustainability',
    icon: '🌱'
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Schools, literacy, educational access',
    icon: '📚'
  },
  {
    id: 'health',
    label: 'Health',
    description: 'Medical research, healthcare access',
    icon: '🏥'
  },
  {
    id: 'poverty',
    label: 'Poverty',
    description: 'Food security, housing, basic needs',
    icon: '🤝'
  },
  {
    id: 'arts',
    label: 'Arts & Culture',
    description: 'Museums, music, cultural preservation',
    icon: '🎨'
  },
  {
    id: 'animals',
    label: 'Animal Welfare',
    description: 'Animal rescue, wildlife protection',
    icon: '🐾'
  }
];

export const SAMPLE_CHARITIES: Charity[] = [
  {
    charityId: '1',
    name: 'Environmental Conservation Alliance',
    description: 'A charity focused on protecting endangered ecosystems and promoting sustainable practices.',
    website: 'https://example.com/eca',
    impactAreas: ['environment', 'climate'],
    impactMetrics: [
      { metric: 'Trees Planted', value: '50,000+', description: 'Trees planted this year' },
      { metric: 'CO2 Reduced', value: '1,200 tons', description: 'Carbon emissions prevented' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    rating: 4.8,
    totalDonations: 125000
  },
  {
    charityId: '2',
    name: 'Global Education Initiative',
    description: 'Providing quality education and learning resources to underserved communities worldwide.',
    website: 'https://example.com/gei',
    impactAreas: ['education', 'children'],
    impactMetrics: [
      { metric: 'Students Helped', value: '25,000+', description: 'Students receiving educational support' },
      { metric: 'Schools Built', value: '150', description: 'New schools constructed' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
    rating: 4.9,
    totalDonations: 200000
  },
  {
    charityId: '3',
    name: 'Healthcare Access Foundation',
    description: 'Improving healthcare access and medical research for life-threatening diseases.',
    website: 'https://example.com/haf',
    impactAreas: ['health', 'medical'],
    impactMetrics: [
      { metric: 'Patients Treated', value: '10,000+', description: 'Patients receiving free treatment' },
      { metric: 'Research Grants', value: '$2M', description: 'Funding for medical research' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    rating: 4.7,
    totalDonations: 180000
  }
];

export const DONATION_AMOUNTS = [5, 10, 25, 50, 100];
