import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'fortyfive: Startups, technology, capital, and growth',
  description:
    'fortyfive covers startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.',
  keywords: ['fortyfive', 'startups', 'technology', 'capital', 'funding', 'AI', 'growth', 'markets', 'India', 'global business'],
  openGraph: {
    title: 'fortyfive: Startups, technology, capital, and growth',
    description: 'Startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
