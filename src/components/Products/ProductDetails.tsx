// src/components/Products/ProductDetails.tsx
export default function ProductDetails({ product }) {
  if (!product) return null;

  // WooCommerce attributes -> [{label, value}]
  const specs =
    product.attributes?.map((attr) => ({
      label: attr.name,
      value: Array.isArray(attr.options)
        ? attr.options.join(', ')
        : String(attr.options),
    })) ?? [];

  if (specs.length === 0) return null;

  return (
    <section className="py-6 border-t border-gray-200 w-full md:max-w-[50%] w-full px-5 sm:px-6 lg:px-10">
      <h3 className="text-xl font-meduim mb-5 text-black">Specifications</h3>

      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {specs.map((spec, i) => (
          <div
            key={i}
            className="grid grid-cols-2 px-4 py-3 bg-white even:bg-gray-50"
          >
            <span className="font-semibold text-gray-700">{spec.label}</span>
            <span className="text-gray-800">{spec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
