import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({ products }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition grid gap-md lg:gap-lg max-lg:container max-md:gap-0 max-md:px-0 md:grid-cols-3">
      {products.map((product, i) => (
        <div className="flex flex-col p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md md:m-auto"
          />
          <h2 className="text-black">{product.name}</h2>
          <p className="mt-1 text-gray-700">{product.price}</p>
          <div className="ml-auto border-2 border-gray-400 w-11 h-11 inline-flex items-center justify-center">
            <FaRegHeart className="text-gray-500 border-solid w-5 h-5 hover:scale-120 duration-300 ease-in-out cursor-pointer" />
          </div>
          <button className="bg-primary-custom-teal">Add To Basket</button>
        </div>
      ))}
    </div>
  );
}
