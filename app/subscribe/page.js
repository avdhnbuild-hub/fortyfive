import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import NewsletterCTA from '@/components/site/NewsletterCTA';

export const metadata = {
  title: 'Subscribe: fortyfive',
  description: 'A weekly brief on startups, technology, capital, AI, growth, and markets.',
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <section className="container pt-14 md:pt-24 pb-10 max-w-3xl">
          <p className="eyebrow text-signal">Newsletter</p>
          <h1 className="mt-4 font-editorial text-[48px] md:text-[80px] leading-[0.98] tracking-tight">
            Get fortyfive in your inbox.
          </h1>
          <p className="mt-6 text-[17px] md:text-[19px] text-ink/70 leading-relaxed max-w-2xl">
            A weekly brief on startups, technology, capital, AI, growth, and markets.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'One issue a week', d: 'A tight, curated read.' },
              { t: 'Analysis, not press releases', d: 'What the story means, not just what happened.' },
              { t: 'Global coverage', d: 'Startup and technology stories from the markets that matter.' },
            ].map((f) => (
              <div key={f.t} className="p-6 bg-white border border-line rounded-xl">
                <p className="eyebrow text-signal mb-3">{f.t}</p>
                <p className="text-[15px] text-ink/75 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
