'use client';

import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Filter from '@/components/Products/Filter';
import Button from '../ui/Button';

interface FilterOption {
  option: string;
  productIds: number[];
}

interface AttributeFilter {
  name: string;
  slug: string;
  options: FilterOption[];
}

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

interface FilterNavProps {
  open: boolean;
  onClose: () => void;
  products: AttributeFilter[];
  selectedFilters: Record<string, FilterOption[]>;
  setSelectedFilters: (filters: Record<string, FilterOption[]>) => void;
  categories: CategoryInfo[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function FilterNav({
  open,
  onClose,
  products = [],
  selectedFilters,
  setSelectedFilters,
  categories = [],
  selectedCategory,
  onSelectCategory,
}: FilterNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const getTotalProductCount = () => {
    let finalCount = 0;

    const uniqueIdsInCurrentCategory = new Set<number>();
    products.forEach((attr) => {
      attr.options.forEach((opt) => {
        opt.productIds?.forEach((id) => uniqueIdsInCurrentCategory.add(id));
      });
    });

    if (Object.keys(selectedFilters).length > 0) {
      const allAllowedIds = new Set<number>();
      let trackingValidFilters = false;

      Object.entries(selectedFilters).forEach(([attrName, selectedOptions]) => {
        if (!selectedOptions || selectedOptions.length === 0) return;

        const liveAttr = products.find((a) => a.name === attrName);
        if (!liveAttr) return;

        selectedOptions.forEach((selOption) => {
          const liveOpt = liveAttr.options.find(
            (o) => o.option.trim() === selOption.option.trim(),
          );

          if (liveOpt?.productIds) {
            trackingValidFilters = true;
            liveOpt.productIds.forEach((id) => {
              const numId = Number(id);
              if (!isNaN(numId)) allAllowedIds.add(numId);
            });
          }
        });
      });

      finalCount = trackingValidFilters ? allAllowedIds.size : 0;
    } else {
      if (!selectedCategory) {
        finalCount = uniqueIdsInCurrentCategory.size;
      } else {
        const activeCategory = categories.find(
          (c) => c.slug === selectedCategory,
        );
        finalCount = activeCategory ? activeCategory.count : 0;
      }
    }

    return finalCount;
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden overflow-hidden ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 cursor-pointer ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute top-0 left-0 h-full w-[calc(100%-44px)] md:w-1/2 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 -right-10 z-50 text-white cursor-pointer"
        >
          <FaTimes size={32} />
        </button>

        <div className="flex flex-col h-full">
          <div className="p-4 flex-1 overflow-y-auto">
            <Filter
              mainCat="search"
              products={products}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </div>

          <div className="p-4 border-t bg-white">
            <Button
              label={`View ${getTotalProductCount()} products`}
              className="w-full flex text-black"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
