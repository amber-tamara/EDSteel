"use client";
import { FaRegHeart } from "react-icons/fa";
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
    console.log("Button clicked!");
    // simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <div className="grid gap-md lg:gap-lg max-md:gap-0 md:grid-cols-3 md:px-8">
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border border-transparent hover:border-gray-300 duration-200 p-4 hover:shadow-lg transition h-full min-h-[380px]"
          >
            <Link
              href={`/products/${mainCat}/${subCat}/${product.slug}`}
              className="flex flex-col flex-1"
            >
              <img
                src={product.img}
                alt={product.name}
                className="h-48 object-cover rounded-md md:m-auto"
              />
              <h2 className="text-black mt-4 text-lg font-medium line-clamp-2">
                {product.name}
              </h2>
            </Link>
            <p className=" text-gray-700 text-xl font-bold">£{product.price}</p>
            <div className="mt-auto flex items-end pt-4 justify-between">
              <Button label="Quick Add" onClick={handleClick} />
              <WishlistHeart />
            </div>
          </div>
        ))}
    </div>
  );
}
