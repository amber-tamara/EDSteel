import Link from 'next/link';
import { andToAmpersand } from '@/helpers/text';

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <nav className="h-full bg-secondary-custom-teal justify-center hidden lg:flex z-10 text-white">
      <ul className="relative flex flex-wrap gap-x-6 gap-y-3 items-center">
        {categories &&
          categories.map((item) => (
            <li
              key={item.mainCat}
              className="hover:bg-white hover:text-black py-5 px-3 group cursor-pointer relative"
            >
              <Link href={`/products/${item.mainCatSlug}`}>{item.mainCat}</Link>

              <ul className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-2xl py-5 px-3 w-64 text-black">
                {item.subCats.map((sub) => (
                  <li className="hover:underline" key={sub.name}>
                    <Link href={`/products/${item.mainCatSlug}/${sub.slug}`}>
                      {andToAmpersand(sub.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </nav>
  );
}

interface Category {
  mainCat: string;
  subCats: string[];
}

interface CategoryListProps {
  categories: Category[];
}
