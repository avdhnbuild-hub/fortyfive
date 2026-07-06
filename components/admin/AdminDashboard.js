'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminArticles } from '@/lib/adminArticlesClient';

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminArticles()
      .then(setArticles)
      .catch((adminError) => setError(adminError.message))
      .finally(() => setLoading(false));
  }, []);

  const published = articles.filter((article) => article.status === 'Published').length;
  const drafts = articles.filter((article) => article.status === 'Draft').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">CMS</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Admin dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666666]">
            Manage draft and published articles.
          </p>
          {error && <p className="mt-3 text-sm text-[#ff5a1f]">{error}</p>}
        </div>
        <Link href="/admin/articles/new" className="inline-flex h-11 items-center rounded-lg bg-[#070707] px-4 text-sm font-medium text-white hover:bg-[#ff5a1f]">
          Create article
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total articles', value: articles.length },
          { label: 'Published', value: published },
          { label: 'Drafts', value: drafts },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-[#e5e1da] bg-white p-6">
            <p className="text-sm text-[#666666]">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      {loading && <p className="text-sm text-[#666666]">Loading articles...</p>}
    </div>
  );
}
