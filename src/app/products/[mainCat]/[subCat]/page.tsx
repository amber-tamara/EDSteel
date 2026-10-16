import { fromSlugToName, andToAmpersand } from '@/helpers/text';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import SubCategoryClientView from '@/components/Products/SubCategoryClientView';

interface SubCategoryPageProps {
  params: Promise<{
    mainCat: string;
    subCat: string;
  }>;
}

export default async function SubCategoryPage({
  params,
}: SubCategoryPageProps) {
  const { mainCat, subCat } = await params;

  let products = [];
  let attributes = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/subProducts/${subCat}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
      attributes = data.attributes || [];
    }
  } catch (err) {
    console.error('Failed to fetch subcategory products on server:', err);
  }

  return (
    <div className="text-black min-h-[700px] w-full">
      <Breadcrumbs mainCat={mainCat} subCat={subCat} />
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl pt-7 sm:pt-10 font-bold">
            {fromSlugToName(andToAmpersand(subCat))}
          </h1>
          <h2 className="mt-1 mb-10 lg:mb-0 text-gray-600">
            See more{' '}
            <a
              className="font-bold cursor-pointer hover:underline"
              href={`/products/${mainCat}`}
            >
              {fromSlugToName(andToAmpersand(mainCat))}
            </a>
          </h2>
        </div>
      </div>

      <SubCategoryClientView
        mainCat={mainCat}
        subCat={subCat}
        initialProducts={products}
        initialAttributes={attributes}
      />
    </div>
  );
}
