import { getCharacter, getEpisode as getEpisodeFromApi } from "rickmortyapi";

export async function getEpisode(id: number) {
  try {
    const { data: episodeData } = await getEpisodeFromApi(id);
    const charactersIds = episodeData.characters.map((char) => {
      return Number(char.split("/").at(-1));
    });
    const { data: characterData } = await getCharacter(charactersIds);

    return { ...episodeData, characters: characterData };
  } catch (e) {
    throw new Error(`coludnt get episode ${id}, ${JSON.stringify(e)}`);
  }
}
export async function getCharacterById(ids: number[]) {
  try {
    const { data } = await getCharacter(ids);

    return data;
  } catch (e) {
    throw new Error(`coludnt get character ids : ${ids}, ${JSON.stringify(e)}`);
  }
}
