'use client';

import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import NewsletterCTA from '@/components/site/NewsletterCTA';
import ArticleCard from '@/components/site/ArticleCard';
import ShareBar from '@/components/site/ShareBar';
import { CATEGORIES } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetailContent({ initialArticle, initialArticles = [] }) {
  const article = initialArticle;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-paper">
        <Header />
        <main className="flex-1">
          <section className="container py-24 text-center">
            <p className="font-editorial text-[32px] md:text-[40px] tracking-tight">Story not found.</p>
            <Link href="/" className="mt-6 inline-flex text-[14px] font-medium text-signal hover:text-ink">
              Go home
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const categoryName = cat?.name || article.categoryName || article.category;
  const related = initialArticles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <article className="container pt-10 md:pt-16 pb-20 max-w-3xl">
          <Link href={`/category/${article.category}`} className="inline-flex items-center gap-2 eyebrow text-signal hover:opacity-80">
            <ArrowLeft className="w-3 h-3" /> {categoryName}
          </Link>
          <h1 className="mt-6 font-editorial text-[40px] sm:text-[54px] md:text-[68px] leading-[1.02] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-6 text-[18px] md:text-[22px] text-ink/75 leading-relaxed font-light">
            {article.subtitle}
          </p>
          <div className="mt-8 pb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ash border-b border-line">
            <span className="font-medium text-ink">{article.author}</span>
            <span className="h-3 w-px bg-line" />
            <span>{article.date}</span>
            <span className="h-3 w-px bg-line" />
            <span>{article.readTime}</span>
            <span className="h-3 w-px bg-line" />
            <span className="text-signal">{article.kind}</span>
          </div>

          <ShareBar article={article} />

          {article.inBrief && (
            <div className="mt-10 p-6 md:p-7 bg-white border-l-2 border-signal rounded-r-lg">
              <p className="eyebrow text-signal mb-2">In brief</p>
              <p className="text-[16px] md:text-[17px] text-ink/85 leading-relaxed">{article.inBrief}</p>
            </div>
          )}

          <div className="article-body mt-12">
            {(article.body || []).map((block, i) => {
              if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
              if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
              if (block.type === 'blockquote') return <blockquote key={i}>{block.text}</blockquote>;
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          {article.bottomLine && (
            <div className="mt-14 p-7 md:p-8 bg-ink text-white rounded-2xl">
              <p className="eyebrow text-signal mb-3">Bottom line</p>
              <p className="font-editorial text-[24px] md:text-[28px] leading-[1.2]">{article.bottomLine}</p>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="border-t border-line">
            <div className="container py-16 md:py-20">
              <p className="eyebrow text-signal mb-3">Keep reading</p>
              <h3 className="font-editorial text-[32px] md:text-[40px] leading-none tracking-tight mb-10">Related stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
