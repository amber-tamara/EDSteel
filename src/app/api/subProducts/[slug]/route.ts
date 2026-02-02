// import { NextResponse } from "next/server";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   const { slug } = await params;

//   if (!slug) {
//     return NextResponse.json({ error: "Slug missing" }, { status: 400 });
//   }

//   try {
//     const baseUrl = process.env.WOO_COMMERCE_API_URL!;
//     const key = process.env.WC_KEY!;
//     const secret = process.env.WC_SECRET!;
//     const result = await fetch(`${baseUrl}/products/categories?slug=${slug}`, {
//       headers: {
//         Authorization:
//           "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
//       },
//     });


//     if (!result.ok) throw new Error("Fecth Failed");
//     //might want the count.. data.count
//     const data = await result.json();
//     const subCatData = await fetch(
//       `${baseUrl}/products?category=${data[0].id}&per_page=50&page=1`,
//       {
//         headers: {
//           Authorization:
//             "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
//         },
//       }
//     );

//     const subCatResult = await subCatData.json();

//     const subCatsData = subCatResult.map((item) => ({
//       name: item.name,
//       slug: item.slug,
//       price: item.price,
//       img: item.images?.[0]?.src ?? "/placeholder.png",
//     }));

//     return NextResponse.json(subCatsData);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

import { NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // dev only for self-signed certs

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }) {
    const { params } = context;
  const { slug } = await params;
  console.log(slug)

  if (!slug) {
    return NextResponse.json({ error: "Slug missing" }, { status: 400 });
  }
  console.log('here')

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

    // 3️⃣ Fetch all global attributes
    const attrRes = await fetch(`${baseUrl}/products/attributes`, {
      headers: { Authorization: authHeader },
    });
    if (!attrRes.ok) throw new Error("Attributes fetch failed");

    const attributes = await attrRes.json();

    // 4️⃣ Shape products data for frontend
    const productData = products.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      attributes: item.attributes, // keep this for filtering
      img: item.images?.[0]?.src ?? "/placeholder.png",
    }));

    // 5️⃣ Shape attributes data for frontend
    const attributesData = attributes.map(attr => ({
      id: attr.id,
      name: attr.name,
      slug: attr.slug,
      type: attr.type,
      order_by: attr.order_by,
    }));

    // ✅ Return both products and global attributes
    return NextResponse.json({ products: productData, attributes: attributesData });

  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 400 });
  }
}
