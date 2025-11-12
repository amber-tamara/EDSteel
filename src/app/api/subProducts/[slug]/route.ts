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

    const subCatData = await fetch(
      `${baseUrl}/products?category=${data[0].id}`,
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
      img: item.images[0].src,
    }));

    return NextResponse.json(subCatsData);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
