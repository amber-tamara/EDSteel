'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import BasketNotification from '@/components/ui/BasketNotification';
import QuantityInput from '../ui/QuantitySelector';
import WishlistHeart from '../ui/WishlistHeart';
import ProductDetails from './ProductDetails';
import ProductInformation from './ProductInformation';
import ProductCard from './ProductCard';
import BackToTopBtn from '../ui/BackToTopBtn';
import QuickBasketModal from '../ui/QuickBasketModal';

interface ProductViewProps {
  productData: any;
}

export default function ProductView({ productData }: ProductViewProps) {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(productData.singleProduct ?? null);
  const [variants, setVariants] = useState(productData.varients ?? []);

  const [alertTrigger, setAlertTrigger] = useState<{
    id: string;
    count: number;
  } | null>(null);

  const [visible, setVisible] = useState(false);

  const [basketModal, setBasketModal] = useState<{
    isOpen: boolean;
    itemName: string;
    itemImageUrl: string;
  }>({
    isOpen: false,
    itemName: '',
    itemImageUrl: '',
  });

  const { mainCat, subCat } = useParams();

  useEffect(() => {
    if (basketModal.isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [basketModal.isOpen]);

  useEffect(() => {
    if (!alertTrigger) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, [alertTrigger]);

  useEffect(() => {
    if (!alertTrigger || visible) return;

    const timer = setTimeout(() => {
      setAlertTrigger(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [alertTrigger, visible]);

  const handleWishlistClick = (added: boolean) => {
    if (added) {
      setAlertTrigger({
        id: `alert-${Date.now()}-${Math.random()}`,
        count: 1,
      });
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setBasketModal({
      isOpen: true,
      itemName: product.name,
      itemImageUrl: product.images?.[0]?.src || '',
    });
  };

  return (
    <div className="-mx-5 md:-mx-15 relative">
      {alertTrigger && (
        <div
          className={`sticky lg:top-0 top-[125px] z-30 shadow-md transition-all duration-300 ease-in-out ${
            visible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <BasketNotification
            key={alertTrigger.id}
            addedCount={alertTrigger.count}
            onClose={() => setVisible(false)}
            varient={true}
          />
        </div>
      )}

      <div className="px-5 lg:px-15">
        <Breadcrumbs
          mainCat={mainCat}
          subCat={subCat}
          productName={product.name.split(/\d/)[0].trim()}
        />
      </div>

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
            className="mb-4 mr-4 w-64 h-auto object-cover mx-auto lg:mx-0"
          />
        )}

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="hidden lg:block text-3xl leading-[1.2] text-black font-semibold mb-4">
              {product.name}
            </h1>

            <p className="text-4xl leading-[1.6] font-bold mb-4 text-black">
              £3.99
            </p>
          </div>

          <div className="flex flex-col flex-wrap gap-4">
            <div className="flex flex-row justify-between">
              <QuantityInput value={qty} onChange={setQty} />
              <WishlistHeart
                productId={product.id}
                onClick={handleWishlistClick}
              />
            </div>

            <div className="w-full">
              <Button
                label="Add to basket"
                className="w-full flex text-black"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff0f0] px-5 lg:px-15">
        <h2 className="text-2xl font-bold text-black pt-10 pb-6 border-b border-gray-300">
          Product details
        </h2>
        <div className="flex justify-between flex-wrap">
          <ProductInformation product={product} />
          <ProductDetails product={product} />
        </div>
      </div>

      {variants.length > 0 && (
        <div className="px-5 sm:px-6 lg:px-15 py-10">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Similar products
          </h2>
          <ProductCard
            products={variants}
            mainCat={mainCat}
            subCat={subCat}
            className="lg:grid-cols-4 md:grid-cols-3 gap-1"
            onClick={() => {}}
            onWishlistChange={handleWishlistClick}
            onAddToBasket={(itemName: string, itemImageUrl: string) =>
              setBasketModal({
                isOpen: true,
                itemName,
                itemImageUrl,
              })
            }
          />
        </div>
      )}

      <BackToTopBtn className="mt-0!" />

      <QuickBasketModal
        isOpen={basketModal.isOpen}
        onClose={() => setBasketModal((prev) => ({ ...prev, isOpen: false }))}
        itemName={basketModal.itemName}
        itemImageUrl={basketModal.itemImageUrl}
      />
    </div>
  );
}
