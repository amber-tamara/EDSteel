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
      <div className="flex justify-center flex-col min-[1000px]:flex-row sm:px-5 md:px-0">
        <div className="flex flex-col justify-center pr-10">
          <h1 className="text-4xl font-bold">E&D Steel</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-1">
            DIY Supplies in Dronfield
          </h2>
          <p className="text-gray-600 text-sm min-[1000px]:text-base my-2">
            Your local hardware shop for key cutting, DIY supplies, and expert
            advice.{' '}
            <span className="hidden min-[1000px]:inline">
              Everything you need to get your project done right.
            </span>
          </p>
          <a
            href="https://maps.google.com/?cid=11652992086469983025"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-[1000px]:w-auto inline-block"
          >
            <Button
              label="Find our shop"
              className="min-[1000px]:flex hidden max-[1200px]:w-full w-1/2 bg-green-600! border-transparent! text-white! order-1 min-[1000px]:order-0 mt-2"
            />
          </a>
        </div>
        <Button
          label="Find our shop"
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
