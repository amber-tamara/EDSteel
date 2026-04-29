'use client';
import { FaFilter } from 'react-icons/fa';

export default function FilterButton({
  selectedFilters,
  onOpen,
}: FilterButtonProps) {
  const count = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-1 self-end mb-10 lg:hidden cursor-pointer"
    >
      <FaFilter size={20} />
      <span className="font-semibold">
        Filter {count > 0 && <span className="text-green-500">({count})</span>}
      </span>
    </button>
  );
}

interface FilterOption {
  option: string;
  productIds: number[];
}

interface AttributeFilter {
  name: string;
  slug: string;
  options: FilterOption[];
}

interface FilterButtonProps {
  selectedFilters: Record<string, FilterOption[]>;
  onOpen: () => void;
}
