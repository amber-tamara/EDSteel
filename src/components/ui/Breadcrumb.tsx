'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fromSlugToName, andToAmpersand } from '@/helpers/text';

interface BreadcrumbsProps {
  mainCat?: string;
  subCat?: string;
  productName?: string;
}

export default function Breadcrumbs({
  mainCat,
  subCat,
  productName,
}: BreadcrumbsProps) {
  const pathname = usePathname();

  const isProductPage = pathname.startsWith('/products');

  const linkStyle = 'text-sm cursor-pointer hover:underline';
  const currentStyle =
    'text-sm text-gray-600 cursor-default max-w-[300px] truncate';

  if (!isProductPage) {
    const pageName = pathname.replace('/', '');

    return (
      <ol className="hidden sm:flex items-center text-black space-x-2 pt-3">
        <li>
          <Link href="/" className={linkStyle}>
            Home
          </Link>
        </li>

        <span className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black rotate-45" />

        <li className={currentStyle}>
          {fromSlugToName(andToAmpersand(pageName))}
        </li>
      </ol>
    );
  }

  const mainPath = `/products/${mainCat}`;
  const subPath = `/products/${mainCat}/${subCat}`;

  const isMainPage = pathname === mainPath;
  const isSubPage = pathname === subPath && !productName;

  return (
    <ol className="hidden sm:flex items-center text-black space-x-2 pt-3">
      <li className="flex items-center">
        <Link href="/" className={linkStyle}>
          Home
        </Link>
        <span className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black rotate-45" />
      </li>

      {mainCat && (
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
      )}

      {subCat && (
        <li className="flex items-center">
          {isSubPage ? (
            <span className={currentStyle}>
              {fromSlugToName(andToAmpersand(subCat))}
            </span>
          ) : (
            <Link href={subPath} className={linkStyle}>
              {fromSlugToName(andToAmpersand(subCat))}
            </Link>
          )}

          {productName && (
            <span className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black rotate-45" />
          )}
        </li>
      )}

      {productName && (
        <li className={currentStyle} title={productName}>
          {productName}
        </li>
      )}
    </ol>
  );
}
