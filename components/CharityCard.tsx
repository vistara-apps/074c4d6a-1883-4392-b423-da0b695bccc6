'use client';

import Image from 'next/image';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { Charity } from '../lib/types';

interface CharityCardProps {
  charity: Charity;
  variant?: 'default' | 'small';
  matchScore?: number;
  reasoning?: string;
  onDonate?: (charity: Charity) => void;
  className?: string;
}

export function CharityCard({ 
  charity, 
  variant = 'default', 
  matchScore,
  reasoning,
  onDonate,
  className = ''
}: CharityCardProps) {
  const isSmall = variant === 'small';

  return (
    <div className={`
      bg-surface rounded-lg shadow-card border border-gray-100 overflow-hidden card-hover
      ${className}
    `}>
      {/* Image */}
      <div className={`relative ${isSmall ? 'h-32' : 'h-48'} bg-gray-200`}>
        {charity.imageUrl ? (
          <Image
            src={charity.imageUrl}
            alt={charity.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
            <span className="text-white text-2xl font-bold">
              {charity.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Match Score Badge */}
        {matchScore && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
            {matchScore}% Match
          </div>
        )}

        {/* Rating Badge */}
        {charity.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{charity.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-${isSmall ? '4' : '6'}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-semibold text-gray-900 ${isSmall ? 'text-sm' : 'text-lg'}`}>
            {charity.name}
          </h3>
          <button
            onClick={() => window.open(charity.website, '_blank')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <p className={`text-gray-600 mb-4 ${isSmall ? 'text-xs' : 'text-sm'} leading-relaxed`}>
          {charity.description}
        </p>

        {/* AI Reasoning */}
        {reasoning && !isSmall && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Why this matches:</strong> {reasoning}
            </p>
          </div>
        )}

        {/* Impact Areas */}
        <div className="flex flex-wrap gap-2 mb-4">
          {charity.impactAreas.slice(0, isSmall ? 2 : 3).map((area) => (
            <span
              key={area}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Impact Metrics */}
        {!isSmall && charity.impactMetrics.length > 0 && (
          <div className="mb-4 space-y-2">
            {charity.impactMetrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{metric.metric}</span>
                <span className="font-semibold text-gray-900">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Total Donations */}
        {charity.totalDonations && (
          <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>${charity.totalDonations.toLocaleString()} raised</span>
          </div>
        )}

        {/* Donate Button */}
        {onDonate && (
          <button
            onClick={() => onDonate(charity)}
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Donate Now
          </button>
        )}
      </div>
    </div>
  );
}
