import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-1">
            <span className="font-editorial text-4xl leading-none">fortyfive</span>
            <span className="w-[8px] h-[8px] rounded-full bg-signal translate-y-[-2px]" />
          </div>
          <p className="mt-6 text-white/70 max-w-md text-[15px] leading-relaxed">
            Startups, technology, capital, and growth — clearly explained. Global stories with a strong India lens.
          </p>
          <p className="mt-6 text-signal eyebrow">Clear stories. Sharp context. No noise.</p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-white/50 mb-4">Sections</p>
          <ul className="space-y-2 text-[15px]">
            {['Startups', 'Tech', 'Funding', 'Growth', 'AI', 'Opinion'].map((s) => (
              <li key={s}>
                <Link
                  href={`/category/${s.toLowerCase()}`}
                  className="text-white/80 hover:text-signal transition-colors"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-white/50 mb-4">fortyfive</p>
          <ul className="space-y-2 text-[15px]">
            <li><Link href="/about" className="text-white/80 hover:text-signal transition-colors">About</Link></li>
            <li><Link href="/subscribe" className="text-white/80 hover:text-signal transition-colors">Newsletter</Link></li>
            <li><Link href="/search" className="text-white/80 hover:text-signal transition-colors">Search</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-white/50 mb-4">Follow</p>
          <ul className="space-y-2 text-[15px]">
            <li><a href="#" className="text-white/80 hover:text-signal transition-colors">Twitter</a></li>
            <li><a href="#" className="text-white/80 hover:text-signal transition-colors">LinkedIn</a></li>
            <li><a href="#" className="text-white/80 hover:text-signal transition-colors">RSS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-white/50">
          <p>&copy; {new Date().getFullYear()} fortyfive. All rights reserved.</p>
          <p>Global publication with a strong India lens.</p>
        </div>
      </div>
    </footer>
  );
}
