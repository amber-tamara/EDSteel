'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function SubCategoryPage() {
  const { mainCat, subCat } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>(
    {},
  );
  const [visibleCount, setVisibleCount] = useState(48);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subCat) return;

    setLoading(true);

    fetch(`/api/subProducts/${subCat}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setAttributes(data.attributes || []);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [subCat]);
  const filteredProducts = useMemo(() => {
    if (Object.keys(selectedFilters).length === 0) return products;

    const allAllowedIds = new Set<number>();

    Object.entries(selectedFilters).forEach(([groupName, selectedOptions]) => {
      if (selectedOptions.length === 0) return;

      const groupIds = new Set<number>();
      selectedOptions.forEach((option) => {
        option.productIds.forEach((id: any) => {
          const numId = Number(id);
          if (!isNaN(numId)) groupIds.add(numId);
        });
      });
      groupIds.forEach((id) => allAllowedIds.add(id));
    });

    const filtered = products.filter((p) => allAllowedIds.has(Number(p.id)));

    return filtered;
  }, [products, selectedFilters]);

  useEffect(() => {
    setVisibleCount(48);
  }, [selectedFilters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleClick = () =>
    setVisibleCount((prev) => Math.min(prev + 48, filteredProducts.length));

  return loading ? (
    <LoadingBar />
  ) : (
    <div className="md:overscroll-none">
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
        <Filter
          mainCat={mainCat}
          subCat={subCat}
          products={attributes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          isVisible="lg:block hidden"
        />
        <div className="flex-1 flex flex-col">
          <ProductCard
            products={visibleProducts}
            subCat={subCat}
            mainCat={mainCat}
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
        </div>
      </div>
      <BackToTopBtn />
    </div>
  );
}
