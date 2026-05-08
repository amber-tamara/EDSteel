'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      if (!query.trim() || query.length < 3) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/searchProducts?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) throw new Error('Search failed');

        const data = await res.json();
        setResults(data);

        console.log(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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

      {query.length >= 3 && results.length > 1 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
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
