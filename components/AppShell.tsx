'use client';

import { useMiniKit } from '@coinbase/minikit';
import { User, Heart } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const { user } = useMiniKit();

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-gray-100">
        <div className="max-w-screen-sm mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ImpactAI</h1>
                {variant === 'default' && (
                  <p className="text-sm text-gray-600">Donate with Purpose</p>
                )}
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                {variant === 'default' && user.displayName && (
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-sm mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-100 mt-12">
        <div className="max-w-screen-sm mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-500">
            Powered by AI • Built on Base
          </p>
        </div>
      </footer>
    </div>
  );
}
