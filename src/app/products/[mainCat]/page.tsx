"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryOverview from "@/components/Products/CategoryOverview";
import Link from "next/link";

export default function MainCategoryPage() {
  const { mainCat } = useParams(); // "electronics"
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!mainCat) return;

    fetch(`/api/products/${mainCat}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch sub categories");
        }
        return res.json();
      })
      .then((data) => {
        setSubCategories(data.subCategories ?? data);
      })
      .catch((err) => {
        console.error(err);
        setSubCategories([])
      });
    }, [mainCat])

    return (
      <div className="text-black">
        <div className="pl-4 pt-4 pb-1.5">
          <Link
            href="/"
            className="relative bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
          >
            Home
          </Link>
          <span> &gt; </span>
          <span
            className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary-custom-teal after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            onClick={
              () => console.log("hiya")
              // router.push(`/products/${mainCat}?mainCatId=${mainCatId}`)
            }
          >
            {mainCat}
          </span>
        </div>
        <h1 className="pb-1.5 text-4xl font-bold pl-4 pt-4">{mainCat}</h1>
        <CategoryOverview mainCat={mainCat} subCategories={subCategories} />
      </div>
    );
  }
