// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import https from "https";
import { Buffer } from "buffer";

export const runtime = "nodejs";

// For self-signed certs (dev only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    const baseUrl = process.env.WOO_COMMERCE_API_URL!;
    const key = process.env.WC_KEY!;
    const secret = process.env.WC_SECRET!;

    const authHeader = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

    // 1️⃣ Get main category ID
    const mainRes = await fetch(`${baseUrl}/products/categories?slug=${slug}`, {
      headers: { Authorization: authHeader },
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!mainRes.ok) throw new Error("Main category not found");
    const [mainCat] = await mainRes.json();
    if (!mainCat) return NextResponse.json({ subCategories: [] }, { status: 200 });

    const parentId = mainCat.id;

    // 2️⃣ Get subcategories
    const subRes = await fetch(`${baseUrl}/products/categories?parent=${parentId}`, {
      headers: { Authorization: authHeader },
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!subRes.ok) throw new Error("Subcategories fetch failed");
    const subCats = await subRes.json();
    if (!subCats.length) return NextResponse.json({ subCategories: [] }, { status: 200 });

    // 3️⃣ Fetch products for each subcategory
    const subCatData = await Promise.all(
      subCats.map(async (subCat: any) => {
        const prodRes = await fetch(`${baseUrl}/products?category=${subCat.id}&per_page=4`, {
          headers: { Authorization: authHeader },
          agent: new https.Agent({ rejectUnauthorized: false }),
        });

        if (!prodRes.ok) return null;

        const products = await prodRes.json();
        if (!products.length) return null;

        return {
          subCatID: subCat.id,
          subCatName: subCat.name,
          products: products.map((p: any) => ({
            productID: p.id,
            productName: p.name,
            image: p.images[0]?.src || null,
          })),
        };
      })
    );

    // 4️⃣ Remove any nulls
    const filtered = subCatData.filter(Boolean);

    // ✅ Return the data
    return NextResponse.json({ subCategories: filtered }, { status: 200 });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}