'use client';
import { FaFilter } from 'react-icons/fa';

export default function FilterButton({ selectedFilters }: FilterButton) {
  console.log(selectedFilters);
  return (
    <div className="flex self-end mb-10 block lg:hidden">
      <FaFilter size={20} />
      <span className="font-semibold">
        {' '}
        Filter{' '}
        <span className="text-green-500">
          {Object.keys(selectedFilters).length > 0 &&
            `(${Object.values(selectedFilters).reduce(
              (acc, arr) => acc + arr.length,
              0,
            )})`}
        </span>
      </span>
    </div>
  );
}

interface AttributeFilter {
  name: string;
  slug: string;
  options: FilterOption[];
}

interface FilterButton {
  products?: AttributeFilter[];
  selectedFilters: Record<string, FilterOption[]>;
}
