import SearchResults from '@/components/Products/SearchResults';

export default async function SearchPage({ searchParams }) {
  const term = searchParams.term;

  const res = await fetch(`http://localhost:3000/api/searchProducts?q=${term}`);

  const results = await res.json();

  return <SearchResults term={term} results={results} />;
}
