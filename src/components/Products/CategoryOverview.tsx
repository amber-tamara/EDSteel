'use client';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

export default function CategoryOverview({
  mainCat,
  subCategories,
}: {
  mainCat: string;
  subCategories: Array<{
    subCatId: number;
    subCatName: string;
    products: Array<{ name: string; image: string | null }>;
  }>;
}) {
  const router = useRouter();
  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <div className="text-black pb-6">
      {subCategories &&
        subCategories.map((item) => (
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl font-bold pb-5">{item.subCatName}</h2>

            {/* Products container */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8">
              {item.products.map((product) => (
                <div className="flex flex-col items-center aspect-square flex-1">
                  <img
                    className="object-scale-down"
                    src={product.image ?? '/placeholder.png'}
                    alt={product.productName}
                  />
                  <h3 className="mt-2 text-sm font-semibold text-center break-words">
                    {product.productName}
                  </h3>
                </div>
              ))}
            </div>

            <Button
              label={decodeURIComponent(item.subCatName)}
              className="w-full sm:w-1/3 lg:w-1/4 flex self-center text-black"
              onClick={() =>
                handleClick(`/products/${mainCat}/${item.subCatSlug}`)
              }
            ></Button>
          </div>
        ))}
    </div>
  );
}
