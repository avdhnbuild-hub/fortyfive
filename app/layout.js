import './globals.css';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fortyfive.vercel.app';
const description = 'Startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'fortyfive',
    template: '%s | fortyfive',
  },
  description,
  keywords: ['fortyfive', 'startups', 'technology', 'capital', 'funding', 'AI', 'growth', 'markets', 'India', 'global business'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'fortyfive',
    description,
    siteName: 'fortyfive',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'fortyfive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fortyfive',
    description,
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}
