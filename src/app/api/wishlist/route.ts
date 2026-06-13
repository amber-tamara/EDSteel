import { NextResponse } from 'next/server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeIds = searchParams.get('include');

  if (!includeIds || !includeIds.trim()) {
    return NextResponse.json([]);
  }

  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;

  const authHeader =
    'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const res = await fetch(
      `${baseUrl}/products?include=${encodeURIComponent(includeIds)}&status=publish`,
      {
        headers: {
          Authorization: authHeader,
        },
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      throw new Error('WooCommerce wishlist fetch failed');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Wishlist server error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 },
    );
  }
}
