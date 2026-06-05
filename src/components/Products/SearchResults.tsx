'use client';

import { useState, useEffect, useMemo } from 'react';
import Filter from '@/components/Products/Filter';
import ProductCard from '@/components/Products/ProductCard';
import FilterButton from '@/components/Products/FilterButton';
import FilterNav from '@/components/Products/FilterNav';
import CategoryFilter from '@/components/Products/CategoryFilter';
import Button from '../ui/Button';
import BackToTopBtn from '../ui/BackToTopBtn';

interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

export default function SearchResults({
  term,
  results,
}: {
  term: string;
  results: any[];
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryInfo[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>(
    {},
  );
  const [visibleCount, setVisibleCount] = useState(48);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!results || !Array.isArray(results)) return;

    setProducts(results);

    const filterMap: Record<string, Record<string, Set<number>>> = {};
    const catMap: Record<
      string,
      { name: string; slug: string; count: number }
    > = {};

    results.forEach((product) => {
      if (!product) return;
      const productId = Number(product.id);
      if (isNaN(productId)) return;

      // 1. Parse Attributes (Handles variations and strings safely)
      if (product.attributes) {
        const attrSource = Array.isArray(product.attributes)
          ? product.attributes
          : Object.values(product.attributes);

        attrSource.forEach((attr: any) => {
          const attrName = attr?.name?.trim();
          if (!attrName || !attr.options) return;

          const optionsArray = Array.isArray(attr.options)
            ? attr.options
            : Object.values(attr.options);

          optionsArray.forEach((optionRaw: any) => {
            const optionValue =
              typeof optionRaw === 'object'
                ? optionRaw?.option?.trim() || optionRaw?.value?.trim()
                : String(optionRaw).trim();

            if (!optionValue) return;

            if (!filterMap[attrName]) filterMap[attrName] = {};
            if (!filterMap[attrName][optionValue]) {
              filterMap[attrName][optionValue] = new Set<number>();
            }

            filterMap[attrName][optionValue].add(productId);
          });
        });
      }
      console.log(product);
      // 2. Parse Categories (FIXED: Converts fake array-like objects into iterable arrays)
      if (product.categories) {
        console.log(product.categories);
        const categoriesArray = Array.isArray(product.categories)
          ? product.categories
          : Object.values(product.categories);

        categoriesArray.forEach((cat: any) => {
          if (!cat) return;

          const catSlug = cat.slug?.trim();
          const catName = cat.name?.trim();

          if (!catSlug || !catName) return;

          if (!catMap[catSlug]) {
            catMap[catSlug] = {
              name: catName,
              slug: catSlug,
              count: 0,
            };
          }
          catMap[catSlug].count += 1;
        });
      }
    });

    // Format attributes for standard filter sidebar
    const formattedAttributes = Object.entries(filterMap).map(
      ([name, optionsObj]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        options: Object.entries(optionsObj).map(([option, idSet]) => ({
          option,
          productIds: Array.from(idSet),
        })),
      }),
    );

    // Format and sort categories by highest product count match descending
    const formattedCategories = Object.values(catMap).sort(
      (a, b) => b.count - a.count,
    );

    setAttributes(formattedAttributes);
    setCategoryList(formattedCategories);
  }, [results]);

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    if (Object.keys(selectedFilters).length === 0) return products;

    const allAllowedIds = new Set<number>();

    Object.entries(selectedFilters).forEach(([_, selectedOptions]) => {
      if (!selectedOptions || selectedOptions.length === 0) return;

      selectedOptions.forEach((option) => {
        if (option?.productIds) {
          option.productIds.forEach((id: any) => {
            const numId = Number(id);
            if (!isNaN(numId)) allAllowedIds.add(numId);
          });
        }
      });
    });

    return products.filter((p) => allAllowedIds.has(Number(p.id)));
  }, [products, selectedFilters]);

  useEffect(() => {
    setVisibleCount(48);
  }, [selectedFilters]);

  const visibleProducts = (filteredProducts || [])?.slice(0, visibleCount);

  const handleClick = () => {
    const total = filteredProducts?.length || 0;
    setVisibleCount((prev) => Math.min(prev + 48, total));
  };

  return (
    <div className="md:overscroll-none pt-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-gray-600 text-lg font-medium">
            Search results for
          </h1>
          <span className="font-bold text-2xl sm:text-4xl block mt-1">
            "{term}"
          </span>
        </div>

        <FilterButton
          selectedFilters={selectedFilters}
          onOpen={() => setFilterOpen(true)}
        />

        <FilterNav
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          products={attributes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      <div className="flex gap-6">
        {/* Left Side Filter Panel Layout */}
        <div className="lg:block hidden lg:w-1/4 lg:pt-10 shrink-0">
          <CategoryFilter categories={categoryList} />

          <Filter
            mainCat="search"
            products={attributes}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            isVisible="w-full"
          />
        </div>

        {/* Product Cards Grid Layout */}
        <div className="flex-1 flex flex-col">
          <ProductCard products={visibleProducts} />

          <div className="flex flex-col items-center mt-10 gap-4">
            <p className="text-gray-600">
              Showing {Math.min(visibleCount, filteredProducts?.length || 0)} of{' '}
              {filteredProducts?.length || 0}
            </p>

            {(filteredProducts?.length || 0) > visibleCount && (
              <Button
                label="Load more"
                onClick={handleClick}
                className="flex w-full sm:w-1/3"
              />
            )}
          </div>
        </div>
      </div>
      <BackToTopBtn />
    </div>
  );
}
