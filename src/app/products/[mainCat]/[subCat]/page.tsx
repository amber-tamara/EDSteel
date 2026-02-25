"use client";
import ProductCard from "@/components/Products/ProductCard";
import Filter from "@/components/Products/Filter";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SubCategoryPage() {
  const { mainCat, subCat } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (subCat) {
      fetch(`/api/subProducts/${subCat}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products || []);
          setAttributes(data.attributes || []);
        })
        .catch(console.error);
    }
  }, [subCat]);

  const filteredProducts = useMemo(() => {
    if (Object.keys(selectedFilters).length === 0) {
      return products;
    }

    const groupAllowedSets: Set<number>[] = [];

    Object.entries(selectedFilters).forEach(([_, selectedOptions]) => {
      if (selectedOptions.length === 0) return;

      const allowed = new Set<number>();
      selectedOptions.forEach((option) => {
        option.productIds.forEach((raw: any) => {
          const id = Number(raw);
          if (!isNaN(id)) allowed.add(id);
        });
      });

      if (allowed.size > 0) groupAllowedSets.push(allowed);
    });

    if (groupAllowedSets.length === 0) return products;

    // Start with first group's IDs
    let finalIds = new Set(groupAllowedSets[0]);

    // Intersect with every other group
    for (let i = 1; i < groupAllowedSets.length; i++) {
      const current = groupAllowedSets[i];
      finalIds = new Set([...finalIds].filter(id => current.has(id)));
      if (finalIds.size === 0) break;
    }

    return products.filter(p => finalIds.has(Number(p.id)));
  }, [products, selectedFilters]);

  return (
    <div>
      <Breadcrumbs mainCat={mainCat} subCat={subCat} />
      <div className="flex pr-25 pl-25 gap-6">
        <Filter
          mainCat={mainCat}
          subCat={subCat}
          products={attributes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <ProductCard
          products={filteredProducts}
          subCat={subCat}
          mainCat={mainCat}
        />
      </div>
    </div>
  );
}