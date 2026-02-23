import { NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // dev only for self-signed certs

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }) {
  const { params } = context;
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug missing" }, { status: 400 });
  }

  try {
    const baseUrl = process.env.WOO_COMMERCE_API_URL!;
    const key = process.env.WC_KEY!;
    const secret = process.env.WC_SECRET!;
    const authHeader = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

    // 1️⃣ Fetch category by slug to get its ID
    const catRes = await fetch(`${baseUrl}/products/categories?slug=${slug}`, {
      headers: { Authorization: authHeader },
    });
    if (!catRes.ok) throw new Error("Category fetch failed");

    const categories = await catRes.json();
    if (!categories.length) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const categoryId = categories[0].id;

    // 2️⃣ Fetch products in this category
    const prodRes = await fetch(`${baseUrl}/products?category=${categoryId}&per_page=50&page=1`, {
      headers: { Authorization: authHeader },
    });
    if (!prodRes.ok) throw new Error("Product fetch failed");

    const products = await prodRes.json();

    // 4️⃣ Shape products data for frontend
    const productData = products.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      attributes: item.attributes, // keep this for filtering
      img: item.images?.[0]?.src ?? "/placeholder.png",
    }));

    const attributesData = Object.values(
      productData.reduce((acc, product) => {
        (product.attributes || []).forEach((attr) => {
          if (!acc[attr.name]) {
            acc[attr.name] = {
              name: attr.name,
              slug: attr.slug,
              options: {}
            };
          }

          (attr.options || []).forEach((optionValue) => {
            if (!acc[attr.name].options[optionValue]) {
              acc[attr.name].options[optionValue] = {
                option: optionValue,
                productIds: []
              };
            }

            acc[attr.name].options[optionValue].productIds.push(product.id);
          });
        });

        return acc;
      }, {} as any)
    ).map((attr: any) => ({
      ...attr,
      options: Object.values(attr.options)
    }));

    return NextResponse.json({ products: productData, attributes: attributesData });

  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 400 });
  }
}
