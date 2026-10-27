'use client';

import { useState, useEffect } from 'react';
import BasketNotification from '@/components/ui/BasketNotification';
import Breadcrumbs from '@/components/ui/Breadcrumb';
import SubCategoryClientView from '@/components/Products/SubCategoryClientView';
import { fromSlugToName, andToAmpersand } from '@/helpers/text';

interface SubCategoryWrapperProps {
  mainCat: string;
  subCat: string;
  initialProducts: any[];
  initialAttributes: any[];
}

export default function SubCategoryWrapper({
  mainCat,
  subCat,
  initialProducts,
  initialAttributes,
}: SubCategoryWrapperProps) {
  const [alertTrigger, setAlertTrigger] = useState<{
    id: string;
    count: number;
  } | null>(null);

  const [visible, setVisible] = useState(false);

  const handleTriggerAlert = () => {
    setAlertTrigger({
      id: `alert-${Date.now()}-${Math.random()}`,
      count: 1,
    });
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setAlertTrigger(null);
    }, 300);
  };

  useEffect(() => {
    if (!alertTrigger) return;

    const timer = setTimeout(() => {
      handleClose();
    }, 9000);

    return () => clearTimeout(timer);
  }, [alertTrigger]);

  return (
    <div className="text-black min-h-[700px] w-full relative">
      {alertTrigger && (
        <div
          className={`sticky lg:top-0 top-[125px] z-30 shadow-md transition-all duration-300 ease-in-out ${
            visible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <BasketNotification
            key={alertTrigger.id}
            addedCount={alertTrigger.count}
            onClose={handleClose}
            varient={true}
          />
        </div>
      )}

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
        initialProducts={initialProducts}
        initialAttributes={initialAttributes}
        onTriggerAlert={handleTriggerAlert}
      />
    </div>
  );
}
