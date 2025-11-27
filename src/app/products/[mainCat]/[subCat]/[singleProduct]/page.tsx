import SingleProduct from "../../../../../components/Products/SingleProduct";

export default async function ProductPage({
  params,
}: {
  params: { mainCat: string; subCat: string; singleProduct: string };
}) {
  const slug = await params.singleProduct; // <-- this is your product slug
  console.log("Slug from URL:", slug);

  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <SingleProduct product={product} />;
}

// Fetch a single product by slug
async function getProduct(slug: string) {
  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;

  const authHeader =
    "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

  // 1️⃣ Get the product by slug
  const res = await fetch(`${baseUrl}/products?slug=${slug}`, {
    headers: { Authorization: authHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch product:", slug);
    return null;
  }

  const data = await res.json();
  console.log(data);
  return data[0] ?? null; // first and only product
}
