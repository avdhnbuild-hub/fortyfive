import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between p-7 md:p-8 bg-white border border-line rounded-[12px] hover:border-signal hover:shadow-[0_6px_30px_-12px_rgba(255,90,31,0.25)] transition-all min-h-[190px]"
    >
      <div>
        <h3 className="font-editorial text-[28px] md:text-[30px] leading-none tracking-tight">
          {category.name}
        </h3>
        <p className="mt-4 text-[14px] md:text-[15px] text-ink/70 leading-relaxed">{category.tagline}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-ink group-hover:text-signal transition-colors">
        Explore
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
