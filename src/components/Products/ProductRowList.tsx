'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import QuantityInput from '../ui/QuantitySelector';

interface ProductRowListProps {
  products: any[];
  mainCat: string;
  subCat: string;
  className?: string;
}

export default function ProductRowList({
  products,
  mainCat,
  subCat,
  className = '',
}: ProductRowListProps) {
  const handleClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {Array.isArray(products) &&
        products.map((product) => {
          const productUrl = subCat
            ? `/products/${mainCat}/${subCat}/${product.slug}`
            : product.url;

          const imageSrc =
            product.img || product.image || product.images?.[0]?.src;

          return (
            <div
              key={product.id}
              className="group relative flex flex-row items-center justify-between bg-white border border-transparent hover:border-gray-200 rounded-2xl overflow-hidden p-4 gap-6 transition-all duration-300 hover:shadow-lg w-full"
            >
              <div className="flex flex-row">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300"
                />
                <div className="flex justify-between flex-col items-start w-full">
                  <Link href={productUrl}>
                    <h2 className="sm:text-lg font-semibold text-gray-900 hover:underline transition-colors text-wrap">
                      {product.name}
                    </h2>
                  </Link>
                  <QuantityInput />
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-4 w-full border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 self-stretch">
                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">£3.99</p>
                </div>

                <Button
                  label="Add to basket"
                  onClick={handleClick}
                  className="flex w-1/4"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
