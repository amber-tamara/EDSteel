import { NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug missing" }, { status: 400 });
  }

  try {
    const baseUrl = process.env.WOO_COMMERCE_API_URL!;
    const key = process.env.WC_KEY!;
    const secret = process.env.WC_SECRET!;
    const result = await fetch(`${baseUrl}/products/categories?slug=${slug}`, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
      },
    });


    if (!result.ok) throw new Error("Fecth Failed");
    //might want the count.. data.count
    const data = await result.json();
    console.log(data)
    const subCatData = await fetch(
      `${baseUrl}/products?category=${data[0].id}&per_page=50&page=1`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
        },
      }
    );

    const subCatResult = await subCatData.json();

    const subCatsData = subCatResult.map((item) => ({
      name: item.name,
      slug: item.slug,
      price: item.price,
      img: item.images?.[0]?.src ?? "/placeholder.png",
    }));

    return NextResponse.json(subCatsData);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


// import { NextResponse } from "next/server";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const { slug } = params;

//   if (!slug) {
//     return NextResponse.json({ error: "Slug missing" }, { status: 400 });
//   }

//   try {
//     const baseUrl = process.env.WOO_COMMERCE_API_URL!;
//     const key = process.env.WC_KEY!;
//     const secret = process.env.WC_SECRET!;

//     // 1️⃣ Fetch category by slug
//     const catRes = await fetch(
//       `${baseUrl}/products/categories?slug=${slug}`,
//       {
//         headers: {
//           Authorization:
//             "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
//         },
//       }
//     );

//     if (!catRes.ok) {
//       throw new Error("Category fetch failed");
//     }

//     const categories = await catRes.json();

//     if (!categories.length) {
//       return NextResponse.json(
//         { error: "Category not found", slug },
//         { status: 404 }
//       );
//     }

//     const categoryId = categories[0].id;

//     // 2️⃣ Fetch products in that category
//     const prodRes = await fetch(
//       `${baseUrl}/products?category=${categoryId}&per_page=100`,
//       {
//         headers: {
//           Authorization:
//             "Basic " + Buffer.from(`${key}:${secret}`).toString("base64"),
//         },
//       }
//     );

//     if (!prodRes.ok) {
//       throw new Error("Product fetch failed");
//     }

//     const products = await prodRes.json();

//     // 3️⃣ Shape response safely
//     const subCatsData = products.map((item: any) => ({
//       name: item.name,
//       slug: item.slug,
//       price: item.price,
//       img: item.images?.[0]?.src ?? null,
//     }));

//     return NextResponse.json(subCatsData);
//   } catch (err: any) {
//     console.error("API ERROR:", err);
//     return NextResponse.json(
//       { error: err.message ?? "Unknown error" },
//       { status: 400 }
//     );
//   }
// }
