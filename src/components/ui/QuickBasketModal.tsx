'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

interface QuickBasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemImageUrl: string;
  quantity?: number;
}

export default function QuickBasketModal({
  isOpen,
  onClose,
  itemName,
  itemImageUrl,
  quantity = 1,
}: QuickBasketModalProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-51 flex items-start justify-center p-4 overflow-hidden">
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ease-out cursor-pointer ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-5 mt-4 transition-all duration-300 ease-out transform ${
          animate ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-600 shrink-0" size={18} />
            <h3 className="font-semibold text-gray-900 text-base">
              {quantity} {quantity === 1 ? 'item' : 'items'} added to basket
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img
              src={itemImageUrl}
              alt={itemName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="text-gray-800 text-sm font-medium line-clamp-2">
            {itemName}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <button
            onClick={onClose}
            className="w-full order-2 sm:order-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl text-center text-sm transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
          <Link href="/basket" className="w-full order-1 sm:order-2">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-center text-sm transition-colors shadow-sm cursor-pointer">
              Go to basket
            </button>
          </Link>
        </div>
        <h2 className="border-t border-gray-300 mt-6 pt-6">
          Recommended for you
        </h2>
      </div>
    </div>
  );
}
