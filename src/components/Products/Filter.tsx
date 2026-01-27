"use client";
// import { useEffect, useState } from "react";

export default function Filter({ mainCat }) {
    // const [filters, setFilters] = useState([]);

    // useEffect(() => {
    //     if (mainCat) {
    //         fetch(`/api/filters/${mainCat}`)
    //             .then((res) => res.json())
    //             .then(setFilters);
    //     }
    // }, [mainCat]);
    return (
        <div className="mb-4 pt-10">
            <h1 className="text-2xl pb-2 border-b border-black-300 w-80">Categories</h1>
            <h2 className="mt-4">See more {mainCat}</h2>
            <h1 className="text-2xl pb-2 border-b border-black-300 w-80 mt-8">Filters</h1>
            {/* <div className="mt-4 space-y-2">
        {filters.map((filter) => (
          <div key={filter.name}>
            <h3 className="font-semibold">{filter.name}</h3>
            <ul className="ml-4 mt-1 space-y-1">
              {filter.options.map((opt) => (
                <li key={opt} className="cursor-pointer hover:text-blue-600">
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
        </div>
    );
}