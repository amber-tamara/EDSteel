"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import WishlistHeart from "../ui/WishlistHeart";

export default function ProductCard({
  products,
  mainCat,
  subCat,
}: {
  products: any[];
  mainCat: string;
  subCat: string;
}) {
  const handleClick = async () => {
    console.log('hi')
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: add real "quick add to cart" logic here
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white border border-transparent hover:border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <Link
              href={`/products/${mainCat}/${subCat}/${product.slug}`}
              className="flex sm:flex-col flex-1"
            >
              {/* Image container with hover zoom */}
              <div className="relative overflow-hidden aspect-square bg-gray-50 mx-4 flex-1 sm:flex-none">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="mx-4 sm:m-4 flex flex-col flex-1 justify-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-bold text-gray-900">
                  £3.99
                  {/* £{product.price} */}
                </p>
              </div>
            </Link>
            <div className="flex flex-col sm:justify-between mt-auto px-4 pb-4 pt-1">
                  <WishlistHeart productId={product.id} />
                  <Button
                    label="Add to Basket"
                    onClick={handleClick}
                    className="sm:flex hidden"
                  />
                </div>
          </div>
        ))}
    </div>
  );
}