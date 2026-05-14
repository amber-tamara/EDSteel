export default async function SearchPage({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const param = await searchParams;

  return (
    <div>
      <h1>Search Results</h1>
      <p>{param.term}</p>
    </div>
  );
}
