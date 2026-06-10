'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import QuantityInput from '../ui/QuantitySelector';
import WishlistHeart from '../ui/WishlistHeart';
import ProductDetails from './ProductDetails';
import ProductInformation from './ProductInformation';
import ProductCard from './ProductCard';

interface ProductViewProps {
  productData;
}

export default function ProductView({ productData }: ProductViewProps) {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(productData.singleProduct ?? null);
  const [variants, setVariants] = useState(productData.varients ?? []);

  const mainCat = product.categories[0].name;
  const subCat = product.slug;

  const handleClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  console.log(variants);
  return (
    <div className="-mx-4 md:-mx-8 xl:-mx-25">
      <div className="flex flex-col lg:flex-row justify-center py-10 px-5">
        <div className="w-full lg:hidden">
          <h1 className="text-3xl leading-[1.2] text-black font-bold mb-4 text-center">
            {product.name}
          </h1>
        </div>

        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            className="mb-4 w-64 h-auto object-cover mx-auto lg:mx-0"
          />
        )}

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="hidden lg:block text-3xl leading-[1.2] text-black font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-4xl leading-[1.6] font-semibold mb-4 text-black">
              £3.99
            </p>
          </div>

          <div className="flex flex-col flex-wrap gap-4">
            <div className="flex flex-row justify-between">
              <QuantityInput value={qty} onChange={setQty} />
              <WishlistHeart productId={product.id} />
            </div>

            <div className="w-full">
              <Button
                label="Add to Basket"
                className="w-full flex text-black"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff0f0] flex justify-between flex-wrap">
        <ProductInformation product={product} />
        <ProductDetails product={product} />
      </div>

      {variants.length > 0 && (
        <div className="px-5 sm:px-6 lg:px-10 py-10">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Similar products
          </h2>
          <ProductCard
            products={variants}
            mainCat={mainCat}
            subCat={subCat}
            className="lg:grid-cols-4 md:grid-cols-3 gap-1"
          />
        </div>
      )}
    </div>
  );
}
