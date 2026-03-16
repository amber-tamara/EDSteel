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
  };

  return (
    <div>
    <div className="flex flex-wrap items-start gap-3">
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border border-transparent hover:border-gray-300 duration-200 p-4 hover:shadow-xl transition flex-1 min-w-[250px] max-w-[300px]"
          >
            <Link
              href={`/products/${mainCat}/${subCat}/${product.slug}`}
              className="flex flex-col flex-1"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full aspect-square object-contain rounded-md"
              />
              <h2 className="text-black mt-4 text-lg font-medium line-clamp-2">
                {product.name}
              </h2>
            </Link>
            <p className="text-gray-700 text-xl font-bold mt-2">£3.99{product.price}</p>
            <div className="flex items-center justify-between pt-4 mt-auto">
              <Button label="Quick Add" onClick={handleClick} />
              <WishlistHeart productId={product.id}/>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
}