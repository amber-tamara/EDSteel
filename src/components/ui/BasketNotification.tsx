'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface BasketNotificationProps {
  addedCount: number;
  onClose: () => void;
  varient: boolean;
}

export default function BasketNotification({
  addedCount,
  onClose,
  varient,
}: BasketNotificationProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const animFrame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleClose = () => {
    setIsMounted(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen bg-white z-50 border-b border-gray-100 shadow-sm transition-transform duration-300 ease-in-out transform ${
        isMounted ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto pt-5 pb-5 px-5 w-[92%] max-w-md flex flex-col gap-3 bg-white">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-3">
            <FaCheckCircle size={22} className="text-green-600 shrink-0" />
            {
              <p className="text-gray-900 font-semibold text-base">
                {addedCount} {addedCount === 1 ? 'Item' : 'Items'} added to your
                {varient ? ' wishlist' : ' basket'}
              </p>
            }
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <Link href={varient ? '/wishlist' : '/basket'} className="w-full">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors shadow-sm cursor-pointer">
            Go to {varient ? ' wishlist' : ' basket'}
          </button>
        </Link>
      </div>
    </div>
  );
}
