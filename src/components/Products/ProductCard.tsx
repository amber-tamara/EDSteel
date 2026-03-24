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
              className="flex flex-col flex-1"
            >
              {/* Image container with hover zoom */}
              <div className="relative overflow-hidden aspect-square bg-gray-50">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-bold text-gray-900">
                  £{product.price}
                </p>

                {/* Push buttons to bottom */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <Button
                    label="Quick Add"
                    onClick={(e) => {
                      e.preventDefault(); // prevent link navigation
                      handleClick();
                    }}
                    className="flex-1 mr-2 text-sm"
                  />
                  <WishlistHeart productId={product.id} />
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}