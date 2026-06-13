'use client';

import { useState, Suspense } from 'react';

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

function CategoryFilterContent({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);

  if (!categories || categories.length === 0) return null;

  const visibleCategories = showAll ? categories : categories.slice(0, 5);
  const remainingCount = categories.length - 5;

  return (
    <div className="mb-6 mt-6 lg:w-full">
      <h2 className="text-2xl pb-2 border-b border-gray-400 font-bold text-black">
        Categories
      </h2>

      <ul className="space-y-1 py-3">
        {visibleCategories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;

          return (
            <li key={cat.slug} className="text-sm">
              <button
                type="button"
                onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
                className={`text-left w-full flex items-center justify-between px-3 py-2 -mx-3 rounded transition-colors duration-150 group cursor-pointer ${
                  isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                <span
                  className={`text-sm ${isSelected ? 'font-bold text-black' : 'font-medium text-gray-800'} group-hover:underline`}
                >
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500 font-normal ml-1">
                  ({cat.count.toLocaleString()})
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {remainingCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm font-semibold text-gray-900 cursor-pointer underline hover:no-underline transition-all"
        >
          {showAll ? 'Show less categories' : 'Show more categories'}
        </button>
      )}
    </div>
  );
}

export default function CategoryFilter(props: CategoryFilterProps) {
  return (
    <Suspense
      fallback={<div className="h-20 animate-pulse bg-gray-100 rounded" />}
    >
      <CategoryFilterContent {...props} />
    </Suspense>
  );
}
