'use client';

import { CheckCircle, Target } from 'lucide-react';

interface ImpactProgressBarProps {
  variant?: 'active' | 'completed';
  title: string;
  current: number;
  target: number;
  unit?: string;
  description?: string;
  className?: string;
}

export function ImpactProgressBar({
  variant = 'active',
  title,
  current,
  target,
  unit = '',
  description,
  className = ''
}: ImpactProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = variant === 'completed' || percentage >= 100;

  return (
    <div className={`bg-surface rounded-lg p-4 border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
          {description && (
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="ml-3">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Target className="w-5 h-5 text-primary" />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">
            {current.toLocaleString()} {unit}
          </span>
          <span className="text-gray-600">
            {target.toLocaleString()} {unit}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-green-500' : 'bg-primary'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between text-xs">
        <span className={`font-medium ${
          isCompleted ? 'text-green-600' : 'text-primary'
        }`}>
          {percentage.toFixed(0)}% Complete
        </span>
        <span className="text-gray-500">
          {isCompleted ? 'Goal Achieved!' : `${(target - current).toLocaleString()} ${unit} to go`}
        </span>
      </div>
    </div>
  );
}
