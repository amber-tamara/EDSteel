'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaShoppingBasket, FaUser } from 'react-icons/fa';
import MobileNav from './MobileNav';
import SearchBar from '@/components/ui/SearchBar';

export default function MobileHeader({ categories }: MobileHeaderProps) {
  return (
    <div className="text-white">
      <div className="lg:hidden bg-primary-custom-teal flex flex-col justify-around p-2">
        <div className="flex justify-between gap-2 relative z-51 pb-2">
          <MobileNav categories={categories} />

          <button className="flex items-center justify-center flex-col">
            <FaPhone size={20} />
            <h3 className="text-sm sm:text-base mt-0.5">Contact</h3>
          </button>
          <Link href="/" className="shrink-0">
            <Image
              src="/ED_logo_sm.svg"
              alt="Company Logo"
              width={60}
              height={10}
            />
          </Link>
          <button className="flex flex-wrap items-center justify-center flex-col">
            <FaUser size={20} />
            <h3 className="text-sm text-wrap sm:text-base mt-0.5">
              My Account
            </h3>
          </button>

          <button className="flex flex-wrap items-center justify-center flex-col mr-1.5">
            <FaShoppingBasket size={20} />
            <h3 className="text-sm sm:text-base mt-0.5">Basket</h3>
          </button>
        </div>

        {/* Lowered the search bar section's stack position */}
        <div className="relative z-10 w-full">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

interface MobileHeaderProps {
  categories: string[];
}
