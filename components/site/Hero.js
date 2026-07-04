import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function Hero({ featured, latest = [] }) {
  const cat = CATEGORIES.find((c) => c.slug === featured.category);
  const latestItems = latest.slice(0, 3);

  const categoryName = (article) =>
    CATEGORIES.find((category) => category.slug === article.category)?.name || article.categoryName || article.category;

  return (
    <section className="border-b border-line">
      <div className="container pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-signal">TECHNOLOGY. STARTUPS. GROWTH.</p>
          <h1 className="mt-4 text-[38px] sm:text-[48px] md:text-[64px] leading-[1.02] font-semibold tracking-tight">
            The new economy,<br className="hidden sm:block" /> <span className="font-editorial italic font-normal">clearly explained.</span>
          </h1>
          <p className="mt-4 text-[15px] md:text-[17px] text-ink/70 leading-relaxed max-w-2xl">
            fortyfive covers startups, technology, capital, AI, growth, markets, and the companies shaping what comes next.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 border-t border-line pt-5">
            <p className="eyebrow text-signal mb-3">TOP STORY</p>
            <Link href={`/article/${featured.slug}`} className="group block">
              <h2 className="text-[34px] sm:text-[42px] md:text-[52px] leading-[1.05] font-semibold tracking-tight group-hover:text-signal transition-colors">
                {featured.title}
              </h2>
            </Link>
            <p className="mt-4 text-[16px] md:text-[17px] text-ink/75 leading-relaxed max-w-2xl">{featured.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[12px] text-ash">
              <span className="eyebrow text-signal">{cat?.name}</span>
              <span className="h-3 w-px bg-line" />
              <span>{featured.kind}</span>
              <span className="h-3 w-px bg-line" />
              <span>{featured.readTime}</span>
              <span className="h-3 w-px bg-line" />
              <span>{featured.date}</span>
            </div>
            <Link
              href={`/article/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-signal transition-colors group"
            >
              Read story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-5 border-t border-line pt-5">
            <h2 className="text-[22px] md:text-[24px] leading-none font-semibold tracking-tight mb-1">Latest</h2>
            <div className="divide-y divide-line">
              {latestItems.map((article) => (
                <Link key={article.slug} href={`/article/${article.slug}`} className="group block py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="eyebrow text-signal">{categoryName(article)}</span>
                    <span className="h-3 w-px bg-line" />
                    <span className="text-[11px] text-ash">{article.readTime}</span>
                  </div>
                  <h3 className="text-[18px] md:text-[20px] leading-[1.16] font-semibold tracking-tight group-hover:text-signal transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
