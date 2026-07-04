import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ eyebrow, title, cta, href }) {
  return (
    <div className="flex items-end justify-between mb-8 md:mb-12">
      <div>
        {eyebrow && <p className="eyebrow text-signal mb-3">{eyebrow}</p>}
        <h2 className="font-editorial text-[36px] md:text-[48px] leading-none tracking-tight">{title}</h2>
      </div>
      {cta && href && (
        <Link
          href={href}
          className="hidden md:inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-signal transition-colors group"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
