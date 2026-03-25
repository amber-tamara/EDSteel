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
      className="relative flex self-end w-10 items-center p-2 pb-3 cursor-pointer"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      {/* Outline heart */}
      <FaRegHeart
        className={`transition-colors duration-200
          ${
            saved
              ? "text-green-600"
              : "text-gray-500 hover:text-green-600"
          }`}
          size={25}
      />

      {/* Filled heart — perfectly centered on top */}
      <FaHeart
        className={`absolute text-green-600 transition-opacity duration-200
          ${saved ? "opacity-100" : "opacity-0"}`}
          size={25}
      />
    </button>
  );
}
