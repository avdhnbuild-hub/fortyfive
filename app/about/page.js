import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import NewsletterCTA from '@/components/site/NewsletterCTA';

export const metadata = {
  title: 'About: fortyfive',
  description: 'Startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <section className="container pt-14 md:pt-24 pb-16 max-w-3xl">
          <p className="eyebrow text-signal">About</p>
          <h1 className="mt-4 font-editorial text-[48px] md:text-[80px] leading-[0.98] tracking-tight">
            A publication for startups, technology, and capital.
          </h1>

          <div className="mt-12 space-y-6 text-[17px] md:text-[19px] leading-[1.7] text-ink/85">
            <p>
              <strong className="text-ink font-semibold">fortyfive</strong> is a publication covering startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.
            </p>
            <p>
              Most startup and technology coverage focuses on announcements. Who raised money. Who launched. Who exited. Who failed.
            </p>
            <p className="font-editorial text-[26px] md:text-[32px] leading-[1.2]">
              fortyfive goes deeper.
            </p>
            <p>
              We explain what the story means, why it matters, and how it connects to the larger startup, technology, and capital ecosystem.
            </p>
          </div>

          <div className="mt-16 p-8 md:p-10 bg-ink text-white rounded-2xl">
            <p className="eyebrow text-signal mb-3">Our promise</p>
            <p className="font-editorial text-[32px] md:text-[44px] leading-[1.05] tracking-tight">
              Useful reporting for people building, backing, and studying technology companies.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow text-signal mb-4">What we cover</p>
              <ul className="space-y-2 text-[16px]">
                {['Startups', 'Technology', 'Capital', 'AI', 'Growth', 'Markets', 'Founder strategy', 'India'].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-signal mb-4">Who it is for</p>
              <ul className="space-y-2 text-[16px]">
                {['Founders', 'Students', 'Operators', 'Investors', 'Creators', 'Anyone following technology and markets'].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
