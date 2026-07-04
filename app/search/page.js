'use client';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import ArticleCard from '@/components/site/ArticleCard';
import { ARTICLES, CATEGORIES } from '@/lib/data';
import { getPublicArticles } from '@/lib/publicArticles';
import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [articles, setArticles] = useState(ARTICLES);

  useEffect(() => {
    setArticles(getPublicArticles());
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return articles.filter((a) => {
      const catOk = cat === 'all' || a.category === cat;
      if (!term) return catOk;
      const hay = `${a.title} ${a.subtitle} ${a.summary || ''} ${a.category} ${a.tags || ''} ${a.author || ''}`.toLowerCase();
      return catOk && hay.includes(term);
    });
  }, [articles, q, cat]);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <section className="container pt-14 md:pt-20 pb-10">
          <p className="eyebrow text-signal">Search</p>
          <h1 className="mt-4 font-editorial text-[48px] md:text-[72px] leading-none tracking-tight">Search fortyfive</h1>

          <div className="mt-8 relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ash" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search startups, technology, capital, AI, founders, markets..."
              className="w-full h-14 pl-11 pr-4 rounded-xl bg-white border border-line focus:border-ink outline-none text-[16px]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[{ slug: 'all', name: 'All' }, ...CATEGORIES].map((c) => {
              const active = cat === c.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`h-9 px-4 rounded-full text-[13px] font-medium border transition-colors ${
                    active
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-ink border-line hover:border-ink'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="container pb-24">
          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-editorial text-[32px] md:text-[40px] tracking-tight">No stories found.</p>
              <p className="mt-3 text-ink/70">Try another search.</p>
            </div>
          ) : (
            <>
              <p className="eyebrow text-ash mb-8">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
                {results.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
