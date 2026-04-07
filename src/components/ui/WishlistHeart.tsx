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
      className="relative self-end p-2 cursor-pointer"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <div className="relative transition-transform duration-300 hover:scale-110 hover:!text-green-600 text-gray-500">
        {/* Outline heart - hover color change */}
        <FaRegHeart
          className={`text-[28px] transition-colors duration-300
            ${saved 
              && "text-green-600" 
            }`}
            size={25}
        />

        {/* Filled heart overlay */}
        <FaHeart
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28px] text-green-600 transition-all duration-300
            ${saved ? "opacity-100" : "opacity-0"}`}
            size={25}
        />
      </div>
    </button>
  );
}