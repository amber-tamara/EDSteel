// components/WishlistHeart.tsx
"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function WishlistHeart({
  productId,
}: {
  productId: string | number;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setSaved(wishlist.includes(String(productId)));
  }, [productId]);

  const toggle = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const id = String(productId);
    const updated = saved
      ? wishlist.filter((i: string) => i !== id)
      : [...wishlist, id];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggle}
      className="group relative inline-flex items-center justify-center p-2 transition-all duration-200"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      {/* Outline heart */}
      <FaRegHeart
        className={`w-6 h-6 transition-colors duration-200
          ${
            saved
              ? "text-green-600"
              : "text-gray-500 group-hover:text-green-600"
          }`}
      />

      {/* Filled heart — perfectly centered on top */}
      <FaHeart
        className={`absolute w-6 h-6 text-green-600 transition-opacity duration-200
          ${saved ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}
