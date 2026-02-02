"use client";
import ProductCard from "@/components/Products/ProductCard";
import Filter from "@/components/Products/Filter";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SubCategoryPage() {
  const { mainCat, subCat } = useParams();
  const router = useRouter();

  // State for products and attributes
  const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({}); // e.g., { Color: ["Red"], Size: ["M"] }

  // 1️⃣ Fetch products + attributes on mount
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

  // 2️⃣ Refetch products when filters change
// Refetch products when selectedFilters changes
useEffect(() => {
  if (!subCat) return;

  const params = new URLSearchParams();
  for (const [attrName, values] of Object.entries(selectedFilters)) {
    if (values.length) params.append(attrName, values.join(",")); // e.g., ?Color=Red,Blue
  }
  console.log(params.toString())

  fetch(`/api/subProducts/${subCat}?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => setProducts(data.products || []))
    .catch(console.error);
}, [selectedFilters, subCat]);
console.log(subCat)


  return (
    <div className="">
      {/* Breadcrumbs */}
      <ol className="flex items-center text-black space-x-2 pl-25">
        <li className="flex items-center">
          <h3
            onClick={() => router.push("/")}
            className="cursor-pointer hover:underline text-sm"
          >
            Home
          </h3>
          <span className="mx-2 inline-block w-1.5 h-1.5 border-t-1 border-r-1 border-black rotate-45"></span>
        </li>
        <li className="flex items-center">
          <h3
            onClick={() => router.push(`/products/${mainCat}`)}
            className="cursor-pointer hover:underline text-sm"
          >
            {mainCat}
          </h3>
          <span className="mx-2 inline-block w-1.5 h-1.5 border-t-1 border-r-1 border-black rotate-45"></span>
        </li>
        <li>
          <h3
            onClick={() => router.push(`/products/${mainCat}/${subCat}`)}
            className="cursor-pointer hover:underline text-sm"
          >
            {subCat}
          </h3>
        </li>
      </ol>

      <h1 className="pl-25 pr-25 pt-10 font-bold text-xl">
        {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
      </h1>

      <div className="flex pr-25 pl-25 gap-6">
        {/* Filter Component */}
        <Filter
          mainCat={mainCat}
          products={products}  // ✅ the full list of products
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {/* Product Listing */}
        <ProductCard products={products} subCat={subCat} mainCat={mainCat} />
      </div>
    </div>
  );
}
