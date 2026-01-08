// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import https from "https";
import { Buffer } from "buffer";

export const runtime = "nodejs";

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

    // 1. Get main category ID
    const mainRes = await fetch(`${baseUrl}/products/categories?slug=${slug}`, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
      },
    });

    if (!mainRes.ok) throw new Error("Main category not found");
    const [mainCat] = await mainRes.json();
    const parentId = mainCat.id;

    // 2. Get subcategories
    const subRes = await fetch(
      `${baseUrl}/products/categories?parent=${parentId}`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
        },
        agent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    if (!subRes.ok) throw new Error("Subcategories failed");
    const subCats = await subRes.json();

    // 3. Fetch products + include subCatID
    const subCatData = await Promise.all(
      subCats.map(async (subCat: any) => {
        const prodRes = await fetch(
          `${baseUrl}/products?category=${subCat.id}&per_page=4`,
          {
            headers: {
              Authorization:
                "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
            },
            agent: new https.Agent({ rejectUnauthorized: false }),
          }
        );

        const products = await prodRes.json();
        if (!products.length) return null;

        return {
          subCatID: subCat.id, // ← ADDED
          subCatName: subCat.name, // ← You had this
          products: products.map((p: any) => ({
            productID: p.id,
            productName: p.name,
            image: p.images[0]?.src || null,
          })),
        };
      })
    );

    const filtered = subCatData.filter(Boolean);
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
