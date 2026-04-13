'use client';

import { FaTimes } from 'react-icons/fa';
import Filter from '@/components/Products/Filter';

export default function FilterNav({
  open,
  onClose,
  products,
  selectedFilters,
  setSelectedFilters,
}: FilterNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Drawer with visible gap */}
      <div className="relative absolute top-0 left-0 h-full w-[calc(100%-44px)] md:w-1/2 max-w-sm bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 -right-10 z-50 text-white"
        >
          <FaTimes size={32} />
        </button>
        <div className="p-4 h-full overflow-y-auto">
          <Filter
            products={products}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </div>
  );
}
