import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function DeepReadCard({ article }) {
  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const categoryName = cat?.name || article.categoryName || article.category;
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col justify-between h-full p-8 md:p-10 bg-white border border-line rounded-[14px] hover:border-ink transition-colors"
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="eyebrow text-signal">Deep Read</span>
          <span className="h-3 w-px bg-line" />
          <span className="eyebrow text-ink/70">{categoryName}</span>
        </div>
        <h3 className="font-editorial text-[30px] md:text-[34px] leading-[1.05] tracking-tight group-hover:text-signal transition-colors">
          {article.title}
        </h3>
        <p className="mt-5 text-[15px] md:text-[16px] text-ink/70 leading-relaxed">{article.subtitle}</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-[12px] text-ash">{article.readTime}</span>
        <ArrowUpRight className="w-5 h-5 text-ink group-hover:text-signal transition-colors" />
      </div>
    </Link>
  );
}
