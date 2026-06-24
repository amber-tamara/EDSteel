'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductRowList from '@/components/Products/ProductRowList';
import Button from '@/components/ui/Button';
import BackToTopBtn from '@/components/ui/BackToTopBtn';
import BasketNotification from '@/components/ui/BasketNotification';
import { FaPrint } from 'react-icons/fa';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [creationDate, setCreationDate] = useState<string>('');
  const [alertTrigger, setAlertTrigger] = useState<{
    id: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    async function fetchWishlistItems() {
      const savedWishlist = JSON.parse(
        localStorage.getItem('wishlist') || '[]',
      );
      const savedDateStr = localStorage.getItem('wishlist_created_at');

      if (savedDateStr) {
        const [day, month, year] = savedDateStr.split('/');
        const createdDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );
        const today = new Date();

        const timeDiff = today.getTime() - createdDate.getTime();
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysPassed >= 30) {
          localStorage.removeItem('wishlist');
          localStorage.removeItem('wishlist_created_at');
          setWishlistProducts([]);
          setCreationDate(today.toLocaleDateString('en-GB'));
          setIsLoaded(true);
          return;
        }
      }

      const currentOrSavedDate =
        savedDateStr || new Date().toLocaleDateString('en-GB');
      setCreationDate(currentOrSavedDate);

      if (savedWishlist.length === 0) {
        setWishlistProducts([]);
        setIsLoaded(true);
        return;
      }

      try {
        const idQueryString = savedWishlist.join(',');
        const response = await fetch(`/api/wishlist?include=${idQueryString}`);

        if (!response.ok) throw new Error('Failed to fetch wishlist products');

        const data = await response.json();
        setWishlistProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoaded(true);
      }
    }

    fetchWishlistItems();
  }, []);

  const wishlistTotal = useMemo(() => {
    return wishlistProducts.reduce((sum, product) => {
      const priceStr = product.price || product.regular_price || '0';
      const cleanPrice = parseFloat(String(priceStr).replace(/[^0-9.]/g, ''));
      return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
    }, 0);
  }, [wishlistProducts]);

  const handleDeleteWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]));
    localStorage.removeItem('wishlist_created_at');
    setWishlistProducts([]);
  };

  const handleAddAllToBasket = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAlertTrigger({
      id: `all-${Date.now()}-${Math.random()}`,
      count: wishlistProducts.length,
    });
  };

  const handleRemoveProduct = (id: string | number) => {
    setWishlistProducts((prevProducts) =>
      prevProducts.filter((item) => String(item.id) !== String(id)),
    );

    let savedWishlist: any[] = [];
    try {
      savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch (e) {
      console.error('Error parsing wishlist from localStorage', e);
    }

    const updatedWishlist = savedWishlist.filter((item) => {
      const storedId = item && typeof item === 'object' ? item.id : item;
      return String(storedId) !== String(id);
    });

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    if (updatedWishlist.length === 0) {
      localStorage.removeItem('wishlist_created_at');
    }
  };

  if (!isLoaded) {
    return (
      <div className="pt-10 text-center text-gray-500">
        Loading your wish list...
      </div>
    );
  }

  return (
    <div className="pt-6 relative">
      {alertTrigger && (
        <BasketNotification
          key={alertTrigger.id}
          addedCount={alertTrigger.count}
          onClose={() => setAlertTrigger(null)}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900">My wish list</h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">
            Your Wish List is currently empty.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mt-2">
            List created {creationDate}
          </p>
          <div className="py-2 text-sm">
            This wish list is available for 30 days.{' '}
            <Link
              href="/signin"
              className="font-semibold underline hover:text-amber-950"
            >
              Sign in
            </Link>{' '}
            or{' '}
            <Link
              href="/register"
              className="font-semibold underline hover:text-amber-950"
            >
              register
            </Link>{' '}
            to save items to your account and access them from everywhere.
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start my-6">
            <div className="w-full">
              <ProductRowList
                products={wishlistProducts}
                mainCat="wishlist"
                subCat="saved-items"
                onRemove={handleRemoveProduct}
                onAddToBasket={() =>
                  setAlertTrigger({
                    id: `single-${Date.now()}-${Math.random()}`,
                    count: 1,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-between w-full border-t border-gray-200 pt-6 shrink-0">
            <h2 className="text-2xl font-bold mr-2">Wish list total:</h2>
            <div className="flex items-start">
              <span className="text-3xl font-black text-gray-900">
                £{wishlistTotal.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full sticky bottom-0 bg-white pt-10 pb-4 md:py-3">
            <button
              onClick={() => window.print()}
              className="items-center hidden md:flex cursor-pointer border border-black border-2 py-3 px-10 hover:border-red-600 transition-all"
            >
              <FaPrint size={14} className="mr-2" />
              Print
            </button>
            <Button
              label="Add all to basket"
              onClick={handleAddAllToBasket}
              className="flex w-full md:w-50 bg-green-600! border-transparent! text-white!"
            />
          </div>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center md:hidden cursor-pointer border border-black border-2 py-3 px-10 hover:border-red-600 transition-all mb-6"
          >
            <FaPrint size={14} className="mr-2" />
            Print
          </button>
          <button
            onClick={handleDeleteWishlist}
            className="hover:text-red-600 underline transition-all cursor-pointer md:text-left text-center block w-full"
          >
            Delete Wish List
          </button>
          <BackToTopBtn className="bg-gray-200 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-0! mt-6! p-4!" />
        </div>
      )}
    </div>
  );
}
