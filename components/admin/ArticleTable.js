'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getAdminArticles } from '@/lib/adminArticlesClient';

export default function ArticleTable() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminArticles()
      .then(setArticles)
      .catch((adminError) => setError(adminError.message));
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return articles;

    return articles.filter((article) =>
      [article.title, article.category].some((field) => field?.toLowerCase().includes(value))
    );
  }, [articles, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">Articles</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">All articles</h1>
        </div>
        <Link href="/admin/articles/new" className="inline-flex h-11 items-center rounded-lg bg-[#070707] px-4 text-sm font-medium text-white hover:bg-[#ff5a1f]">
          New article
        </Link>
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or category"
        className="h-11 w-full rounded-lg border border-[#e5e1da] bg-white px-4 text-sm outline-none focus:border-[#070707]"
      />

      {error && <p className="text-sm text-[#ff5a1f]">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-[#e5e1da] bg-white">
        <div className="grid grid-cols-12 border-b border-[#e5e1da] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
          <span className="col-span-6">Title</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Action</span>
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-sm text-[#666666]">No articles found.</p>
        ) : (
          filtered.map((article) => (
            <div key={article.id} className="grid grid-cols-12 items-center gap-3 border-b border-[#e5e1da] px-4 py-4 last:border-b-0">
              <div className="col-span-6">
                <p className="font-medium">{article.title || 'Untitled article'}</p>
                <p className="mt-1 text-xs text-[#666666]">/{article.slug || 'no-slug'}</p>
              </div>
              <p className="col-span-2 text-sm text-[#666666]">{article.category}</p>
              <div className="col-span-2">
                <span className="rounded-full border border-[#e5e1da] px-2.5 py-1 text-xs text-[#666666]">
                  {article.status || 'Draft'}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <Link href={`/admin/articles/${article.id}/edit`} className="text-sm font-medium text-[#ff5a1f] hover:text-[#070707]">
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
