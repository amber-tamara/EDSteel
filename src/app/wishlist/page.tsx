'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/Products/ProductCard';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [creationDate, setCreationDate] = useState<string>('');

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
    if (confirm('Are you sure you want to delete your entire wish list?')) {
      localStorage.setItem('wishlist', JSON.stringify([]));
      localStorage.removeItem('wishlist_created_at');
      setWishlistProducts([]);
    }
  };

  const handleAddAllToBasket = () => {
    console.log('Adding all items to basket:', wishlistProducts);
  };

  if (!isLoaded) {
    return (
      <div className="pt-10 text-center text-gray-500">
        Loading your wish list...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-b border-gray-200 pb-6 mb-8">
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
          <p className="text-sm text-gray-500 mt-1">
            List created {creationDate}
          </p>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
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

          <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
            <div className="flex-1 w-full">
              <ProductCard
                products={wishlistProducts}
                mainCat="wishlist"
                subCat="saved-items"
              />
            </div>

            <div className="w-full lg:w-80 bg-gray-50 rounded-lg border border-gray-200 p-6 shrink-0 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
                Wish list total
              </h2>

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-gray-600 text-sm">
                  Total ({wishlistProducts.length}{' '}
                  {wishlistProducts.length === 1 ? 'item' : 'items'}):
                </span>
                <span className="text-3xl font-black text-gray-900">
                  £{wishlistTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  label="Add all to basket"
                  onClick={handleAddAllToBasket}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                />

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 text-sm font-medium">
                  <button
                    onClick={() => window.print()}
                    className="text-gray-600 hover:text-gray-900 hover:underline transition-all"
                  >
                    Print
                  </button>

                  <button
                    onClick={handleDeleteWishlist}
                    className="text-red-600 hover:text-red-800 hover:underline transition-all"
                  >
                    Delete Wish List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
