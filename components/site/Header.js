'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Startups', href: '/category/startups' },
  { label: 'Technology', href: '/category/tech' },
  { label: 'Funding', href: '/category/funding' },
  { label: 'Growth', href: '/category/growth' },
  { label: 'AI', href: '/category/ai' },
  { label: 'Opinion', href: '/category/opinion' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-baseline gap-1 group" onClick={() => setOpen(false)}>
          <span className="font-editorial text-3xl md:text-[34px] leading-none tracking-tight">fortyfive</span>
          <span className="w-[7px] h-[7px] rounded-full bg-signal translate-y-[-2px] transition-transform group-hover:scale-125" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-medium transition-colors ${active ? 'text-signal' : 'text-ink/80 hover:text-ink'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/search" aria-label="Search" className="p-2 rounded-md hover:bg-line/60 transition-colors">
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/subscribe"
            className="inline-flex items-center h-9 px-4 rounded-full bg-ink text-white text-[13px] font-medium hover:bg-signal transition-colors"
          >
            Subscribe
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper">
          <div className="container py-4 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-[16px] font-medium border-b border-line/70 ${pathname === item.href ? 'text-signal' : 'text-ink'}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center h-11 rounded-full border border-line text-[14px] font-medium"
              >
                <Search className="w-4 h-4 mr-2" /> Search
              </Link>
              <Link
                href="/subscribe"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center h-11 rounded-full bg-ink text-white text-[14px] font-medium"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
