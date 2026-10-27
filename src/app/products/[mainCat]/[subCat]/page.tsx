import SubCategoryWrapper from '@/components/Products/SubCategoryWrapper';

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
    <SubCategoryWrapper
      mainCat={mainCat}
      subCat={subCat}
      initialProducts={products}
      initialAttributes={attributes}
    />
  );
}
