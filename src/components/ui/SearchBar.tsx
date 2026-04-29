'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: trigger your search logic here
  };
  return (
    <form
      onSubmit={handleSearch}
      className="rounded-2xl mt-2 flex h-full flex-grow bg-white shadow-md overflow-hidden border border-gray-300 focus-within:border-green-700 lg:max-w-[37.75rem] lg:mr-5"
    >
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
      />
      <button className="mr-4 cursor-pointer" type="submit">
        <FaSearch size={24} className="text-gray-600" />
      </button>
    </form>
  );
}
