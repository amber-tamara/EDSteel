"use client";

import { useState } from "react";

interface FilterProps {
  mainCat: string;
  products?: {
    name: string;
    slug: string;
    options: string[];
    productIds: number[];
  }[];
  selectedFilters: Record<string, { name: string; ids: number[] }[]>;
  setSelectedFilters: (filters: Record<string, { name: string; ids: number[] }[]>) => void;
}

export default function Filter({
  mainCat,
  products = [],
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  // Track which attributes are expanded
  const [expandedAttrs, setExpandedAttrs] = useState<Record<string, boolean>>({});

  // Toggle expand/collapse for a specific attribute
  const toggleExpand = (attrName: string) => {
    setExpandedAttrs({ ...expandedAttrs, [attrName]: !expandedAttrs[attrName] });
  };

  // Toggle checkbox option
  const toggleOption = (
    attrName: string,
    optionName: string,
    productIds: number[]
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[attrName] || [];

      const existing = current.find((o) => o.name === optionName);
      let newOptions: { name: string; ids: number[] }[];

      if (existing) {
        // Remove IDs that are toggled off or add new ones
        const updatedIds = new Set(existing.ids);
        productIds.forEach((id) => {
          if (updatedIds.has(id)) updatedIds.delete(id);
          else updatedIds.add(id);
        });
        console.log(updatedIds)

        // Update the option with new IDs or remove if none left
        newOptions = current
          .map((o) =>
            o.name === optionName ? { name: optionName, ids: Array.from(updatedIds) } : o
          )
          .filter((o) => o.ids.length > 0);
      } else {
        // Add new option
        newOptions = [...current, { name: optionName, ids: productIds }];
      }

      return { ...prev, [attrName]: newOptions };
    });
  };

  return (
    <div className="mb-4 pt-10 w-80">
      <h1 className="text-2xl pb-2 border-b border-black-300">Categories</h1>
      <h2 className="mt-4">See more {mainCat}</h2>
      <h1 className="text-2xl pb-2 border-b border-black-300 mt-8">Filters</h1>

      {products.length === 0 ? (
        <p className="mt-2">No filters available</p>
      ) : (
        <div className="mt-4 space-y-6">
          {products.map((filterData) => {
            const isExpanded = expandedAttrs[filterData.name] || false;
            return (
              <div key={filterData.name} className="pb-2 border-b border-black-300">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpand(filterData.name)}
                >
                  {filterData.name}
                  <span
                    className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black"
                    style={{ transform: "rotate(135deg)" }}
                  />
                </h3>

                {isExpanded && (
                  <ul className="ml-4 mt-2">
                    {filterData.options.map((option) => {
                      const isSelected = selectedFilters[filterData.name]?.some(
                        (o) => o.name === option
                      );

                      return (
                        <li key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected || false}
                            onChange={() =>
                              toggleOption(filterData.name, option, filterData.productIds)
                            }
                            className="mr-2"
                          />
                          <span
                            className={`cursor-pointer hover:text-blue-600 ${
                              isSelected ? "font-bold text-blue-700" : ""
                            }`}
                            onClick={() =>
                              toggleOption(filterData.name, option, filterData.productIds)
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
