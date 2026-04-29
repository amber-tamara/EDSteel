'use client';
import CategoryList from './CategoryList';
import Image from 'next/image';
import { FaPhone, FaShoppingBasket } from 'react-icons/fa';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import UtilityBar from '@/components/ui/UtilityBar';

export default function DesktopHeader({ categories }: DesktopHeaderProps) {
  return (
    <header className="hidden lg:flex flex-col pb-3">
      <UtilityBar />
      <div className="bg-primary-custom-teal px-15 py-4 flex justify-around h-1/2">
        <div className="flex w-screen items-center">
          <Image
            src="/banana.png"
            alt="Company Logo"
            width={160}
            height={10}
            className="lex-initial mr-3"
          />
          <SearchBar />
        </div>
        <div className="flex text-white">
          <Link
            href="/contact"
            className="flex flex-wrap items-center justify-center mr-6"
          >
            <FaPhone size={20} />
            <h3>Contact</h3>
          </Link>
          <button className="flex flex-wrap items-center justify-center">
            <FaShoppingBasket size={20} />
            <h3>Basket</h3>
          </button>
        </div>
      </div>
      <CategoryList categories={categories} />
    </header>
  );
}

interface DesktopHeaderProps {
  categories: string[];
}
