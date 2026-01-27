"use client";
import ProductCard from "@/components/Products/ProductCard";
import Filter from "@/components/Products/Filter";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

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
  const router = useRouter();
  console.log(subCatgory)
  return (
    <div className="">
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
      <h1 className="pl-25 pr-25 pt-10 font-bold text-xl">{subCat.charAt(0).toUpperCase() + subCat.slice(1)}</h1>
      <div className="flex pr-25 pl-25">
      <Filter mainCat={mainCat}/>
      <ProductCard category={subCatgory} subCat={subCat} mainCat={mainCat} />
      </div>
    </div>
  );
}
