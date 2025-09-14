'use client';

import { useState } from 'react';
import { VALUE_OPTIONS } from '../lib/constants';

interface ValueSelectorProps {
  variant?: 'single' | 'multiple';
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  className?: string;
}

export function ValueSelector({ 
  variant = 'multiple', 
  selectedValues, 
  onSelectionChange,
  className = ''
}: ValueSelectorProps) {
  const handleValueToggle = (valueId: string) => {
    if (variant === 'single') {
      onSelectionChange([valueId]);
    } else {
      const newSelection = selectedValues.includes(valueId)
        ? selectedValues.filter(id => id !== valueId)
        : [...selectedValues, valueId];
      onSelectionChange(newSelection);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          What causes matter to you?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {variant === 'multiple' 
            ? 'Select all that apply to get personalized recommendations'
            : 'Choose your primary area of interest'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {VALUE_OPTIONS.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleValueToggle(option.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200 card-hover
                ${isSelected 
                  ? 'border-primary bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-surface hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm ${
                    isSelected ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {option.label}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedValues.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            ✓ {selectedValues.length} value{selectedValues.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}
