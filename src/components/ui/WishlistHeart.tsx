'use client';

import { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function WishlistHeart({
  productId,
  onClick,
}: {
  productId: string | number;
  onClick: () => void;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setSaved(wishlist.includes(String(productId)));
  }, [productId]);

  const toggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const id = String(productId);
    const isRemoving = saved;

    const updated = isRemoving
      ? wishlist.filter((i: string) => i !== id)
      : [...wishlist, id];

    localStorage.setItem('wishlist', JSON.stringify(updated));

    if (!isRemoving && wishlist.length === 0) {
      const dateString = new Date().toLocaleDateString('en-GB');
      localStorage.setItem('wishlist_created_at', dateString);
    } else if (updated.length === 0) {
      localStorage.removeItem('wishlist_created_at');
    }

    setSaved(!saved);
    onClick();
  };

  return (
    <button
      onClick={toggle}
      className="relative self-end p-2 cursor-pointer"
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <div className="relative transition-transform duration-300 hover:scale-110 hover:!text-green-600 text-gray-500">
        <FaRegHeart
          className={`text-[28px] transition-colors duration-300
            ${saved && 'text-green-600'}`}
          size={25}
        />

        <FaHeart
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28px] text-green-600 transition-all duration-300
            ${saved ? 'opacity-100' : 'opacity-0'}`}
          size={25}
        />
      </div>
    </button>
  );
}
