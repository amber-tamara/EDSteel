'use client';

import Link from 'next/link';
import { andToAmpersand } from '@/helpers/text';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import LoadingBar from '@/components/ui/LoadingBar';

export default function CategoryList({ categories }: CategoryListProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <nav className="h-full bg-secondary-custom-teal justify-center hidden lg:flex z-20 text-white relative">
      <ul className="relative flex flex-wrap gap-x-6 gap-y-3 items-center">
        {categories &&
          categories.map((item) => {
            const destinationUrl = `/products/${item.mainCatSlug}`;

            return (
              <li
                key={item.mainCat}
                className="hover:bg-white hover:text-black py-5 px-3 group cursor-pointer relative"
              >
                <Link
                  href={destinationUrl}
                  onClick={(e) => handleClick(e, destinationUrl)}
                >
                  {andToAmpersand(item.mainCat)}
                </Link>

                <ul className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-2xl py-5 px-3 w-64 text-black">
                  {item.subCats?.map((sub) => {
                    const destinationUrl = `/products/${item.mainCatSlug}/${sub.slug}`;

                    return (
                      <li className="hover:underline" key={sub.slug}>
                        <Link
                          href={destinationUrl}
                          onClick={(e) => handleClick(e, destinationUrl)}
                        >
                          {andToAmpersand(sub.name)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
      {isPending && <LoadingBar />}
    </nav>
  );
}

interface SubCategory {
  name: string;
  slug: string;
}

interface Category {
  mainCat: string;
  mainCatSlug: string;
  subCats: SubCategory[];
}

interface CategoryListProps {
  categories: Category[];
}
