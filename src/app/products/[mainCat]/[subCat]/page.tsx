"use client";
import ProductCard from "@/components/Products/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function subCatgoryPage() {
  const [subCatgory, setSubCats] = useState([]);
  const { mainCat, subCat } = useParams(); // "electronics"

  useEffect(() => {
    if (subCat) {
      fetch(`/api/subProducts/${subCat}`)
        .then((r) => r.json())
        .then(setSubCats);
    }
  }, [subCat]);
  return (
    <div className="">
      <h1>subCat</h1>
      <ProductCard category={subCatgory} subCat={subCat} mainCat={mainCat} />
    </div>
  );
}
