import { getCharactersByQuery } from "./actions";

import { Explorer } from "./explorer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; page?: string }>;
}) {
  const { name: nameParam, page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");
  const name = nameParam || "";

  const initialData = await getCharactersByQuery(page, name);

  return (
    <div className="grid grid-cols-4">
      <Explorer initialData={initialData} name={name} />
    </div>
  );
}
