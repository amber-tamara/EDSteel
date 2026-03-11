"use client";
import { useState } from "react";
import { fromSlugToName, andToAmpersand } from "@/helpers/text";
import Link from "next/link";

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
  subCat,
  products = [],
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  const [expandedAttrs, setExpandedAttrs] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState<Record<string, boolean>>({}); // per attribute

  const toggleExpand = (attrName: string) => {
    setExpandedAttrs((prev) => ({
      ...prev,
      [attrName]: !prev[attrName],
    }));
  };

  const toggleOption = (attrName: string, option: FilterOption) => {
  const normalizedAttr = attrName.trim();
  const normalizedOption = option.option.trim();

  console.group(`Toggling option: ${normalizedOption} in group: ${normalizedAttr}`);

  setSelectedFilters((prev) => {
    console.log("Previous selectedFilters:", JSON.stringify(prev, null, 2));

    const current = prev[normalizedAttr] || [];
    const exists = current.some((o) => o.option.trim() === normalizedOption);
    console.log("Current options in this group:", current.map(o => o.option));
    console.log("Exists already?", exists);

    let updated: FilterOption[];
    if (exists) {
      updated = current.filter((o) => o.option.trim() !== normalizedOption);
      console.log("Updated options after removal:", updated.map(o => o.option));
    } else {
      updated = [...current, { ...option, option: normalizedOption }];
      console.log("Updated options after addition:", updated.map(o => o.option));
    }

    if (updated.length === 0) {
      const { [normalizedAttr]: _, ...rest } = prev;
      console.log("Group empty, removing group key. Rest of state:", JSON.stringify(rest, null, 2));
      return rest;
    }

    const newState = { ...prev, [normalizedAttr]: updated };
    console.log("New selectedFilters state:", JSON.stringify(newState, null, 2));
    return newState;
  });

  console.groupEnd();
};

  const clearAll = () => {
    setSelectedFilters({});
  };

  return (
    <div className="mb-4 pt-10 w-80 min-w-[280px]">
      <h1 className="text-2xl pb-2 font-bold">
        {fromSlugToName(andToAmpersand(subCat))}
      </h1>
      <h2 className="mt-1 text-gray-600">
        See more{" "}
        <Link
          className="font-bold cursor-pointer hover:underline"
          href={`/products/${mainCat}`}
        >
          {fromSlugToName(andToAmpersand(mainCat))}
        </Link>
      </h2>

      <h1 className="text-2xl pb-2 border-b border-gray-400 mt-8 font-bold">
        Filters
      </h1>

      {/* Applied filters grouped by attribute */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="mt-2 mb-4">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-semibold">
              Applied filters (
              {Object.values(selectedFilters).reduce(
                (acc, arr) => acc + arr.length,
                0
              )}
              )
            </span>
            <button
              className="text-blue-600 underline hover:no-underline"
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {products.map((filterData) => {
              const applied = selectedFilters[filterData.name] || [];
              if (applied.length === 0) return null;

              return (
                <div key={filterData.name} className="flex flex-col gap-1">
                  <span className="font-semibold text-sm">
                    {filterData.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {applied.map((option) => (
                      <div
                        key={`${filterData.name}-${option.option}`}
                        className="flex items-center gap-1 bg-gray-200 rounded px-2 py-1 text-sm"
                      >
                        <span>{option.option}</span>
                        <button
                          className="font-bold text-gray-600 hover:text-gray-800"
                          onClick={() => toggleOption(filterData.name, option)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-4 text-gray-500">No filters available</p>
      ) : (
        <div>
          {products.map((filterData) => {
            const isExpanded = expandedAttrs[filterData.name] ?? false;
            const isShowAll = showAll[filterData.name] ?? false;

            const firstFive = filterData.options.slice(0, 5);
            const remaining = filterData.options.slice(5);

            return (
              <div
                key={filterData.name}
                className="pt-3 pb-3 border-b border-gray-500 last:border-b-0"
              >
                <button
                  type="button"
                  className="w-full text-left font-semibold flex justify-between items-center py-1"
                  onClick={() => toggleExpand(filterData.name)}
                >
                  {filterData.name}
                  <span
                    className={`inline-block w-2 h-2 border-t-1 border-r-1 border-black transition-transform duration-200 ${isExpanded ? "rotate-135" : "-rotate-45"
                      }`}
                  />
                </button>
                {isExpanded && (
                  <ul className="mt-3 space-y-2 pl-1">
                    {/* First 5 options */}
                    {firstFive.map((option) => {
                      const isSelected =
                        selectedFilters[filterData.name]?.some(
                          (o) => o.option.trim() === option.option.trim()
                        ) ?? false;

                      const count = option.productIds.length;

                      return (
                        <li key={option.option} className="flex items-center">
                          <input
                            id={`${filterData.name}-${option.option}`}
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              toggleOption(filterData.name, option)
                            }
                            className="w-6 h-6 border-gray-300 accent-[#82a7a1]"
                          />
                          <label
                            htmlFor={`${filterData.name}-${option.option}`}
                            className={`ml-2 cursor-pointer text-sm ${isSelected ? "font-medium" : "text-gray-700"
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

                    {/* Remaining options if showAll */}
                    {isShowAll &&
                      remaining.map((option) => {
                        const isSelected =
                          selectedFilters[filterData.name]?.some(
                            (o) => o.option === option.option
                          ) ?? false;

                        const count = option.productIds.length;

                        return (
                          <li key={option.option} className="flex items-center">
                            <input
                              id={`${filterData.name}-${option.option}`}
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                toggleOption(filterData.name, option)
                              }
                              className="w-6 h-6 border-gray-300 accent-[#82a7a1]"
                            />
                            <label
                              htmlFor={`${filterData.name}-${option.option}`}
                              className={`ml-2 cursor-pointer text-sm ${isSelected ? "font-medium" : "text-gray-700"
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

                    {/* Show more / Show less button */}
                    {remaining.length > 0 && (
                      <li>
                        <button
                          type="button"
                          onClick={() =>
                            setShowAll((prev) => ({
                              ...prev,
                              [filterData.name]: !prev[filterData.name],
                            }))
                          }
                          className="text-sm text-blue-600 underline hover:no-underline transition-all"
                        >
                          {isShowAll
                            ? `Show less ${filterData.name}`
                            : `Show more ${filterData.name}`}
                        </button>
                      </li>
                    )}
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