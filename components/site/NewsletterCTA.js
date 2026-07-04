'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewsletterCTA({ variant = 'full' }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      toast.error('Enter a valid email');
      return;
    }

    let existing = [];
    try {
      const storedSubscribers = JSON.parse(localStorage.getItem('fortyfive_subscribers') || '[]');
      existing = Array.isArray(storedSubscribers) ? storedSubscribers : [];
    } catch {
      existing = [];
    }
    if (!existing.includes(normalizedEmail)) {
      localStorage.setItem('fortyfive_subscribers', JSON.stringify([...existing, normalizedEmail]));
    }

    setDone(true);
    toast.success('Subscribed.');
  };

  if (variant === 'inline') {
    return (
      <div className="bg-white border border-line rounded-[14px] p-6 md:p-8">
        <p className="eyebrow text-signal">Newsletter</p>
        <h3 className="mt-3 font-editorial text-[26px] md:text-[30px] leading-[1.1] tracking-tight">
          Understand the new economy without the noise.
        </h3>
        {done ? (
          <p className="mt-4 text-[15px] text-ink/80">Subscribed.</p>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-paper border border-line focus:border-ink outline-none text-[15px]"
            />
            <button className="h-12 px-6 rounded-lg bg-ink text-white text-[14px] font-medium hover:bg-signal transition-colors">
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-3 text-[12px] text-ash">No spam. Just clear context.</p>
      </div>
    );
  }

  return (
    <section className="bg-ink text-white">
      <div className="container py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="eyebrow text-signal">Newsletter</p>
          <h2 className="mt-4 font-editorial text-[38px] md:text-[56px] leading-[1.02] tracking-tight">
            Understand the new economy without the noise.
          </h2>
          <p className="mt-5 text-[16px] md:text-[18px] text-white/70 leading-relaxed max-w-xl">
            Get sharp stories on startups, technology, capital, AI, markets, and growth from fortyfive.
          </p>
        </div>
        <div className="md:col-span-5">
          {done ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="font-editorial text-2xl">Subscribed.</p>
              <p className="mt-2 text-white/70">First issue lands soon. Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 px-5 rounded-xl bg-white/[.04] border border-white/15 focus:border-signal outline-none text-white placeholder-white/40 text-[15px]"
              />
              <button className="w-full h-14 rounded-xl bg-signal text-white text-[15px] font-medium hover:bg-white hover:text-ink transition-colors">
                Subscribe
              </button>
              <p className="text-[12px] text-white/50">No spam. Just clear context.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
