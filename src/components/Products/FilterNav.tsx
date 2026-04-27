'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Filter from '@/components/Products/Filter';
import Button from '../ui/Button';
import ProductCard from './ProductCard';

export default function FilterNav({
  open,
  onClose,
  products,
  selectedFilters,
  setSelectedFilters,
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

  const getTotalProductCount = (filters: any) => {
    if (!filters) return products.length;

    const ids = new Set<number>();

    Object.values(filters).forEach((groupArray: any) => {
      groupArray.forEach((group: any) => {
        group.productIds?.forEach((id: number) => {
          ids.add(id);
        });
      });
    });

    return ids.size;
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden overflow-hidden ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 left-0 h-full w-[calc(100%-44px)] md:w-1/2 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 -right-10 z-50 text-white"
        >
          <FaTimes size={32} />
        </button>

        <div className="flex flex-col h-full">
          {/* Scroll area */}
          <div className="p-4 flex-1 overflow-y-auto">
            <Filter
              products={products}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>

          {/* Bottom button */}
          <div className="p-4 border-t bg-white">
            <Button
              label={`View ${getTotalProductCount(selectedFilters)} products`}
              className="w-full flex text-black"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
