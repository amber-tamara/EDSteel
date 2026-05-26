'use client';
import { fromSlugToName, andToAmpersand } from '@/helpers/text';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryOverview from '@/components/Products/CategoryOverview';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import LoadingBar from '@/components/ui/LoadingBar';

export default function MainCategoryPage() {
  const { mainCat } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mainCat) return;
    setLoading(true);

    fetch(`/api/products/${mainCat}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch sub categories');
        }
        return res.json();
      })
      .then((data) => {
        setSubCategories(data.subCategories ?? data);
      })
      .catch((err) => {
        console.error(err);
        setSubCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mainCat]);

  return loading ? (
    <LoadingBar />
  ) : (
    <div className="text-black">
      <Breadcrumbs mainCat={mainCat} />
      <h1 className="text-4xl font-bold py-6">
        {fromSlugToName(andToAmpersand(mainCat))}
      </h1>
      <CategoryOverview mainCat={mainCat} subCategories={subCategories} />
    </div>
  );
}
