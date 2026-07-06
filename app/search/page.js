import SearchContent from '@/components/site/SearchContent';
import { getPublishedArticles } from '@/lib/articlesDb';

export default async function SearchPage() {
  const articles = await getPublishedArticles();
  return <SearchContent initialArticles={articles} />;
}
