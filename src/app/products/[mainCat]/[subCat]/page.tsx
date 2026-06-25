'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { fromSlugToName, andToAmpersand } from '@/helpers/text';
import Link from 'next/link';
import ProductCard from '@/components/Products/ProductCard';
import Filter from '@/components/Products/Filter';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import BackToTopBtn from '@/components/ui/BackToTopBtn';
import FilterButton from '@/components/Products/FilterButton';
import FilterNav from '@/components/Products/FilterNav';
import LoadingBar from '@/components/ui/LoadingBar';
import BasketNotification from '@/components/ui/BasketNotification';
import QuickBasketModal from '@/components/ui/QuickBasketModal';

export default function SubCategoryPage() {
  const { mainCat, subCat } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(48);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const [alertTrigger, setAlertTrigger] = useState<{
    id: string;
    count: number;
  } | null>(null);

  const [basketModal, setBasketModal] = useState<{
    isOpen: boolean;
    itemName: string;
    itemImageUrl: string;
  }>({
    isOpen: false,
    itemName: '',
    itemImageUrl: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => {
      return searchParams.get('category') || null;
    },
  );

  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>(
    () => {
      const initialFilters: Record<string, any[]> = {};
      searchParams.forEach((value, key) => {
        if (key === 'category') return;
        const options = value.split(',').map((opt) => ({
          option: opt,
          productIds: [],
        }));
        initialFilters[key] = options;
      });
      return initialFilters;
    },
  );

  useEffect(() => {
    if (!subCat) return;

    setLoading(true);

    fetch(`/api/subProducts/${subCat}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts = data.products || [];
        const fetchedAttributes = data.attributes || [];

        setProducts(fetchedProducts);
        setAttributes(fetchedAttributes);

        setSelectedFilters((prevCurrentFilters) => {
          const updated = { ...prevCurrentFilters };
          Object.keys(updated).forEach((attrName) => {
            const liveAttr = fetchedAttributes.find(
              (a: any) => a.name === attrName,
            );
            if (!liveAttr) {
              delete updated[attrName];
            } else {
              updated[attrName] = updated[attrName].map((savedOpt) => {
                const realOpt = liveAttr.options.find(
                  (o: any) => o.option.trim() === savedOpt.option.trim(),
                );
                return realOpt ? realOpt : savedOpt;
              });
            }
          });
          return updated;
        });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setIsReady(true);
      });
  }, [subCat]);

  useEffect(() => {
    if (!isReady) return;

    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    Object.entries(selectedFilters).forEach(([attrName, options]) => {
      if (options && options.length > 0) {
        const optionValues = options.map((o) => o.option).join(',');
        params.set(attrName, optionValues);
      }
    });

    const queryString = params.toString();
    const currentPath = window.location.pathname;

    router.replace(
      queryString ? `${currentPath}?${queryString}` : currentPath,
      { scroll: false },
    );
  }, [selectedCategory, selectedFilters, isReady, router]);

  const attributeFilteredProductsOnly = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    if (Object.keys(selectedFilters).length === 0) return products;

    const allAllowedIds = new Set<number>();
    let trackingValidFilters = false;

    const flatDynamicAttributesMap: Record<string, any[]> = {};
    products.forEach((product) => {
      if (!product || !product.attributes) return;
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
          if (!flatDynamicAttributesMap[attrName])
            flatDynamicAttributesMap[attrName] = [];

          const existingOpt = flatDynamicAttributesMap[attrName].find(
            (o) => o.option === optionValue,
          );
          if (existingOpt) {
            existingOpt.productIds.push(Number(product.id));
          } else {
            flatDynamicAttributesMap[attrName].push({
              option: optionValue,
              productIds: [Number(product.id)],
            });
          }
        });
      });
    });

    Object.entries(selectedFilters).forEach(([attrName, selectedOptions]) => {
      if (!selectedOptions || selectedOptions.length === 0) return;
      const targetGroup = flatDynamicAttributesMap[attrName];
      if (!targetGroup) return;

      selectedOptions.forEach((selOption) => {
        const matchedOpt = targetGroup.find(
          (o) => o.option.trim() === selOption.option.trim(),
        );
        if (matchedOpt?.productIds) {
          trackingValidFilters = true;
          matchedOpt.productIds.forEach((id: any) => {
            const numId = Number(id);
            if (!isNaN(numId)) allAllowedIds.add(numId);
          });
        }
      });
    });

    return trackingValidFilters
      ? products.filter((p) => allAllowedIds.has(Number(p.id)))
      : products;
  }, [products, selectedFilters]);

  const categoryList = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    const catMap: Record<
      string,
      { name: string; slug: string; count: number }
    > = {};

    attributeFilteredProductsOnly.forEach((product) => {
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
  }, [products, attributeFilteredProductsOnly]);

  const categoryFilteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    if (!selectedCategory) return products;

    return products.filter((product) => {
      if (!product || !product.categories) return false;
      const categoriesArray = Array.isArray(product.categories)
        ? product.categories
        : Object.values(product.categories);
      return categoriesArray.some((cat: any) => cat?.slug === selectedCategory);
    });
  }, [products, selectedCategory]);

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
    if (!isReady) return;

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
  }, [selectedCategory, dynamicAttributes, isReady]);

  useEffect(() => {
    setVisibleCount(48);
  }, [selectedFilters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleClick = () =>
    setVisibleCount((prev) => Math.min(prev + 48, filteredProducts.length));

  return (
    <div className="md:overscroll-none relative">
      {alertTrigger && (
        <div className="sticky top-0 z-30">
          <BasketNotification
            key={alertTrigger.id}
            addedCount={alertTrigger.count}
            onClose={() => setAlertTrigger(null)}
            varient={true}
          />
        </div>
      )}

      <Breadcrumbs mainCat={mainCat} subCat={subCat} />
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl pt-7 sm:pt-10 font-bold">
            {fromSlugToName(andToAmpersand(subCat))}
          </h1>
          <h2 className="mt-1 mb-10 lg:mb-0 text-gray-600">
            See more{' '}
            <Link
              className="font-bold cursor-pointer hover:underline"
              href={`/products/${mainCat}`}
            >
              {fromSlugToName(andToAmpersand(mainCat))}
            </Link>
          </h2>
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
        <Filter
          mainCat={mainCat}
          subCat={subCat}
          products={dynamicAttributes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          isVisible="lg:block hidden lg:w-1/4 lg:pt-10"
          categories={categoryList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="flex-1 flex flex-col">
          {loading ? (
            <LoadingBar />
          ) : (
            <>
              <ProductCard
                products={visibleProducts}
                subCat={subCat}
                mainCat={mainCat}
                onClick={() =>
                  setAlertTrigger({
                    id: `single-${Date.now()}-${Math.random()}`,
                    count: 1,
                  })
                }
                onAddToBasket={(itemName: string, itemImageUrl: string) =>
                  setBasketModal({
                    isOpen: true,
                    itemName,
                    itemImageUrl,
                  })
                }
              />

              <div className="flex flex-col items-center mt-10 gap-4">
                <p className="text-gray-600">
                  Showing {Math.min(visibleCount, filteredProducts.length)} of{' '}
                  {filteredProducts.length}
                </p>

                {visibleCount < filteredProducts.length && (
                  <Button
                    label="Load more"
                    onClick={handleClick}
                    className="flex w-full sm:w-1/3"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <BackToTopBtn />

      <QuickBasketModal
        isOpen={basketModal.isOpen}
        onClose={() => setBasketModal((prev) => ({ ...prev, isOpen: false }))}
        itemName={basketModal.itemName}
        itemImageUrl={basketModal.itemImageUrl}
      />
    </div>
  );
}
