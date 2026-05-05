'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Live search (debounced)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/searchProducts?q=${encodeURIComponent(query)}`,
        );

        if (!res.ok) throw new Error('Search failed');

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // 🔍 Submit search (Enter key)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/searchProducts?q=${encodeURIComponent(query)}`,
      );

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* INPUT */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl mt-2 flex h-full flex-grow bg-white shadow-md overflow-hidden border border-gray-300 focus-within:border-green-500 lg:max-w-[37.75rem] lg:mr-5"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mr-4 flex items-center justify-center"
          >
            <FaTimes size={20} className="text-gray-600" />
          </button>
        )}

        <button type="submit" className="mr-4 flex items-center">
          <FaSearch size={20} className="text-gray-600" />
        </button>
      </form>

      {/* RESULTS */}
      {query && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
          {loading && (
            <div className="p-3 text-sm text-gray-500">Searching...</div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-gray-500">No results found</div>
          )}

          {!loading &&
            results
              .filter((item: any) => item?.url) // 🛡 prevents crash
              .map((item: any) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => setQuery('')}
                  className="block p-3 hover:bg-gray-100 text-sm"
                >
                  {item.name}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
