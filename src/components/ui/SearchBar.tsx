'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import LoadingBar from './LoadingBar';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, showResult] = useState(false);

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        showResult(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      if (!query.trim() || query.length < 3) {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `/api/searchProducts?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error('Search failed');
        // setLoading(true);

        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        // setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setQuery('');
    setResults([]);
    router.push(`/search?term=${encodeURIComponent(query)}`);
  };

  const handleSingleItem = (url: string) => {
    setLoading(true);
    setQuery('');
    setResults([]);

    router.push(url);
  };
  console.log(results);

  return (
    <div ref={searchRef} className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="rounded-2xl mt-2 flex h-full flex-grow bg-white shadow-md overflow-hidden border border-gray-300 focus-within:border-green-500 lg:max-w-[37.75rem] lg:mr-5"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => showResult(true)}
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="mr-4 flex items-center justify-center cursor-pointer"
          >
            <FaTimes size={20} className="text-gray-600" />
          </button>
        )}
        <button type="submit" className="mr-4 flex items-center cursor-pointer">
          <FaSearch size={20} className="text-gray-600" />
        </button>
      </form>
      {/* DROPDOWN */}
      {query.length >= 3 && results.length > 0 && result && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-1 z-50 max-h-80 overflow-y-auto rounded-md">
          {results
            .filter((item: any) => item?.url)
            .map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleSingleItem(item.url)}
                className="block p-3 hover:bg-gray-200 text-sm cursor-pointer"
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
      {loading && <LoadingBar />}
    </div>
  );
}
