import { getCharacters } from "rickmortyapi";

export async function getCharactersByQuery(page: number = 1, name?: string) {
  try {
    const { data } = await getCharacters({
      name,
      page,
    });

    const { results } = data;
    return results || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
