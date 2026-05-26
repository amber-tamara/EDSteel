import SingleProduct from '../../../../../components/Products/SingleProduct';

export default async function ProductPage({
  params,
}: {
  params: { mainCat: string; subCat: string; singleProduct: string };
}) {
  const { singleProduct } = await params;
  const slug = singleProduct;

  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <SingleProduct productData={product} />;
}

async function getProduct(slug: string) {
  const baseUrl = process.env.WOO_COMMERCE_API_URL!;
  const key = process.env.WC_KEY!;
  const secret = process.env.WC_SECRET!;

  const authHeader =
    'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(`${baseUrl}/products?slug=${slug}`, {
    headers: { Authorization: authHeader },
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch product:', slug);
    return null;
  }

  const data = await res.json();
  let formattedVariants: any[] = [];
  const variantIDs = data[0]?.meta_data[0]?.value;
  if (variantIDs?.length > 1) {
    const variantIDsWithoutCurrent = variantIDs.filter(
      (item) => item !== data[0].id,
    );

    const idsString = variantIDsWithoutCurrent.join(',');

    const res = await fetch(`${baseUrl}/products?include=${idsString}`, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64'),
      },
    });

    if (!res.ok) throw new Error('Failed to fetch variant products');

    const varientData = await res.json();

    formattedVariants = varientData.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      img: item.images?.[0]?.src ?? '/placeholder.png',
    }));
  }

  return {
    singleProduct: data[0] ?? null,
    varients: formattedVariants ?? null,
  };
}
