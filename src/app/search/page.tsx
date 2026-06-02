import SearchResults from '@/components/Products/SearchResults';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const term = searchParams?.term ?? '';

  if (!term.trim()) {
    return <SearchResults term="" results={[]} />;
  }

  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;

  const authHeader =
    'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(
    `${baseUrl}/products?search=${encodeURIComponent(term)}&per_page=20&status=publish&_fields=id,name,slug,price,images,categories`,
    {
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return <SearchResults term={term} results={[]} />;
  }

  const data = await res.json();

  const results = data.map((product: any) => {
    const mainCat = 'departments';
    const subCat = product.categories?.[0]?.slug || 'uncategorized';
    console.log(product);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images?.[0]?.src || null,
      url: `/products/${mainCat}/${subCat}/${product.slug}`,
    };
  });

  return <SearchResults term={term} results={results} />;
}
