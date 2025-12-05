"use client";
import { useState } from "react";
import Button from "@/components/ui/Button"; // client component
import QuantityInput from "../ui/QuantitySelector";
import WishlistHeart from "../ui/WishlistHeart";
import ProductDetails from "./ProductDetails";
import ProductInformation from "./ProductInformation";

interface ProductViewProps {
  initialProduct;
}
export default function ProductView({ initialProduct }: ProductViewProps) {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(initialProduct);
  const handleClick = async () => {
    console.log("Button clicked!");
    // simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <div className="">
      <div className="flex justify-center p-10">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            className="mb-4 w-64 h-auto object-cover"
          />
        )}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl leading-[1.2] text-black font-bold mb-4">
              {product.name}
            </h1>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}
            <p className="text-2xl leading-[1.6] font-semibold mb-4 text-black">
              £{product.price}
            </p>
          </div>
          <div className="flex">
            <QuantityInput value={qty} onChange={setQty} />
            <Button label="Quick Add" onClick={handleClick} />
            <WishlistHeart productId={product.id} />
          </div>
        </div>
      </div>
      <div className="bg-[#eff0f0] flex justify-between">
        <ProductInformation product={product} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
