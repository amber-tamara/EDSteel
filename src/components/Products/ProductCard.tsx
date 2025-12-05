"use client";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({
  category,
  mainCat,
  subCat,
}: {
  category: any[];
  mainCat: string;
  subCat: string;
}) {
  return (
    <div className="grid gap-md lg:gap-lg max-md:gap-0 md:grid-cols-3 md:px-8">
      {category &&
        category.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border rounded-lg p-4 shadow hover:shadow-lg transition h-full min-h-[380px]"
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
            <div className="mt-auto flex flex-col items-end pt-4">
              <div className="border-2 border-gray-400 w-11 h-11 inline-flex items-center justify-center mb-3">
                <FaRegHeart className="text-gray-500 w-5 h-5 hover:scale-110 duration-300 ease-in-out cursor-pointer" />
              </div>
              <button className="bg-primary-custom-teal p-2 text-white rounded-md w-full">
                Add To Basket
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
