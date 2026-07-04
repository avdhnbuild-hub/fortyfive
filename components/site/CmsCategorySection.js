'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/site/ArticleCard';
import { getPublishedCmsArticles } from '@/lib/publicArticles';

export default function CmsCategorySection({ category, categoryName, excludeSlugs = [] }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const excluded = new Set(excludeSlugs);
    setArticles(
      getPublishedCmsArticles().filter((article) => article.category === category && !excluded.has(article.slug))
    );
  }, [category, excludeSlugs]);

  if (articles.length === 0) return null;

  return (
    <section className="container py-16 md:py-20">
      <p className="eyebrow text-signal mb-8">Latest in {categoryName}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
