'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { deleteArticle, getAdminArticles } from '@/lib/adminArticlesClient';

export default function ArticleTable() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    getAdminArticles()
      .then(setArticles)
      .catch((adminError) => setError(adminError.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return articles;

    return articles.filter((article) =>
      [article.title, article.category].some((field) => field?.toLowerCase().includes(value))
    );
  }, [articles, query]);

  const removeArticle = async (article) => {
    if (!article?.id) return;
    if (!window.confirm('Delete this article permanently? This cannot be undone.')) return;

    setError('');
    setMessage('');
    setDeletingId(article.id);

    try {
      await deleteArticle(article.id);
      setArticles((current) => current.filter((item) => item.id !== article.id));
      setMessage('Article deleted.');
    } catch (adminError) {
      setError(adminError.message || 'Could not delete article.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">Articles</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">All articles</h1>
          <p className="mt-2 text-sm text-[#666666]">{articles.length} total, {filtered.length} shown</p>
        </div>
        <Link href="/admin/articles/new" className="focus-ring inline-flex h-11 items-center justify-center rounded-lg bg-[#070707] px-4 text-sm font-medium text-white transition-colors hover:bg-[#ff5a1f]">
          New article
        </Link>
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or category"
        className="focus-ring h-11 w-full rounded-lg border border-[#e5e1da] bg-white px-4 text-sm outline-none transition-colors focus:border-[#070707]"
      />

      {error && <div role="alert" className="rounded-lg border border-[#ffd8c8] bg-[#fff7f3] px-4 py-3 text-sm text-[#9d3510]">{error}</div>}
      {message && (
        <div role="status" className="flex items-center gap-2 rounded-lg border border-[#e5e1da] bg-white px-4 py-3 text-sm text-[#666666]">
          <span className="orange-dot h-1.5 w-1.5" aria-hidden="true" />
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#e5e1da] bg-white">
        <div className="hidden grid-cols-12 border-b border-[#e5e1da] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666] md:grid">
          <span className="col-span-6">Title</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Action</span>
        </div>
        {loading ? (
          <div className="space-y-3 px-4 py-6">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-14 animate-pulse rounded-lg bg-[#f4f1ec]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-10 text-sm text-[#666666]">
            <div className="mb-3 flex items-center gap-2">
              <span className="orange-dot" aria-hidden="true" />
              <p className="font-medium text-[#070707]">No articles found.</p>
            </div>
            <p>{query.trim() ? 'Try a different title or category.' : 'Create a draft to get started.'}</p>
          </div>
        ) : (
          filtered.map((article) => (
            <div key={article.id} className="grid gap-3 border-b border-[#e5e1da] px-4 py-4 transition-colors hover:bg-[#fbfaf7] last:border-b-0 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6">
                <p className="font-medium">{article.title || 'Untitled article'}</p>
                <p className="mt-1 text-xs text-[#666666]">/{article.slug || 'no-slug'}</p>
              </div>
              <p className="text-sm text-[#666666] md:col-span-2">{article.category}</p>
              <div className="md:col-span-2">
                <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                  article.status === 'Published'
                    ? 'border-[#ffd8c8] bg-[#fff7f3] text-[#9d3510]'
                    : 'border-[#e5e1da] text-[#666666]'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${article.status === 'Published' ? 'bg-[#ff5a1f]' : 'bg-[#b8b0a6]'}`} aria-hidden="true" />
                  {article.status || 'Draft'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-right md:col-span-2 md:justify-end">
                <Link href={`/admin/articles/${article.id}/edit`} className="focus-ring rounded-sm text-sm font-medium text-[#ff5a1f] transition-colors hover:text-[#070707]">
                  Edit
                </Link>
                <Link href={`/admin/preview/${article.slug}`} className="focus-ring rounded-sm text-sm font-medium text-[#ff5a1f] transition-colors hover:text-[#070707]">
                  Preview
                </Link>
                <button
                  type="button"
                  onClick={() => removeArticle(article)}
                  disabled={deletingId === article.id}
                  className="focus-ring rounded-sm text-sm font-medium text-[#ff5a1f] transition-colors hover:text-[#070707] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === article.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
