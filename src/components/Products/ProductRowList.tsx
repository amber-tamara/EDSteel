'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import QuantityInput from '../ui/QuantitySelector';
import { FaRegTrashAlt } from 'react-icons/fa';

interface ProductRowListProps {
  products: any[];
  mainCat: string;
  subCat: string;
  className?: string;
  onRemove: (id: string | number) => void;
  onclick: () => void;
}

export default function ProductRowList({
  products,
  mainCat,
  subCat,
  className = '',
  onRemove,
  onClick,
}: ProductRowListProps) {
  const [activeDeleteId, setActiveDeleteId] = useState<string | number | null>(
    null,
  );

  const handleIndividualAddToBasket = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClick();
  };

  const handleConfirmRemove = (id: string | number) => {
    onRemove(id);
    setActiveDeleteId(null);
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

          const isConfirming = activeDeleteId === product.id;

          return (
            <div
              key={product.id}
              className={`group relative flex flex-row items-center justify-between bg-white rounded-2xl overflow-hidden p-4 gap-6 w-full border-t border-gray-200 pt-6 shrink-0 isolate ${
                isConfirming
                  ? 'after:absolute after:inset-0 after:bg-neutral-900/40 after:z-0'
                  : ''
              }`}
            >
              <div className="flex flex-row w-full sm:w-auto">
                <div className="mr-2 w-45 h-45 sm:flex-shrink-0">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-between flex-col items-start w-full gap-1">
                  <Link href={productUrl}>
                    <h2 className="sm:text-lg font-semibold text-gray-900 hover:underline transition-colors text-wrap">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-lg font-black text-gray-900 sm:hidden">
                    £3.99
                  </p>

                  <div className="flex items-center gap-2">
                    <QuantityInput />
                    <button
                      onClick={() => setActiveDeleteId(product.id)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer rounded-lg"
                    >
                      <FaRegTrashAlt size={22} />
                    </button>
                  </div>

                  <div className="flex justify-end w-full sm:hidden">
                    <Button
                      label="Add to basket"
                      onClick={handleIndividualAddToBasket}
                      className="flex w-50 mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="relative hidden sm:flex flex-col items-end justify-between gap-4 w-full border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 self-stretch">
                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">£3.99</p>
                </div>

                <Button
                  label="Add to basket"
                  onClick={handleIndividualAddToBasket}
                  className="flex w-50"
                />
              </div>

              {isConfirming && (
                <div className="py-22 absolute z-10 flex flex-col items-center justify-center gap-3 p-4 bg-white inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-[640px]:inset-auto min-[640px]:top-0 min-[640px]:bottom-0 min-[640px]:right-0 min-[640px]:left-auto min-[640px]:translate-x-0 min-[640px]:translate-y-0 min-[640px]:w-[240px] border-l border-gray-100 shadow-xl animate-fadeIn">
                  <p className="text-gray-900 font-meduim text-sm">
                    Are you sure you want to remove this item?
                  </p>
                  <div className="flex flex-col items-center gap-2 w-full justify-center">
                    <button
                      onClick={() => handleConfirmRemove(product.id)}
                      className="w-full px-3 py-3 bg-green-600 text-white font-semibold rounded-xl text-sm hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setActiveDeleteId(null)}
                      className="w-full px-3 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
