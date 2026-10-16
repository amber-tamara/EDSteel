import { fromSlugToName, andToAmpersand } from '@/helpers/text';
import CategoryOverview from '@/components/Products/CategoryOverview';
import Breadcrumbs from '@/components/ui/Breadcrumb';

interface MainCategoryPageProps {
  params: Promise<{
    mainCat: string;
  }>;
}

export default async function MainCategoryPage({
  params,
}: MainCategoryPageProps) {
  const { mainCat } = await params;

  let subCategories = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${mainCat}`, {
      cache: 'no-store', // Ensures fresh data on each request
    });

    if (!res.ok) {
      throw new Error('Failed to fetch sub categories');
    }

    const data = await res.json();
    subCategories = data.subCategories ?? data;
  } catch (err) {
    console.error(err);
    subCategories = [];
  }

  return (
    <div className="text-black min-h-[700px] w-full">
      <div>
        <Breadcrumbs mainCat={mainCat} />
        <h1 className="text-4xl font-bold py-6">
          {fromSlugToName(andToAmpersand(mainCat))}
        </h1>
        <CategoryOverview mainCat={mainCat} subCategories={subCategories} />
      </div>
    </div>
  );
}
