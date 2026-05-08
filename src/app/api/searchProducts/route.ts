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
      )}&per_page=10&status=publish`,
      {
        headers: {
          Authorization: authHeader,
        },
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      throw new Error('WooCommerce search failed');
    }

    const data = await res.json();
    console.log(data.categories);

    const enriched = data.map((product: any) => {
      const mainCat = product.categories?.[0]?.slug || 'uncategorized';
      const subCat = product.categories?.[1]?.slug || 'general';

      return {
        ...product,
        url: `/products/${mainCat}/${subCat}/${product.slug}`,
      };
    });

    return NextResponse.json(enriched);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
