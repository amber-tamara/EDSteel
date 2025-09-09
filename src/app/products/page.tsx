"use client";
import ProductCard from "../../components/layout/Products/ProductCard";
import { useEffect } from "react";

export default function ProductsPage({}) {
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  //    useEffect(() => {
  //   fetch('/api/hello')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //     });
  // }, []);

  let products = [
    {
      image:
        "https://res.cloudinary.com/dgiwjmkwh/image/upload/v1756392757/Campingaz_206_Cartridge.jpg",
      name: "hammer pie",
      price: "£3.99",
    },
    {
      image:
        "https://res.cloudinary.com/dgiwjmkwh/image/upload/v1756392757/Campingaz_206_Cartridge.jpg",
      name: "hammer pie",
      price: "£3.99",
    },
    {
      image:
        "https://res.cloudinary.com/dgiwjmkwh/image/upload/v1756392757/Campingaz_206_Cartridge.jpg",
      name: "hammer pie",
      price: "£3.99",
    },
  ];
  return (
    <div>
      <ProductCard products={products} />
    </div>
  );
}
