'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Filter from '@/components/Products/Filter';
import ProductCard from '@/components/Products/ProductCard';
import FilterButton from '@/components/Products/FilterButton';
import FilterNav from '@/components/Products/FilterNav';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => {
      return searchParams.get('category') || null;
    },
  );

  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>(
    () => {
      const initialFilters: Record<string, any[]> = {};
      searchParams.forEach((value, key) => {
        if (key === 'term' || key === 'category') return;
        initialFilters[key] = value.split(',').map((opt) => ({ option: opt }));
      });
      return initialFilters;
    },
  );

  const [visibleCount, setVisibleCount] = useState(48);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();
    params.set('term', term);

    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    Object.entries(selectedFilters).forEach(([attrName, optionsArray]) => {
      if (optionsArray && optionsArray.length > 0) {
        const optionValues = optionsArray.map((opt) => opt.option).join(',');
        params.set(attrName, optionValues);
      }
    });

    const queryString = params.toString();
    const currentPath = window.location.pathname;

    // Smoothly updates URL without triggering a full server component data refetch
    router.replace(
      queryString ? `${currentPath}?${queryString}` : currentPath,
      { scroll: false },
    );
  }, [selectedCategory, selectedFilters, term, router]);

  // --- Your existing processing logic remains unchanged ---
  const categoryList = useMemo(() => {
    if (!results || !Array.isArray(results)) return [];
    const catMap: Record<
      string,
      { name: string; slug: string; count: number }
    > = {};

    results.forEach((product) => {
      if (!product || !product.categories) return;
      const categoriesArray = Array.isArray(product.categories)
        ? product.categories
        : Object.values(product.categories);

      categoriesArray.forEach((cat: any) => {
        if (!cat) return;
        const catSlug = cat.slug?.trim();
        const catName = cat.name?.trim();
        if (!catSlug || !catName) return;

        if (!catMap[catSlug]) {
          catMap[catSlug] = { name: catName, slug: catSlug, count: 0 };
        }
        catMap[catSlug].count += 1;
      });
    });

    return Object.values(catMap).sort((a, b) => b.count - a.count);
  }, [results]);

  const categoryFilteredProducts = useMemo(() => {
    if (!results || !Array.isArray(results)) return [];
    if (!selectedCategory) return results;

    return results.filter((product) => {
      if (!product || !product.categories) return false;
      const categoriesArray = Array.isArray(product.categories)
        ? product.categories
        : Object.values(product.categories);
      return categoriesArray.some((cat: any) => cat?.slug === selectedCategory);
    });
  }, [results, selectedCategory]);

  const dynamicAttributes = useMemo(() => {
    const filterMap: Record<string, Record<string, Set<number>>> = {};

    categoryFilteredProducts.forEach((product) => {
      if (!product || !product.attributes) return;
      const productId = Number(product.id);
      if (isNaN(productId)) return;

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
    });

    return Object.entries(filterMap).map(([name, optionsObj]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      options: Object.entries(optionsObj).map(([option, idSet]) => ({
        option,
        productIds: Array.from(idSet),
      })),
    }));
  }, [categoryFilteredProducts]);

  const filteredProducts = useMemo(() => {
    let finalProducts = categoryFilteredProducts;

    if (Object.keys(selectedFilters).length > 0) {
      const allAllowedIds = new Set<number>();
      let trackingValidFilters = false;

      Object.entries(selectedFilters).forEach(([attrName, selectedOptions]) => {
        if (!selectedOptions || selectedOptions.length === 0) return;

        const liveAttr = dynamicAttributes.find((a) => a.name === attrName);
        if (!liveAttr) return;

        selectedOptions.forEach((selOption) => {
          const liveOpt = liveAttr.options.find(
            (o) => o.option.trim() === selOption.option.trim(),
          );

          if (liveOpt?.productIds) {
            trackingValidFilters = true;
            liveOpt.productIds.forEach((id: any) => {
              const numId = Number(id);
              if (!isNaN(numId)) allAllowedIds.add(numId);
            });
          }
        });
      });

      if (trackingValidFilters) {
        finalProducts = finalProducts.filter((p) =>
          allAllowedIds.has(Number(p.id)),
        );
      }
    }

    return finalProducts;
  }, [categoryFilteredProducts, selectedFilters, dynamicAttributes]);

  useEffect(() => {
    // If the category selection changes, prune invalid dynamic filters
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      let changed = false;

      Object.keys(updated).forEach((attrName) => {
        const liveAttribute = dynamicAttributes.find(
          (attr) => attr.name === attrName,
        );

        if (!liveAttribute) {
          delete updated[attrName];
          changed = true;
        } else {
          const currentSelectedOptions = updated[attrName] || [];

          const validSelectedOptions = currentSelectedOptions.filter(
            (selectedOption) =>
              liveAttribute.options.some(
                (liveOpt) =>
                  liveOpt.option.trim() === selectedOption.option.trim(),
              ),
          );

          if (validSelectedOptions.length !== currentSelectedOptions.length) {
            if (validSelectedOptions.length === 0) {
              delete updated[attrName];
            } else {
              updated[attrName] = validSelectedOptions;
            }
            changed = true;
          }
        }
      });

      return changed ? updated : prev;
    });
    setVisibleCount(48);
  }, [selectedCategory, dynamicAttributes]);

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
          selectedCategory={selectedCategory}
          onOpen={() => setFilterOpen(true)}
        />

        <FilterNav
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          products={dynamicAttributes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          categories={categoryList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="flex gap-6">
        <div className="lg:block hidden lg:w-1/4 lg:pt-10 shrink-0">
          <Filter
            mainCat="search"
            products={dynamicAttributes}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            isVisible="w-full"
            categories={categoryList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

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
