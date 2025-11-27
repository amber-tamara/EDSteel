"use client";
import Button from "@/components/ui/Button"; // client component

interface ProductViewProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    images: { src: string; alt: string }[];
  };
}

export default function ProductView({ product }: ProductViewProps) {
  const handleClick = async () => {
    console.log("Button clicked!");
    // simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <div className="p-6 border rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.images && product.images.length > 0 && (
        <img
          src={product.images[0].src}
          alt={product.images[0].alt || product.name}
          className="mb-4 w-64 h-auto object-cover"
        />
      )}
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">£{product.price}</p>

      <Button label="Quick Add" onClick={handleClick} />
    </div>
  );
}
