"use client";
import Link from "next/link";

export default function CategoryOverview({
  mainCat,
  subCategories,
}: {
  mainCat: string;
  subCategories: Array<{
    subCatId: number;
    subCatName: string;
    products: Array<{ name: string; image: string | null }>;
  }>;
}) {
  console.log(subCategories.subCats);
  return (
    <div className="text-black p-6">
      {subCategories &&
        subCategories.map((item) => (
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl font-bold pb-3">{item.subCatName}</h2>

            {/* Products container */}
            <div className="flex flex-wrap md:flex-nowrap gap-6 pb-2">
              {item.products.map((product) => (
                <div className="flex flex-col items-center w-48 md:w-1/4 cursor-pointer">
                  <img
                    className="w-48 h-48 object-cover"
                    src={product.image ?? "/placeholder.png"}
                    alt={product.productName}
                  />
                  <h3 className="mt-2 text-sm font-semibold text-center break-words">
                    {product.productName}
                  </h3>
                </div>
              ))}
            </div>

            {/* Centered button */}
            <div className="flex justify-center mt-6">
              <Link
                className="font-semibold text-white bg-primary-custom-teal px-6 py-2 text-center no-underline hover:![background-color:oklch(40.5%_0.101_131.063)] transition-all duration-300 ease-in-out"
                href={`/products/${mainCat}/${item.subCatName}`}
              >
                Shop all {decodeURIComponent(item.subCatName)}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
// "use client";

// export default function CategoryOverview({
//   mainCat,
//   subCategories,
// }: {
//   mainCat: string;
//   subCategories: Array<{
//     subCatId: number;
//     subCatName: string;
//     products: Array<{ name: string; image: string | null }>;
//   }>;
// }) {
//   console.log(subCategories.subCats);
//   return (
//     <div className="text-black p-6">
//       {subCategories.subCats &&
//         subCategories?.subCats.map((item) => (
//           <div className="flex flex-col">
//             {" "}
//             <h2 className="text-2xl font-bold pb-3">{item.subCatName}</h2>
//             <div className="flex md:flex-nowrap flex-wrap">
//               {item.products.map((product) => (
//                 <div className="flex flex-wrap flex-col m-[0px_2.4rem_2.4rem_0px]">
//                   <img
//                     className="w-[200px] h-[200px] flex-shrink-0"
//                     src={product.image}
//                   ></img>
//                   <h3 className="w-[200px] mt-2 text-sm font-semibold break-words">
//                     {product.productName}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//             <button className="pb-[3.2rem] justify-center cursor-pointer">
//               <a className="font-semibold bg-primary-custom-teal px-[2.4rem] py-[1rem] text-center no-underline">
//                 Shop all {decodeURIComponent(item.subCatName)}
//               </a>
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// }
