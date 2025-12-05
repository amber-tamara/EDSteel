export default function ProductInformation({ product }) {
  // Strip HTML from WooCommerce description
  const cleanText = (html?: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "").trim() ?? "";

  // Choose a long readable description
  const description =
    cleanText(product.short_description) ||
    cleanText(product.description) ||
    "No product information available.";

  // Filter meta for human readable “info” fields only
  const infoMeta = product.meta_data?.filter((m) => m.key.startsWith("info_"));

  const featureMeta = product.meta_data?.filter((m) =>
    m.key.startsWith("feature_")
  );

  return (
    <section className="bg-[#f0f0f0] pl-10 rounded-xl mt-12 w-150">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-black">
        Product information
      </h2>

      {/* Description paragraph */}
      <p className="text-gray-800 leading-relaxed mb-8">{description}</p>

      {/* Info bullets */}
      {infoMeta?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-black">Details</h3>

          <ul className="list-disc pl-6 space-y-3 text-gray-900">
            {infoMeta.map((m, i) => (
              <li key={i}>{m.value}</li>
            ))}
          </ul>
        </>
      )}

      {/* Features bullets */}
      {featureMeta?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-10 mb-4 text-black">
            Features & benefits
          </h3>

          <ul className="list-disc pl-6 space-y-3 text-gray-900">
            {featureMeta.map((m, i) => (
              <li key={i}>{m.value}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
