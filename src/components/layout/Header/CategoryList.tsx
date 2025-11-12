import Link from "next/link";

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <nav className="bg-secondary-custom-teal items-center justify-center hidden lg:flex">
      <ul className="relative flex items-center justify-between">
        {categories &&
          categories?.map((item) => (
            <li
              className="hover:bg-white hover:text-black py-5 px-3 group cursor-pointer"
              key={item.mainCat}
            >
              <Link key={item.mainCat} href={`/products/${item.mainCatSlug}`}>
                {item.mainCat}
              </Link>
              <ul className="h-[66vh] transition-all duration-300 ease-in-out py-5 px-3 w-full bg-white shadow-xl cursor-pointer absolute top-full left-0 hidden group-hover:flex flex-col">
                {item.subCats.map((sub) => (
                  <li className="hover:underline" key={sub.name}>
                    <Link href={`/products/${item.mainCat}/${sub.name}`}>
                      {sub.name}
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
