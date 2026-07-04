'use client';

import { useEffect, useState } from 'react';

export default function ShareBar({ article }) {
  const [url, setUrl] = useState(`/article/${article.slug}`);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(Boolean(navigator.share));
  }, []);

  const copyText = async (text, label) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1800);
  };

  const copyLink = () => copyText(url, 'Link copied');

  const nativeShare = async () => {
    try {
      await navigator.share({
        title: article.seoTitle || article.title,
        text: article.seoDescription || article.subtitle,
        url,
      });
    } catch {
      // Native share was dismissed or unavailable after the initial capability check.
    }
  };

  const copyQuote = () => {
    const text = `"${article.pullQuote}"\n\n${article.title} - ${url}`;
    return copyText(text, 'Quote copied');
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px]">
      <span className="eyebrow text-ash mr-1">Share</span>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-8 items-center rounded-full border border-line px-3 font-medium text-ink transition-colors hover:border-signal hover:text-signal"
      >
        Copy link
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-8 items-center rounded-full border border-line px-3 font-medium text-ink transition-colors hover:border-signal hover:text-signal"
      >
        X/Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-8 items-center rounded-full border border-line px-3 font-medium text-ink transition-colors hover:border-signal hover:text-signal"
      >
        LinkedIn
      </a>
      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex h-8 items-center rounded-full border border-line px-3 font-medium text-ink transition-colors hover:border-signal hover:text-signal"
        >
          Native share
        </button>
      )}
      {article.pullQuote && (
        <button
          type="button"
          onClick={copyQuote}
          className="inline-flex h-8 items-center rounded-full border border-line px-3 font-medium text-ink transition-colors hover:border-signal hover:text-signal"
        >
          Copy quote
        </button>
      )}
      {copied && <span className="text-ash">{copied}</span>}
    </div>
  );
}
