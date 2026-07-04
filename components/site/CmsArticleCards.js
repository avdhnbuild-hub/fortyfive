'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/site/ArticleCard';
import DeepReadCard from '@/components/site/DeepReadCard';
import { getPublishedCmsArticles } from '@/lib/publicArticles';

export default function CmsArticleCards({ category, deepOnly = false, excludeSlugs = [], card = 'article' }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const excluded = new Set(excludeSlugs);
    const published = getPublishedCmsArticles().filter((article) => {
      if (excluded.has(article.slug)) return false;
      if (category && article.category !== category) return false;
      if (deepOnly && !article.deepRead) return false;
      return true;
    });

    setArticles(published);
  }, [category, deepOnly, excludeSlugs]);

  if (articles.length === 0) return null;

  return articles.map((article) =>
    card === 'deep' ? (
      <DeepReadCard key={article.slug} article={article} />
    ) : (
      <ArticleCard key={article.slug} article={article} />
    )
  );
}
