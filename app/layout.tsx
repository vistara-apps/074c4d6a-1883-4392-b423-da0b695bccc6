import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'ImpactAI - Donate Smarter',
  description: 'AI-powered charity recommendations aligned with your values',
  openGraph: {
    title: 'ImpactAI - Donate Smarter',
    description: 'AI-powered charity recommendations aligned with your values',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImpactAI - Donate Smarter',
    description: 'AI-powered charity recommendations aligned with your values',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
