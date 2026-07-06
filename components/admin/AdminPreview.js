'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminArticleBySlug } from '@/lib/adminArticlesClient';

export default function AdminPreview({ slug }) {
  const [article, setArticle] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminArticleBySlug(slug)
      .then((storedArticle) => setArticle(storedArticle))
      .catch((adminError) => setError(adminError.message))
      .finally(() => setReady(true));
  }, [slug]);

  if (!ready) return <p className="text-sm text-[#666666]">Loading preview...</p>;

  if (!article) {
    return (
      <div className="rounded-xl border border-[#e5e1da] bg-white p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Preview not found</h1>
        <p className="mt-3 text-sm text-[#666666]">This article may have been deleted or renamed.</p>
        {error && <p className="mt-3 text-sm text-[#ff5a1f]">{error}</p>}
        <Link href="/admin/articles" className="mt-6 inline-flex text-sm font-medium text-[#ff5a1f] hover:text-[#070707]">
          Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">Preview</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{article.title || 'Untitled article'}</h1>
        </div>
        <Link href={`/admin/articles/${article.id}/edit`} className="inline-flex h-11 items-center rounded-lg border border-[#e5e1da] bg-white px-4 text-sm font-medium hover:border-[#ff5a1f]">
          Edit article
        </Link>
      </div>

      <article className="rounded-xl border border-[#e5e1da] bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666]">
          <span className="font-semibold uppercase tracking-[0.14em] text-[#ff5a1f]">{article.category}</span>
          <span>{article.status}</span>
          <span>{article.type}</span>
          <span>{article.region}</span>
        </div>
        <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">{article.title}</h2>
        {article.subtitle && <p className="mt-4 text-lg leading-7 text-[#666666]">{article.subtitle}</p>}
        <div className="mt-6 flex flex-wrap gap-3 border-b border-[#e5e1da] pb-5 text-sm text-[#666666]">
          <span>{article.author}</span>
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>

        {article.inBrief && (
          <div className="mt-6 border-l-2 border-[#ff5a1f] bg-[#f6f6f3] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff5a1f]">In brief</p>
            <p className="mt-2 text-sm leading-6">{article.inBrief}</p>
          </div>
        )}

        <div className="mt-8 space-y-8">
          {(article.bodySections || []).map((section, index) => (
            <section key={index}>
              {section.heading && <h3 className="text-2xl font-semibold tracking-tight">{section.heading}</h3>}
              {section.body
                ?.split('\n')
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="mt-4 text-base leading-7 text-[#333333]">
                    {paragraph}
                  </p>
                ))}
            </section>
          ))}
        </div>

        {article.pullQuote && (
          <blockquote className="mt-8 border-l-2 border-[#ff5a1f] pl-5 text-2xl font-semibold leading-tight">
            {article.pullQuote}
          </blockquote>
        )}

        {article.bottomLine && (
          <div className="mt-8 rounded-xl bg-[#070707] p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff5a1f]">Bottom line</p>
            <p className="mt-2 text-lg leading-7">{article.bottomLine}</p>
          </div>
        )}
      </article>
    </div>
  );
}
