'use client';
import Link from 'next/link';

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
  return (
    <div className="text-black pb-6">
      {subCategories &&
        subCategories.map((item) => (
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl font-bold pb-5">{item.subCatName}</h2>

            {/* Products container */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8">
              {item.products.map((product) => (
                <div className="flex flex-col items-center cursor-pointer aspect-square flex-1">
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

            <div className="flex justify-center p-8">
              <Link
                className="font-semibold text-white bg-primary-custom-teal px-6 py-2 text-center no-underline hover:![background-color:oklch(40.5%_0.101_131.063)] transition-all duration-300 ease-in-out"
                href={`/products/${mainCat}/${item.subCatName}`}
              >
                Shop all {decodeURIComponent(item.subCatName)}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
