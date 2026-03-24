"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
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
    <div className="mb-4 pt-10 md:w-1/4 hidden lg:block">
      <h1 className="text-2xl pb-2 border-b border-gray-400 font-bold">
        Filters
      </h1>

      {/* Applied filters grouped by attribute */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="mt-4 border-b border-gray-400 pb-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">
              Applied filters <span className="text-green-500">(
              {Object.values(selectedFilters).reduce(
                (acc, arr) => acc + arr.length,
                0
              )}
              )</span>
            </span>
            <button
              className="underline hover:no-underline cursor-pointer"
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {products.map((filterData) => {
              const applied = selectedFilters[filterData.name] || [];
              if (applied.length === 0) return null;

              return (
                <div key={filterData.name} className="flex flex-col gap-4">
                  <span className="font-semibold">
                    {filterData.name}:
                  </span>
                  <div className="flex flex-col gap-3">
                    {applied.map((option) => (
                      <button
                        key={`${filterData.name}-${option.option}`}
                        className="flex items-center gap-2 text-gray-800 border border-gray-600 w-full px-2 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => toggleOption(filterData.name, option)}
                      >
                        <FaTimes />
                        <span>{option.option}</span>
                      </button>
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
                            className="w-6 h-6 border-gray-300 accent-[#117445]"
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
                              className="w-6 h-6 border-gray-300 accent-[#117445]"
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
                          className="text-sm cursor-pointer underline hover:no-underline transition-all"
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