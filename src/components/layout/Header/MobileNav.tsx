'use client';

import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { andToAmpersand } from '@/helpers/text';

export default function MobileNav({ categories }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<any>(null);

  const handleToggle = () => {
    setOpen(!open);
    setActiveCat(null);
  };

  return (
    <div className="flex">
      {/* OPEN BUTTON */}
      <button
        onClick={handleToggle}
        className="flex flex-col items-center justify-center ml-1.5"
      >
        <FaBars size={20} />
        <h3 className="text-sm sm:text-base mt-0.5">Menu</h3>
      </button>

      {open && (
        <div className="absolute top-0 left-0 w-full sm:w-2/5 h-screen bg-secondary-custom-teal shadow-md flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-[#82a7a1]">
            {activeCat ? (
              <button
                onClick={() => setActiveCat(null)}
                className="flex items-center gap-2 text-white"
              >
                <FaChevronLeft />
                Back
              </button>
            ) : (
              <Image src="/lol.svg" alt="Logo" width={60} height={10} />
            )}

            <button onClick={handleToggle}>
              <FaTimes size={24} />
            </button>
          </div>

          {/* MAIN CATEGORY LIST */}
          {!activeCat && (
            <ul className="flex flex-col divide-y divide-[#82a7a1]">
              {categories.map((item) => (
                <li
                  key={item.mainCat}
                  onClick={() => setActiveCat(item)}
                  className="flex justify-between items-center py-5 px-3 cursor-pointer hover:bg-white hover:text-black"
                >
                  <span>{item.mainCat}</span>
                  <FaChevronRight className="opacity-60" />
                </li>
              ))}
            </ul>
          )}

          {/* SUB CATEGORY VIEW */}
          {activeCat && (
            <div className="flex flex-col flex-1">
              {/* HEADER */}
              <div className="bg-gray-100 px-4 py-4 border-b border-gray-200">
                <p className="font-bold text-black text-lg">
                  {activeCat.mainCat}
                </p>
              </div>

              {/* OPTIONS */}
              <ul className="flex flex-col bg-white text-black divide-y">
                {/* ALL MAIN CATEGORY */}
                <li className="py-5 px-4 hover:bg-gray-50">
                  <Link
                    href={`/products/${activeCat.mainCatSlug}`}
                    onClick={handleToggle}
                    className="flex justify-between items-center"
                  >
                    <span>All {activeCat.mainCat}</span>
                    <FaChevronRight className="opacity-40" />
                  </Link>
                </li>

                {/* SUB CATEGORIES */}
                {activeCat.subCats.map((sub: any) => (
                  <li key={sub.slug} className="py-5 px-4 hover:bg-gray-50">
                    <Link
                      href={`/products/${activeCat.mainCatSlug}/${sub.slug}`}
                      onClick={handleToggle}
                      className="flex justify-between items-center"
                    >
                      {andToAmpersand(sub.name)}
                      <FaChevronRight className="opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
