'use client';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

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
  subCat?: string;
  products?: AttributeFilter[];
  selectedFilters: Record<string, FilterOption[]>;
  setSelectedFilters: (filters: Record<string, FilterOption[]>) => void;
  isVisible?: string;
}

export default function Filter({
  mainCat,
  subCat,
  products = [],
  selectedFilters,
  setSelectedFilters,
  isVisible,
}: FilterProps) {
  const [expandedAttrs, setExpandedAttrs] = useState<Record<string, boolean>>(
    {},
  );
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const toggleExpand = (attrName: string) => {
    setExpandedAttrs((prev) => ({
      ...prev,
      [attrName]: !prev[attrName],
    }));
  };

  const toggleOption = (attrName: string, option: FilterOption) => {
    const normalizedAttr = attrName.trim();
    const normalizedOption = option.option.trim();

    setSelectedFilters((prev) => {
      const current = prev[normalizedAttr] || [];
      const exists = current.some((o) => o.option.trim() === normalizedOption);

      let updated: FilterOption[];
      if (exists) {
        updated = current.filter((o) => o.option.trim() !== normalizedOption);
      } else {
        updated = [...current, { ...option, option: normalizedOption }];
      }

      if (updated.length === 0) {
        const { [normalizedAttr]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [normalizedAttr]: updated };
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
  };

  return (
    <div className={`mb-4 ${isVisible}`}>
      <h1 className="text-2xl pb-2 border-b border-gray-400 font-bold">
        Filters
      </h1>

      {Object.keys(selectedFilters).length > 0 && (
        <div className="mt-4 border-b border-gray-400 pb-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">
              Applied filters{' '}
              <span className="text-green-500">
                (
                {Object.values(selectedFilters).reduce(
                  (acc, arr) => acc + arr.length,
                  0,
                )}
                )
              </span>
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
                  <span className="font-semibold">{filterData.name}:</span>
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

            const firstFive = (filterData?.options || []).slice(0, 5);
            const remaining = (filterData?.options || []).slice(5);

            return (
              <div
                key={filterData.name}
                className="pt-3 pb-3 border-b border-gray-500 last:border-b-0"
              >
                <button
                  type="button"
                  className="w-full text-left font-semibold flex justify-between items-center py-1 cursor-pointer"
                  onClick={() => toggleExpand(filterData.name)}
                >
                  {filterData.name}
                  <span
                    className={`inline-block w-2 h-2 border-t border-r border-black transition-transform duration-200 ${
                      isExpanded ? 'rotate-135 mt-1' : '-rotate-45'
                    }`}
                  />
                </button>
                {isExpanded && (
                  <ul className="mt-2 space-y-0.5">
                    {firstFive.map((option) => {
                      const isSelected =
                        selectedFilters[filterData.name]?.some(
                          (o) => o.option.trim() === option.option.trim(),
                        ) ?? false;

                      const count = option.productIds.length;

                      return (
                        <li key={option.option}>
                          <div className="w-full flex items-center group hover:bg-gray-100 px-3 py-2 -mx-3 rounded transition-colors duration-150 cursor-default">
                            <input
                              id={`${filterData.name}-${option.option}`}
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                toggleOption(filterData.name, option)
                              }
                              className="w-6 h-6 border border-gray-300 rounded appearance-none checked:bg-[#117445] checked:border-[#117445] group-hover:border-[#117445] checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-black checked:after:flex checked:after:justify-center checked:after:items-center cursor-pointer shrink-0 transition-colors"
                            />
                            <div className="ml-2 text-sm flex-1 flex items-center">
                              <span
                                className={`group-hover:underline ${isSelected ? 'font-medium text-black' : 'text-gray-700'}`}
                              >
                                {option.option}
                              </span>
                              <span className="text-xs text-gray-500 font-normal no-underline ml-1">
                                ({count})
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}

                    {isShowAll &&
                      remaining.map((option) => {
                        const isSelected =
                          selectedFilters[filterData.name]?.some(
                            (o) => o.option === option.option,
                          ) ?? false;

                        const count = option.productIds.length;

                        return (
                          <li key={option.option}>
                            <div className="w-full flex items-center group hover:bg-gray-100 px-3 py-2 -mx-3 rounded transition-colors duration-150 cursor-default">
                              <input
                                id={`${filterData.name}-${option.option}`}
                                type="checkbox"
                                checked={isSelected}
                                onChange={() =>
                                  toggleOption(filterData.name, option)
                                }
                                className="w-6 h-6 border border-gray-300 rounded appearance-none checked:bg-[#117445] checked:border-[#117445] group-hover:border-[#117445] checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-black checked:after:flex checked:after:justify-center checked:after:items-center cursor-pointer shrink-0 transition-colors"
                              />
                              <div className="ml-2 text-sm flex-1 flex items-center">
                                <span
                                  className={`group-hover:underline ${isSelected ? 'font-medium text-black' : 'text-gray-700'}`}
                                >
                                  {option.option}
                                </span>
                                <span className="text-xs text-gray-500 font-normal no-underline ml-1">
                                  ({count})
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}

                    {remaining.length > 0 && (
                      <li className="pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setShowAll((prev) => ({
                              ...prev,
                              [filterData.name]: !prev[filterData.name],
                            }))
                          }
                          className="text-sm font-semibold text-gray-900 cursor-pointer underline hover:no-underline transition-all"
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
