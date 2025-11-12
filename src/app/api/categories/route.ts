import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Build the WooCommerce URL from env or hardcode temporarily
    const wooUrl =
      "http://edsteel.local/wp-json/wc/store/v1/products/categories";

    // ("Fetching WooCommerce URL:", wooUrl);

    // Server-side fetch — CORS does NOT apply here
    const res = await fetch(wooUrl);

    if (!res.ok) {
      throw new Error(`WooCommerce fetch failed with status: ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    let catList = {};
    data.forEach((item) => {
      if (item.parent === 0) {
        catList[item.id] = {
          mainCat: item.name,
          mainCatSlug: item.slug,
          subCats: [],
          catId: item.id,
        };
      }
    });

    data.forEach((item) => {
      if (catList[item.parent]) {
        catList[item.parent].subCats.push({ name: item.name, slug: item.slug });
      }
    });

    let catListArr = Object.values(catList);

    return NextResponse.json(catListArr, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message + "gaaga" },
      { status: 500 }
    );
  }
}
