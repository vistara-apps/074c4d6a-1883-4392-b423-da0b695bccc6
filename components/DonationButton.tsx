'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';

interface DonationButtonProps {
  variant?: 'primary' | 'secondary';
  amount?: number;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function DonationButton({
  variant = 'primary',
  amount,
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  children
}: DonationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center px-6 py-3 rounded-md font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-primary text-white hover:bg-blue-600 focus:ring-primary
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500
      border border-gray-300
    `
  };

  const content = children || (
    <>
      <Heart className={`w-4 h-4 mr-2 ${isHovered ? 'fill-current' : ''}`} />
      {amount ? `Donate $${amount}` : 'Donate'}
    </>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        content
      )}
    </button>
  );
}
