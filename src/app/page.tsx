'use client';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function ProductsPage() {
  return (
    <div className="flex md:justify-between justify-center items-center flex-wrap py-10">
      <div className="space-y-4 lg:max-w-lg md:block flex justify-center flex-col">
        <h1 className="mb-5 text-4xl font-bold">DIY Supplies in Dronfield</h1>
        <p className="text-gray-600">
          From professional key cutting to quality DIY supplies and expert
          advice. Everything you need to get your project done right.
        </p>
        <Button
          label="Browse now"
          className="flex w-1/3 bg-green-600! border-transparent! text-white!"
        />
      </div>
      <Image
        src="/ED_shop_img.png"
        alt="Company Logo"
        width={800}
        height={300}
        className="shrink-1"
      />
    </div>
  );
}
