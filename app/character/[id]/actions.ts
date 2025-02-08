import { getCharacter as getCharacterFromApi } from "rickmortyapi";
export async function getCharacter(id: number) {
  try {
    const character = await getCharacterFromApi(id);

    const { data } = character;

    return data;
  } catch (e) {
    throw new Error(`coludnt get character ${name}, ${JSON.stringify(e)}`);
  }
}
