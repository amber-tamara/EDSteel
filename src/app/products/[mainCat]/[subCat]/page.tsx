"use client";
import ProductCard from "@/components/Products/ProductCard";
import Filter from "@/components/Products/Filter";
import Breadcrumbs from "@/components/ui/Breadcrumb";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { fromSlugToName, andToAmpersand } from "@/helpers/text";
import Link from "next/link";

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
    console.log("Filtering products");
    console.log("Selected filters:", selectedFilters);

    if (Object.keys(selectedFilters).length === 0) return products;

    const allAllowedIds = new Set<number>();

    Object.entries(selectedFilters).forEach(([groupName, selectedOptions]) => {
      if (selectedOptions.length === 0) return;

      const groupIds = new Set<number>();
      selectedOptions.forEach((option) => {
        option.productIds.forEach((id: any) => {
          const numId = Number(id);
          if (!isNaN(numId)) groupIds.add(numId);
        });
      });

      console.log(`Group ${groupName} allowed IDs:`, Array.from(groupIds));

      // Union: add all IDs from this group
      groupIds.forEach((id) => allAllowedIds.add(id));
    });

    console.log("All allowed IDs (union across groups):", Array.from(allAllowedIds));

    const filtered = products.filter((p) => allAllowedIds.has(Number(p.id)));
    console.log("Filtered products IDs:", filtered.map(p => p.id));
    console.log("Filtered products count:", filtered.length);

    return filtered;
  }, [products, selectedFilters]);

  return (
    <div>
      <Breadcrumbs mainCat={mainCat} subCat={subCat} />
      <h1 className="text-2xl pt-10 font-bold pl-25">
          {fromSlugToName(andToAmpersand(subCat))}
        </h1>
        <h2 className="mt-1 text-gray-600 pl-25">
        See more{" "}
        <Link
          className="font-bold cursor-pointer hover:underline"
          href={`/products/${mainCat}`}
        >
          {fromSlugToName(andToAmpersand(mainCat))}
        </Link>
      </h2>
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