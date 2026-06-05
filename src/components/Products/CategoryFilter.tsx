'use client';

import { useState } from 'react';

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryInfo[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);

  if (!categories || categories.length === 0) return null;

  const visibleCategories = showAll ? categories : categories.slice(0, 5);
  const remainingCount = categories.length - 5;

  return (
    <div className="mb-6 lg:w-full">
      <h2 className="text-2xl pb-2 border-b border-gray-400 font-bold text-black">
        Categories
      </h2>

      <ul className="space-y-1 py-3">
        {visibleCategories.map((cat) => (
          <li key={cat.slug} className="text-sm">
            <button
              type="button"
              className="text-left w-full flex items-center cursor-pointer group hover:bg-gray-100 py-2 rounded transition-colors duration-150"
            >
              <span className="font-medium text-gray-800 group-hover:underline">
                {cat.name}
              </span>
              <span className="text-xs text-gray-500 font-normal ml-1.5">
                ({cat.count.toLocaleString()})
              </span>
            </button>
          </li>
        ))}
      </ul>

      {remainingCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm font-semibold text-gray-900 underline hover:no-underline cursor-pointer block transition-all px-3"
        >
          {showAll ? 'Show less categories' : 'Show more categories'}
        </button>
      )}
    </div>
  );
}
