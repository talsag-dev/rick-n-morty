import { getCharacter } from "./actions";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const character = await getCharacter(Number(id));

  return <>{JSON.stringify(character)}</>;
}
