'use client';

import Link from 'next/link';
import {
  FaHeart,
  FaUserPlus,
  FaSignInAlt,
  FaTruck,
  FaCheckCircle,
} from 'react-icons/fa';

export default function UtilityBar() {
  return (
    <div className="w-full bg-primary-custom-teal text-white px-15">
      <div className="flex justify-between items-center py-2 text-sm">
        {/* LEFT SIDE (support / reassurance) */}
        <div className="flex items-center gap-4 opacity-90">
          <div className="flex items-center gap-1">
            <FaTruck size={14} />
            <span>Free delivery over £50</span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <FaCheckCircle size={14} />
            <span>Trusted supplier</span>
          </div>
        </div>

        {/* RIGHT SIDE (actions) */}
        <div className="flex items-center gap-6">
          <Link
            href="/wishlist"
            className="flex items-center gap-1 hover:underline"
          >
            <FaHeart size={14} />
            <span>Wishlist</span>
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-1 hover:underline"
          >
            <FaUserPlus size={14} />
            <span>Register</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1 hover:underline"
          >
            <FaSignInAlt size={14} />
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
