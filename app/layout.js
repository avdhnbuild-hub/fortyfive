import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'fortyfive — Startups, technology, capital, and growth — clearly explained.',
  description:
    'fortyfive covers startups, technology, capital, AI, growth, markets, and new-economy stories globally — with a strong India lens. Clear stories. Sharp context. No noise.',
  keywords: ['fortyfive', 'startups', 'technology', 'capital', 'funding', 'AI', 'growth', 'markets', 'India', 'global business'],
  openGraph: {
    title: 'fortyfive — Startups, technology, capital, and growth — clearly explained.',
    description: 'Global startup, technology, capital, AI, markets, and growth stories with a strong India lens.',
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
