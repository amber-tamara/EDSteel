"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fromSlugToName, andToAmpersand } from "@/helpers/text";

interface BreadcrumbsProps {
  mainCat: string;
  subCat?: string;
}

export default function Breadcrumbs({ mainCat, subCat }: BreadcrumbsProps) {
  const pathname = usePathname();

  const mainPath = `/products/${mainCat}`;
  const subPath = `/products/${mainCat}/${subCat}`;

  const isMainPage = pathname === mainPath;
  const isSubPage = pathname === subPath;

  const linkStyle = "text-sm cursor-pointer hover:underline";
  const currentStyle = "text-sm text-gray-600 cursor-default";

  return (
    <ol className="hidden sm:flex items-center text-black space-x-2 pt-3">
      
      {/* Home */}
      <li className="flex items-center">
        <Link href="/" className={linkStyle}>
          Home
        </Link>

        <span className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black rotate-45" />
      </li>

      {/* Main category */}
      <li className="flex items-center">
        {isMainPage ? (
          <span className={currentStyle}>
            {fromSlugToName(andToAmpersand(mainCat))}
          </span>
        ) : (
          <Link href={mainPath} className={linkStyle}>
            {fromSlugToName(andToAmpersand(mainCat))}
          </Link>
        )}

        {subCat && (
          <span className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black rotate-45" />
        )}
      </li>

      {/* Sub category */}
      {subCat && (
        <li>
          {isSubPage ? (
            <span className={currentStyle}>
              {fromSlugToName(andToAmpersand(subCat))}
            </span>
          ) : (
            <Link href={subPath} className={linkStyle}>
              {fromSlugToName(andToAmpersand(subCat))}
            </Link>
          )}
        </li>
      )}
    </ol>
  );
}