"use client";
import ProductCard from "@/components/Products/ProductCard";
import Filter from "@/components/Products/Filter";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation"; 

export default function SubCategoryPage() {
  const { mainCat, subCat } = useParams();
  const router = useRouter();

  // State for products and attributes
  const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({}); // e.g., { Color: ["Red"], Size: ["M"] }

  console.log(selectedFilters)
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

  //Filter Data
  useEffect(() => {
    if (!subCat) return;
    console.log(selectedFilters)
    //  setProducts(data.products)
  }, [selectedFilters, subCat]);

  const filteredProducts = useMemo(() => {
    const allSelectedIds = Object.values(selectedFilters)
      .flatMap(options => options.flatMap(o => o.ids));

    if (!allSelectedIds.length) return products; // no filter = show all

    return products.filter(p => allSelectedIds.includes(p.id));
  }, [products, selectedFilters]);

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
          products={attributes}  // ✅ the full list of products
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {/* Product Listing */}
        <ProductCard products={filteredProducts} subCat={subCat} mainCat={mainCat} />
      </div>
    </div>
  );
}
