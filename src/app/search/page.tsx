export default function SearchPage({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const term = searchParams.term;

  return (
    <div>
      <h1>Search Results</h1>
      <p>{term}</p>
    </div>
  );
}
