"use client";

import { useState } from "react";

interface FilterProps {
  mainCat: string;
  products?: any[];
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: (filters: Record<string, string[]>) => void;
}

export default function Filter({
  mainCat,
  products = [],
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  // Track which attributes are expanded
  const [expandedAttrs, setExpandedAttrs] = useState<Record<string, boolean>>({});

  const toggleOption = (attrName: string, option: string) => {
    const current = selectedFilters[attrName] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setSelectedFilters({ ...selectedFilters, [attrName]: updated });
  };

  // Build available attributes from products
  const availableAttributes: Record<string, Set<string>> = {};
  products.forEach((prod) => {
    prod.attributes?.forEach((attr: any) => {
      if (!availableAttributes[attr.name]) availableAttributes[attr.name] = new Set();
      attr.options.forEach((opt: string) => availableAttributes[attr.name].add(opt));
    });
  });

  const attributeEntries = Object.entries(availableAttributes);

  // Toggle expand/collapse for a specific attribute
  const toggleExpand = (attrName: string) => {
    setExpandedAttrs({ ...expandedAttrs, [attrName]: !expandedAttrs[attrName] });
  };

  return (
    <div className="mb-4 pt-10">
      <h1 className="text-2xl pb-2 border-b border-black-300 w-80">Categories</h1>
      <h2 className="mt-4">See more {mainCat}</h2>
      <h1 className="text-2xl pb-2 border-b border-black-300 w-80 mt-8">Filters</h1>

      {attributeEntries.length === 0 ? (
        <p className="mt-2">No filters available</p>
      ) : (
        <div className="mt-4 space-y-6 w-80">
          {attributeEntries.map(([attrName, optionsSet]) => {
            const isExpanded = expandedAttrs[attrName] || false;

            return (
              <div key={attrName} className="pb-2 border-b border-black-300 w-80">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpand(attrName)}
                >
                  {attrName}
                  <span
                    className="mx-2 inline-block w-1.5 h-1.5 border-t border-r border-black"
                    style={{ transform: "rotate(135deg)" }}
                  ></span>
                </h3>

                {isExpanded && (
                  <ul className="ml-4 mt-2">
                    {Array.from(optionsSet).map((option, idx, arr) => {
                      const isSelected = selectedFilters[attrName]?.includes(option);
                      return (
                        <li key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected || false}
                            onChange={() => toggleOption(attrName, option)}
                            className="mr-2"
                          />
                          <span
                            className={`cursor-pointer hover:text-blue-600 ${isSelected ? "font-bold text-blue-700" : ""
                              }`}
                            onClick={() => toggleOption(attrName, option)}
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
