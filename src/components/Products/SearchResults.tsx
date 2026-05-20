'use client';
import Filter from '@/components/Products/Filter';

export default function SearchResults({
  term,
  results,
}: {
  term: { term?: string };
  results: { term?: string };
}) {
  console.log(results);
  return (
    <div>
      {/* <Filter /> */}
      <h1>Search results for</h1>
      <br />
      <span className="font-bold text-xl">"{term}"</span>
    </div>
  );
}
