'use client';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import {
  HiOutlineKey,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
} from 'react-icons/hi2';

const services = [
  { icon: HiOutlineKey, label: 'Professional Key Cutting' },
  {
    icon: HiOutlineWrenchScrewdriver,
    label: 'Quality DIY Supplies & Hardware',
  },
  { icon: HiOutlineLightBulb, label: 'Expert Advice for Any Project' },
];

export default function ProductsPage() {
  return (
    <div className="py-10">
      <div className="flex justify-center items-center flex-col min-[1000px]:flex-row">
        <div className="flex flex-col justify-center pr-10">
          <h1 className="text-4xl font-bold">E&D Steel</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-1">
            DIY Supplies in Dronfield
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Your local hardware shop for key cutting, DIY supplies, and expert
            advice.
            <span className="hidden sm:inline">
              Everything you need to get your project done right.
            </span>
          </p>
          <Button
            label="Browse now"
            className="min-[1000px]:flex hidden w-1/2 bg-green-600! border-transparent! text-white! order-1 min-[1000px]:order-0 mt-4"
          />
        </div>

        <Button
          label="Browse now"
          className="flex w-full bg-green-600! border-transparent! text-white! order-1 min-[1000px]:order-0 min-[1000px]:hidden mt-4"
        />

        <Image
          src="/ED_shop_img.png"
          alt="E&D Steel Shop Front in Dronfield"
          width={800}
          height={300}
          className="h-auto rounded-lg object-cover min-[1200px]:w-full"
        />
      </div>
    </div>
  );
}
