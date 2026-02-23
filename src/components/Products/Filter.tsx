"use client";
import { useState } from "react";

interface FilterOption {
  option: string;
  productIds: number[];
}

interface AttributeFilter {
  name: string;
  slug: string;
  options: FilterOption[];
}

interface FilterProps {
  mainCat: string;
  products?: AttributeFilter[];         
  selectedFilters: Record<string, FilterOption[]>;
  setSelectedFilters: (filters: Record<string, FilterOption[]>) => void;
}

export default function Filter({
  mainCat,
  products = [],
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  const [expandedAttrs, setExpandedAttrs] = useState<Record<string, boolean>>({});

  const toggleExpand = (attrName: string) => {
    setExpandedAttrs((prev) => ({
      ...prev,
      [attrName]: !prev[attrName],
    }));
  };

  const toggleOption = (attrName: string, option: FilterOption) => {
    setSelectedFilters((prev) => {
      const current = prev[attrName] || [];
      const exists = current.some((o) => o.option === option.option);

      let updated: FilterOption[];
      if (exists) {
        updated = current.filter((o) => o.option !== option.option);
      } else {
        updated = [...current, option];
      }

      if (updated.length === 0) {
        const { [attrName]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [attrName]: updated,
      };
    });
  };

  return (
    <div className="mb-4 pt-10 w-80 min-w-[280px]">
      <h1 className="text-2xl pb-2 border-b border-gray-400 font-bold">
        Categories
      </h1>
      <h2 className="mt-4 text-gray-600">See more {mainCat}</h2>

      <h1 className="text-2xl pb-2 border-b border-gray-400 mt-8 font-bold">
        Filters
      </h1>

      {products.length === 0 ? (
        <p className="mt-4 text-gray-500">No filters available</p>
      ) : (
        <div className="mt-4 space-y-6">
          {products.map((filterData) => {
            const isExpanded = expandedAttrs[filterData.name] ?? false;

            return (
              <div
                key={filterData.name}
                className="pb-3 border-b border-gray-300 last:border-b-0"
              >
                <button
                  type="button"
                  className="w-full text-left font-semibold flex justify-between items-center py-1 hover:text-blue-700 transition-colors"
                  onClick={() => toggleExpand(filterData.name)}
                >
                  {filterData.name}
                  <span
                    className={`inline-block w-2.5 h-2.5 border-t-2 border-r-2 border-black transition-transform duration-200 ${
                      isExpanded ? "rotate-135" : "-rotate-45"
                    }`}
                  />
                </button>

                {isExpanded && (
                  <ul className="mt-3 space-y-2 pl-1">
                    {filterData.options.map((option) => {
                      const isSelected = selectedFilters[filterData.name]?.some(
                        (o) => o.option === option.option
                      ) ?? false;

                      // Optional: show how many products match this single option
                      const count = option.productIds.length;

                      return (
                        <li key={option.option} className="flex items-center">
                          <input
                            id={`${filterData.name}-${option.option}`}
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOption(filterData.name, option)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`${filterData.name}-${option.option}`}
                            className={`ml-2 cursor-pointer text-sm ${
                              isSelected
                                ? "font-medium text-blue-700"
                                : "text-gray-700 hover:text-blue-600"
                            } transition-colors flex-1`}
                          >
                            {option.option}
                            <span className="text-xs text-gray-500 ml-1.5">
                              ({count})
                            </span>
                          </label>
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