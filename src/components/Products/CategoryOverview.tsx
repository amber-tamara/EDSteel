'use client';
import Button from '../ui/Button';
import LoadingBar from '@/components/ui/LoadingBar';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function CategoryOverview({
  mainCat,
  subCategories,
}: {
  mainCat: string;
  subCategories: Array<{
    subCatId: number;
    subCatName: string;
    subCatSlug: string;
    products: Array<{ productName: string; image: string | null }>;
  }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <div className="text-black pb-6 relative">
      {isPending && <LoadingBar />}

      {subCategories &&
        subCategories.map((item) => (
          <div key={item.subCatId} className="flex flex-col mb-12">
            <h2 className="text-2xl font-bold pb-5">{item.subCatName}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8">
              {item.products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center aspect-square flex-1"
                >
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
              className="w-full sm:w-1/3 lg:w-1/4 flex self-center text-black justify-center"
              onClick={() =>
                handleClick(`/products/${mainCat}/${item.subCatSlug}`)
              }
              disabled={isPending}
            />
          </div>
        ))}
    </div>
  );
}
