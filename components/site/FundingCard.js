import Link from 'next/link';

export default function FundingCard({ item }) {
  return (
    <div className="flex items-start md:items-center justify-between gap-4 py-5 border-b border-line last:border-b-0 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="eyebrow text-signal">{item.amount}</span>
          <span className="text-[11px] text-ash">· {item.date}</span>
        </div>
        <p className="text-[16px] md:text-[17px] leading-snug">
          <span className="font-semibold">{item.name}</span> <span className="text-ink/80">{item.detail}.</span>
        </p>
      </div>
      <Link href="/category/funding" className="hidden md:inline-flex text-[12px] text-ash hover:text-signal transition-colors">Read →</Link>
    </div>
  );
}
