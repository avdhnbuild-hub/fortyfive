import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';

export default function ArticleCard({ article, variant = 'default' }) {
  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const categoryName = cat?.name || article.categoryName || article.category;
  if (variant === 'row') {
    return (
      <Link href={`/article/${article.slug}`} className="group block py-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="eyebrow text-signal">{categoryName}</span>
          <span className="text-[11px] text-ash">{article.date} · {article.readTime}</span>
        </div>
        <h3 className="font-editorial text-2xl md:text-[28px] leading-[1.1] tracking-tight group-hover:text-signal transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-[15px] text-ink/70 leading-relaxed line-clamp-2">{article.subtitle}</p>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="flex items-center gap-3 mb-3">
        <span className="eyebrow text-signal">{categoryName}</span>
        <span className="h-3 w-px bg-line" />
        <span className="text-[11px] text-ash">{article.readTime}</span>
      </div>
      <h3 className="font-editorial text-[26px] md:text-[28px] leading-[1.08] tracking-tight group-hover:text-signal transition-colors">
        {article.title}
      </h3>
      <p className="mt-3 text-[15px] text-ink/70 leading-relaxed line-clamp-3">{article.subtitle}</p>
      <div className="mt-4 text-[12px] text-ash">{article.date}</div>
    </Link>
  );
}
