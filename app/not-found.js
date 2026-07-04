import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1 flex items-center">
        <div className="container py-24 text-center">
          <p className="eyebrow text-signal">404</p>
          <h1 className="mt-4 font-editorial text-[52px] md:text-[96px] leading-none tracking-tight">Page not found.</h1>
          <p className="mt-6 text-[17px] md:text-[19px] text-ink/70">The story you&apos;re looking for may have moved.</p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center h-12 px-6 rounded-full bg-ink text-white text-[14px] font-medium hover:bg-signal transition-colors"
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
