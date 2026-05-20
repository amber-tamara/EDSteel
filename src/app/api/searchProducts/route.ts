import { NextResponse } from 'next/server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || !query.trim()) {
    return NextResponse.json([]);
  }

  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;

  const authHeader =
    'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const res = await fetch(
      `${baseUrl}/products?search=${encodeURIComponent(
        query,
      )}&per_page=10&&status=publish&_fields=id,name,slug,categories`,
      {
        headers: {
          Authorization: authHeader,
        },
        cache: 'force-cache',
        next: { revalidate: 10 },
      },
    );

    if (!res.ok) {
      throw new Error('WooCommerce search failed');
    }

    const data = await res.json();
    // console.log(data);

    const enriched = data.map((product: any) => {
      const subCat = product.categories?.[0]?.slug || 'uncategorized';
      const mainCat = 'departments';
      // console.log(subCat);
      return {
        name: product.name,
        id: product.id,
        url: `/products/${mainCat}/${subCat}/${product.slug}`,
      };
    });
    console.log(enriched);
    return NextResponse.json(enriched);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
