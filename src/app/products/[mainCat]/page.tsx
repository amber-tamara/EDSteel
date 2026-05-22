'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryOverview from '@/components/Products/CategoryOverview';
import Breadcrumbs from '@/components/ui/Breadcrumb';

export default function MainCategoryPage() {
  const { mainCat } = useParams(); // "electronics"
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!mainCat) return;

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
      });
  }, [mainCat]);

  return (
    <div className="text-black">
      <Breadcrumbs mainCat={mainCat} />
      <h1 className="text-4xl font-bold py-6">{mainCat}</h1>
      <CategoryOverview mainCat={mainCat} subCategories={subCategories} />
    </div>
  );
}
