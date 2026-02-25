"use client";
import { useRouter } from "next/navigation";
import { fromSlugToName, andToAmpersand } from "@/helpers/text";

interface BreadcrumbsProps {
  mainCat: string;
  subCat: string;
}

export default function Breadcrumbs({
  mainCat,
  subCat,
}: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <ol className="flex items-center text-black space-x-2 pl-25">
      {/* Home */}
      <li className="flex items-center">
        <h3
          onClick={() => router.push("/")}
          className="cursor-pointer hover:underline text-sm"
        >
          Home
        </h3>
        <span className="mx-2 inline-block w-1.5 h-1.5 border-t-1 border-r-1 border-black rotate-45" />
      </li>

      {/* Main category */}
      <li className="flex items-center">
        <h3
          onClick={() => router.push(`/products/${mainCat}`)}
          className="cursor-pointer hover:underline text-sm"
        >
          {fromSlugToName(andToAmpersand(mainCat))}
        </h3>
        <span className="mx-2 inline-block w-1.5 h-1.5 border-t-1 border-r-1 border-black rotate-45" />
      </li>

      {/* Sub category */}
      <li>
        <h3
          onClick={() =>
            router.push(`/products/${mainCat}/${subCat}`)
          }
          className="cursor-pointer hover:underline text-sm"
        >
          {fromSlugToName(andToAmpersand(subCat))}
        </h3>
      </li>
    </ol>
  );
}