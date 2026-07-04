import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function Hero({ featured }) {
  const cat = CATEGORIES.find((c) => c.slug === featured.category);
  return (
    <section className="border-b border-line">
      <div className="container pt-10 md:pt-16 pb-14 md:pb-20">
        <div className="max-w-4xl">
          <p className="eyebrow text-signal">Global stories. India lens.</p>
          <h1 className="mt-5 font-editorial text-[46px] sm:text-[62px] md:text-[84px] leading-[0.98] tracking-tight">
            Startups, technology, capital,<br className="hidden md:block" /> <span className="italic">clearly explained.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-[16px] md:text-[19px] text-ink/70 leading-relaxed max-w-2xl">
            fortyfive covers startups, technology, capital, AI, growth, markets, and new-economy stories globally — with a strong India lens.
          </p>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center h-6 px-2.5 rounded-md bg-signal text-white eyebrow">
                {cat?.name}
              </span>
              <span className="eyebrow text-ash">Featured story</span>
            </div>
            <Link href={`/article/${featured.slug}`} className="group block">
              <h2 className="font-editorial text-[38px] sm:text-[48px] md:text-[60px] leading-[1.03] tracking-tight group-hover:text-signal transition-colors">
                {featured.title}
              </h2>
            </Link>
          </div>
          <div className="md:col-span-5 md:pt-16">
            <p className="text-[17px] md:text-[18px] text-ink/80 leading-relaxed">{featured.subtitle}</p>
            <div className="mt-6 flex items-center gap-4 text-[13px] text-ash">
              <span>{featured.kind}</span>
              <span className="h-3 w-px bg-line" />
              <span>{featured.readTime}</span>
              <span className="h-3 w-px bg-line" />
              <span>{featured.date}</span>
            </div>
            <Link
              href={`/article/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-signal transition-colors group"
            >
              Read story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
