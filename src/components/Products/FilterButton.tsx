'use client';
import { FaFilter } from 'react-icons/fa';

export default function FilterButton({
  selectedFilters,
  selectedCategory,
  onOpen,
}: FilterButtonProps) {
  const attributeCount = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  console.log(selectedCategory);

  const totalCount = attributeCount + (selectedCategory ? 1 : 0);

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-1 self-end mb-10 lg:hidden cursor-pointer"
    >
      <FaFilter size={20} />
      <span className="font-semibold">
        Filter{' '}
        {totalCount > 0 && (
          <span className="text-green-500">({totalCount})</span>
        )}
      </span>
    </button>
  );
}

interface FilterOption {
  option: string;
  productIds: number[];
}

interface FilterButtonProps {
  selectedFilters: Record<string, FilterOption[]>;
  selectedCategory: string | null;
  onOpen: () => void;
}
