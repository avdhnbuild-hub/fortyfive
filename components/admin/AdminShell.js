'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminGate from '@/components/admin/AdminGate';
import { getSupabaseClient } from '@/lib/supabase/client';

const nav = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/articles/new', label: 'New article' },
  { href: '/admin/subscribers', label: 'Subscribers' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    } catch {}
    router.refresh();
  };

  return (
    <AdminGate>
      <div className="min-h-screen bg-[#f6f6f3] text-[#070707]">
        <header className="border-b border-[#e5e1da] bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
            <Link href="/admin" className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold tracking-tight">fortyfive admin</span>
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
            </Link>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full border px-3 py-2 transition-colors ${
                      active
                        ? 'border-[#070707] bg-[#070707] text-white'
                        : 'border-[#e5e1da] bg-white text-[#666666] hover:border-[#ff5a1f] hover:text-[#070707]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-[#e5e1da] bg-white px-3 py-2 text-[#666666] transition-colors hover:border-[#ff5a1f] hover:text-[#070707]"
              >
                Log out
              </button>
            </nav>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
      </div>
    </AdminGate>
  );
}
